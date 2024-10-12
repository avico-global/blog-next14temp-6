import React from "react";
import Image from "next/image";
import FullContainer from "../common/FullContainer";
import Container from "../common/Container";
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FacebookIcon, TwitterIcon } from "react-share";
import {
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  YoutubeIcon,
} from "lucide-react";

export default function Footer({
  logo,
  categories,
  category,
  searchContainerRef,
}) {
  return (
    <FullContainer className="bg-black text-white py-16">
      <Container>
        <div className=" flex justify-center items-center md:text-sm  ">
          <div>
            <div className="flex justify-center items-center space-y-10 ">
              <Image
                height={150}
                width={150}
                alt="network"
                src="/img/logo.png"
                className="mt-10 "
              />
            </div>

            <div className=" flex  justify-center items-center py-16 gap-6   ">
              <Facebook className=" border rounded-full p-1  " size={32} />
              <Twitter className=" border rounded-full p-1  " size={32} />
              <YoutubeIcon className=" border rounded-full p-1  " size={32} />
              <Instagram className=" border rounded-full p-1  " size={32} />
            </div>

            <div className="lg:flex  text-center space-y-4 lg:space-y-0 items-center flex-wrap gap-5 lg:gap-10 font-bold mt-5 border-b border-gray-500 pb-6">
              
              <p>About & Contact Details</p>
              <p>Terms & Conditions</p>
              <p>Privacy Policy</p>
              <Link href="/about" >
              
              About
              </Link>
              <p>Complaints</p>
              <p>Sitemap</p>
              <p>Advertising</p>
            </div>
          </div>
        </div>
        <div>
          <p className=" pt-8 ">
            <span className=" text-blue-500 ">SiteBuilderz</span> @2024.All
            Rights Reserved{" "}
          </p>
        </div>
      </Container>
    </FullContainer>
  );
}
