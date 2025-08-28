import React from "react";

import VisionIcon from '../../../assets/images/business/about/vision.png';
import MissionIcon from '../../../assets/images/business/about/mission.png';
import { FaArrowCircleRight } from "react-icons/fa";
import Observation from "../../../assets/images/business/observation.png";
interface AboutUsProps {
  sectionTitle: string;
  subtitle: string;
  description: string;
  listLeft: string[];
  listRight: string[];
  mainImage: string;
  visionTitle: string;
  visionDesc: string;
  missionTitle: string;
  missionDesc: string;
}

const AboutUsSection: React.FC<AboutUsProps> = ({
  sectionTitle,
  subtitle,
  description,
  listLeft,
  listRight,
  mainImage,
  visionTitle,
  visionDesc,
  missionTitle,
  missionDesc,
}) => {
  return (
    <section className="py-20">
      <div className="business-container">
        <div className="flex flex-col lg:flex-row items-center gap-5">
          
          {/* Left Column - Image + Special Offer */}
          <div className="lg:w-1/2 w-full flex justify-center mb-10 lg:mb-0">
            <div className="relative">
              <img src={mainImage} alt="About us" className=" shadow-lg" />
              <div className="absolute top-5 left-5 bg-primary text-white p-5 rounded shadow-lg flex items-center space-x-4">
                <img src={Observation} alt="Lab icon" className="w-8 h-8" />
                <div>
<p className="text-sm">Exclusive Offer</p>
<h4 className="font-bold text-lg mb-0">Enjoy a Complimentary Health Checkup</h4>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Text Content */}
          <div className="lg:w-1/2 w-full h-full">
            <div className="pt-8 lg:pt-0 space-y-12">
              {/* Section Title */}
              <div className="mb-6">
                <h5 className="text-primary uppercase">{sectionTitle}</h5>
                <h2 className="text-3xl md:text-4xl font-bold">{subtitle}</h2>
                <p className="mt-4 text-gray-700">{description}</p>
              </div>

              {/* Vision */}
              <div className="flex items-start mt-6 space-x-4">
                <img src={VisionIcon} alt="Vision icon" className="w-10 h-10" />
                <div>
                  <h5 className="font-semibold">{visionTitle}</h5>
                  <p className="text-gray-700">{visionDesc}</p>
                </div>
              </div>

              {/* Mission */}
              <div className="flex items-start mt-6 space-x-4 w-full">
                <img src={MissionIcon} alt="Mission icon" className="w-10 h-10" />
                <div>
                  <h5 className="font-semibold">{missionTitle}</h5>
                  <p className="text-gray-700">{missionDesc}</p>

                  {/* Two-column list */}
                  <div className="flex mt-4 space-x-4 text-sm w-full ">
                    <ul className="space-y-2 w-1/2">
                      {listLeft.map((item, idx) => (
                        <li key={idx} className="flex items-start">
                          <FaArrowCircleRight className="text-primary mt-1 mr-2" />
                          <span className="md:flex-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                    <ul className="space-y-2 w-1/2">
                      {listRight.map((item, idx) => (
                        <li key={idx} className="flex items-start w-full">
                         <FaArrowCircleRight  className="text-primary mt-1 mr-2"/>
                          <span className="md:flex-nowrap">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
