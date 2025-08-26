import Section from "./Section";
import FooterImage from "../../../assets/images/oak-logo-rm.png";
import CardImage from "../../../assets/images/business/card-shape.svg";
import website from "../../../utils/website";

import { Link } from "react-router-dom";
import { FaArrowRight, FaTwitter, FaFacebookF, FaLinkedinIn, FaInstagram } from "react-icons/fa6";

// Service categories
const serviceCategories: Record<string, string[]> = {
  "Endoscopy Clinic": [
    "Oesophagoscopy",
    "Gastroscopy",
    "Duodenoscopy",
    "Colonoscopy",
    "Sigmoidoscopy",
    "Proctoscopy",
    "Laparoscopy",
    "Hysteroscopy",
    "Cystoscopy",
    "Laryngoscopy",
    "Bronchoscopy",
  ],
  Radiology: [
    "Ultrasound",
    "ECHO cardiography",
    "Doppler Studies",
    "Plain x-ray",
    "Fluoroscopy",
    "Mammography",
  ],
  "Executive Health Services": [
    "Outpatient consultation",
    "Cardiological assessment",
    "ECG/ECHO",
    "Spirometry",
    "Ancillary care",
  ],
};

function Footer() {
  const navLinks = [
    "Home",
    "About Us",
    "Products",
    "Benefits",
    "Testimonial",
    "Contact Us",
  ];

  return (
    <footer className="bg-primary relative z-2 text-white">
      <Section>
        <div className="theme-container mx-auto pt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-9 gap-10"
        >
          {/* Column 1: Logo + About */}
          <div className="text-white rounded-2xl max-w-sm lg:col-span-2">
            <div className="flex justify-center mb-4">
              <img
                src={FooterImage}
                alt="Logo"
                className="w-20 h-20 object-contain"
              />
            </div>
            <h2 className="text-2xl font-bold text-center mb-3">
              We’re Here for You
            </h2>
            <p className="text-center text-sm text-gray-200">
              Providing trusted services with a commitment to excellence.
              Reach out to us anytime for assistance or a custom quote.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {navLinks.map((link, index) => (
                <li key={index}>
                  <Link
                    to={`#${link.toLowerCase().replace(/\s/g, "-")}`}
                    className="flex items-center gap-2 text-white/70 hover:text-white transition text-sm"
                  >
                    <FaArrowRight size={12} /> {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Services in grid (2 columns) */}
          <div className="lg:col-span-3">
            <h3 className="font-semibold text-lg mb-4 md:col-span-2">Our Services</h3>
            <div className="grid grid-cols-2 gap-6">
              {Object.entries(serviceCategories).map(([category, items]) => (
                <div key={category}>
                  <h4 className="font-semibold text-sm text-white mb-2">
                    {category}
                  </h4>
                  <ul className="space-y-1">
                    {items.slice(0, 4).map((item, i) => (
                      <li
                        key={i}
                        className="text-white/60 text-sm hover:text-white cursor-pointer"
                      >
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Column 4: Contact & Socials */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4">Contact Us</h3>
            <p className="text-white/70 text-sm mb-3">{website?.address}</p>
            <p className="text-white/70 text-sm mb-3">
              {website?.contact?.phone1}
            </p>
            <p className="text-white/70 text-sm mb-6">
              {website?.contact?.email}
            </p>

            {/* Socials with icons */}
            <div className="flex gap-3">
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaFacebookF />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaTwitter />
              </a>
                            <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                className="w-10 h-10 flex items-center justify-center border border-white/20 rounded-full hover:bg-white hover:text-primary transition"
              >
                <FaLinkedinIn />
              </a>
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
