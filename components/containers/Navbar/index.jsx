import React, { useState } from "react";
import { Menu, Search, X } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import FullContainer from "@/components/common/FullContainer";
import Container from "@/components/common/Container";
import { cn } from "@/lib/utils";

// Static data for the navbar
const logo = "/img/logo.png"; // Example static logo
const categories = [
  "Home",
  "Feauture",
  "Categories",
  "Design",
  "Post Styles",
  "Shop",
]; // Static categories
const menuList = [
  "Home",
  "Feauture",
  "Categories",
  "Design",
  "Post Styles",
  "Shop",
]; // Static menu list for the sidebar

export default function Navbar({ searchContainerRef }) {
  const [sidebar, setSidebar] = useState(false);

  return (
    <>
      <div className="bg-black text-white py-6 sticky -top-1 z-50 px-10 ">
        <div className="flex md:justify-between">
          <div className="flex items-center gap-6">
            <Menu
              onClick={() => setSidebar(true)}
              className="cursor-pointer w-8"
            />
            <Link title="Home" href="/">
              <Image
                height={70}
                width={120}
                src={logo}
                alt="logo"
                className="mt-1"
              />
            </Link>
            <div
              className="text-lg font-bold hidden lg:flex items-center gap-5"
              ref={searchContainerRef}
            >
              {categories.map((item, index) => (
                <Link
                  title={item}
                  key={index}
                  href={`/${item.toLowerCase().replaceAll(" ", "-")}`}
                  className={cn(
                    "uppercase font-extrabold",
                    false && "border-b-2 mt-[2px] border-purple-500" // Change this if dynamic category highlighting is needed
                  )}
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
          <div className=" hidden lg:flex ">
            <Search />
          </div>
        </div>
      </div>

      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-black text-white z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
      >
        <div>
          <div className="flex items-center justify-between">
            <Link href="/">
              <Image
                height={70}
                width={140}
                src={logo}
                alt="logo"
                className="mt-1"
              />
            </Link>
            <X
              className="w-8 text-white cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="   flex lg:hidden  items-center gap-3 font-normal mr-5 mt-8 w-full">
            <Search className="w-7" />
            <input
              className="bg-transparent border-b border-white/50 pb-1 outline-none flex-1"
              placeholder="Search..."
            />
          </div>

          <p className=" text-sm mt-10   border-b ">
            the Kick-ass Multipurpose WordPress Theme
          </p>
          <div className="  flex lg:hidden text-2xl  flex-col gap-6 mt-16">
            {menuList.map((item, index) => (
              <div
                className="uppercase font-bold cursor-pointer hover:opacity-70 transition-all"
                key={index}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
        <div>
          <p className="text-normal  ">© 2024 Kicker. All Rights Reserved.</p>
        </div>
      </div>

      <style jsx>{`
        .sidebar {
          width: 0;
          transition: width 0.3s ease;
        }

        .sidebar.open {
          width: 300px;
        }
        @media only screen and (max-width: 600px) {
          .sidebar.open {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}
