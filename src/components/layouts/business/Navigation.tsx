import { useState, useEffect } from "react";
import {
  FaBars,
  FaTimes,
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaChevronDown,
} from "react-icons/fa";
import { BsInstagram } from "react-icons/bs";
import { Link, useNavigate, useLocation } from "react-router-dom";

import TopBar from "./TopBar";
import website from "../../../utils/website";
import Button from "../../common/Button";
import routeLinks from "../../../utils/routes";
import { serviceCategories } from "../../../utils/businessUtils";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "About Us", path: "/about" },
  { name: "Services", path: "/services" }, // Dropdown
  { name: "FAQ", path: "/Faq" },
  { name: "Contact", path: "/Contact" },
];

const Navigation = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) =>
    location.pathname === path || location.pathname.startsWith(path + "/");

  return (
    <div>
      <TopBar />

      {/* Fixed Header */}
      <header
        className={`w-full bg-white ${
          isScrolled ? "shadow-md top-0" : "top-10"
        } fixed left-0 z-50 transition-all duration-0`}
      >
        <div className="business-container flex justify-between items-center h-20 md:h-24">
          {/* Logo */}
          <Link to="/">
            <img src={website.logo} alt="Logo" className="w-35 md:w-35" />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex space-x-4 text-sm font-medium relative h-full items-center">
            {navLinks.map((link, index) =>
              link.name === "Services" ? (
                <div
                  key={index}
                  className="relative h-full flex items-center"
                  onMouseEnter={() => setServicesOpen(true)}
                  onMouseLeave={() => setServicesOpen(false)}
                >
                  <button
                    className={`px-4 py-2 font-semibold transition relative h-full flex items-center gap-1 after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:bg-primary after:transition-all after:duration-300 ${
                      isActive("/services")
                        ? "text-primary after:w-full"
                        : "hover:text-primary after:w-0 hover:after:w-full"
                    }`}
                  >
                    {link.name}
                    <FaChevronDown
                      size={12}
                      className={`transition-transform duration-300 ${
                        servicesOpen ? "rotate-180 text-primary" : ""
                      }`}
                    />
                  </button>

                  {servicesOpen && (
                    <div className="absolute left-[-400px] top-full  bg-white shadow-lg  p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-[800px] z-50">
                      {Object.entries(serviceCategories).map(
                        ([category, details]) => (
                          <div key={category} className="">
                            <h4
                              className="font-bold text-primary text-lg cursor-pointer hover:underline"
                              onClick={() =>
                                navigate(
                                  `/services/${category
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`
                                )
                              }
                            >
                              {category}
                            </h4>
                            <ul className="mt-2 space-y-1">
                              {details.services.map((item) => (
                                <li
                                  key={item.name}
                                  className="cursor-pointer hover:text-primary text-sm"
                                  onClick={() =>
                                    navigate(
                                      `/services/${category
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}?service=${item.name
                                        .toLowerCase()
                                        .replace(/\s+/g, "-")}`
                                    )
                                  }
                                >
                                  {item.name}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )
                      )}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  key={index}
                  to={link.path}
                  className={`px-4 py-2 font-semibold transition relative h-full flex items-center after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:bg-primary after:transition-all after:duration-300 ${
                    isActive(link.path)
                      ? "text-primary after:w-full"
                      : "hover:text-primary after:w-0 hover:after:w-full"
                  }`}
                >
                  {link.name}
                </Link>
              )
            )}

            {/* Get a Quote Button */}
            <div className="hidden md:block ml-4">
              <Button title={"Get Started"} link={routeLinks?.auth?.login} />
            </div>
          </nav>

          {/* Mobile Menu Icon */}
          <div className="md:hidden">
            <button onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <FaTimes size={30} /> : <FaBars size={30} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white p-4 md:px-6 pb-6 pt-2 shadow-md">
            <nav className="flex flex-col gap-4 text-sm font-medium">
              {navLinks.map((link, index) =>
                link.name === "Services" ? (
                  <div key={index}>
                    <button
                      className={`w-full flex items-center justify-between py-2 font-semibold transition relative after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:bg-primary after:transition-all after:duration-300 ${
                        isActive("/services")
                          ? "text-primary after:w-full"
                          : "hover:text-primary after:w-0 hover:after:w-full"
                      }`}
                      onClick={() => setServicesOpen(!servicesOpen)}
                    >
                      {link.name}
                      <FaChevronDown
                        size={12}
                        className={`transition-transform duration-300 ${
                          servicesOpen ? "rotate-180 text-primary" : ""
                        }`}
                      />
                    </button>

                    {servicesOpen && (
                      <div className="mt-2 pl-4 grid grid-cols-1 gap-4">
                        {Object.entries(serviceCategories).map(
                          ([category, details]) => (
                            <div key={category}>
                              <h4
                                className="font-bold text-primary cursor-pointer hover:underline"
                                onClick={() => {
                                  navigate(
                                    `/services/${category
                                      .toLowerCase()
                                      .replace(/\s+/g, "-")}`
                                  );
                                  setMenuOpen(false);
                                }}
                              >
                                {category}
                              </h4>
                              <ul className="mt-1 space-y-1">
                                {details.services.map((item) => (
                                  <li
                                    key={item.name}
                                    className="cursor-pointer hover:text-primary text-sm"
                                    onClick={() => {
                                      navigate(
                                        `/services/${category
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}?service=${item.name
                                          .toLowerCase()
                                          .replace(/\s+/g, "-")}`
                                      );
                                      setMenuOpen(false);
                                    }}
                                  >
                                    {item.name}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={index}
                    to={link.path}
                    className={`py-2 font-semibold transition relative after:content-[''] after:absolute after:left-0 after:-bottom-[1px] after:h-[3px] after:bg-primary after:transition-all after:duration-300 ${
                      isActive(link.path)
                        ? "text-primary after:w-full"
                        : "hover:text-primary after:w-0 hover:after:w-full"
                    }`}
                    onClick={() => setMenuOpen(false)}
                  >
                    {link.name}
                  </Link>
                )
              )}

              {/* Socials */}
              <div className="flex items-center space-x-3 my-4">
                <FaFacebookF />
                <FaTwitter />
                <BsInstagram />
                <FaLinkedinIn />
              </div>

              <Button title={"Get Started"} link={routeLinks?.auth?.login} />
            </nav>
          </div>
        )}
      </header>
    </div>
  );
};

export default Navigation;
