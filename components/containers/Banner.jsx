import React from "react";
import Image from "next/image";
import Link from "next/link";
import MostPopular from "./MostPopular";

export default function Banner({ image, data, blog_list, imagePath }) {
  return (
    <div className="relative  lg:h-[70vh] flex flex-col lg:flex-row items-center justify-center lg:justify-between p-6 md:p-10  text-white">
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
      <div className="relative z-10 flex flex-col items-center lg:items-start space-y-4 md:space-y-6 mx-auto  my-14 max-w-[1400px]">
        <h1 className={` font-bold capitalize text-5xl text-center lg:text-left`}>
          {data?.title}
        </h1>
        {data?.tagline && (
          <p className={` leading-tight text-2xl text-center lg:text-left`}>
            {data?.tagline}
          </p>
        )}
      
      </div>
      <div className="lg:w-1/3 h-64  hidden lg:flex justify-center items-center z-10 mt-6 lg:mt-0 mx-auto max-w-[1400px]">
        <MostPopular blog_list={blog_list} imagePath={imagePath} />
      </div>
    </div>
  );
}
