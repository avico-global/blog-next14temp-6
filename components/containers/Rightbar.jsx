import { Circle } from "lucide-react";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import MarkdownIt from "markdown-it";
import { cn } from "@/lib/utils";
import { useRouter } from "next/router";

const md = new MarkdownIt();

export default function Rightbar({
  category,
  imagePath,
  widgets = [],
  about_me = {},
  tag_list = [],
  blog_list = [],
  categories = [],
}) {
  const content = md.render(about_me.value || "");
  const router = useRouter();
  const currentPath = router.asPath;
  const isActive = (path) => currentPath === path;
  const lastFiveBlogs = blog_list.slice(-5);

  const renderAbout = () => (
    <Link
      title="About"
      href="/about"
      className="bg-white rounded-lg overflow-hidden shadow-lg"
    >
      <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
        About
      </div>
      <div className="p-4 flex flex-col">
        <div className="relative overflow-hidden rounded w-full h-[150px]">
          <Image
            src={`${imagePath}/${about_me.file_name}`}
            title="About Thumbnail"
            alt="Thumbnail Not Found"
            priority
            width={241}
            height={150}
            loading="eager"
            className="-z-10 object-cover min-w-full min-h-full"
          />
        </div>
        <div
          className="mt-3"
          dangerouslySetInnerHTML={{ __html: `${content.slice(0, 100)}...` }}
        />
        <p className="mt-3 underline font-bold">More about Us?</p>
      </div>
    </Link>
  );

  const renderCategories = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 mb-3 font-semibold capitalize">
        Categories
      </div>
      <div className="flex flex-col w-full text-left px-3 pb-5">
        {categories?.map((item, index) => (
          <Link
            title="Title"
            key={index}
            href={`/${item?.toLowerCase()?.replace(/ /g, "-")}`}
            className={cn(
              "text-gray-500 capitalize w-full flex items-center gap-2 hover:text-black transition-all p-2 border-b-2 border-gray-100 hover:border-purple-200",
              (category === item || isActive(`/${item}`)) &&
                "bg-purple-50 text-black"
            )}
          >
            <Circle className="w-2 h-2 text-purple-500" />
            {item}
          </Link>
        ))}
      </div>
    </div>
  );

  const renderTags = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="shadow-sm text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
        Tags
      </div>
      <div className="p-4">
        <div className="flex items-center gap-1 mb-4 flex-wrap">
          {tag_list?.slice(0, 10)?.map((item, index) => (
            <Link
              key={index}
              title={item.tag}
              href={`/tags/${item.tag?.replaceAll(" ", "-").toLowerCase()}`}
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
          className="underline font-bold"
        >
          Click To See All Tags
        </Link>
      </div>
    </div>
  );

  const renderLatestPosts = () => (
    <div className="bg-white rounded-lg overflow-hidden shadow-lg">
      <div className="text-center border-purple-100 text-lg bg-purple-100 text-purple-600 shadow-purple-300 py-2 px-4 font-semibold capitalize">
        Latest Posts
      </div>
      <div className="p-2">
        {lastFiveBlogs?.reverse().map((item, index) => (
          <Link
            title={item.article_category.name}
            href={`/${item.article_category.name
              ?.toLowerCase()
              ?.replaceAll(" ", "-")}/${item.title
              .replace(/ /g, "-")
              .toLowerCase()}`}
            className="grid grid-cols-widget gap-3 p-2 rounded-md hover:shadow-md border border-transparent hover:border-gray-200 transition-all"
            key={index}
          >
            <div className="overflow-hidden relative min-h-20 rounded-md w-full bg-black flex-1">
              <Image
                title={item?.imageTitle || "Article Thumbnail "}
                src={
                  item?.image ? `${imagePath}/${item.image}` : "/no-image.png"
                }
                fill={true}
                loading="lazy"
                alt="blog"
                className="w-full h-full object-cover absolute top-0 hover:scale-125 transition-all"
              />
            </div>
            <div>
              <p className="font-bold leading-tight">
                {item?.title.slice(0, 50)}
              </p>
              <div className="flex items-center gap-2 mt-1 justify-between text-gray-400">
                <p className="text-xs">{item?.author}</p>
                <p className="text-xs whitespace-nowrap">
                  {item?.published_at}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );

  return (
    <div className="h-fit sticky top-0 flex flex-col gap-10">
      {widgets.map((item, index) => {
        if (!item.enable) return null;

        switch (item.name?.toLowerCase()) {
          case "about":
            return renderAbout();
          case "categories":
            return categories.length > 0 && renderCategories();
          case "article tags":
            return tag_list.length > 0 && renderTags();
          case "latest posts":
            return lastFiveBlogs.length > 0 && renderLatestPosts();
          default:
            return null;
        }
      })}
    </div>
  );
}
