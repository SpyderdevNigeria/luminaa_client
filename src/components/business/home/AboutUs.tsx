import { FaMicroscope, FaVials, FaFlask,  } from "react-icons/fa";
import AboutImg from "../../../assets/images/business/aboutus.jpg"; 
import Trophy from "../../../assets/images/business/trophy.png";
import Lab from '../../../assets/images/business/lab-equipment.png';
import Loupe from '../../../assets/images/business/loupe.png';
import Customer from '../../../assets/images/business/customer.png';
import FeaturesSection from "./FeaturesSection";
export default function AboutUs() {
  const features = [
    {
      icon: <FaMicroscope className="text-white text-xl" />,
      title: "Central Forensic Science",
      desc: "Forensic science applies scientific analysis to the justice system, helping prove events of crime.",
    },
    {
      icon: <FaVials className="text-white text-xl" />,
      title: "Clinical & Medical Laboratory",
      desc: "We conduct lab tests ordered by doctors, examining human tissue samples to aid diagnosis.",
    },
    {
      icon: <FaFlask className="text-white text-xl" />,
      title: "Analytical & Quality Laboratory",
      desc: "We use advanced techniques to identify the chemical makeup and characteristics of samples.",
    },
  ];



  const stats2 = [
  { icon: Trophy, number: 457, suffix: "+", label: "Industry Expertise" },
  { icon:Lab, number: 120, suffix: "+", label: "Team Members" },
  { icon: Loupe, number: 980, suffix: "+", label: "Projects Completed" },
  { icon: Customer, number: 750, suffix: "+", label: "Happy Clients" },
];


  return (
    <section className="py-16 bg-gray-50">
      <div className="business-container grid grid-cols-1 lg:grid-cols-2 gap-6 items-center">
        {/* Left Image */}
        <div>
          <img src={AboutImg} alt="About Us" className="rounded-xl shadow-lg" />
        </div>

        {/* Right Content */}
        <div>
          <h5 className="text-primary font-semibold uppercase">About Us</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
            We Employ The Latest Research Technology &amp; Expertise
          </h2>
          <p className="text-gray-600 mb-8">
            Our scientists and engineers focus their extreme curiosity on national and global 
            security &amp; health challenges. Learn more about the Laboratory’s R&amp;D work.
          </p>

          {/* Features */}

{/* Features Timeline */}
<div className="relative">
  <div className="">
    {features.map((item, index) => (
      <div key={index} className="relative flex items-start space-x-8 h-full min-h-25">
        {/* Timeline Icon + Line */}
        <div className="relative flex flex-col items-center">
          {/* Icon */}
          <div className="z-10 flex items-center justify-center w-10 h-10 text-primary font-bold rounded-full bg-white border border-primary">
           0{index + 1}
          </div>

          {/* Vertical Line (hidden for last item) */}
          {index !== features.length - 1 && (
            <div className="absolute top-10 left-1/2 w-0.5 h-25 bg-primary"></div>
          )}
        </div>

        {/* Feature Content */}
        <div className="">
          <h5 className="text-lg font-semibold">{item.title}</h5>
          <p className="text-gray-600 text-base">{item.desc}</p>
        </div>
      </div>
    ))}
  </div>
</div>


        </div>
      </div>

{/* Stats */}
<div className="business-container mt-16 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
  {stats2.map((stat, index) => (
    <div
      key={index}
      className="flex items-center bg-primary/10 shadow-md rounded-sm p-6"
    >
      {/* Icon */}
      <img src={stat.icon} alt={stat.label} className="w-12 h-12" />

      {/* Vertical Divider */}
      <div className="w-px h-12 bg-gray-300 mx-4"></div>

      {/* Content */}
      <div>
        <h4 className="text-3xl font-bold flex items-baseline">
          {stat.number}
          {stat.suffix && (
            <sub className="ml-1 font-semibold">{stat.suffix}</sub>
          )}
        </h4>
        <p className="text-gray-600 text-base">{stat.label}</p>
      </div>
    </div>
  ))}
</div>

  <FeaturesSection/>
    </section>
  );
}
