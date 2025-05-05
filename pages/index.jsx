import React, { useEffect, useState } from "react";

// Components
import Head from "next/head";
import Banner from "@/components/containers/Banner";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";

// Font
import Link from "next/link";
import dayjs from "dayjs";
import Navbar from "@/components/containers/Navbar";
import Container from "@/components/common/Container";
import Image from "next/image";
import TrendingNews from "@/components/containers/TrendingNews";

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
  page,
}) {
  const [visiblePosts, setVisiblePosts] = useState(9);
  const postsPerLoad = 9;

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

  const handleNavigation = (page) => {
    router.push(page);
  };

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

  const handleShowMore = () => {
    setVisiblePosts((prev) => prev + postsPerLoad);
  };

  return (
    page?.enable && (
      <div>
        <Head>
          <meta charSet="UTF-8" />
          <title>{meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://${domain}`} />
          <link rel="publisher" href={`https://${domain}`} />
          <link rel="canonical" href={`https://${domain}`} />
          <meta name="theme-color" content="#008DE5" />
          <link rel="manifest" href="/manifest.json" />
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1.0"
          />
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

        <Navbar
          logo={logo}
          categories={categories}
          blog_list={blog_list}
          imagePath={imagePath}
          nav_type={nav_type}
        />

        <Banner
          data={banner?.value}
          image={`${imagePath}/${banner?.file_name}`}
          blog_list={blog_list}
          imagePath={imagePath}
        />

        <TrendingNews blog_list={blog_list} imagePath={imagePath} />
        <MostPopular blog_list={blog_list} imagePath={imagePath} />

        <FullContainer className="py-20">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
              <div className="col-span-1 md:col-span-2 flex flex-col gap-10">
                {/* Featured Post First */}
                {blog_list?.map(
                  (item, index) =>
                    item.isFeatured && (
                      <div
                        key={index}
                        className={`relative overflow-hidden group h-[40vh] md:h-[60vh] w-full cursor-pointer mb-10`}
                        onClick={() =>
                          handleNavigation(
                            `/${encodeURI(
                              sanitizeUrl(item.article_category)
                            )}/${encodeURI(sanitizeUrl(item.title))}`
                          )
                        }
                      >
                        <Link
                          key={index}
                          href={`/${encodeURI(
                            sanitizeUrl(item.article_category)
                          )}/${encodeURI(sanitizeUrl(item.title))}`}
                          title={item.imageTitle}
                          className="relative overflow-hidden w-full h-full"
                        >
                          <Image
                            src={`${imagePath}/${item.image || "no-image.png"}`}
                            title={
                              item.imageTitle ||
                              item.title ||
                              "Article Thumbnail"
                            }
                            alt={item.altImage || item.tagline}
                            priority={false}
                            width={298}
                            height={195}
                            loading="lazy"
                            sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
                            className="h-full min-w-full group-hover:scale-125 transition-all duration-1000"
                            style={{ objectFit: "cover" }}
                          />
                        </Link>

                        <div className="flex flex-col justify-end z-10 w-full right-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500 md:w-auto gap-4 md:gap-8 cursor-pointer absolute top-0 h-full text-white p-6 md:p-12 left-0">
                          <p className="uppercase text-sm font-semibold bg-white text-black py-0.5 px-3 w-fit">
                            Featured
                          </p>

                          <div className="max-w-2xl">
                            <Link
                              href={`/${encodeURI(
                                sanitizeUrl(item.article_category)
                              )}/${encodeURI(sanitizeUrl(item.title))}`}
                              className="font-medium text-2xl md:text-4xl underline-white leading-tight"
                            >
                              {item.title}
                            </Link>
                          </div>

                          <div className="flex items-center text-gray-300 gap-5">
                            <p>{item.author}</p>
                            {"-"}
                            <p>{item.published_at}</p>
                          </div>
                        </div>
                      </div>
                    )
                )}

                {/* Latest Posts Heading - Left aligned but matching Trending News style */}
                <div className="border-t border-gray-300 pt-5 w-full">
                  <h2 className="pr-6 text-4xl font-bold -mt-10 bg-secondary w-fit">
                    Latest Articles
                  </h2>
                  <p className="mt-4 text-gray-500">
                    Discover our most recent stories and insights
                  </p>
                </div>

                {/* Latest Posts Grid */}
                {blog_list
                  ?.reverse()
                  .slice(0, visiblePosts)
                  .map((item, index) => (
                    <div
                      key={index}
                      className="grid grid-cols-1 md:grid-cols-2 bg-white border border-gray-100 group overflow-hidden rounded-xl"
                    >
                      <Link
                        title={item.article_category || "category"}
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        imageHeight="h-48 md:h-80"
                        imageTitle={
                          item.imageTitle || item.title || "Blog Image Title"
                        }
                        className="relative overflow-hidden h-48 md:h-80"
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent z-10 group-hover:opacity-0 transition-opacity duration-500" />
                        <div className="absolute inset-0 bg-blue-600/20 z-20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        <Image
                          src={
                            item.image
                              ? `${imagePath}/${item.image}`
                              : "/no-image.png"
                          }
                          alt={
                            item.altImage || item.tagline || "Article Thumbnail"
                          }
                          className="w-full h-full object-cover group-hover:scale-125 transition-all duration-1000"
                          title={
                            item.imageTitle || item.title || "Blog Image Title"
                          }
                          width={600}
                          height={400}
                          priority={false}
                          loading="lazy"
                          sizes="(max-width: 768px) 100vw, 50vw"
                        />
                      </Link>

                      <div className="flex flex-col justify-center py-4 md:py-6 px-4 md:px-8 group-hover:bg-gradient-to-br from-gray-50 to-blue-50/30 transition-all duration-500">
                        <div className="flex items-center gap-2 mb-4">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center ring-2 ring-white">
                            <span className="text-sm font-medium capitalize text-blue-600">
                              {item.author?.charAt(0)}
                            </span>
                          </div>
                          <div className="flex flex-col">
                            <p className="text-sm font-medium capitalize text-gray-900">
                              {item.author}
                            </p>
                            <p className="text-xs text-gray-500">
                              {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-3 md:space-y-4">
                          <Link
                            href={`/${encodeURI(
                              sanitizeUrl(item.article_category)
                            )}/${encodeURI(sanitizeUrl(item.title))}`}
                            title={item.title}
                            className="text-xl md:text-2xl font-semibold underline-white"
                          >
                            {item.title}
                          </Link>

                          <p className="text-gray-600 line-clamp-3 leading-relaxed">
                            {item.tagline}
                          </p>
                        </div>

                        <div className="mt-6 flex items-center gap-4">
                          <Link
                            href={`/${encodeURI(
                              sanitizeUrl(item.article_category)
                            )}/${encodeURI(sanitizeUrl(item.title))}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors group/link"
                          >
                            Read More
                            <svg
                              className="w-4 h-4 transform group-hover/link:translate-x-1 transition-transform"
                              fill="none"
                              viewBox="0 0 24 24"
                              stroke="currentColor"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 5l7 7-7 7"
                              />
                            </svg>
                          </Link>
                        </div>
                      </div>
                    </div>
                  ))}

                {blog_list && visiblePosts < blog_list.length && (
                  <button
                    onClick={handleShowMore}
                    className="mx-auto px-8 w-full justify-center hover:bg-gray-900 hover:text-white transition-all duration-500 py-3 border border-gray-900 text-gray-900 flex items-center gap-2 rounded"
                  >
                    Show More
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                )}
              </div>

              {/* Sidebar */}
              <div className="block">
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
          </Container>
        </FullContainer>

        <Footer logo={logo} imagePath={imagePath} />

        <JsonLd
          data={{
            "@context": "https://www.schema.org",
            "@graph": [
              {
                "@type": "WebSite",
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
              },
              {
                "@type": "Organization",
                "@id": `https://${domain}`,
                name: domain,
                url: `https://${domain}`,
                logo: {
                  "@type": "ImageObject",
                  url: `${imagePath}/${logo?.file_name}`,
                  width: logo?.width || 100,
                  height: logo?.height || 100,
                },
                sameAs: [
                  "https://www.facebook.com",
                  "https://www.twitter.com",
                  "https://instagram.com",
                ],
              },
              {
                "@type": "ItemList",
                url: `https://${domain}`,
                name: "blog",
                itemListElement: blog_list?.map((blog, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  item: {
                    "@type": "Article",
                    url: `https://${domain}/${sanitizeUrl(
                      blog?.article_category
                    )}/${sanitizeUrl(blog?.title)}`,
                    name: blog?.title,
                  },
                })),
              },
            ],
          }}
        />
      </div>
    )
  );
}

export async function getServerSideProps({ req }) {
  const domain = getDomain(req?.headers?.host);

  let layoutPages = await callBackendApi({
    domain,
    type: "layout",
  });

  const meta = await callBackendApi({ domain, type: "meta_home" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "home");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const banner = await callBackendApi({ domain, type: "banner" });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  robotsTxt({ domain });

  return {
    props: {
      page,
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
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

function MostPopular({ blog_list = [], imagePath }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular).slice(0, 3);

  return (
    popularBlogs?.length > 0 && (
      <FullContainer className="bg-gray-50 py-8 md:py-16 pt-12 md:pt-20">
        <Container>
          <div className="border-t border-gray-300 pt-5 text-center w-full flex flex-col items-center">
            <h2 className="px-6 text-4xl font-bold -mt-10 bg-gray-50 w-fit">
              Most Popular
            </h2>
            <p className="mt-4 text-gray-500">
              Top trending stories of the week
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-16">
            {popularBlogs.map((item, index) => (
              <div
                key={index}
                className="group bg-white rounded-xl overflow-hidden border border-gray-100 hover:shadow-lg transition-all duration-300"
              >
                <Link
                  href={`/${encodeURI(
                    sanitizeUrl(item.article_category)
                  )}/${encodeURI(sanitizeUrl(item.title))}`}
                  className="relative h-40 md:h-48 block overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent z-10" />
                  <Image
                    src={`${imagePath}/${item.image || "no-image.png"}`}
                    alt={item.altImage || item.tagline}
                    width={400}
                    height={300}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    style={{ objectFit: "cover" }}
                  />
                  <div className="absolute top-4 left-4 z-20">
                    <span className="bg-blue-600 text-white text-xs font-medium px-2.5 py-1 rounded-full">
                      {item.article_category}
                    </span>
                  </div>
                </Link>

                <div className="p-4 md:p-6">
                  <span className="w-full text-left">
                    <Link
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                      className="text-lg md:text-xl font-semibold text-gray-900 mb-2 md:mb-3 underline-white"
                    >
                      {item.title}
                    </Link>
                  </span>
                  <p className="text-gray-600 mt-3 text-sm line-clamp-2 mb-4">
                    {item.tagline}
                  </p>

                  <div className="flex items-center gap-3 text-sm">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-blue-100 to-blue-50 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {item.author?.charAt(0)}
                      </span>
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium text-gray-900">
                        {item.author}
                      </span>
                      <span className="text-gray-500 text-xs">
                        {dayjs(item.published_at).format("MMM D, YYYY")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </FullContainer>
    )
  );
}
