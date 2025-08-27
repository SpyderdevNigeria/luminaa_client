import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, EffectFade } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import { FiChevronLeft, FiChevronRight, FiPlayCircle } from "react-icons/fi";
import Slider1 from "../../../assets/images/business/slider-1.jpg";
import Slider2 from "../../../assets/images/business/slider-2.jpg";
import Section from "../../layouts/business/Section";
import Button from "../../common/Button";
import routeLinks from "../../../utils/routes";
import Image1 from "../../../assets/images/business/location.png";
import Image2 from "../../../assets/images/business/customer.png";
import Image3 from "../../../assets/images/business/24.png";
import Image4 from "../../../assets/images/business/lab.png";
export default function HeroSlider() {
  const slides = [
    {
      id: 1,
      image: Slider1,
      title: "Professional",
      subtitle: "Family Health Care",
      description: "Labostica is an ultramodern laboratory service.",
    },
    {
      id: 2,
      image: Slider2,
      title: "Research & Verify",
      subtitle: "A Physics Laboratory",
      description: "Delivering innovative science for the future.",
    },
  ];

  // 👇 icons for slide 2
  const slide2Icons = [
    { id: 1, icon: Image1, link: "#" },
    { id: 2, icon: Image2, link: "#" },
    { id: 3, icon: Image3, link: "#" },
    { id: 4, icon: Image4, link: "#" },
  ];

  return (
    <div className="relative w-full h-[680px]">
      <Swiper
        modules={[Autoplay, Navigation, EffectFade]}
        autoplay={{ delay: 5000 }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        effect="fade"
        className="w-full h-full"
      >
        {slides.map((slide) => (
          <SwiperSlide key={slide.id}>
            <div
              className="w-full h-full bg-cover bg-center bg-no-repeat opacity-100"
              style={{ backgroundImage: `url(${slide.image})` }}
            >
              <Section>
                <div className="flex flex-col items-start justify-center h-[700px]">
                  <h1 className="text-4xl md:text-7xl font-bold  mb-4 max-w-[680px]">
                    {slide.title}{" "}
                    <span className="text-primary">{slide.subtitle}</span>
                  </h1>
                  <p className="text-xl text-gray-700 mb-6">
                    {slide.description}
                  </p>

                  {/* Slide-specific content */}
                  {slide.id === 1 && (
                    <div className="flex gap-4">
                      <Button
                        title="Learn More"
                        link={routeLinks?.auth?.login}
                      />
                      <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 shadow-lg hover:bg-primary/80 transition">
                        <FiPlayCircle size={24} /> View Video
                      </button>
                    </div>
                  )}

                  {slide.id === 2 && (
                    <div className="flex gap-6 space-x-8 mt-5">
                      {slide2Icons.map((item) => (
                        <img src={item.icon} alt="images" key={item.id} className="w-10 h-10" />
                      ))}
                    </div>
                  )}
                </div>
              </Section>
            </div>
          </SwiperSlide>
        ))}

        {/* Navigation Buttons */}
        <div className="swiper-button-prev">
          <FiChevronLeft size={24} />
        </div>
        <div className="swiper-button-next">
          <FiChevronRight size={24} />
        </div>
      </Swiper>
    </div>
  );
}
