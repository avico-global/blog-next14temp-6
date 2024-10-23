import React, { useState, useEffect, useRef } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";

export default function Navbar({
  logo,
  categories,
  imagePath,
  blog_list,
  toggleSidebar,
}) {
  const [sidebar, setSidebar] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);

  const lastThreeBlogs = blog_list.slice(-3);

  // Handle click outside to close sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false); // Close sidebar if clicked outside
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    // Cleanup the event listener
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  // Handle search input change with debounce
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        const filtered = blog_list.filter((blog) =>
          blog.title.toLowerCase().includes(searchQuery.toLowerCase())
        );
        setFilteredBlogs(filtered);
      } else {
        setFilteredBlogs([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery, blog_list]);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  return (
    <>
      <div className="bg-bgg text-white">
        <div className="flex items-center justify-between gap-3 mx-auto p-6">
          <div className="flex items-center gap-2">
            <Menu
              onClick={() => setSidebar(true)}
              className="cursor-pointer w-8"
            />
            <div>
              <Logo logo={logo} imagePath={imagePath} />
            </div>
            {/* Main Nav Links */}
            <div className="hidden lg:flex space-x-4 lg:space-x-9">
              <Link className="hover:text-gray-300" title="Home" href="/">
                Home
              </Link>

              {/* Categories Link */}
              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <Link
                  title="Categories"
                  href=""
                  className="hover:text-gray-300"
                >
                  Categories
                </Link>

                {/* Categories Dropdown */}
                {isDropdownOpen && (
                  <div className="absolute left-0 top-full bg-bgg text-white shadow-xl rounded-md z-50 p-2 w-[300px] grid grid-cols-1">
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/${encodeURI(sanitizeUrl(category.title))}`}
                        className="border-b last:border-none"
                        title={category.title || "Category"}
                      >
                        <div className="flex items-center gap-4 hover:bg-gray-900 p-2 transition">
                          <Image
                            src={`${imagePath}/${category.image}`}
                            alt={category.title}
                            width={60}
                            height={100}
                            className="rounded-md h-14"
                          />
                          <span className="font-medium capitalize">
                            {category.title}
                          </span>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>

              <Link
                className="hover:text-gray-300"
                title="Contact"
                href="/contact"
              >
                Contacts
              </Link>
              <Link
                title="About"
                href="/about"
                className="hover:text-gray-300 mb-2 w-fit transition-all"
              >
                About
              </Link>
            </div>
          </div>

          {/* Search Section */}
          <div className="flex items-center justify-end gap-3 relative">
            <div className="hidden lg:flex items-center border border-gray-300 rounded-md px-2 gap-1">
              <Search className="w-4 h-4" />
              <input
                type="text"
                value={searchQuery}
                onChange={handleSearchChange}
                className="p-1 transition-opacity duration-300 ease-in-out opacity-100 flex-1 outline-none bg-bgg"
                placeholder="Search..."
                ref={searchInputRef}
              />
            </div>

            {searchQuery && (
              <div className="absolute top-full p-3 right-0 bg-white shadow-2xl rounded-md mt-1 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                {filteredBlogs.length > 0 ? (
                  filteredBlogs.map((item, index) => (
                    <Link
                      key={index}
                      title={item.title}
                      href={`/${sanitizeUrl(
                        item.article_category
                      )}/${sanitizeUrl(item?.title)}`}
                    >
                      <div className="p-2 hover:bg-gray-200 border-b text-gray-600">
                        {item.title}
                      </div>
                    </Link>
                  ))
                ) : (
                  <div className="p-2 text-gray-500">No results found</div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Sidebar for Mobile */}

      <div
        className={`sidebar fixed top-0 left-0 h-screen flex flex-col justify-between bg-bgg text-white shadow-xl z-50 overflow-x-hidden p-10 lg:p-6 ${
          sidebar ? "open" : "-ml-96"
        }`}
        ref={sidebarRef}
      >
        <div>
          <div className="flex items-center justify-between">
            <Logo logo={logo} imagePath={imagePath} />
            <X
              className="w-8 text-white cursor-pointer"
              onClick={() => setSidebar(false)}
            />
          </div>

          <div className="pt-32 hidden lg:flex flex-col items-center p-2">
            <div className="lg:flex lg:flex-col">
              {lastThreeBlogs.map((item, index) => (
                <div
                  key={index}
                  className="grid grid-cols-widget1 gap-4 py-3 border-b last:border-none"
                >
                  <Link
                    title={item.title || "Article"}
                    href={`/${encodeURI(
                      sanitizeUrl(item.article_category)
                    )}/${encodeURI(sanitizeUrl(item.title))}`}
                  >
                    <div className="overflow-hidden relative min-h-20 w-full bg-black flex-1 rounded-full ">
                      <Image
                        title={
                          item?.imageTitle || item?.title || "Article Thumbnail"
                        }
                        alt={
                          item?.tagline || item?.altText || "Article Thumbnail"
                        }
                        src={
                          item.image
                            ? `${imagePath}/${item.image}`
                            : "/no-image.png"
                        }
                        fill
                        loading="lazy"
                        className="object-cover hover:scale-125 transition-all"
                        style={{ objectFit: "cover" }}
                      />
                    </div>
                  </Link>
                  <div>
                    <Link
                      title={item.title || "Article Link"}
                      href={`/${encodeURI(
                        sanitizeUrl(item.article_category)
                      )}/${encodeURI(sanitizeUrl(item.title))}`}
                    >
                      <p className="font-semibold leading-tight ">
                        {item.title}
                      </p>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar Menu Links */}
          <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
            <Link title="Home" href="/">
              Home
            </Link>
            <div className="relative">
              <button
                title="Categories"
                className="cursor-pointer"
                onClick={toggleDropdown}
              >
                Categories
              </button>

              {/* Categories Dropdown */}
              {isDropdownOpen && (
                <div className="absolute left-0 top-full bg-black text-white shadow-lg rounded-md z-50 p-4 w-[300px]  grid grid-cols-1 gap-4">
                  {categories.map((category, index) => (
                    <Link
                      key={index}
                      href={`/${encodeURI(sanitizeUrl(category.title))}`}
                      title={category.title || "Category"}
                    >
                      <div className="flex items-center  gap-4 hover:bg-gray-900 p-2 transition">
                        <Image
                          src={`${imagePath}/${category.image}`}
                          alt={category.title}
                          width={60}
                          height={100}
                          className="rounded-md"
                        />
                        <span className="font-semibold">{category.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            <Link title="Contact" href="/contact">
              Contacts
            </Link>

            <Link
              title="About"
              href="/about"
              className="uppercase text-sm mb-2 hover:text-button w-fit transition-all"
            >
              About
            </Link>
          </div>
        </div>
      </div>

      {/* Sidebar Styles */}
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
