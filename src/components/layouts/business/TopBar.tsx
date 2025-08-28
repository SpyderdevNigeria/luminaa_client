import {
  FaTwitter,
  FaFacebookF,
  FaLinkedinIn,
  FaRegClock,
  FaPhone ,
} from "react-icons/fa";
import { FiMail } from "react-icons/fi";
import { BsInstagram } from "react-icons/bs";
import Section from "./Section";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
// import "swiper/css";
import website from "../../../utils/website";

function TopBar() {
  return (
    <div className="bg-primary">
      <Section>
        {/* Desktop Content */}
        <div className="text-white py-2 md:flex justify-between items-center hidden text-sm">
          <div className="flex gap-6">
                        <div className="flex items-center gap-2">
              <FaPhone />
              <p>{website?.contact?.phone1}</p>
            </div>
            <div className="flex items-center gap-2 p-1">
              <FiMail />
              <a href={`mailto:${website?.contact?.email}`}>
                {website?.contact?.email}
              </a>
            </div>
          </div>

          <div className="md:flex gap-12 items-center hidden">
                      <div className="flex items-center gap-2">
              <FaRegClock />
              <p>Working Hours-: Mon-Sat:8.00am - 5.00pm</p>
            </div>
            <div className="flex items-center space-x-3">
              <a href={website?.socialMedias?.facebook} target="_blank" rel="noopener noreferrer">
               <FaFacebookF /></a>
              <FaTwitter />
              <BsInstagram />
              <FaLinkedinIn />
            </div>
          </div>
        </div>

        {/* Mobile or marquee version */}
        <div className="md:hidden text-white py-2">
          <Swiper
            modules={[Autoplay]}
            slidesPerView="auto"
            spaceBetween={50}
            loop={true}
            autoplay={{ delay: 0, disableOnInteraction: false }}
            speed={4000}
          >
            <SwiperSlide className="w-auto flexitems-center gap-2">
              <a href={`mailto:${website?.contact?.email}`} className="flex flex-row items-center justify-center gap-2">
              <FiMail />
                {website?.contact?.email}
              </a>
            </SwiperSlide>
            <SwiperSlide className="w-auto flex items-center gap-2">
              <p className="flex flex-row items-center justify-center gap-2">
              <FaRegClock />
                
                Working: 8.00am - 5.00pm</p>
            </SwiperSlide>
          </Swiper>
        </div>
      </Section>
    </div>
  );
}

export default TopBar;
