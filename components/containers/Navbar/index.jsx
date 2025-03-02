import React, { useState, useEffect, useRef, useCallback } from "react";
import Logo from "./Logo";
import Link from "next/link";
import Image from "next/image";
import { sanitizeUrl } from "@/lib/myFun";
import { Menu, Search, X } from "lucide-react";
import Container from "@/components/common/Container";
import FullContainer from "@/components/common/FullContainer";

export default function Navbar({ logo, categories, imagePath, blog_list }) {
  const sidebarRef = useRef(null);
  const searchInputRef = useRef(null);
  const [sidebar, setSidebar] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const lastThreeBlogs = blog_list.slice(-3);

  // Close sidebar if clicked outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setSidebar(false);
      }
    };

    if (sidebar) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [sidebar]);

  // Debounce search query
  const debounceSearch = useCallback(() => {
    if (searchQuery) {
      const filtered = blog_list.filter((blog) =>
        blog.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredBlogs(filtered);
    } else {
      setFilteredBlogs([]);
    }
  }, [searchQuery, blog_list]);

  useEffect(() => {
    const timeoutId = setTimeout(debounceSearch, 300);
    return () => clearTimeout(timeoutId);
  }, [searchQuery, debounceSearch]);

  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState);
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  return (
    <>
      <FullContainer className="bg-primary text-white sticky top-0 z-20 shadow-md">
        <Container>
          <div className="flex items-center justify-between gap-3 mx-auto w-full">
            <div className="flex items-center gap-6">
              <Menu
                onClick={() => setSidebar(true)}
                className="cursor-pointer w-8 hover:scale-110 transition-transform"
                aria-label="Open Sidebar"
              />
              <Logo logo={logo} imagePath={imagePath} />
            </div>

            <nav className="hidden lg:flex items-center gap-8 uppercase text-sm tracking-wider">
              <Link
                href="/"
                title="Home"
                className="hover:text-gray-200 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all text-sm"
              >
                Home
              </Link>
              <div
                className="relative group"
                onMouseEnter={() => setIsDropdownOpen(true)}
                onMouseLeave={() => setIsDropdownOpen(false)}
              >
                <button
                  className="hover:text-gray-200 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white group-hover:after:w-full after:transition-all uppercase text-sm"
                  aria-expanded={isDropdownOpen}
                  aria-controls="categoriesDropdown"
                >
                  Categories
                </button>

                {/* Add invisible bridge to prevent dropdown from closing */}
                <div className="absolute h-3 w-full -bottom-3"></div>

                {isDropdownOpen && (
                  <div
                    id="categoriesDropdown"
                    className="absolute left-0 top-[calc(100%+0.75rem)] bg-gradient-to-b from-black/30 to-black/50 backdrop-blur-xl text-white shadow-2xl rounded-xl z-50 w-[400px] grid grid-cols-1 border border-white/20 transform transition-all duration-200 ease-out"
                  >
                    {categories.map((category, index) => (
                      <Link
                        key={index}
                        href={`/${sanitizeUrl(category.title)}`}
                        className="group"
                        title={category.title}
                      >
                        <div className="flex items-center gap-4 hover:bg-white/15 rounded-lg p-3 transition-all duration-200 ease-out">
                          <div className="relative w-16 h-16 overflow-hidden rounded-lg">
                            <Image
                              src={`${imagePath}/${category.image}`}
                              alt={category.title}
                              title={category.title}
                              fill
                              className="object-cover group-hover:scale-110 transition-transform duration-200"
                            />
                          </div>
                          <div className="flex flex-col">
                            <span className="font-medium text-base capitalize group-hover:text-white transition-colors">
                              {category.title}
                            </span>
                            {category.description && (
                              <span className="text-sm text-white/70 group-hover:text-white/90 transition-colors">
                                {category.description}
                              </span>
                            )}
                          </div>
                        </div>
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <Link
                title="Contact"
                href="/contact-us"
                className="hover:text-gray-200 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all text-sm"
              >
                Contact Us
              </Link>
              <Link
                title="About"
                href="/about-us"
                className="hover:text-gray-200 transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-white hover:after:w-full after:transition-all text-sm"
              >
                About Us
              </Link>
            </nav>

            {/* Search Section */}
            <div className="flex items-center justify-end gap-3 relative">
              <div className="hidden lg:flex items-center border border-white/20 rounded-full px-4 gap-2 hover:border-white/40 transition-colors bg-white/5">
                <Search className="w-4 h-4" aria-hidden="true" />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={handleSearchChange}
                  className="p-2.5 transition-all duration-300 flex-1 outline-none bg-transparent placeholder:text-white/50"
                  placeholder="Search..."
                  ref={searchInputRef}
                />
              </div>

              {searchQuery && (
                <div className="absolute top-full p-3 right-0 bg-black/70 backdrop-blur-lg max-h-[50vh] overflow-y-auto border border-white/10 shadow-2xl rounded-lg mt-2 z-10 w-[calc(100vw-40px)] lg:w-[650px]">
                  {filteredBlogs.length > 0 ? (
                    filteredBlogs.map((item, index) => (
                      <Link
                        key={index}
                        href={`/${sanitizeUrl(
                          item.article_category
                        )}/${sanitizeUrl(item?.title)}`}
                        title={item.title}
                      >
                        <div className="p-2.5 hover:bg-white/10 rounded-md transition-all border-b border-white/10 last:border-none">
                          {item.title}
                        </div>
                      </Link>
                    ))
                  ) : (
                    <div className="p-2.5 text-white/70">No results found</div>
                  )}
                </div>
              )}
            </div>
          </div>
        </Container>
      </FullContainer>

      {/* Sidebar for Mobile */}
      <div
        className={`sidebar fixed top-0 left-0 h-screen bg-primary text-white shadow-xl z-50 overflow-x-hidden p-10 lg:p-6 transition-transform transform ${
          sidebar ? "translate-x-0" : "-translate-x-full"
        }`}
        ref={sidebarRef}
      >
        <div className="flex items-center justify-between">
          <Logo logo={logo} imagePath={imagePath} />
          <X
            className="w-8 text-white cursor-pointer"
            onClick={() => setSidebar(false)}
            aria-label="Close Sidebar"
          />
        </div>

        <div className="pt-32 hidden lg:flex flex-col items-center p-2">
          {lastThreeBlogs.map((item, index) => (
            <SidebarBlogItem
              key={index}
              blog={item}
              imagePath={imagePath}
              sanitizeUrl={sanitizeUrl}
            />
          ))}
        </div>

        <SidebarLinks
          categories={categories}
          isDropdownOpen={isDropdownOpen}
          toggleDropdown={toggleDropdown}
          sanitizeUrl={sanitizeUrl}
        />
      </div>

      {/* Sidebar Styles */}
      <style jsx>{`
        .sidebar {
          width: 300px;
          transition: transform 0.3s ease;
        }
        @media only screen and (max-width: 600px) {
          .sidebar {
            width: 100%;
          }
        }
      `}</style>
    </>
  );
}

const SidebarBlogItem = ({ blog, imagePath, sanitizeUrl }) => (
  <div className="grid grid-cols-widget1 gap-4 py-3 border-b last:border-none">
    <Link
      href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(blog.title)}`}
      title={blog.title}
      className="relative overflow-hidden"
    >
      <Image
        src={blog.image ? `${imagePath}/${blog.image}` : "/no-image.png"}
        alt={blog.altText || "Article Thumbnail"}
        title={blog.imageTitle || blog.title || "Article Thumbnail"}
        fill
        className="object-cover hover:scale-125 transition-all"
        style={{ objectFit: "cover" }}
      />
    </Link>
    <Link
      href={`/${sanitizeUrl(blog.article_category)}/${sanitizeUrl(blog.title)}`}
      title={blog.title}
    >
      <p className="font-semibold leading-tight">{blog.title}</p>
    </Link>
  </div>
);

const SidebarLinks = ({
  categories,
  isDropdownOpen,
  toggleDropdown,
  sanitizeUrl,
}) => (
  <div className="flex lg:hidden text-2xl flex-col gap-6 mt-16">
    <Link href="/" title="Home">
      Home
    </Link>
    <div className="relative">
      <button
        className="cursor-pointer"
        onClick={toggleDropdown}
        aria-expanded={isDropdownOpen}
      >
        Categories
      </button>

      {isDropdownOpen && (
        <div className="absolute left-0 top-full bg-black text-white shadow-lg rounded-md z-50 p-4 w-[300px] grid grid-cols-1 gap-4">
          {categories.map((category, index) => (
            <Link
              key={index}
              href={`/${sanitizeUrl(category.title)}`}
              title={category.title}
            >
              <div className="flex items-center gap-4 hover:bg-gray-900 p-2 transition">
                {/* <Image
                  src={`${category.image}`}
                  alt={category.title}
                  width={60}
                  height={100}
                  className="rounded-md"
                /> */}
                <span className="font-semibold">{category.title}</span>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>

    <Link href="/contact-us" title="Contact">
      Contact Us
    </Link>
    <Link href="/about-us" title="About" className="uppercase text-sm mb-2">
      About Us
    </Link>
  </div>
);
