import React from "react";
import Image from "next/image";
import Container from "../common/Container";
import FullContainer from "../common/FullContainer";

export default function AboutBanner({ image }) {
  return (
    <FullContainer className=" min-h-[50vh] mx-auto max-w-[1500px] overflow-hidden  text-white text-center">
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
        <h1 className="text-6xl font-bold">About Us</h1>
      </Container>
    </FullContainer>
  );
}
