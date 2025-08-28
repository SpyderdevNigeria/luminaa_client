import { useState } from "react";
import { FaExpand, FaLink } from "react-icons/fa";
import Image1 from "../../../assets/images/business/portfolio/01.jpg";
import Image2 from "../../../assets/images/business/portfolio/02.jpg";
import Image3 from "../../../assets/images/business/portfolio/03.jpg";
import Image4 from "../../../assets/images/business/portfolio/04.webp";
import Image5 from "../../../assets/images/business/portfolio/05.jpg";
import Image6 from "../../../assets/images/business/portfolio/06.jpg";
// Example portfolio data
const portfolioItems = [
  {
    id: 1,
    title: "Rehabilitation Center",
    categories: ["Cardiology", "Anesthesiology"],
    image: Image1,
    link: "single-style-1.html",
  },
  {
    id: 2,
    title: "Diagnostic Imagine",
    categories: ["Orthopedics", "Pediatric"],
    image:Image2,
    link: "single-style-2.html",
  },
  {
    id: 3,
    title: "Orthodontics Surgery",
    categories: ["Orthopedics", "Pediatric", "Pharmacy"],
    image: Image3,
    link: "single-style-3.html",
  },
  {
    id: 4,
    title: "Rehabilitation Center",
    categories: ["Cardiology", "Anesthesiology"],
    image: Image4,
    link: "single-style-1.html",
  },
  {
    id: 5,
    title: "Blood Pressure Checkup",
    categories: ["Orthopedics", "Pediatric", "Pharmacy"],
    image: Image5,
    link: "single-style-2.html",
  },
  {
    id: 6,
    title: "Dentures / Partial Dentures",
    categories: ["Cardiology", "Anesthesiology"],
    image: Image6,
    link: "single-style-3.html",
  },
];

const categories = [
  "All",
  "Cardiology",
  "Orthopedics",
  "Pharmacy",
  "Anesthesiology",
  "Pediatric",
];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) =>
          item.categories.includes(activeCategory)
        );

  return (
    <section className="py-16 bg-white">
      <div className="business-container mx-auto px-4">
        {/* Section Title */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h5 className="text-primary font-semibold tracking-wide">
            WHAT WE DO
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Our Latest Case Studies
          </h2>
          <p className="text-gray-600">
            Our collaboration projects between the public sector, industry and
            academia bring a real impact for the our health and lab firms.
          </p>
        </div>

        {/* Filter Tabs */}
        <ul className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2  border text-sm font-medium transition ${
                  activeCategory === cat
                    ? "bg-primary text-white border-primary"
                    : "bg-white text-gray-600 border-gray-300 hover:bg-primary hover:text-white"
                }`}
              >
                {cat}
              </button>
            </li>
          ))}
        </ul>

        {/* Portfolio Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              className="relative group  overflow-hidden shadow-lg"
            >
              {/* Image */}
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                {/* Actions */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <a
                    href={item.image}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                  >
                    <FaExpand />
                  </a>
                  <a
                    href={item.link}
                    className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                  >
                    <FaLink />
                  </a>
                </div>

                {/* Title & Category */}
                <div className="text-white">
                  <h5 className="font-semibold text-lg">{item.title}</h5>
                  <span className="text-sm text-gray-200">
                    {item.categories.join(", ")}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
