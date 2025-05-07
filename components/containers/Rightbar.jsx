import { Circle, Facebook, Instagram, Twitter } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";
import { sanitizeUrl } from "@/lib/myFun";

const md = new MarkdownIt();

export default function Rightbar({
  category,
  imagePath,
  about_me = {},
  tag_list = [],
  blog_list = [],
  categories = [],
}) {
  const content = md.render(about_me?.value || "");
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;
  const lastThreeBlogs = blog_list.slice(-3);

  const getCategoryCount = (categoryTitle) => {
    return blog_list.filter((blog) => blog.article_category === categoryTitle)
      .length;
  };

  const renderAbout = () => (
    <section className="bg-white rounded-xl border border-gray-100 overflow-hidden">
      <Link
        title="About"
        href="/about-us"
        className="block overflow-hidden group"
      >
        <div className="relative w-full h-[150px]">
          <Image
            src={`${imagePath}/${about_me?.file_name}`}
            title={`${content.slice(0, 100)}...`}
            alt={`${content.slice(0, 100)}...`}
            priority
            fill
            loading="eager"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
        </div>
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-2">About Us</h2>
          <p className="text-gray-600 text-sm line-clamp-2">
            {content.replace(/<[^>]*>/g, "").slice(0, 150)}...
          </p>
        </div>
      </Link>
    </section>
  );

  const renderCategories = () => (
    <section className="bg-white rounded-xl border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
          Categories
        </h2>
        <div className="flex flex-col gap-1">
          {categories.map((item, index) => {
            const articleCount = getCategoryCount(item?.title);
            if (articleCount === 0) return null;

            return (
              <Link
                key={index}
                title={item?.title}
                href={`/${encodeURI(sanitizeUrl(item?.title))}`}
                className={cn(
                  "px-4 py-2.5 rounded-lg text-sm font-medium flex items-center justify-between group",
                  category === item?.title || isActive(`/${item?.title}`)
                    ? "bg-blue-50 text-blue-700"
                    : "text-gray-700 hover:bg-gray-50"
                )}
              >
                <span className="capitalize">{item?.title}</span>
                <span
                  className={cn(
                    "text-xs px-2 py-1 rounded-md transition-colors",
                    category === item?.title || isActive(`/${item?.title}`)
                      ? "bg-blue-100 text-blue-700"
                      : "bg-gray-100 text-gray-600 group-hover:bg-gray-200"
                  )}
                >
                  {articleCount}
                </span>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );

  const renderTags = () =>
    tag_list?.length > 0 && (
      <section className="bg-white rounded-xl border border-gray-100">
        <div className="p-6">
          <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A2 2 0 013 12V7a4 4 0 014-4z"
              />
            </svg>
            Popular Tags
          </h2>
          <div className="flex flex-wrap gap-2">
            {tag_list?.slice(0, 10)?.map((item, index) => (
              <Link
                key={index}
                title={item.tag}
                href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
                className="inline-flex items-center gap-2 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 
                          text-sm font-medium text-gray-700 rounded-lg transition-colors"
              >
                #{item.tag}
                {item.article_ids?.length > 1 && (
                  <span className="text-xs bg-gray-200 px-2 py-0.5 rounded-md">
                    {item.article_ids.length}
                  </span>
                )}
              </Link>
            ))}
          </div>
          <Link
            title="Click to see all tags"
            href="/tags"
            className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-700"
          >
            View All Tags
            <svg
              className="w-4 h-4 ml-1"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </Link>
        </div>
      </section>
    );

  const renderLatestPosts = () => (
    <section className="bg-white rounded-xl border border-gray-100">
      <div className="p-6">
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <svg
            className="w-5 h-5 text-blue-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 5a2 2 0 012-2h10a2 2 0 012 2v16l-7-3.5L5 21V5z"
            />
          </svg>
          Editor&apos;s Choice
        </h2>
        <div className="flex flex-col divide-y">
          {lastThreeBlogs.map((item, index) => (
            <article key={index} className="py-4 first:pt-0 last:pb-0">
              <Link
                href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                  item?.title
                )}`}
                className="group"
              >
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0 rounded-lg overflow-hidden">
                    <Image
                      src={`${imagePath}/${item.image}`}
                      title={item.imageTitle || item.title || "Article Thumbnail"}
                      alt={item.tagline || item.altText}
                      fill
                      loading="lazy"
                      sizes="96px"
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                  <div className="flex-1">
                    <h3
                      className="font-medium text-gray-900 group-hover:text-blue-600 
                                 transition-colors line-clamp-2 mb-2"
                    >
                      {item.title}
                    </h3>
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                        {item.author}
                      </span>
                      <span>•</span>
                      <span className="flex items-center gap-1">
                        <svg
                          className="w-4 h-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                          />
                        </svg>
                        {item.published_at}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </article>
          ))}
        </div>
      </div>
    </section>
  );

  return (
    <aside className="h-fit sticky top-36 flex flex-col gap-6">
      {renderAbout()}
      {renderCategories()}
      {renderTags()}
      {renderLatestPosts()}
    </aside>
  );
}
