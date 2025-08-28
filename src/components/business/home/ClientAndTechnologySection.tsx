import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import Client1 from "../../../assets/images/business/partners/client-01.png";
import Client2 from "../../../assets/images/business/partners/client-02.png";
import Client3 from "../../../assets/images/business/partners/client-03.png";
import Client4 from "../../../assets/images/business/partners/client-04.png";
import Client6 from "../../../assets/images/business/partners/client-06.png";
import TechnologyImage from "../../../assets/images/business/technology/bg.webp";
import { faqs } from "../../../utils/businessUtils";

// Client logos
const clients = [
    { id: 1, img: Client1, },
    { id: 2, img: Client2, },
    { id: 3, img: Client3, },
    { id: 4, img: Client4, },
    { id: 5, img: Client2, },
    { id: 6, img: Client6, },
];


// Accordion items


export default function ClientAndTechnologySection() {
    const [activeIndex, setActiveIndex] = useState(3);

    return (
        <div>
            {/* Clients Section */}
            <section className=" relative">
                <div className=" business-container bg-white flex justify-end absolute 
  top-[-32px] 
  right-0 
  md:left-1/2 md:-translate-x-1/2 md:right-auto 
  xl:right-[-32px] xl:translate-x-0 xl:left-auto 
  z-40
"
                >
                    <Swiper
                        modules={[Autoplay]}
                        autoplay={{ delay: 2000 }}
                        loop
                        slidesPerView={6}
                        spaceBetween={20}
                        breakpoints={{
                            320: { slidesPerView: 2 },
                            640: { slidesPerView: 3 },
                            1024: { slidesPerView: 6 },
                        }}
                        className="py-20"
                    >
                        {clients.map((client) => (
                            <SwiperSlide key={client.id}>
                                <div className="relative group flex items-center justify-center ">
                                    <img
                                        src={client.img}
                                        alt={`client-${client.id}`}
                                        className="partner-image"
                                    />
                                    {/* <img
                    src={client.hover}
                    alt={`hover-client-${client.id}`}
                    className="absolute top-0 left-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                  /> */}
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>


                                     {/* Technology Section */}
                <section className="relative py-24 bg-cover bg-center" style={{ backgroundImage: `url(${TechnologyImage})` }}>
                    <div className="business-container mx-auto flex justify-end">
                        <div className="bg-white shadow-lg p-8 max-w-2xl">
                            {/* Section Title */}
                            <div className="mb-6">
                                <h5 className="text-primary font-semibold uppercase">A GREAT Technology</h5>
                                <h2 className="text-2xl md:text-3xl font-bold">
                                    We Are The Trusted Experts Lab Technician
                                </h2>
                            </div>

                            {/* Accordion */}
                            <div className="space-y-2">
                                {faqs.map((faq, i) => (
                                    <div
                                        key={faq.id}
                                        className="border-b border-gray-200 "
                                    >
                                        <button
                                            onClick={() => setActiveIndex(activeIndex === i ? -1 : i)}
                                            className={`w-full flex justify-between items-center text-left font-medium text-gray-800 p-4 ${activeIndex === i ? "text-white bg-primary" : "bg-primary/10"}`}
                                        >
                                            {faq.question}
                                            <span>{activeIndex === i ? "−" : "+"}</span>
                                        </button>
                                        {activeIndex === i && (
                                            <div className={`flex gap-4 text-sm text-gray-600 p-4  ${activeIndex === i ? "bg-primary/10" : ""}`}>
                                                {/* <img src={faq.img} alt="faq" className="w-24 h-20 object-cover" /> */}
                                                <p>{faq.answer}</p>
                                            </div>
                                        )}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </section>
            </section>
        </div>
    );
}
