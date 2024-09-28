import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

export default function Style3({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  imagePath,
  handleSearchChange,
  toggleSidebar,
  category,
  searchQuery,
}) {
  const navLink =
    "font-semibold capitalize border-t-2 border-transparent hover:text-black hover:border-black transition-all p-3";

  return (
    <>
      <div className="p-10 w-full border-b">
        <Logo logo={logo} imagePath={imagePath} />
      </div>
      <div className="border-b text-gray-500 sticky top-0 z-20 bg-white">
        <div className="w-10/12 max-w-screen-lg flex items-center justify-between mx-auto">
          <div className="flex items-center">
            {staticPages.map((item, index) => (
              <Link
                key={index}
                title={item.page}
                href={item.href}
                className={cn(
                  navLink,
                  isActive(item.href) && "border-black text-black"
                )}
              >
                {item.page}
              </Link>
            ))}
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item}
                href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
                className={cn(
                  navLink,
                  (category === item || isActive(`/${item}`)) &&
                    "border-black text-black"
                )}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-3 relative">
            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs?.map((item, index) => (
                  <Link
                    key={index}
                    title={item.title}
                    href={`/${item.article_category.name
                      ?.toLowerCase()
                      ?.replaceAll(" ", "-")}/${item?.title
                      ?.replaceAll(" ", "-")
                      ?.toLowerCase()}`}
                  >
                    <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                      {item.title}
                    </div>
                  </Link>
                ))}
              </div>
            )}
            <input
              type="text"
              value={searchQuery}
              onChange={handleSearchChange}
              className="border border-gray-300 rounded-md p-1 transition-opacity duration-300 ease-in-out opacity-100"
              placeholder="Search..."
            />
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
        </div>
      </div>
    </>
  );
}
