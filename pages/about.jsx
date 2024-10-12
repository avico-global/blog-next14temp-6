import React from "react";
import Head from "next/head";
import { cn } from "@/lib/utils";
import { Roboto } from "next/font/google";
import { Cormorant } from "next/font/google";

import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";
import AboutBanner from "@/components/containers/AboutBanner";
import Footer from "@/components/containers/Footer";
import Navbar from "@/components/containers/Navbar";
import Rightbar from "@/components/containers/Rightbar";
import MarkdownIt from "markdown-it";

import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";
import GoogleTagManager from "@/lib/GoogleTagManager";
import JsonLd from "@/components/json/JsonLd";


const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});
const font2 = Cormorant({ subsets: ["cyrillic"] });

export default function About({
  logo,
  meta,
  domain,
  layout,
  nav_type,
  about_me,
  copyright,
  blog_list,
  imagePath,
  categories,
  contact_details,
  favicon,

}) {
  const markdownIt = new MarkdownIt();
  const content = markdownIt?.render(about_me.value || "");
  const page = layout?.find((page) => page.page === "about");

  return (
    <div className={myFont.className}>
       <Head>
        <meta charSet="UTF-8" />
        <title>{meta?.title}</title>
        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`https://www.${domain}/about`} />
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
              case "banner":
                return (
                  <AboutBanner image={`${imagePath}/${about_me.file_name}`} />
                );
              case "text":
                return (
                  <FullContainer>
                    <Container className="py-16">
                      <div className="grid grid-cols-about gap-16 w-full">
                        <div className={font2.className}>
                          <div
                            className="prose-xl"
                            dangerouslySetInnerHTML={{ __html: content }}
                          />
                        </div>
                        <Rightbar
                          page="about"
                          contact_details={contact_details}
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
                    logo={logo}
                    imagePath={imagePath}
                    contact_details={contact_details}
                    copyright={copyright}
                    about_me={about_me}
                  />
                );
            }
          })
        : "Page Disabled,under maintenance"}

{/* <JsonLd
        data={{
          "@context": "https://schema.org",
          "@graph": [
            {
              "@type": "WebSite",
              "@id": `http://${domain}/#website`,
              url: `http://${domain}/`,
              name: domain,
              description: meta?.description,
              inLanguage: "en-US",
              publisher: {
                "@type": "Organization",
                "@id": `http://${domain}`,
              },
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
      /> */}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, type: "logo" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);
  const about_me = await callBackendApi({ domain, query, type: "about_me" });
  const layout = await callBackendApi({ domain, type: "layout" });

  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });

  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const meta = await callBackendApi({ domain, query, type: "meta_home" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
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

  return {
    props: {
      logo: logo.data[0] || null,
      about_me: about_me.data[0] || null,
      imagePath,
      layout: layout?.data[0]?.value || null,
      blog_list: blog_list.data[0].value,
      categories: categories?.data[0]?.value || null,
      domain,
      meta: meta?.data[0]?.value || null,
      contact_details: contact_details?.data[0]?.value || null,
      copyright: copyright?.data[0]?.value || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
