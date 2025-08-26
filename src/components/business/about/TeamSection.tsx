import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Navigation } from "swiper/modules";


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
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h5 className="text-gray-700 uppercase">{title}</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{subtitle}</h2>
          <p className="text-gray-600 mt-3">{description}</p>
        </div>

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
              <div className="bg-white rounded-lg shadow-lg overflow-hidden text-center">
                <div className="relative group">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full h-72 object-cover"
                  />
                  <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 flex flex-col justify-center items-center transition-opacity duration-300">
                    <a
                      href="#"
                      className="text-white text-2xl mb-2 p-2 rounded-full hover:bg-skincolor"
                    >
                      <i className="ti ti-plus"></i>
                    </a>
                    <div className="flex space-x-3">
                      {member.socials?.facebook && (
                        <a
                          href={member.socials.facebook}
                          className="text-white hover:text-skincolor"
                        >
                          <i className="ti ti-facebook"></i>
                        </a>
                      )}
                      {member.socials?.twitter && (
                        <a
                          href={member.socials.twitter}
                          className="text-white hover:text-skincolor"
                        >
                          <i className="ti ti-twitter-alt"></i>
                        </a>
                      )}
                      {member.socials?.instagram && (
                        <a
                          href={member.socials.instagram}
                          className="text-white hover:text-skincolor"
                        >
                          <i className="ti ti-instagram"></i>
                        </a>
                      )}
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <h5 className="font-semibold text-lg">{member.name}</h5>
                  <p className="text-gray-500">{member.position}</p>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
};

export default TeamSection;
