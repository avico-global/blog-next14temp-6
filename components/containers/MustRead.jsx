import React from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";
import { sanitizeUrl } from "@/lib/myFun";

export default function MustRead({ blog_list = [], imagePath }) {
  const mustReadBlogs = blog_list.filter((item) => item.isMustRead);
  return (
    mustReadBlogs?.length > 0 && (
      <FullContainer className="bg-primary py-24">
        <Container>
          <div className="border-t border-gray-500 pt-5 text-center w-full flex flex-col items-center text-white">
            <h2 className="px-6 text-4xl font-bold -mt-10 bg-primary w-fit">
              Trending News
            </h2>
            <p className="mt-4 text-gray-400">
              Stay updated with the most popular and timely stories.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 w-full mt-16">
              {mustReadBlogs.map((item, index) => (
                <BlogCard
                  key={item.id || index}
                  title={item.title}
                  author={item.author}
                  date={item.published_at}
                  tagline={item.tagline}
                  description={item.articleContent}
                  image={`${imagePath}/${item.image || "no-image.png"}`}
                  href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}`}
                  category={item.article_category}
                  imageTitle={item.imageTitle}
                  altImage={item.altImage}
                />
              ))}
            </div>
          </div>
        </Container>
      </FullContainer>
    )
  );
}

function BlogCard({
  title,
  image,
  href,
  category,
  imageTitle = "Article Thumbnail",
  altImage = "No Thumbnail Found",
  tagline,
  date,
}) {
  return (
    <div className="flex flex-col group">
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
          className="w-full h-full object-cover group-hover:scale-125 transition-all duration-300"
        />
      </Link>

      <p className="text-start text-lg capitalize text-gray-400 hover:text-green-600 duration-200 mt-2">
        {category}
      </p>

      <Link className="mt-2" href={href || ""}>
        <p className="font-semibold text-start leading-2 text-xl group-hover:underline">
          {title}
        </p>
      </Link>
      <p className="text-start text-gray-400 text-lg mt-3 hover:text-green-600 duration-500">
        {date}
      </p>
    </div>
  );
}
