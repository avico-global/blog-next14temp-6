import React from "react";
import FullContainer from "@/components/common/FullContainer";
import Rightbar from "@/components/containers/Rightbar";
import Container from "@/components/common/Container";
import Footer from "@/components/containers/Footer";
import { useRouter } from "next/router";
import MarkdownIt from "markdown-it";
import LatestBlogs from "@/components/containers/LatestBlogs";
import Head from "next/head";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import { Roboto } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import GoogleTagManager from "@/lib/GoogleTagManager";
import useBreadcrumbs from "@/utils/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";
import SocialShare from "@/components/containers/SocialShare";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import MostPopular from "@/components/containers/MostPopular";
import MustRead from "@/components/containers/MustRead";
import Navbar from "@/components/containers/Navbar";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Blog({
  logo,
  myblog,
  blog_list,
  imagePath,
  categories,
  domain,
  layout,
  about_me,
  contact_details,
  copyright,
  tag_list,
  nav_type,
}) {
  const router = useRouter();
  const { category, blog } = router.query;
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(myblog?.value.articleContent);
  const breadcrumbs = useBreadcrumbs();
  const lastFiveBlogs = blog_list.slice(-6);
  const page = layout?.find((page) => page.page?.toLowerCase() === "blog page");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title>{myblog?.value?.meta_title}</title>
        <meta name="description" content={myblog?.value?.meta_description} />
        <link rel="author" href={`https://${domain}`} />
        <link rel="publisher" href={`https://${domain}`} />
        <link rel="canonical" href={`https://${domain}`} />
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
          href={`${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${imagePath}/${logo.file_name}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${imagePath}/${logo.file_name}`}
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
                    blog_list={blog_list}
                    category={category}
                    categories={categories}
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    contact_details={contact_details}
                  />
                );
              case "banner":
                return (
                  <FullContainer key={index}>
                    <Container className="h-[62vh] bg-gradient-to-t from-black/50 overflow-hidden rounded-lg relative p-10 text-white md:justify-end">
                      <Image
                        title={
                          item.imageTitle || item.title || "Article Thumbnail"
                        }
                        alt={
                          item.altImage || item.tagline || "No Thumbnail Found"
                        }
                        src={`${imagePath}/${myblog?.file_name}`}
                        fill={true}
                        priority={true}
                        loading="eager"
                        className="-z-10 w-full h-full object-cover absolute top-0"
                      />
                      <div className="flex flex-col w-full gap-7">
                        <Badge className="w-fit">
                          {myblog?.value?.article_category?.name}
                        </Badge>
                        <h1 className="font-bold text-6xl capitalize max-w-screen-md">
                          {myblog?.value.title}
                        </h1>
                        <p>{myblog?.value.tagline}</p>
                        <div className="flex items-center gap-3">
                          <p>{myblog?.value.author}</p> -
                          <p>{myblog?.value.published_at}</p>
                        </div>
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs
                        breadcrumbs={breadcrumbs}
                        className="pt-7 pb-5"
                      />
                    </Container>
                  </FullContainer>
                );
              case "blog text":
                return (
                  <FullContainer>
                    <Container>
                      <div className="grid grid-cols-1 md:grid-cols-article gap-14 w-full">
                        <div>
                          <article className="prose lg:prose-xl max-w-full">
                            <div
                              dangerouslySetInnerHTML={{ __html: content }}
                            />
                          </article>
                          <div className="mt-12">
                            <h3 className="text-lg font-semibold">
                              Share this article:
                            </h3>
                            <SocialShare
                              url={`http://${domain}${myblog?.article_category?.name}/${myblog?.key}`}
                              title={myblog?.value.title}
                            />
                          </div>
                        </div>
                        <Rightbar
                          about_me={about_me}
                          imagePath={imagePath}
                          categories={categories}
                          contact_details={contact_details}
                          tag_list={tag_list}
                          widgets={page?.widgets}
                          blog_list={blog_list}
                          category={category}
                        />
                      </div>
                    </Container>
                  </FullContainer>
                );
              case "latest posts":
                return (
                  <FullContainer className="mt-14">
                    <Container>
                      <LatestBlogs articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "popular posts":
                return (
                  <FullContainer>
                    <Container>
                      <MostPopular articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "must read":
                return (
                  <FullContainer>
                    <Container>
                      <MustRead articles={blog_list} imagePath={imagePath} />
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                    blog_list={blog_list}
                    categories={categories}
                    logo={logo}
                    imagePath={imagePath}
                    about_me={about_me}
                    contact_details={contact_details}
                    copyright={copyright}
                  />
                );
              default:
                return null;
            }
          })
        : "Page Disabled, under maintenance"}

      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "BlogPosting",
              mainEntityOfPage: {
                "@type": "WebPage",
                "@id": myblog
                  ? `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`
                  : "",
              },
              headline: myblog?.value.title,
              description: myblog?.value.articleContent,
              datePublished: myblog?.value.published_at,
              author: myblog?.value.author,
              image: `${imagePath}/${myblog?.file_name}`,
              publisher: "Site Manager",
            },
            {
              "@type": "BreadcrumbList",
              itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                "@type": "ListItem",
                position: index + 1,
                name: breadcrumb.label,
                item: `http://${domain}${breadcrumb.url}`,
              })),
            },
            {
              "@type": "ItemList",
              url: `http://${domain}${myblog?.article_category?.name}/${myblog?.key}`,
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
                },
              })),
            },
            {
              "@type": "WebPage",
              "@id": `http://${domain}/${myblog?.key}`,
              url: `http://${domain}/${myblog?.article_category?.name}/${myblog?.key}`,
              name: myblog?.value?.meta_title,
              description: myblog?.value?.meta_description,
              publisher: {
                "@id": `http://${domain}`,
              },
              inLanguage: "en-US",
              isPartOf: { "@id": `http://${domain}` },
              primaryImageOfPage: {
                "@type": "ImageObject",
                url: `${imagePath}/${myblog?.file_name}`,
              },
              datePublished: myblog?.value.published_at,
              dateModified: myblog?.value.published_at,
            },
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const { category, blog } = query;

  const categories = await callBackendApi({ domain, type: "categories" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });

  const isValidBlog = blog_list?.data[0]?.value?.find(
    (item) =>
      item.title?.replaceAll(" ", "-")?.toLowerCase() ===
      blog?.replaceAll(" ", "-")
  );

  const categoryExists = categories?.data[0]?.value?.some(
    (cat) => cat?.toLowerCase() === category?.replaceAll("-", " ").toLowerCase()
  );

  if (!categoryExists || !isValidBlog) {
    return {
      notFound: true,
    };
  }

  const myblog = await callBackendApi({ domain, type: isValidBlog?.key });
  const tag_list = await callBackendApi({ domain, type: "tag_list" });
  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const about_me = await callBackendApi({ domain, type: "about_me" });
  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });
  const copyright = await callBackendApi({ domain, type: "copyright" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0] || null,
      myblog: myblog?.data[0] || {},
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list.data[0]?.value || null,
      tag_list: tag_list?.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      about_me: about_me.data[0] || null,
      contact_details: contact_details.data[0].value,
      copyright: copyright.data[0].value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
