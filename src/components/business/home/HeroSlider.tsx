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
      title: "Trusted",
      subtitle: "Family Health Care",
      description:
        "Experience world-class diagnostics and personalized care for you and your loved ones. Our modern laboratory ensures accuracy and reliability at every step.",
    },
    {
      id: 2,
      image: Slider2,
      title: "Innovating",
      subtitle: "Scientific Research",
      description:
        "Empowering progress with advanced laboratory solutions. We provide precise testing, research support, and innovative science for a healthier tomorrow.",
    },
  ];

  // 👇 icons for slide 2 with titles & subtitles
  const slide2Icons = [
    { id: 1, icon: Image1, title: "Global Reach", subtitle: "Trusted Locations", link: "#" },
    { id: 2, icon: Image2, title: "Happy Clients", subtitle: "Customer Support", link: "#" },
    { id: 3, icon: Image3, title: "24/7 Service", subtitle: "Always Available", link: "#" },
    { id: 4, icon: Image4, title: "Advanced Labs", subtitle: "Cutting-Edge Research", link: "#" },
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
    className="relative w-full h-full bg-cover bg-center bg-no-repeat opacity-100"
    style={{ backgroundImage: `url(${slide.image})` }}
  >
    {/* 🔹 Black overlay */}
    <div className="absolute inset-0 bg-black/80"></div>

    {/* Content above overlay */}
    <Section>
      <div className="relative z-10 flex flex-col items-start justify-center h-[700px] text-white">
        <h1 className="text-4xl md:text-7xl font-bold mb-4 max-w-[680px]">
          {slide.title}{" "}
          <span className="text-primary">{slide.subtitle}</span>
        </h1>
        <p className="text-xl text-gray-200 mb-6 max-w-[650px]">
          {slide.description}
        </p>

        {/* Slide-specific content */}
        {slide.id === 1 && (
          <div className="flex gap-4">
            <Button
              title="Get Started"
              link={routeLinks?.auth?.login}
            />
            <button className="flex items-center gap-2 bg-primary text-white px-5 py-3 shadow-lg hover:bg-primary/80 transition">
              <FiPlayCircle size={24} /> Watch Overview
            </button>
          </div>
        )}

        {slide.id === 2 && (
          <div className="flex gap-10 mt-5">
            {slide2Icons.map((item) => (
              <div key={item.id} className="flex flex-col items-center group cursor-pointer">
                <div className="relative flex flex-col items-center">
                  <img
                    src={item.icon}
                    alt={item.title}
                    className="w-10 h-10"
                  />
                  <span className="absolute -top-10 opacity-0 text-nowrap group-hover:opacity-100 transition bg-black text-white text-xs rounded px-2 py-1">
                    {item.title}
                  </span>
                </div>
              </div>
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
