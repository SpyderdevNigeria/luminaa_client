import { useState } from "react";
import { FaExpand, FaLink } from "react-icons/fa";
import Image1 from "../../../assets/images/business/portfolio/01.jpg";
import Image2 from "../../../assets/images/business/portfolio/02.jpg";
import Image3 from "../../../assets/images/business/portfolio/03.jpg";
import Image4 from "../../../assets/images/business/portfolio/04.webp";

// Types
type PortfolioItem = {
  id: number;
  title: string;
  categories: string[];
  image: string;
  link: string;
  intro: string;
  modules: string[] | null;
};

// Portfolio Items
const portfolioItems: PortfolioItem[] = [
  {
    id: 1,
    title: "Gastro-Intestinal Endoscopy Course",
    categories: ["Endoscopy", "Surgery", "Nursing"],
    image: Image1,
    link: "#",
    intro:
      "Comprehensive training in diagnostic and therapeutic endoscopy techniques for healthcare professionals.",
    modules: [
      "Module 1: Anatomy and Physiology of Digestive System",
      "Module 2: Role of Endoscopy Nurse in the Endoscopy Suite",
      "Module 3: Sterilization, Disinfection & Quality Control",
      "Module 4: Upper Gastro-Intestinal Endoscopy",
      "Module 5: Lower Gastro-Intestinal Endoscopy",
      "Module 6: Biopsy and Tissue Handling",
      "Module 7: Live Demonstrations",
    ],
  },
  {
    id: 2,
    title: "Gastro-Intestinal Stapling Course",
    categories: ["Surgery"],
    image: Image2,
    link: "#",
    intro:
      "Hands-on training in modern stapling techniques for gastrointestinal surgery and related procedures.",
    modules: null,
  },
  {
    id: 3,
    title: "Basic Laparoscopy Course",
    categories: ["Laparoscopy", "Surgery"],
    image: Image3,
    link: "#",
    intro:
      "An introductory course covering laparoscopic principles, safe practices, and essential skills for surgical trainees.",
    modules: null,
  },
  {
    id: 4,
    title: "Laparoscopic Instrumentation for Nurses",
    categories: ["Laparoscopy", "Nursing"],
    image: Image4,
    link: "#",
    intro:
      "Specialized training for nurses to manage, sterilize, and assist with laparoscopic instruments in operating rooms.",
    modules: null,
  },
];

// Categories
const categories: string[] = ["All", "Endoscopy", "Surgery", "Laparoscopy", "Nursing"];

export default function PortfolioSection() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const [selectedItem, setSelectedItem] = useState<PortfolioItem | null>(null);

  const filteredItems =
    activeCategory === "All"
      ? portfolioItems
      : portfolioItems.filter((item) => item.categories.includes(activeCategory));

  return (
    <section className="py-16 bg-white">
      <div className="business-container mx-auto px-4">
        {/* Section Title */}
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h5 className="text-primary font-semibold tracking-wide">
            WHAT WE TEACH
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Our Courses</h2>
          <p className="text-gray-600">
            Explore our specialized training programs designed to build
            professional expertise in endoscopy, laparoscopy, and surgical care.
          </p>
        </div>

        {/* Filter Tabs */}
        <ul className="flex flex-wrap justify-center gap-4 mb-10">
          {categories.map((cat) => (
            <li key={cat}>
              <button
                onClick={() => setActiveCategory(cat)}
                className={`px-5 py-2 border text-sm font-medium transition ${
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
              className="relative group overflow-hidden shadow-lg"
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-[350px] object-cover"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition flex flex-col justify-end p-4">
                {/* Actions */}
                <div className="absolute top-3 right-3 flex space-x-2">
                  <button
                    onClick={() => setSelectedItem(item)} // Open modal
                    className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                  >
                    <FaExpand />
                  </button>
                  <a
                    href={item.link}
                    className="bg-white p-2 rounded-full hover:bg-primary hover:text-white"
                  >
                    <FaLink />
                  </a>
                </div>

                {/* Title, Intro & Modules */}
                <div className="text-white space-y-2">
                  <h5 className="font-semibold text-lg">{item.title}</h5>
                  <p className="text-sm text-gray-200">{item.intro}</p>

                  {item.modules ? (
                    <ul className="text-xs list-disc pl-4 text-gray-300 space-y-1 max-h-[150px] overflow-y-auto">
                      {item.modules.map((module, idx) => (
                        <li key={idx}>{module}</li>
                      ))}
                    </ul>
                  ) : (
                    <div
                      className="flex items-center justify-center text-gray-300 text-sm italic"
                      style={{ height: "150px" }}
                    >
                      No modules available yet
                    </div>
                  )}

                  {item?.modules !== null && (
                    <button className="w-full bg-primary text-white py-2">
                      Register Now
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selectedItem && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-5xl grid grid-cols-1 md:grid-cols-2 overflow-hidden">
            {/* Left - Image */}
            <div className="h-80 md:h-auto">
              <img
                src={selectedItem.image}
                alt={selectedItem.title}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Right - Details */}
            <div className="p-6 flex flex-col">
              <h3 className="text-2xl font-bold mb-2">{selectedItem.title}</h3>
              <p className="text-sm text-gray-500 mb-2">
                Categories: {selectedItem.categories.join(", ")}
              </p>
              <p className="text-gray-700 mb-4">{selectedItem.intro}</p>

              {selectedItem.modules ? (
                <ul className="list-disc pl-5 text-gray-600 space-y-1 mb-4 max-h-[150px] md:max-h-[300px] overflow-y-auto">
                  {selectedItem.modules.map((module, idx) => (
                    <li key={idx}>{module}</li>
                  ))}
                </ul>
              ) : (
                <p className="italic text-gray-500 flex flex-col items-center justify-center mb-4 h-full max-h-[150px] md:max-h-[300px]">
                  No modules available yet
                </p>
              )}

              <button className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary/90">
                Register Now
              </button>

              {/* Close Button */}
              <button
                onClick={() => setSelectedItem(null)}
                className="mt-4 text-primary hover:underline text-sm"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
