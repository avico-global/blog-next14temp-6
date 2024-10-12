import React from "react";
import Image from "next/image";
import Link from "next/link";
import MostPopular from "./MostPopular";

const staticData = {
  opacity: 50,
  textColor: "#ffffff",
  image: "/img/banner.jpg",
  imageTitle: "Welcome Banner",
  title: "This Is Actually a Modern Office Must-Have in 2021",
  altImage: "Welcome to our platform",
  titleFontSize: "text-3xl md:text-4xl lg:text-5xl", // Updated for smaller screens
  taglineFontSize: "text-base md:text-lg lg:text-xl", // Updated for smaller screens
  tagline:
    "This one is about streets and exterior design trends for those who like it unusual.",
};

export default function Banner({ blog_list, imagePath }) {
  return (
    <div className="relative  lg:h-[70vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between p-6 md:p-10 bg-black text-white">
      <Image
        src={staticData.image}
        alt={staticData.altImage}
        fill={true}
        className="absolute inset-0 object-cover z-0"
        style={{ opacity: 0.5 }}
        priority={true}
        sizes="(max-width: 320px) 320px,
               (max-width: 480px) 480px,
               (max-width: 768px) 768px,
               (max-width: 1024px) 1024px,
               (max-width: 1280px) 1280px,
               (max-width: 1600px) 1600px,
               100vw"
      />
      <div className="relative z-10 flex flex-col items-center lg:items-start space-y-4 md:space-y-6 mx-auto  my-14 max-w-[1400px]">
        <h1
          className={`${staticData.titleFontSize} font-bold capitalize text-center lg:text-left`}
        >
          {staticData.title}
        </h1>
        {staticData.tagline && (
          <p
            className={`${staticData.taglineFontSize} leading-tight text-center lg:text-left`}
          >
            {staticData.tagline}
          </p>
        )}
        <Link
          href="/blogs"
          className="mt-4 mb-3 inline-block bg-white text-black py-2 px-4 md:py-3 md:px-6 rounded-full text-sm md:text-lg lg:text-xl hover:bg-black hover:text-white transition-colors duration-300"
        >
          View Our Blogs
        </Link>
      </div>
      <div className="lg:w-1/3 h-64  hidden lg:flex justify-center items-center z-10 mt-6 lg:mt-0 mx-auto max-w-[1400px]">
        <MostPopular blog_list={blog_list} imagePath={imagePath} />
      </div>
    </div>
  );
}
