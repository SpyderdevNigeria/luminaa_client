import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";
import { FaFacebookF, FaTwitter, FaInstagram } from "react-icons/fa";
import { FiEye } from "react-icons/fi";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

interface TeamMember {
  name: string;
  position: string;
  image: string;
  socials?: {
    facebook?: string;
    twitter?: string;
    instagram?: string;
  };
}

interface TeamSectionProps {
  title: string;
  subtitle: string;
  description: string;
  members: TeamMember[];
}



const TeamSection: React.FC<TeamSectionProps> = ({
  title,
  subtitle,
  description,
  members,
}) => {
  return (
    <section className="py-20">
      <div className="business-container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="text-center max-w-2xl mx-auto mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h5 className="text-primary uppercase">{title}</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{subtitle}</h2>
          <p className="text-gray-600 mt-3">{description}</p>
        </motion.div>

        {/* Team Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          slidesPerView={4}
          spaceBetween={30}
          navigation
          pagination={{ clickable: true }}
          breakpoints={{
            460: { slidesPerView: 1 },
            678: { slidesPerView: 2 },
            991: { slidesPerView: 3 },
            1200: { slidesPerView: 4 },
          }}
        >
          {members.map((member, idx) => (
            <SwiperSlide key={idx}>
              <motion.div
                className="bg-primary/10 shadow-lg overflow-hidden text-center group transition-all duration-300 border-b-4 border-transparent hover:border-primary hover:shadow-2xl relative"
                // variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
              >
                <div className="relative">
                  {/* Member Image */}
                  <motion.img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-82 object-fill"
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                  />

                  {/* Eye Icon (top-right) */}
                  <Link
                    to={`/team/${member.name.replace(/\s+/g, "-").toLowerCase()}`}
                    className="absolute top-2 right-2 text-white bg-primary p-3 rounded-full text-xl shadow-md 
                               transform -translate-y-8 opacity-0 group-hover:translate-y-0 group-hover:opacity-100
                               transition-all duration-300"
                  >
                    <motion.div whileHover={{ scale: 1.2 }} whileTap={{ scale: 0.9 }}>
                      <FiEye />
                    </motion.div>
                  </Link>

                  {/* Social Icons (left-side vertical) */}
                  <div className="absolute top-1/2 -translate-y-1/2 left-2 flex flex-col space-y-2">
                    {member.socials?.facebook && (
                      <motion.a
                        href={member.socials.facebook}
                        className="bg-primary text-white p-3 rounded-full shadow-md 
                                   transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                                   transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: 10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaFacebookF />
                      </motion.a>
                    )}
                    {member.socials?.twitter && (
                      <motion.a
                        href={member.socials.twitter}
                        className="bg-primary text-white p-3 rounded-full shadow-md 
                                   transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                                   transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: -10 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaTwitter />
                      </motion.a>
                    )}
                    {member.socials?.instagram && (
                      <motion.a
                        href={member.socials.instagram}
                        className="bg-primary text-white p-3 rounded-full shadow-md 
                                   transform -translate-x-8 opacity-0 group-hover:translate-x-0 group-hover:opacity-100
                                   transition-all duration-300"
                        whileHover={{ scale: 1.2, rotate: 15 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <FaInstagram />
                      </motion.a>
                    )}
                  </div>
                </div>

                {/* Member Info */}
                <div className="p-4">
                  <h5 className="font-semibold text-lg">{member.name}</h5>
                  <p className="text-gray-500">{member.position}</p>
                </div>
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
