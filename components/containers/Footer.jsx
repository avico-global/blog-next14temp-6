import React, { useMemo } from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Link from "next/link";
import Logo from "./Navbar/Logo";

// Popular Articles Component
const PopularArticles = ({ popularArticles }) => {
  if (!popularArticles || popularArticles.length === 0) return null;
  return (
    <div>
      <p className="text-lg font-semibold mb-1">Most Popular</p>
      {popularArticles.map((item, index) => (
        <Link
          href={`/${item?.article_category?.name
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}/${item.title
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
          title={item.imageTitle || "Title"}
          key={index}
        >
          <p className="text-sm py-3 hover:text-purple-600 hover:border-purple-500 transition-all cursor-pointer border-b border-purple-200">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

// Latest Posts Component
const LatestPosts = ({ latestPosts }) => {
  if (!latestPosts || latestPosts.length === 0) return null;

  return (
    <div>
      <p className="text-lg font-semibold mb-1">Latest Posts</p>
      {latestPosts.map((item, index) => (
        <Link
          href={`/${item?.article_category?.name
            ?.toLowerCase()
            ?.replaceAll(" ", "-")}/${item.title
            ?.replaceAll(" ", "-")
            ?.toLowerCase()}`}
          title={item.imageTitle || "Title"}
          key={index}
        >
          <p className="text-sm py-3 hover:text-purple-600 hover:border-purple-500 transition-all cursor-pointer border-b border-purple-200">
            {item.title}
          </p>
        </Link>
      ))}
    </div>
  );
};

// Footer Links Component
const FooterLinks = ({ categories }) => {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };
  return (
    <div className="flex items-center flex-col md:flex-row justify-between gap-2 md:gap-5 uppercase font-semibold">
      {categories?.slice(0, 3).map((item, index) => (
        <Link
          title={item}
          key={index}
          href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
          className="text-sm"
        >
          {item}
        </Link>
      ))}
      <Link title="About" href="/about" className="text-sm">
        About Us
      </Link>
      <Link title="Contact Us" href="/contact" className="text-sm">
        Contact Us
      </Link>
      <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
        <a title="Sitemap" onClick={handleClick} className="text-sm">
          Sitemap
        </a>
      </Link>
    </div>
  );
};

export default function Footer({
  blog_list = [],
  categories = [],
  copyright,
  footer_text,
  logo,
  imagePath,
}) {
  // UseMemo to prevent unnecessary recalculations
  const popularArticles = useMemo(
    () => blog_list?.filter((item) => item.isPopular),
    [blog_list]
  );
  const latestPosts = useMemo(
    () => blog_list?.slice(-4).reverse(),
    [blog_list]
  );

  return (
    <footer className="flex items-center flex-col mt-16">
      <FullContainer className="bg-purple-50 py-16">
        <Container>
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
            <div>
              <Logo logo={logo} imagePath={imagePath} />
              <p className="mt-6 text-sm">{footer_text}</p>
            </div>
            <PopularArticles popularArticles={popularArticles} />
            <LatestPosts latestPosts={latestPosts} />
          </div>
        </Container>
      </FullContainer>

      <FullContainer className="py-10 bg-purple-200">
        <Container>
          <FooterLinks categories={categories} />
          <p className="text-sm mt-5 text-center">{copyright}</p>
        </Container>
      </FullContainer>
    </footer>
  );
}
