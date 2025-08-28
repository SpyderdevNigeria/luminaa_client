import {  FaArrowRight } from "react-icons/fa";
import Immunity from "../../../assets/images/business/immunity.png";
import SearchAnalysis from "../../../assets/images/business/search-analysis.png";
import Observation from "../../../assets/images/business/observation.png";

const features = [
  {
    id: 1,
    icon: SearchAnalysis,
    title: "Comprehensive Evaluation",
    desc: "We provide thorough diagnostic assessments to ensure accurate detection and early intervention.",
    active: false,
  },
  {
    id: 2,
    icon: Immunity,
    title: "A Safer Health System",
    desc: "Committed to patient safety through continuous research, staff training, and adherence to global best practices.",
    active: true,
  },
  {
    id: 3,
    icon: Observation,
    title: "Accredited Standards",
    desc: "We follow internationally recognized regulations and quality standards for reliable medical services.",
    active: false,
  },
];


export default function FeaturesSection() {
  return (
    <section className="relative bg-primary backdrop-blur-md text-white my-16">
      <div className="absolute inset-0 bg-[url('/path-to-your-bg.jpg')] bg-cover bg-center opacity-30"></div>
      
      {/* Main Container */}
      <div className="relative business-container mx-auto px-4">
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3">
          {features.map((feature) => (
            <div
              key={feature.id}
              className={`p-8 text-center py-14 transition 
                ${feature.id === 2 ? "border-yellow-400 bg-white/10 " : ""}`}
            >
              {/* Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-18 h-18 flex items-center justify-center bg-transparent border border-white rounded-sm">
                  <img
                    src={feature.icon}
                    alt={feature.title}
                    className="w-10 h-10"
                  />
                </div>
              </div>

              {/* Content */}
              <h5 className="text-lg font-semibold mb-2">{feature.title}</h5>
              <p className="text-sm mb-4 text-gray-200">{feature.desc}</p>
            </div>
          ))}
        </div>

        {/* Single Absolute Arrow */}
        <a
          href="/#"
          className="absolute left-1/2 -translate-x-1/2 bottom-[-17px] cursor-pointer w-10 h-10 flex items-center rounded-full justify-center bg-primary text-white hover:text-yellow-400 transition"
        >
          <FaArrowRight  className="text-sm" />
        </a>
      </div>
    </section>
  );
}
