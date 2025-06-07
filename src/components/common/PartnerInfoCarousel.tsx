// import "swiper/css";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";

type PatnerInfoProps = {
  image?:string
}

export default function PartnerInfoCarousel({image}:PatnerInfoProps) {
  return (
    <div className="hidden lg:flex items-center justify-center p-4 ">
      <div className="relative w-full h-full rounded-xl overflow-hidden">
        <img
          src={image || "https://images.pexels.com/photos/8949904/pexels-photo-8949904.jpeg?auto=compress&cs=tinysrgb&w=600"}
          alt="Healthcare background"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/50 bg-opacity-60 flex flex-col items-center justify-center h-full px-12 2xl:px-24">
          <Swiper
            modules={[Autoplay]}
            autoplay={{ delay: 5000, disableOnInteraction: false }}
            loop={true}
            spaceBetween={30}
            className="w-full"
          >
            <SwiperSlide>
              <div className="text-white max-w-4xl">
                <h2 className="text-4xl 2xl:text-5xl font-bold mb-4">
                  Doctor Access Portal
                </h2>
                <p className="text-2xl 2xl:text-3xl font-light">
                  Manage appointments, view patient histories, and collaborate
                  seamlessly with other medical professionals.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-white max-w-4xl">
                <h2 className="text-4xl 2xl:text-5xl font-bold mb-4">
                  Pharmacy Dashboard
                </h2>
                <p className="text-2xl 2xl:text-3xl font-light">
                  Receive e-prescriptions, manage inventory, and ensure patients
                  get medications on time, every time.
                </p>
              </div>
            </SwiperSlide>
            <SwiperSlide>
              <div className="text-white max-w-4xl">
                <h2 className="text-4xl 2xl:text-5xl font-bold mb-4">
                  Laboratory Integration
                </h2>
                <p className="text-2xl 2xl:text-3xl font-light">
                  Get test requests, upload diagnostic results, and maintain a
                  smooth data flow between labs and hospitals.
                </p>
              </div>
            </SwiperSlide>
          </Swiper>
        </div>
      </div>
    </div>
  );
}
