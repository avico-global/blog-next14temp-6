import React from "react";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Image from "next/image";

export default function Banner({ image, data }) {
  return (
    <FullContainer>
      <Container
        className="h-[63vh] max-h-[800px] overflow-hidden p-10 text-center relative rounded-lg"
        style={{
          backgroundColor: `rgba(0, 0, 0, ${data?.opacity / 100})`,
          color: data.textColor || "white",
        }}
      >
        <Image
          src={image}
          title={
            data.imageTitle ||
            data.title ||
            "Article Thumbnail"
          }
          alt={
            data.altImage ||
            data.tagline ||
            "No Thumbnail Found"
          }
          priority={true}
          layout="fill"
          objectFit="cover"
          className="w-full h-full -z-10"
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
        <FullContainer className="gap-8">
          <h1
            style={{ fontSize: data.titleFontSize || 48 }}
            className="font-bold capitalize max-w-screen-md"
          >
            {data.title}
          </h1>
          {data.tagline && (
            <p
              style={{ fontSize: data.taglineFontSize || 18 }}
              className="leading-tight md:leading-none"
            >
              {data.tagline}
            </p>
          )}
        </FullContainer>
      </Container>
    </FullContainer>
  );
}
