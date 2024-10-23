import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "../ui/badge";

export default function MostPopular({ blog_list = [], imagePath }) {
  const popularBlogs = blog_list.filter((item) => item.isPopular);
  return (
    popularBlogs?.length > 0 && (
      <FullContainer className="  text-center">
        <div className=" border-gray-100 px-3 py-9 ">
          <div className="grid  ">
            {popularBlogs.map((item, index) => (
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
      </FullContainer>
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
    <div className="flex  text-start ">
      <Link
        href={href || ""}
        title={imageTitle}
        className="relative overflow-hidden lg:w-1/4 h-[150px]"
      >
        <Image
          src={image}
          title={imageTitle}
          alt={altImage || tagline}
          priority={false}
          width={300}
          height={195}
          layout="responsive"
          loading="lazy"
          sizes="(max-width: 768px) 100vw, (min-width: 768px) 50vw, 33vw"
          className="w-full h-full object-cover hover:scale-110 transition-all duration-1000"
        />
      </Link>

      <Link href={href || ""}>
        <p className="font-bold lg:text-2xl  hover:underline duration-500 px-5">
          {title}
        </p>

        <p className="font-semibold text-start px-5  text-lg mt-2 hover:text-green-600 duration-500">
          {date}
        </p>
      </Link>
    </div>
  );
}
