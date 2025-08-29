import Section from "./Section";
import FooterImage from "../../../assets/images/oak-logo-rm.png";
import CardImage from "../../../assets/images/business/card-shape.svg";
import website from "../../../utils/website";

import { Link } from "react-router-dom";
import { FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";
import { serviceCategories } from "../../../utils/businessUtils";
import { BsArrowRightCircleFill } from "react-icons/bs";


const socialLinks = [
    {
        icon: <FaTwitter />,
        link: website.socialMedias.twitter,
    },
    {
        icon: <FaFacebookF />,
        link: website.socialMedias.facebook,
    },
    {
        icon: <FaLinkedinIn />,
        link: website.socialMedias.linkedin,
    },    
    {
        icon: <FaInstagram />,
        link: website.socialMedias.instagram,
    },
]
function Footer() {
  const navLinks = ["Home", "About", "FAQ", "Contact", ];

  // Convert object to array and take first 2 categories
  const displayedCategories = Object.entries(serviceCategories).slice(0, 2);

  return (
    <footer className="bg-primary relative z-2 text-white">
      <Section>
        <div className="theme-container mx-auto pt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-10 gap-4 md:gap-y-0 md:gap-x-6">
          <div className="sm:col-span-2 lg:col-span-10">
                        <img src={FooterImage} alt="Logo" className="w-24 h-24 object-contain" />
          </div>
          {/* Column 1: Logo + About */}
          <div className="lg:col-span-3 flex flex-col items-center lg:items-start text-center lg:text-left space-y-4">

            <h2 className="text-2xl font-bold">We’re Here for You</h2>
            <p className="text-sm text-gray-200">
              At  {website?.name}, we are committed to providing state-of-the-art healthcare services, bringing advanced minimal access surgery and modern diagnostic techniques closer to the Humanity 
              </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-1 lg:pl-6">
            <h3 className="font-semibold text-lg mb-4 text-nowrap">Quick Links</h3>
            <ul className="space-y-2 ">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={`${link === 'Home' ? '/' : `/${link.toLowerCase().replace(/\s/g, "-")}`}`}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
                  >
                    <BsArrowRightCircleFill />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services */}
          <div className="lg:col-span-4 lg:pl-18">
            <h3 className="font-semibold text-lg mb-4">Our Services</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-4">
              {displayedCategories.map(([category, data]) => (
                <div key={category}>
                  <h4 className="font-semibold text-sm text-white mb-2">{category}</h4>
                  <ul className="list-disc pl-5 space-y-1">
                    {data.services.slice(0, 4).map((service) => (
                      <li
                        key={service.name}
                        className="text-white/70 cursor-pointer hover:text-white text-sm"
                      >
                        {service.name}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            {/* View More Button */}
            {displayedCategories.length > 0 && (
              <div className="mt-4">
                <Link
                  to={`/services/${displayedCategories[0][0].toLowerCase().replace(/\s/g, "-")}`}
                  className="text-white hover:text-white text-sm underline"
                >
                  View More
                </Link>
              </div>
            )}
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <p className="text-white/70 text-sm mb-2">{website?.address}</p>
            <p className="text-white/70 text-sm mb-2">{website?.contact?.phone1}</p>
            <p className="text-white/70 text-sm mb-4">{website?.contact?.email}</p>

            <div className="flex gap-3">
              {socialLinks.map((i, index) => (
                <a
                  key={index}
                  href={i.link}
                  className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-primary transition"
                >
                 {i.icon}
                </a>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* Bottom Bar */}
      <div className="border-t border-white/20 py-6 mt-10">
        <Section>
          <p className="text-center text-sm">
            © {new Date().getFullYear()} {website?.name}. All rights reserved.
          </p>
        </Section>
      </div>

      {/* Decorative shapes */}
      <img
        src={CardImage}
        alt=""
        className="hidden md:block absolute bottom-40 -left-32 w-64 opacity-20"
      />
    </footer>
  );
}

export default Footer;