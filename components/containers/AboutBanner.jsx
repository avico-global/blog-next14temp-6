import React from "react";
import FullContainer from "../common/FullContainer";
import Image from "next/image";
import Container from "../common/Container";
import { cn } from "@/lib/utils";
import { Cormorant } from "next/font/google";

const myFont = Cormorant({ subsets: ["cyrillic"] });

export default function AboutBanner({ image }) {
  return (
    <FullContainer className=" min-h-[50vh] mx-auto max-w-[1500px] overflow-hidden p-10  lg:mt-20 text-white text-center">
      <Image
      title="About"
        src={image}
        alt="Background Image"
        priority={true}
        fill={true}
        loading="eager"
        className="-z-10 w-full h-full object-cover"
      />
      <Container className="gap-6">
        <h1
          className={cn(
            "font-extrabold text-6xl capitalize max-w-screen-md",
            myFont.className
          )}
        >
          About Me
        </h1>
      </Container>
    </FullContainer>
  );
}
