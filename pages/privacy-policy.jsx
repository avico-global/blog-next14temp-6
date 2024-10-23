import React, { useEffect } from "react";
import { useRouter } from "next/router";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import Breadcrumbs from "@/components/common/Breadcrumbs";

// Components
import MarkdownIt from "markdown-it";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import Head from "next/head";

// Font
import { Raleway } from "next/font/google";
const myFont = Raleway({
  subsets: ["cyrillic", "cyrillic-ext", "latin", "latin-ext"],
});

export default function PriavcyPolicy({
  domain,
  imagePath,
  logo,
  favicon,
  blog_list,
  categories,
  meta,
  contact_details,
  policy,
  layout,
  nav_type,
}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt.render(policy || "");
  const breadcrumbs = useBreadcrumbs();
  const router = useRouter();
  const currentPath = router.pathname;

  useEffect(() => {
    if (currentPath.includes("%20") || currentPath.includes(" ")) {
      router.replace("/privacy-policy");
    }
  }, [currentPath, router]);

  const page = layout?.find((page) => page.page === "privacy policy");

  return (
    <div
      className={`min-h-screen flex flex-col justify-between ${myFont.className}`}
    >
      <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/privacy-policy`} />
        {/* <meta name="robots" content="noindex" /> */}
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
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href={`${process.env.NEXT_PUBLIC_SITE_MANAGER}/images/${imagePath}/${favicon}`}
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
                    nav_type={nav_type}
                    imagePath={imagePath}
                    blog_list={blog_list}
                    categories={categories}
                  />
                );
              case "breadcrumbs":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
                    </Container>
                  </FullContainer>
                );
              case "text":
                return (
                  <FullContainer key={index}>
                    <Container>
                      <div
                        className="prose max-w-full w-full mb-5"
                        dangerouslySetInnerHTML={{ __html: content }}
                      />
                    </Container>
                  </FullContainer>
                );
              case "footer":
                return (
                  <Footer
                    key={index}
                    blog_list={blog_list}
                    categories={categories}
                    copyright=""
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
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebPage",
              "@id": `http://${domain}/`,
              url: `http://${domain}/`,
              name: meta?.title,
              isPartOf: {
                "@id": `http://${domain}`,
              },
              description: meta?.description,
              inLanguage: "en-US",
            },
            {
              "@type": "Organization",
              "@id": `http://${domain}`,
              name: domain,
              url: `http://${domain}/`,
              logo: {
                "@type": "ImageObject",
                url: `${imagePath}/${logo.file_name}`,
              },
              sameAs: [
                "http://www.facebook.com",
                "http://www.twitter.com",
                "http://instagram.com",
              ],
            },
            {
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
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
              "@type": "ItemList",
              url: `http://${domain}`,
              name: "blog",
              itemListElement: blog_list?.map((blog, index) => ({
                "@type": "ListItem",
                position: index + 1,
                item: {
                  "@type": "Article",
                  url: `http://${domain}/${
                    blog?.article_category?.name
                  }/${blog.title?.replaceAll(" ", "-")?.toLowerCase()}`,
                  name: blog.title,
                },
              })),
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
          ],
        }}
      />
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const meta = await callBackendApi({ domain, query, type: "meta_privacy" });
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const terms = await callBackendApi({ domain, query, type: "terms" });
  const policy = await callBackendApi({ domain, query, type: "policy" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      favicon: favicon?.data[0]?.file_name || null,
      logo: logo?.data[0] || null,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list?.data[0]?.value || [],
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      contact_details: contact_details?.data[0]?.value || null,
      terms: terms?.data[0]?.value || "",
      policy: policy?.data[0]?.value || "",
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
