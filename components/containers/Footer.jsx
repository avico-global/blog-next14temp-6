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
import Logo from "./Navbar/Logo";

export default function Footer({
  logo,
  imagePath,
  categories,
  category,
  searchContainerRef,
}) {
  const handleClick = (e) => {
    e.preventDefault();
    window.location.href = "/sitemap.xml";
  };
  return (
    <FullContainer className="bg-primary text-white py-16">
      <Container>
        <div className=" flex justify-center items-center md:text-sm  ">
          <div>
            <div className="flex justify-center items-center space-y-10 ">
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <div className=" flex  justify-center items-center py-16 gap-6   ">
              <Facebook className=" border rounded-full p-1  " size={32} />
              <Twitter className=" border rounded-full p-1  " size={32} />
              <YoutubeIcon className=" border rounded-full p-1  " size={32} />
              <Instagram className=" border rounded-full p-1  " size={32} />
            </div>

            <div className="lg:flex  text-center space-y-4 lg:space-y-0 items-center flex-wrap gap-5 lg:gap-10 font-bold mt-5 border-b border-gray-500 pb-6">
              <Link
                title="Home"
                href="/"
                className="uppercase text-sm hover:text-button w-fit transition-all"
              >
                Home
              </Link>
              <Link
                title="About"
                href="/about"
                className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
              >
                About
              </Link>
              <Link
                title="Contact"
                href="/contact"
                className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
              >
                Contact
              </Link>
              <Link
                title="Terms & Conditions"
                href="/terms-and-conditions"
                className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
              >
                Terms & Conditions
              </Link>
              <Link
                title="Privacy Policy"
                href="/privacy-policy"
                className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
              >
                Privacy Policy
              </Link>
              <Link title="Sitemap" href="/sitemap.xml" legacyBehavior>
                <a
                  title="Sitemap"
                  onClick={handleClick}
                  className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
                >
                  Sitemap
                </a>
              </Link>
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
