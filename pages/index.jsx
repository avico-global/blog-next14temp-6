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
import BlogCard from "@/components/common/BlogCard";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";

// Font
import { Raleway } from "next/font/google";
import LatestBlogs from "@/components/containers/LatestBlogs";
import MustRead from "@/components/containers/MustRead";
import SectionHeading from "@/components/common/SectionHeading";
import Link from "next/link";
import dayjs from "dayjs";
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
  tag_list,
  layout,
}) {
  useEffect(() => {
    fetch("/api/get-images")
      .then((response) => response.json())
      .then((data) => {
        console.log("Image files:", data.images);
      })
      .catch((error) => {
        console.error("Error fetching image files:", error);
      });
  }, []);
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

      <Navbar />
      
      <Banner blog_list={blog_list} imagePath={imagePath} />

      <MustRead blog_list={blog_list} imagePath={imagePath} />

      <FullContainer className="py-20 mx-auto max-w-[1500px]">
        <div className="  py-9  ">
          <h2 className="font-bold text-3xl md:text-5xl -mt-16 text-center">
            Latest Posts
          </h2>
          <h3 className="font-bold text-lg md:text-xl mt-4 text-center text-gray-500 px-6">
            Stay up-to-date
          </h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full px-3">
          {/* Featured Post */}
          <div className="col-span-1 md:col-span-2 flex flex-col gap-12">
            {blog_list?.map(
              (item, index) =>
                item.isFeatured && (
                  <div key={index} className="relative flex">
                    <Link
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                      imageHeight="h-72 md:h-[420px]"
                      imageTitle={
                        item.imageTitle || item.title || "Blog Image Title"
                      }
                    >
                      {/* Image Container */}
                      <div className="relative w-full h-[500px] lg:h-[700px] overflow-hidden">
                        <img
                          src={
                            item.image
                              ? `${imagePath}/${item.image}`
                              : "/no-image.png"
                          }
                          alt={
                            item.altImage || item.tagline || "Article Thumbnail"
                          }
                          className="w-full h-full object-cover hover:scale-110 transition-all duration-1000"
                          title={
                            item.imageTitle || item.title || "Blog Image Title"
                          }
                        />
                        {/* Text Overlay */}
                        <div className="absolute inset-0 bg-black bg-opacity-50 space-y-6 lg:pb-20 p-6  lg:px-20 flex flex-col justify-end  text-white">
                          <h2 className="text-lg md:text-xl font-bold">
                            {item.article_category}
                          </h2>
                          <h2 className="text-2xl md:text-4xl font-bold mt-2">
                            {item.title}
                          </h2>
                          <div className="flex items-center gap-2 mt-2">
                            <p className="text-sm font-semibold">
                              <span className="text-gray-400 text-sm">By</span>:{" "}
                              {item.author}
                            </p>
                            <p className="text-sm text-gray-400 font-semibold">
                              {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                            </p>
                          </div>
                        </div>
                      </div>
                    </Link>
                  </div>
                )
            )}

            {/* Must Read Section */}
            {blog_list?.map(
              (item, index) =>
                item.isMustRead && (
                  <div
                    key={index}
                    className="flex flex-col md:flex-row gap-6 bg-white shadow-md "
                  >
                    <div className="flex-shrink-0 w-full md:w-1/2 h-[200px] md:h-[330px] overflow-hidden">
                      <Link
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        imageHeight="h-72 md:h-[420px]"
                        imageTitle={
                          item.imageTitle || item.title || "Blog Image Title"
                        }
                      >
                        <img
                          src={
                            item.image
                              ? `${imagePath}/${item.image}`
                              : "/no-image.png"
                          }
                          alt={
                            item.altImage || item.tagline || "Article Thumbnail"
                          }
                          className="w-full h-full object-cover hover:scale-110 transition-all duration-1000"
                          title={
                            item.imageTitle || item.title || "Blog Image Title"
                          }
                        />
                      </Link>
                    </div>

                    <div className="flex flex-col justify-center gap-5 w-full md:w-2/3  py-2 px-4">
                      <Link
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        imageHeight="h-72 md:h-[420px]"
                        imageTitle={
                          item.imageTitle || item.title || "Blog Image Title"
                        }
                      >
                        <h2 className="text-lg md:text-xl font-bold">
                          {item.article_category}
                        </h2>

                        <h2 className="text-2xl font-bold">{item.title}</h2>
                      </Link>

                      <Link
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        imageHeight="h-72 md:h-[420px]"
                        imageTitle={
                          item.imageTitle || item.title || "Blog Image Title"
                        }
                      >
                        <p
                          className="text-md md:text-lg mt-2"
                          dangerouslySetInnerHTML={{
                            __html: `${item.tagline
                              .split(" ")
                              .slice(0, 10)
                              .join(" ")}...`,
                          }}
                        />
                      </Link>

                      <div className="flex items-center gap-2 mt-2">
                        <p className="text-sm font-semibold">
                          <span className="text-gray-400 text-sm">By</span>:{" "}
                          {item.author}
                        </p>
                        <p className="text-sm text-gray-400 font-semibold">
                          {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                        </p>
                      </div>
                    </div>
                  </div>
                )
            )}
          </div>

          {/* Sidebar */}
          <div className="hidden md:block">
            <Rightbar
              widgets={page?.widgets}
              about_me={about_me}
              imagePath={imagePath}
              categories={categories}
              tag_list={tag_list}
              blog_list={blog_list}
            />
          </div>
        </div>
      </FullContainer>

      <Footer />
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
  const layout = await callBackendApi({ domain, type: "layout" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
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
      copyright: copyright?.data[0]?.value || null,
      about_me: about_me?.data[0] || null,
      banner: banner?.data[0] || null,
      contact_details: contact_details?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
      tag_list: tag_list?.data[0]?.value || null,
    },
  };
}
