import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import { sanitizeUrl } from "@/lib/myFun";
import Link from "next/link";

export default function Banner({ image, data, blog_list, imagePath }) {
  return (
    <FullContainer
      className="relative overflow-hidden"
      style={{
        backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
        color: data?.textColor || "white",
      }}
    >
      <Image
        src={image}
        title={data?.imageTitle || data?.title || "Banner"}
        alt={data?.altImage || data?.tagline || "No Banner Found"}
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
      <Container className="py-24">
        <div className="w-full grid grid-cols-1  md:grid-cols-banner gap-16 text-white lg:h-[50vh]">
          <div className="relative flex flex-col justify-center">
            <h1
              className={`font-medium capitalize text-5xl md:text-5xl lg:text-6xl leading-tight text-center lg:text-left`}
            >
              {data?.title}
            </h1>
            {data?.tagline && (
              <p
                className={`leading-tight text-white/70 text-center lg:text-left mt-10`}
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
        className="relative overflow-hidden w-full h-32
        "
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
          className="w-full h-full group-hover:scale-150 transition-all duration-700"
          style={{ objectFit: "cover" }}
        />
      </Link>

      <div className="flex flex-col justify-center">
        <div>
          <Link
            href={href || ""}
            className="text-xl font-medium underline-white"
          >
            {title}
          </Link>
        </div>
        <div className="flex items-center gap-5 mt-2">
          <p className="text-white/60">{author}</p> {" - "}
          <p className="text-white/60">{date}</p>
        </div>
      </div>
    </div>
  );
}
