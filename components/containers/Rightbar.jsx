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
  widgets = [],
  about_me = {},
  category,
  tag_list = [],
  blog_list = [],
  imagePath,
  categories = [],
}) {
  const content = md.render(about_me?.value || "");
  const router = useRouter();
  const currentPath = router.asPath;

  const isActive = (path) => currentPath === path;
  const lastThreeBlogs = blog_list.slice(-3);

  const renderAbout = () => (
    <Link
      title="About"
      href="/about"
      className="  flex flex-col items-center text-center border-b pb-20 "
    >
      <div className="relative overflow-hidden ">
        <Image
          src={`${imagePath}/${about_me.file_name}`}
          title={`${content.slice(0, 100)}...`}
          alt={`${content.slice(0, 100)}...`}
          priority
          width={500}
          height={500}
          loading="eager"
          className="-z-10 object-cover"
        />
      </div>
    </Link>
  );

  const renderCategories = () => (
    <div className="border p-5 flex flex-col items-center text-center">
      <h2 className="bg-white px-5 font-bold text-lg -mt-9">Categories</h2>
      <div className="flex flex-col w-full text-left px-2 py-4">
        {categories.map((item, index) => (
          <Link
            key={index}
            title={item?.title}
            href={`/${encodeURI(sanitizeUrl(item.title))}`}
            className={cn(
              "text-gray-500 capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-black",
              (category === item.title || isActive(`/${item.title}`)) &&
                "border-black text-black"
            )}
          >
            <Circle className="w-2 h-2 text-blue-800" />
            {item.title}
          </Link>
        ))}
      </div>
    </div>
  );

  const renderTags = () => (
    <div className="border pt-5 px-4 flex flex-col items-center text-center">
      <h2 className="bg-gray-50 px-5 font-bold text-lg -mt-9">Article Tags</h2>
      <div className="flex items-center flex-wrap w-full text-left px-2 py-4 gap-2">
        {tag_list?.slice(0, 10)?.map((item, index) => (
          <Link
            key={index}
            title={item.tag}
            href={`/tags/${encodeURI(sanitizeUrl(item.tag))}`}
            className="bg-gray-100 hover:bg-gray-200 transition-all cursor-pointer rounded py-1 text-sm px-2"
          >
            {item.tag}
            {item.article_ids?.length > 1 && (
              <span className="bg-black text-white px-1 ml-1 text-sm rounded-full">
                {item.article_ids.length}
              </span>
            )}
          </Link>
        ))}
      </div>
      <Link
        title="Click to see all tags"
        href="/tags"
        className="my-3 underline font-bold"
      >
        Click To See All Tags
      </Link>
    </div>
  );

  const renderLatestPosts = () => (
    <div className="pt-5 flex flex-col items-center">
      <h2 className="bg-white px-5 font-bold text-lg -mt-9 text-center">
        EDITOR&apos;S CHOICE
      </h2>
      <div className="flex flex-col mt-6 gap-6">
        {lastThreeBlogs.map((item, index) => (
          <div key={index} className="grid grid-cols-bblog gap-5 group">
            <Link
              href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                item?.title
              )}`}
              title={item.title}
              className="relative overflow-hidden w-full h-32"
            >
              <Image
                src={`${imagePath}/${item.image}`}
                title={item.title}
                alt={item.tagline || item.altText}
                priority={false}
                width={298}
                height={195}
                loading="lazy"
                sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
                className="w-full h-full group-hover:scale-125 transition-all duration-300"
                style={{ objectFit: "cover" }}
              />
            </Link>

            <div className="flex flex-col justify-center">
              <Link
                href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                  item?.title
                )}`}
              >
                <p className="text-xl font-semibold group-hover:underline">
                  {item.title}
                </p>
              </Link>
              <div className="flex items-center gap-5 mt-2">
                <p className="text-gray-500">{item.author}</p> {" - "}
                <p className="text-gray-500">{item.date}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-0 flex flex-col gap-14">
      {widgets.map((item, index) => {
        if (!item.enable) return null;

        switch (item.name?.toLowerCase()) {
          case "about":
            return (
              <React.Fragment key={item.name}>{renderAbout()}</React.Fragment>
            );
          case "categories":
            return (
              categories.length > 0 && (
                <React.Fragment key={item.name}>
                  {renderCategories()}
                </React.Fragment>
              )
            );
          case "article tags":
            return (
              tag_list?.length > 0 && (
                <React.Fragment key={item.name}>{renderTags()}</React.Fragment>
              )
            );
          case "latest posts":
            return (
              lastThreeBlogs.length > 0 && (
                <React.Fragment key={item.name}>
                  {renderLatestPosts()}
                </React.Fragment>
              )
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
