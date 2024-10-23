import React, { useEffect } from "react";

// Components
import Head from "next/head";
import Banner from "@/components/containers/Banner";
import FullContainer from "@/components/common/FullContainer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Rightbar from "@/components/containers/Rightbar";
import Footer from "@/components/containers/Footer";
import { useRouter } from "next/router";

import {
  callBackendApi,
  getDomain,
  getImagePath,
  robotsTxt,
  sanitizeUrl,
} from "@/lib/myFun";

// Font
import MustRead from "@/components/containers/MustRead";
import Link from "next/link";
import dayjs from "dayjs";
import Navbar from "@/components/containers/Navbar";
import Container from "@/components/common/Container";
import Image from "next/image";

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
    <div>
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

      <Navbar
        logo={logo}
        categories={categories}
        blog_list={blog_list}
        imagePath={imagePath}
        nav_type={nav_type}
      />

      <Banner
        data={banner.value}
        image={`${imagePath}/${banner?.file_name}`}
        blog_list={blog_list}
        imagePath={imagePath}
      />

      <MustRead blog_list={blog_list} imagePath={imagePath} />

      <FullContainer className="py-20">
        <Container>
          <div className="border-t-2 pt-5 text-center py-14 w-full flex flex-col items-center">
            <h2 className="px-6 text-4xl font-bold -mt-10 w-fit bg-gray-50">
              Latest Posts
            </h2>
            <p className="mt-4 text-gray-400">
              Get fresh insights and updates across all categories.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10 w-full">
            {/* Featured Post */}
            <div className="col-span-1 md:col-span-2 flex flex-col gap-10">
              {blog_list?.map(
                (item, index) =>
                  item.isFeatured && (
                    <div
                      key={index}
                      className={`relative overflow-hidden group h-[60vh] w-full`}
                    >
                      <Link
                        key={index}
                        href={`/${sanitizeUrl(item.article_category) || "#"}`}
                        title={item.imageTitle}
                        className="relative overflow-hidden w-full h-full"
                      >
                        <Image
                          src={`${imagePath}/${item.image || "no-image.png"}`}
                          title={item.imageTitle}
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

                      <div className="flex flex-col justify-end z-10 w-full right-0 bg-black/30 group-hover:bg-black/60 transition-all duration-500 md:w-auto gap-8 cursor-pointer absolute top-0 h-full text-white p-12 left-0">
                        <Link
                          className="uppercase text-sm font-semibold bg-white text-black py-0.5 px-3 w-fit"
                          href={`/${sanitizeUrl(item.article_category) || "#"}`}
                        >
                          Featured
                        </Link>

                        <Link
                          href={`/${sanitizeUrl(item.article_category) || "#"}`}
                        >
                          <h3 className="font-bold text-4xl max-w-xl group-hover:underline transition-all duration-500">
                            {item.title}
                          </h3>
                        </Link>

                        <div className="flex items-center text-gray-300 gap-5">
                          <p>{item.author}</p>
                          {"-"}
                          <p>{item.published_at}</p>
                        </div>
                      </div>
                    </div>
                  )
              )}

              {/* Must Read Section */}
              {blog_list?.map(
                (item, index) =>
                  item.isMustRead && (
                    <div
                      key={index}
                      className="grid grid-cols-2 bg-white shadow-md group"
                    >
                      <Link
                        title={item.article_category || "category"}
                        href={`/${encodeURI(
                          sanitizeUrl(item.article_category)
                        )}/${encodeURI(sanitizeUrl(item.title))}`}
                        imageHeight="h-72 md:h-[420px]"
                        imageTitle={
                          item.imageTitle || item.title || "Blog Image Title"
                        }
                        className="relative overflow-hidden"
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
                          className="w-full h-full object-cover group-hover:scale-125 transition-all duration-700"
                          title={
                            item.imageTitle || item.title || "Blog Image Title"
                          }
                        />
                      </Link>

                      <div className="flex flex-col justify-center p-8">
                        <p className="text-lg md:text-xl font-semibold capitalize text-gray-400">
                          {item.article_category}
                        </p>

                        <Link
                          href={`/${encodeURI(
                            sanitizeUrl(item.article_category)
                          )}/${encodeURI(sanitizeUrl(item.title))}`}
                          title={item.title}
                        >
                          <h2 className="text-2xl font-bold mt-3 group-hover:underline">
                            {item.title}
                          </h2>
                        </Link>

                        <p className="mt-3 text-gray-500">
                          {item.tagline?.slice(0, 100)}...
                        </p>

                        <div className="flex items-center gap-2 mt-4">
                          <p className="font-semibold">
                            <span className="text-gray-400">By</span>:{" "}
                            {item.author}
                          </p>
                          <p className=" text-gray-400 font-semibold">
                            {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                          </p>
                        </div>
                      </div>
                    </div>
                  )
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
