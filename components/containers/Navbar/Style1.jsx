import FullContainer from "@/components/common/FullContainer";
import { cn } from "@/lib/utils";
import { Menu, Search } from "lucide-react";
import Link from "next/link";
import React from "react";
import Logo from "./Logo";

export default function Style1({
  staticPages,
  filteredBlogs,
  logo,
  categories,
  isActive,
  searchContainerRef,
  imagePath,
  handleSearchToggle,
  handleSearchChange,
  toggleSidebar,
  openSearch,
  category,
  searchQuery,
}) {
  return (
    <FullContainer className="sticky top-0 z-20 bg-white py-2 lg:py-1">
      <div className="flex justify-between lg:grid grid-cols-nav w-11/12 md:w-10/12 mx-auto items-center">
        <div className="hidden lg:flex items-center">
          {staticPages.map((item, index) => (
            <Link
              key={index}
              title={item.page}
              href={item.href}
              className={cn(
                "font-semibold text-gray-500 capitalize border-b-2 border-transparent hover:text-black hover:border-black transition-all px-2 py-4",
                isActive(item.href) && "border-black text-black"
              )}
            >
              {item.page}
            </Link>
          ))}
        </div>
        <Logo logo={logo} imagePath={imagePath} />
        <div
          className="flex items-center justify-end gap-3 text-gray-500 relative "
          ref={searchContainerRef}
        >
          <div className="hidden lg:flex items-center justify-end">
            {categories?.map((item, index) => (
              <Link
                key={index}
                title={item}
                href={`/${item?.toLowerCase()?.replaceAll(" ", "-")}`}
                className={cn(
                  "font-semibold text-gray-500 capitalize hover:text-black border-transparent transition-all py-4 px-2 border-b-2 hover:border-black w-fit",
                  (category === item || isActive(`/${item}`)) &&
                    "border-black text-black"
                )}
              >
                {item}
              </Link>
            ))}
          </div>
          <div className="flex items-center justify-end gap-2">
            <Search
              className="w-5 md:w-4 text-black cursor-pointer"
              onClick={handleSearchToggle}
            />
            <Menu
              onClick={toggleSidebar}
              className="w-6 h-6 ml-1 text-black lg:hidden"
            />
          </div>
          {openSearch && (
            <>
              <div className="fixed lg:absolute top-16 lg:right-0 lg:ml-auto w-full lg:w-fit flex flex-col items-start justify-center lg:justify-end left-0">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="lg:text-xl border border-gray-300 inputField rounded-md outline-none bg-white shadow-xl p-2 px-3 mx-auto transition-opacity duration-300 ease-in-out opacity-100 w-5/6 lg:w-[650px] focus:ring-2 focus:ring-yellow-500"
                  placeholder="Search..."
                  autoFocus
                />
                {searchQuery && (
                  <div className="lg:absolute top-full p-1 lg:p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 mx-auto w-5/6 lg:w-[650px]">
                    {filteredBlogs?.length > 0 ? (
                      filteredBlogs.map((item, index) => (
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
                      ))
                    ) : (
                      <div className="p-2 text-gray-600">
                        No articles found.
                      </div>
                    )}
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </div>
    </FullContainer>
  );
}
