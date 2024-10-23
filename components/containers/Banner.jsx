import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";

export default function Banner({ image, data, blog_list, imagePath }) {
  return (
    <FullContainer>
      <Container className="py-24">
        <Image
          src={image}
          title={data.imageTitle || data.title || "Banner"}
          alt={data.altImage || data.tagline || "No Banner Found"}
          priority={true}
          fill={true}
          loading="eager"
          className="-z-10 w-full h-52  "
          style={{ objectFit: "cover" }}
          sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               (max-width: 1920px) 1920px,
               (max-width: 2560px) 2560px,
               (max-width: 3840px) 3840px,
               100vw"
        />
        <div className="w-full grid grid-cols-banner gap-16 text-white h-[50vh]">
          <div className="relative flex flex-col justify-center">
            <h1
              className={` font-bold capitalize text-6xl leading-tight text-center lg:text-left`}
            >
              {data?.title}
            </h1>
            {data?.tagline && (
              <p
                className={` leading-tight text-2xl text-center lg:text-left mt-10`}
              >
                {data?.tagline}
              </p>
            )}
          </div>
          <div className="flex flex-col justify-center gap-10">
            {blog_list
              ?.slice(-3)
              .reverse()
              .map((item, index) => (
                <BlogCard
                  key={index}
                  title={item.title}
                  href={`/${sanitizeUrl(item.article_category)}/${sanitizeUrl(
                    item?.title
                  )}`}
                  image={
                    item.image ? `${imagePath}/${item.image}` : "/no-image.png"
                  }
                  author={item.author}
                  date={item.published_at}
                  imageTitle={item.imageTitle}
                  altImage={item.altImage}
                  tagline={item.tagline}
                />
              ))}
          </div>
        </div>
      </Container>
    </FullContainer>
  );
}

function BlogCard({
  title,
  image,
  href,
  imageTitle,
  altImage,
  tagline,
  date,
  author,
}) {
  return (
    <div className="grid grid-cols-bblog gap-5 group">
      <Link
        href={href || "#"}
        title={imageTitle}
        className="relative overflow-hidden w-full h-32 rounded-sm"
      >
        <Image
          src={image}
          title={title || imageTitle}
          alt={altImage || tagline}
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
        <Link href={href || ""}>
          <p className="text-xl font-semibold group-hover:underline">{title}</p>
        </Link>
        <div className="flex items-center gap-5 mt-2">
          <p className="text-white/60">{author}</p> {" - "}
          <p className="text-white/60">{date}</p>
        </div>
      </div>
    </div>
  );
}
