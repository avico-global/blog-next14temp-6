import React from "react";
import Head from "next/head";
import Navbar from "@/components/containers/Navbar";
import Footer from "@/components/containers/Footer";
import GoogleTagManager from "@/lib/GoogleTagManager";
import Breadcrumbs from "@/components/common/Breadcrumbs";

import { callBackendApi, getDomain, getImagePath } from "@/lib/myFun";

import { Roboto } from "next/font/google";
import JsonLd from "@/components/json/JsonLd";
import useBreadcrumbs from "@/lib/useBreadcrumbs";

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
          <link rel="author" href={`https://${domain}`} />
          <link rel="publisher" href={`https://${domain}`} />
          <link rel="canonical" href={`https://${domain}/contact-us`} />
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
            title="Favicon"
            rel="apple-touch-icon"
            sizes="180x180"
            href={`${imagePath}/${favicon}`}
          />
          <link
            title="Favicon"
            rel="icon"
            type="image/png"
            sizes="32x32"
            href={`${imagePath}/${favicon}`}
          />
          <link
            title="Favicon"
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

        <div className=" pt-6 pb-10 px-4 sm:px-6 lg:px-8 bg-gray-50">
          <div className="max-w-5xl mx-auto">
            {/* Form Section */}
            <div className="text-center mb-12">
              <h1 className="w-full text-3xl font-bold  mb-4">Contact Us</h1>
              <div>
                <Breadcrumbs
                  breadcrumbs={breadcrumbs}
                  className="py-2 justify-center"
                />
              </div>
            </div>

            <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12">
              <form className="space-y-8 max-w-5xl mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="firstName"
                      className="text-sm font-medium text-gray-700"
                    >
                      First Name
                    </label>
                    <input
                      type="text"
                      id="firstName"
                      name="firstName"
                      className="w-full px-4 py-3.5 rounded-xl text-gray-900 border border-gray-200 hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-gray-50/50"
                      placeholder="John"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="lastName"
                      className="text-sm font-medium text-gray-700"
                    >
                      Last Name
                    </label>
                    <input
                      type="text"
                      id="lastName"
                      name="lastName"
                      className="w-full px-4 py-3.5 rounded-xl text-gray-900 border border-gray-200 hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-gray-50/50"
                      placeholder="Doe"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label
                      htmlFor="email"
                      className="text-sm font-medium text-gray-700"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      className="w-full px-4 py-3.5 rounded-xl text-gray-900 border border-gray-200 hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-gray-50/50"
                      placeholder="john@example.com"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label
                      htmlFor="phone"
                      className="text-sm font-medium text-gray-700"
                    >
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      className="w-full px-4 py-3.5 rounded-xl text-gray-900 border border-gray-200 hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-gray-50/50"
                      placeholder="+1 (555) 000-0000"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="message"
                    className="text-sm font-medium text-gray-700"
                  >
                    Your Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    className="w-full px-4 py-3.5 rounded-xl text-gray-900 border border-gray-200 hover:border-primary focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all duration-200 bg-gray-50/50 resize-none"
                    placeholder="How can we help you?"
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="w-full bg-primary hover:bg-primary/90 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:-translate-y-1 focus:outline-none focus:ring-4 focus:ring-primary/20 active:translate-y-0"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>

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
