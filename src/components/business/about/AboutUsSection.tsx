import React from "react";
import { motion } from "framer-motion";

import VisionIcon from "../../../assets/images/business/about/vision.png";
import MissionIcon from "../../../assets/images/business/about/mission.png";
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
        <div className="flex flex-col lg:flex-row items-center gap-5 md:gap-8">
          {/* Left Column - Image */}
          <motion.div
            className="lg:w-1/2 w-full flex justify-center mb-10 lg:mb-0"
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <div className="relative">
              <img src={mainImage} alt="About us" className="shadow-lg" />
              <motion.div
                className="absolute top-5 left-5 bg-primary text-white p-5 rounded shadow-lg flex items-center space-x-4"
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                viewport={{ once: true }}
              >
                <img src={Observation} alt="Lab icon" className="w-8 h-8" />
                <div>
                  <p className="text-sm">Exclusive Offer</p>
                  <h4 className="font-bold text-lg mb-0">
                    Enjoy a Complimentary Health Checkup
                  </h4>
                </div>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Text */}
          <div className="lg:w-1/2 w-full h-full">
            <div className="pt-8 lg:pt-0 space-y-12">
              {/* Section Title */}
              <motion.div
                className="mb-6"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
              >
                <h5 className="text-primary uppercase">{sectionTitle}</h5>
                <h2 className="text-3xl md:text-4xl font-bold">{subtitle}</h2>
                <p className="mt-4 text-gray-700">{description}</p>
              </motion.div>

              {/* Vision */}
              <motion.div
                className="md:flex items-start mt-6 space-y-4 md:space-y-0 space-x-4"
                initial={{ opacity: 0, x: -40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                viewport={{ once: true }}
              >
                <img src={VisionIcon} alt="Vision icon" className="w-10 h-10" />
                <div>
                  <h5 className="font-semibold">{visionTitle}</h5>
                  <p className="text-gray-700">{visionDesc}</p>
                </div>
              </motion.div>

              {/* Mission */}
              <motion.div
                className="md:flex items-start mt-6 space-y-4 md:space-y-0 space-x-4 w-full"
                initial={{ opacity: 0, x: 40 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7, delay: 0.4 }}
                viewport={{ once: true }}
              >
                <img src={MissionIcon} alt="Mission icon" className="w-10 h-10" />
                <div>
                  <h5 className="font-semibold">{missionTitle}</h5>
                  <p className="text-gray-700">{missionDesc}</p>

                  {/* Two-column list */}
                  <motion.div
                    className="md:flex mt-4 space-x-4 text-sm w-full"
                    initial="hidden"
                    whileInView="visible"
                    variants={{
                      hidden: {},
                      visible: {
                        transition: { staggerChildren: 0.15 },
                      },
                    }}
                    viewport={{ once: true }}
                  >
                    <ul className="space-y-2 md:w-1/2">
                      {listLeft.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start"
                          initial={{ opacity: 0, y: 20 }}
                          variants={{ visible: { opacity: 1, y: 0 } }}
                          transition={{ duration: 0.5 }}
                        >
                          <div>
                          <FaArrowCircleRight className="text-primary mt-1 mr-2" />
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                    <ul className="space-y-2 mt-2 md:mt-0 md:w-1/2">
                      {listRight.map((item, idx) => (
                        <motion.li
                          key={idx}
                          className="flex items-start w-full"
                          initial={{ opacity: 0, y: 20 }}
                          variants={{ visible: { opacity: 1, y: 0 } }}
                          transition={{ duration: 0.5 }}
                        >
                          <div>
                          <FaArrowCircleRight className="text-primary mt-1 mr-2" />
                          </div>
                          <span>{item}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
