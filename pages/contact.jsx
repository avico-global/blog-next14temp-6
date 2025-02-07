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
import { MailOpen, MapIcon, Phone } from "lucide-react";
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


        <div className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b ">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              {/* Left Side - Image and Contact Info */}
              <div className="hidden lg:block">
                <div className="relative h-[600px] rounded-2xl overflow-hidden">
                  <img
                    src={   "/img/contact.jpg" ||`${imagePath}/${about_me.file_name}`} 
                    alt="Contact Us"
                    className="object-cover w-full h-full"
                  />
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-8">
                    <div className="space-y-4">
                      <div className="flex items-center text-gray-100">
                        <Phone className="w-5 h-5 mr-3" />
                        <span>{contact_details?.phone || "+1 (555) 000-0000"}</span>
                      </div>
                      <div className="flex items-center text-gray-100">
                        <MailOpen className="w-5 h-5 mr-3" />
                        <span>{contact_details?.email || "contact@example.com"}</span>
                      </div>
                      <div className="flex items-center text-gray-100">
                        <MapIcon className="w-5 h-5 mr-3" />
                        <span>{contact_details?.address || "123 Business Street, City, Country"}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Right Side - Contact Form */}
              <div>
                <div className="text-center mb-12 lg:text-left">
                  <h1 className="text-4xl font-bold text-gray-900 mb-4">Get in Touch</h1>
                  <p className="text-lg text-gray-600">We&apos;d love to hear from you. Please fill out this form.</p>
                </div>
                
                <div className="rounded-2xl  p-8 md:p-12 border bg-white/75 border-gray-200">
                  <form className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="relative">
                        <label htmlFor="name" className="block text-sm font-semibold text-gray-700 mb-2">
                          Full Name
                        </label>
                        <div className="relative">
                          <input
                            type="text"
                            id="name"
                            name="name"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            placeholder="John Doe"
                            required
                          />
                        </div>
                      </div>

                      <div className="relative">
                        <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                          Email Address
                        </label>
                        <div className="relative">
                          <input
                            type="email"
                            id="email"
                            name="email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                            placeholder="john@example.com"
                            required
                          />
                        </div>
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <div className="relative">
                        <input
                          type="tel"
                          id="phone"
                          name="phone"
                          className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500"
                          placeholder="+1 (555) 000-0000"
                          required
                        />
                      </div>
                    </div>

                    <div className="relative">
                      <label htmlFor="message" className="block text-sm font-semibold text-gray-700 mb-2">
                        Your Message
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        className="w-full px-4 py-3  rounded-lg border border-gray-300 focus:border-primary1 focus:ring-2 focus:ring-primary1/20 transition-all duration-200 bg-white text-gray-900 placeholder-gray-500 resize-none"
                        placeholder="Write your message here..."
                        required
                      />
                    </div>

                    <div className="mt-8">
                      <button
                        type="submit"
                        className="w-full bg-primary  text-white px-6 py-4 rounded-lg font-semibold text-base focus:outline-none focus:ring-4 transform transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                      >
                        Send Message
                      </button>
                    </div>
                  </form>
                </div>
              </div>
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
