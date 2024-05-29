import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Logo from "/assets/images/logo.webp";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faSignInAlt } from "@fortawesome/free-solid-svg-icons";

const Navbar = () => {
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed top-2 left-0 right-0 z-10 bg-transparent p-4 transition-all ${
        isSticky ? "shadow-md" : ""
      }`}
    >
      <div className="container mx-auto flex justify-between items-center">
        {/*ini Logo nya */}
        <div className="text-black text-lg font-bold">
          <img src={Logo} alt="" className="h-12" />
        </div>

        {/* ini untuk Search */}
        <div className="flex-1 flex items-center justify-center">
          <div className="max-w-lg w-full relative">
            <label htmlFor="search" className="sr-only">
              Search
            </label>
            <input
              id="search"
              name="search"
              className="block w-full pl-6 pr-3 py-2 border rounded-xl leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Cari di sini ..."
              type="text"
            />
            <div className="absolute inset-y-0 right-0 flex items-center pr-3">
              <FontAwesomeIcon
                icon={faSearch}
                className="h-5 w-5 text-gray-400"
              />
            </div>
          </div>
        </div>

        {/* button untuk masuk*/}
        <ul className="flex space-x-4">
          <Link
            to="/login"
            className="bg-white hover:bg-gray-100 text-gray-900 py-2 px-5 w-28 rounded-xl flex items-center"
          >
            <FontAwesomeIcon icon={faSignInAlt} className="h-4 w-3 mr-2" />
            Masuk
          </Link>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
