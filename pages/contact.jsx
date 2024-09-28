import React from "react";
import Head from "next/head";
import Map from "@/components/containers/Map";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import Container from "@/components/common/Container";
import GoogleTagManager from "@/lib/GoogleTagManager";
import FullContainer from "@/components/common/FullContainer";

import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import { Roboto } from "next/font/google";
const myFont = Roboto({
  subsets: ["cyrillic"],
  weight: ["400", "700"],
});

export default function Contact({
  meta,
  logo,
  layout,
  domain,
  favicon,
  nav_type,
  blog_list,
  copyright,
  imagePath,
  categories,
  contact_details,
}) {
  const page = layout?.find((item) => item.page === "contact");

  return (
    <div className={myFont.className}>
      <Head>
        <meta charSet="UTF-8" />
        <title> {meta?.title}</title>

        <meta name="description" content={meta?.description} />
        <link rel="author" href={`https://www.${domain}`} />
        <link rel="publisher" href={`https://www.${domain}`} />
        <link rel="canonical" href={`http://www.${domain}/contact`} />
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
                    blog_list={blog_list}
                    logo={logo}
                    nav_type={nav_type}
                    imagePath={imagePath}
                    categories={categories}
                    contact_details={contact_details}
                  />
                );
              case "map":
                return (
                  <FullContainer>
                    <Container className=" mt-16  lg:mt-40  ">
                      <Map location="united states" />
                    </Container>
                  </FullContainer>
                );
              case "contact info":
                return (
                  <FullContainer>
                    <Container className="mt-16">
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
                );
              case "footer":
                return (
                  <Footer
                    blog_list={blog_list}
                    categories={categories}
                    copyright={copyright}
                    footer_text=""
                    logo={logo}
                    imagePath={imagePath}
                  />
                );
            }
          })
        : "Page Disabled,under maintenance"}
    </div>
  );
}

export async function getServerSideProps({ req, query }) {
  const domain = getDomain(req?.headers?.host);
  const logo = await callBackendApi({ domain, query, type: "logo" });
  const favicon = await callBackendApi({ domain, query, type: "favicon" });
  const blog_list = await callBackendApi({ domain, query, type: "blog_list" });
  const contact_details = await callBackendApi({
    domain,
    query,
    type: "contact_details",
  });
  const categories = await callBackendApi({
    domain,
    query,
    type: "categories",
  });
  const meta = await callBackendApi({ domain, query, type: "meta_contact" });
  const layout = await callBackendApi({ domain, type: "layout" });
  const nav_type = await callBackendApi({ domain, type: "nav_type" });

  let project_id = logo?.data[0]?.project_id || null;
  let imagePath = null;
  imagePath = await getImagePath(project_id, domain);

  return {
    props: {
      domain,
      imagePath,
      logo: logo?.data[0],
      blog_list: blog_list.data[0].value,
      layout: layout?.data[0]?.value || null,
      contact_details: contact_details.data[0].value,
      categories: categories?.data[0]?.value || null,
      meta: meta?.data[0]?.value || null,
      favicon: favicon?.data[0]?.file_name || null,
      nav_type: nav_type?.data[0]?.value || {},
    },
  };
}
