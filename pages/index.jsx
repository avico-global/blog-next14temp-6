import React, { useEffect } from "react";

// Components
import Head from "next/head";
import Banner from "@/components/containers/Banner";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import MostPopular from "@/components/containers/MostPopular";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import JsonLd from "@/components/json/JsonLd";
import { useRouter } from "next/router";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
} from "@/lib/myFun";

// Font
import { Raleway } from "next/font/google";
import LatestBlogs from "@/components/containers/LatestBlogs";
import MustRead from "@/components/containers/MustRead";
import SectionHeading from "@/components/common/SectionHeading";
import Link from "next/link";
import dayjs from "dayjs";
import Image from "next/image";
import Navbar from "@/components/containers/Navbar";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function Home({
  logo,
  blog_list,
  imagePath,
  categories,
  domain,
  meta,
  about_me,
  nav_type,
  banner,
  favicon,
  layout,
  tag_list,
}) {
  const router = useRouter();
  const { category } = router.query;

  useEffect(() => {
    const currentPath = router.asPath;

    if (category && (category.includes("%20") || category.includes(" "))) {
      const newCategory = category.replace(/%20/g, "-").replace(/ /g, "-");
      router.replace(`/${newCategory}`);
    }

    if (currentPath.includes("contact-us")) {
      router.replace("/contact");
    }
    if (currentPath.includes("about-us")) {
      router.replace("/about");
    }
  }, [category, router]);

  const page = layout?.find((page) => page.page === "home");

  return (
    <div className={`min-h-screen ${myFont.className}`}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <link rel="manifest" href="/manifest.json" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <GoogleTagManager />
        <meta
          name="google-site-verification"
          content="zbriSQArMtpCR3s5simGqO5aZTDqEZZi9qwinSrsRPk"
        />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${favicon}`}
        />
      </Head>

      {page?.enable
        ? page?.sections?.map((item, index) => {
            if (!item.enable) return null;

            switch (item.section?.toLowerCase()) {
              case "navbar":
                return (
                  <Navbar
                    key={index}
                    logo={logo}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                    nav_type={nav_type}
                  />
                );

              case "banner":
                return (
                  <Banner
                    key={index}
                    data={banner.value}
                    image={`${imagePath}/${banner?.file_name}`}
                  />
                );

              case "articles":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full mt-14">
                        <div className="flex flex-col gap-12">
                          {page?.sections?.map((item, index) => {
                            if (!item.enable) return null;

                            switch (item.section?.toLowerCase()) {
                              case "latest posts":
                                return (
                                  <LatestBlogs
                                    articles={blog_list}
                                    imagePath={imagePath}
                                  />
                                );
                              case "most popular":
                                return (
                                  <MostPopular
                                    articles={blog_list}
                                    imagePath={imagePath}
                                  />
                                );
                              case "must read":
                                return (
                                  <MustRead
                                    articles={blog_list}
                                    imagePath={imagePath}
                                  />
                                );
                              case "articles with categories":
                                return (
                                  <div>
                                    {categories?.map((category, index) => (
                                      <div key={index} className="w-full mb-12">
                                        <SectionHeading
                                          title={category}
                                          className="mb-7"
                                        />
                                        <div className="grid grid-cols-3 gap-8">
                                          {blog_list?.map(
                                            (item, index) =>
                                              item.article_category.name ===
                                                category && (
                                                <Link
                                                  title={item.imageTitle}
                                                  href={`/${item.article_category.name
                                                    ?.toLowerCase()
                                                    ?.replaceAll(
                                                      " ",
                                                      "-"
                                                    )}/${item.title
                                                    ?.toLowerCase()
                                                    ?.replaceAll(" ", "-")}`}
                                                  key={index}
                                                  className="flex flex-col gap-2 text-lg"
                                                >
                                                  <div className="overflow-hidden relative h-52 w-full bg-gray-200 rounded-md ">
                                                    <Image
                                                      title={
                                                        item.imageTitle ||
                                                        item.title ||
                                                        "Article Thumbnail"
                                                      }
                                                      alt={
                                                        item.altImage ||
                                                        item.tagline ||
                                                        "No Thumbnail Found"
                                                      }
                                                      src={`${imagePath}/${item.image}`}
                                                      fill={true}
                                                      loading="lazy"
                                                      className="w-full h-full object-cover absolute top-0 scale-125"
                                                    />
                                                  </div>
                                                  <div>
                                                    <p className="font-bold text-center text-inherit leading-tight">
                                                      {item.title}
                                                    </p>
                                                    <div className="flex items-center justify-center gap-2 mt-1">
                                                      <p className="text-xs">
                                                        <span className="text-gray-400 text-xs">
                                                          By
                                                        </span>
                                                        : {item.author}
                                                      </p>
                                                      <span className="text-gray-400">
                                                        --
                                                      </span>
                                                      <p className="text-xs text-gray-400">
                                                        {dayjs(
                                                          item?.published_at
                                                        )?.format(
                                                          "MMM D, YYYY"
                                                        )}
                                                      </p>
                                                    </div>
                                                  </div>
                                                </Link>
                                              )
                                          )}
                                        </div>
                                      </div>
                                    ))}
                                  </div>
                                );

                              default:
                                return null;
                            }
                          })}
                        </div>
                        <Rightbar
                          imagePath={imagePath}
                          widgets={page?.widgets}
                          about_me={about_me}
                          tag_list={tag_list}
                          categories={categories}
                          blog_list={blog_list}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );

              case "footer":
                return (
                  <Footer
                    blog_list={blog_list}
                    categories={categories}
                    footer_text=""
                    logo={logo}
                    imagePath={imagePath}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://www.schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `https://${domain}/`,
              url: `https://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `https://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${banner?.file_name}`,
                width: 1920,
                height: 1080,
              },
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": `https://${domain}/`,
              },
              // potentialAction: {
              //   "@type": "SearchAction",
              //   target: `http://${domain}/search?q={search_term_string}`,
              //   "query-input": "required name=search_term_string",
              // },
            },
            {
              "@type": "WebSite",
              "@id": `https://${domain}/#website`,
              url: `https://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              // potentialAction: {
              //   "@type": "SearchAction",
              //   target: `http://${domain}/search?q={search_term_string}`,
              //   "query-input": "required name=search_term_string",
              // },
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
                width: logo.width,
                height: logo.height,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${blog?.article_category?.name
                    ?.replaceAll(" ", "-")
                    ?.toLowerCase()}/${blog.title
                    .replaceAll(" ", "-")
                    ?.toLowerCase()}`,
                  name: blog.title,
                  author: {
                    "@type": "Person",
                    name: blog.author,
                  },
                  datePublished: blog.datePublished,
                  dateModified: blog.dateModified,
                  image: {
                    "@type": "ImageObject",
                    url: `${imagePath}/${blog.imageFileName}`,
                    width: blog.imageWidth,
                    height: blog.imageHeight,
                  },
                  headline: blog.title,
                  description: blog.description,
                  mainEntityOfPage: {
                    "@type": "WebPage",
                    "@id": `https://${domain}/${blog?.article_category?.name
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}/${blog.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`,
                  },
                },
              })),
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);
  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  let project_id = logo?.data[0]?.project_id || null;
  // const testData=await downloadImages({domain, project_id});
  // console.log("👊 ~ getServerSideProps ~ testData:", testData)
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  robotsTxt({ domain });

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      copyright: copyright?.data[0].value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0],
      contact_details: contact_details?.data[0]?.value,
      nav_type: nav_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
    },
  };
}
