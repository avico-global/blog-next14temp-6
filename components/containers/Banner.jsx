import React from "react";
import Image from "next/image";
import Link from "next/link";

const staticData = {
  opacity: 50,
  textColor: "#ffffff",
  image: "/img/banner.jpg",
  imageTitle: "Welcome Banner",
  title: "This Is Actually a Modern Office Must-Have in 2021",
  altImage: "Welcome to our platform",
  titleFontSize: "text-4xl lg:text-5xl",
  taglineFontSize: "text-lg lg:text-xl",
  tagline:
    "This one is about streets and exterior design trends for those who like it unusual.",
};

export default function Banner() {
  return (
    <div className="relative h-[65vh] lg:h-[70vh] lg:flex items-center justify-center lg:justify-between p-10 bg-black text-white">
      {/* Background Image */}
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

      {/* Text and Button Section */}
      <div className="relative z-10 flex flex-col items-center lg:items-start mx-auto space-y-6 max-w-[700px] ">
        <h1 className={`${staticData.titleFontSize} font-bold capitalize`}>
          {staticData.title}
        </h1>
        {staticData.tagline && (
          <p className={`${staticData.taglineFontSize} leading-tight`}>
            {staticData.tagline}
          </p>
        )}
        <Link
          href="/blogs"
          className="mt-4 inline-block bg-white text-black py-3 px-6 rounded-full text-lg lg:text-xl hover:bg-black hover:text-white transition-colors duration-300"
        >
          View Our Blogs
        </Link>
      </div>

      {/* Logo Image Section */}
      <div className="relative w-full lg:w-1/3 h-64 lg:h-full flex justify-center items-center z-10">
        <Image
          src="/img/logo.png"
          alt="Logo"
          width={300}
          height={300}
          className="object-contain"
          priority={true}
        />
      </div>
    </div>
  );
}
