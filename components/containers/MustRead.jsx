import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MustRead({ blog_list = [], imagePath }) {
  const mustReadBlogs = blog_list.filter((item) => item.isMustRead);
  return (
    mustReadBlogs?.length > 0 && (
      <div style={{ backgroundColor: "rgb(19, 20, 24)" }}>
        <div className=" text-white py-16 text-center mx-auto max-w-[1500px] ">
          <div className="border-t pt-5 px-4 text-center py-10 w-full flex flex-col items-center ">
          <h2 className="px-5 text-4xl text-center font-bold -mt-10  bg-bgg  w-fit">
             Trending News
            </h2>
            <h3 className="font-bold text-3xl mt-4  text-gray-500  px-6">
              Must Read
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8 w-full mt-11 mb-3">
              {mustReadBlogs.map((item, index) => (
                <BlogCard
                  key={item.id || index}
                  title={item.title}
                  author={item.author}
                  date={item.published_at}
                  tagline={item.tagline}
                  description={item.articleContent}
                  image={`${imagePath}/${item.image || "no-image.png"}`}
                  href={`/${item?.article_category
                    ?.toLowerCase()
                    ?.replaceAll(" ", "-")}/${item?.title
                    ?.replaceAll(" ", "-")
                    ?.toLowerCase()}`}
                  category={item.article_category}
                  imageTitle={item.imageTitle}
                  altImage={item.altImage}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    )
  );
}

function BlogCard({
  title,
  image,
  href,
  category,
  imageTitle = "Article Thumbnail", // Default value
  altImage = "No Thumbnail Found", // Default value
  tagline,
  date,
}) {
  return (
    <div className="flex flex-col ">
      <Link
        href={href || "#"}
        title={imageTitle}
        className="relative overflow-hidden w-full h-[195px]"
      >
        <Image
          src={image}
          title={imageTitle}
          alt={altImage || tagline}
          priority={false}
          width={400}
          height={400}
          layout="responsive"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
          className="w-full h-full object-cover hover:scale-110 transition-all duration-1000  "
        />
      </Link>

      <Link className="mt-8" href={href || ""}>
        <p className="font-semibold text-start text-xl text-gray-400 hover:text-green-600 duration-200">
          {category}
        </p>
      </Link>

      <Link className=" mt-4  " href={href || ""}>
        <p className="font-semibold text-start leading-2 text-2xl hover:underline">
          {title}
        </p>
      </Link>
      <p className="font-semibold text-start text-gray-400  text-lg mt-2 hover:text-green-600 duration-500">
        {date}
      </p>
    </div>
  );
}
