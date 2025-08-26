import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules";
import "swiper/css";

import TestimonailImage from "../../../assets/images/business/testimonial/tesbg.jpg";
import { FaStar } from "react-icons/fa6";

const testimonials = [
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSXhj0_ZfEdH7Nx7TnpPGvfIl3ofv4FD043NA&s",
    stars: 4,
    title: "“Best Clinic Services Provide”",
    text: "A great place to work because of the opportunities for moving between centres and trying something new within your area of expertise. The laboratory is also an open and flexible workplace & great place to work with.",
    name: "Alexanra May Cruz",
    role: "CEO At Laboratory",
  },
  {
    img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQynbwXmZLSASoPx5hu2S0Donh37rdzymng3Q&s",
    stars: 5,
    title: "“Best Clinic Services Provide”",
    text: "I always pay attention to detail on anything that I work on to make sure I complete the task successfully. With my skill set, knowledge & work ethics I could be a great addition to the team to deliver the best result.",
    name: "Alexanra May Cruz",
    role: "CEO At Laboratory",
  },
  {
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRBXAzZIfCwiwt9BpN6XI9-x5W94Qd3bd-d4w&s",
  stars: 5,
  title: "“Professional & Caring Staff”",
  text: "The doctors and nurses were very professional and attentive throughout my entire treatment. They truly care about patients' well-being, making the experience comforting and stress-free.",
  name: "Michael Johnson",
  role: "Patient",
},
{
  img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRipAYgEbrv8cPvshoAMzQ3z1StLm0aLX9hPQ&s",
  stars: 4,
  title: "“Reliable Laboratory Results”",
  text: "I was impressed with the accuracy and speed of the laboratory services. The team ensures reports are delivered on time with detailed explanations, which helped me a lot in my treatment journey.",
  name: "Sophia Lee",
  role: "Research Analyst",
}

];

export default function TestimonialSection() {
  return (
    <section
      className="relative bg-primary py-20 bg-cover bg-center"
      style={{
        backgroundImage: `linear-gradient(rgba(3,115,71,0.85), rgba(3,115,71,0.85)), url(${TestimonailImage})`,
      }}
    >
      <div className="business-container mx-auto relative z-10">
        {/* Section Title */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <h5 className="text-white uppercase tracking-wide">Testimonials</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            “Best Clinic Services Provide”
          </h2>
        </div>

        {/* Swiper Slider */}
        <Swiper
          modules={[Navigation, Autoplay]}
          autoplay={{ delay: 4000 }}
          loop={true}
          speed={600}
          slidesPerView={1}
        >
          {testimonials.map((item, i) => (
            <SwiperSlide key={i}>
              <div className="flex justify-center">
                <div className="bg-transparent text-white p-8 max-w-3xl mx-auto text-center">
                  {/* Avatar */}
                  <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4 border-4 border-primary">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Stars */}
                  <div className="flex justify-center mb-3 text-xl">
                    {[...Array(5)].map((_, index) => (
                      <FaStar  key={index}
                        className={`fas fa-star ${
                          index < item.stars
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`} />
                    ))}
                  </div>

                  {/* Text */}
                  <blockquote className="text-shadow-white italic">
                    <h5 className="font-semibold mb-2">{item.title}</h5>
                    {item.text}
                  </blockquote>

                  {/* Name */}
                  <div className="mt-4">
                    <h5 className="font-bold">{item.name}</h5>
                    <p className="text-sm text-shadow-white">{item.role}</p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}
