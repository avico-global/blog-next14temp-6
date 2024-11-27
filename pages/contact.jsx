import React from "react";
import Head from "next/head";
import Map from "@/components/containers/Map";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Container from "@/components/common/Container";
import GoogleTagManager from "@/lib/GoogleTagManager";
import FullContainer from "@/components/common/FullContainer";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import { Roboto } from "next/font/google";
import useBreadcrumbs from "@/lib/useBreadcrumbs";
import JsonLd from "@/components/json/JsonLd";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Contact({
  meta,
  logo,
  page,
  domain,
  favicon,
  nav_type,
  blog_list,
  copyright,
  imagePath,
  categories,
  contact_details,
}) {
  const breadcrumbs = useBreadcrumbs();

  return (
    page?.enable && (
      <div className={myFont.className}>
        <Head>
          <meta charSet="UTF-8" />
          <title> {meta?.title}</title>
          <meta name="description" content={meta?.description} />
          <link rel="author" href={`https://www.${domain}`} />
          <link rel="publisher" href={`https://www.${domain}`} />
          <link rel="canonical" href={`http://www.${domain}/contact`} />
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
          blog_list={blog_list}
          logo={logo}
          nav_type={nav_type}
          imagePath={imagePath}
          categories={categories}
          contact_details={contact_details}
        />

        <FullContainer>
          <Container>
            <Breadcrumbs breadcrumbs={breadcrumbs} className="py-7" />
            <h1 className="w-full text-3xl font-bold border-b ">Contact Us</h1>
          </Container>
        </FullContainer>

        <FullContainer>
          <Container className=" mt-16 lg:mt-40">
            <Map location="united states" />
          </Container>
        </FullContainer>

        <FullContainer>
          <Container className="my-16">
            <div className="flex flex-col items-center text-center text-gray-500 text-xs gap-3">
              <p className="text-xl mt-3 font-bold text-black">
                {contact_details?.name}
              </p>
              <h1>{contact_details?.email}</h1>
              <h2>{contact_details?.address}</h2>
              <p>{contact_details?.phone}</p>
            </div>
          </Container>
        </FullContainer>

        <Footer
          blog_list={blog_list}
          categories={categories}
          copyright={copyright}
          footer_text=""
          logo={logo}
          imagePath={imagePath}
        />

        <JsonLd
          data={{
            "@context": "https://schema.org",
            "@graph": [
              {
                "@type": "WebPage",
                "@id": `https://${domain}/contact`,
                url: `https://${domain}/contact`,
                name: meta?.title,
                description: meta?.description,
                inLanguage: "en-US",
                publisher: {
                  "@type": "Organization",
                  "@id": `https://${domain}`,
                },
              },
              {
                "@type": "BreadcrumbList",
                itemListElement: breadcrumbs.map((breadcrumb, index) => ({
                  "@type": "ListItem",
                  position: index + 1,
                  name: breadcrumb.label,
                  item: `https://${domain}${breadcrumb.url}`,
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

  const logo = await callBackendApi({ domain, type: "logo" });
  const favicon = await callBackendApi({ domain, type: "favicon" });
  const blog_list = await callBackendApi({ domain, type: "blog_list" });
  const categories = await callBackendApi({ domain, type: "categories" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });
  const meta = await callBackendApi({ domain, type: "meta_contact" });

  const contact_details = await callBackendApi({
    domain,
    type: "contact_details",
  });

  let page = null;
  if (Array.isArray(layoutPages?.data) && layoutPages.data.length > 0) {
    const valueData = layoutPages.data[0].value;
    page = valueData?.find((page) => page.page === "contact");
  }

  if (!page?.enable) {
    return {
      notFound: true,
    };
  }

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      page,
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      contact_details: contact_details.data[0]?.value || null,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
