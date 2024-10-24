import React from "react";
import Head from "next/head";
import Footer from "@/components/containers/Footer";
import {
  callBackendApi,
  getDomain,
  getImagePath,
  sanitizeUrl,
} from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { useRouter } from "next/router";
import dayjs from "dayjs";
import Link from "next/link";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import Rightbar from "@/components/containers/Rightbar";
import Navbar from "@/components/containers/Navbar";
import { Badge } from "@/components/ui/badge";

export default function Categories({
  logo,
  blog_list,
  imagePath,
  meta,
  domain,
  categories,
  about_me,
  tag_list,
  layout,
  contact_details,
  copyright,
  nav_type,
}) {
  const router = useRouter();
  const { category } = router.query;

  const filteredBlogList = blog_list.filter((item) => {
    const searchContent = category?.replaceAll("-", " ");
    return sanitizeUrl(item.article_category) === searchContent;
  });
  const page = layout?.find((page) => page.page === "category");

  return (
    <div className="flex flex-col min-h-screen justify-between">
      <Head>
        <meta charSet="UTF-8" />
        <title>{category?.replaceAll("-", " ")}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`http://${domain}`} />
        <link rel="publisher" href={`http://${domain}`} />
        <link rel="canonical" href={`http://${domain}`} />
        <meta name="theme-color" content="#008DE5" />
        <GoogleTagManager />
      </Head>

      <Navbar
        category={category}
        blog_list={blog_list}
        categories={categories}
        logo={logo}
        nav_type={nav_type}
        imagePath={imagePath}
        contact_details={contact_details}
      />

      <FullContainer className="py-10 mb-10">
        <Container>
          <Breadcrumbs
            breadcrumbs={[{ label: "Home", url: "/" }, { label: category }]}
          />
          <h1 className="text-4xl font-semibold capitalize pb-8 pt-5 w-full">
            Exploring: {category?.replace("-", " ")}
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-home gap-12 w-full">
            <div className="w-full flex flex-col gap-10">
              {filteredBlogList.map((item, index) => (
                <div key={index} className="group flex flex-col gap-5">
                  <Link
                    title={item?.title || "Article Link"}
                    href={`/${category
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}/${item?.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`}
                  >
                    <div className="overflow-hidden relative min-h-40 rounded lg:min-h-[500px] w-full bg-black flex-1">
                      <Image
                        title={
                          item.imageTitle || item.title || "Article Thumbnail"
                        }
                        alt={
                          item.altImage || item.tagline || "No Thumbnail Found"
                        }
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        fill={true}
                        loading="lazy"
                        className="w-full h-full object-cover absolute top-0 group-hover:scale-125 duration-700 transition-all"
                      />
                    </div>
                  </Link>

                  <Badge>{item.article_category}</Badge>

                  <Link
                    title={item?.title || "Article Link"}
                    href={`/${category
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}/${item?.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`}
                  >
                    <h2 className="font-bold text-3xl text-inherit leading-tight group-hover-underline-animation">
                      {item.title}
                    </h2>
                  </Link>
                  <p className="text-gray-500">{item?.articleContent}</p>

                  <div className="flex items-center gap-2 mt-1">
                    <p className="text-sm font-semibold">
                      <span className="text-gray-400 text-sm">By</span>:{" "}
                      {item.author}
                    </p>
                    <span className="text-gray-400">--</span>
                    <p className="text-sm text-gray-400 font-semibold">
                      {dayjs(item?.published_at)?.format("MMM D, YYYY")}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Rightbar
              widgets={page?.widgets}
              about_me={about_me}
              tag_list={tag_list}
              blog_list={blog_list}
              imagePath={imagePath}
              categories={categories}
              contact_details={contact_details}
            />
          </div>
        </Container>
      </FullContainer>

      <Footer
        blog_list={blog_list}
        categories={categories}
        logo={logo}
        imagePath={imagePath}
        about_me={about_me}
        contact_details={contact_details}
        copyright={copyright}
      />

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${category}`,
              url: `http://${domain}/${category}`,
              name: category,
              description: meta?.description,
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: [
                { "@type": "ListItem", position: 1, name: "Home", item: "/" },
                { "@type": "ListItem", position: 2, name: category },
              ],
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category } = query;

  const logo = await callBackendApi({ domain, query, type: "logo" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_category" });
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const copyright = await callBackendApi({
    domain,
    query,
    type: "copyright",
  });
  const nav_type = await callBackendApi({ domain, query, type: "nav_type" });
  const tag_list = await callBackendApi({ domain, query, type: "tag_list" });
  const layout = await callBackendApi({ domain, query, type: "layout" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      meta: meta?.data[0]?.value || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
