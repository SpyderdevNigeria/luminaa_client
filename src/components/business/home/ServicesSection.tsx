import { FaMinus, FaPhoneAlt, FaFlask } from "react-icons/fa";
import ServiceImg1 from "../../../assets/images/business/single-img-four.webp";
import ServiceImg2 from "../../../assets/images/business/single-img-five.jpg";

export default function ServicesSection() {
  return (
    <section className="relative bg-gray-100 py-16">
      {/* Section Header */}
      <div className="business-container mx-auto px-4">
        <div className="max-w-2xl mx-auto text-center mb-12">
          <h5 className="text-primary font-semibold tracking-wide">
            OUR SERVICES
          </h5>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Explore Our Main Services
          </h2>
          <p className="text-gray-600">
            At Oak Endoscopy Centre, we combine advanced technology and expert
            care to provide accurate diagnosis, early detection, and effective
            treatment in a safe and comfortable environment.
          </p>
        </div>

        {/* Service Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mb-20">
          {/* Text */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">
              Endoscopy & Minimal Access Surgery
            </h4>
            <p className="text-gray-600 mb-6">
              We specialize in minimally invasive procedures that ensure early
              detection, accurate diagnosis, and faster recovery for our
              patients. Our advanced endoscopic technology brings global best
              practices to Port Harcourt.
            </p>

            {/* List */}
            <ul className="space-y-3 mb-6">
              {[
                "Upper & Lower GI Endoscopy",
                "Diagnostic & Therapeutic Laparoscopy",
                "Hysteroscopy & Cystoscopy",
                "Cancer Screening & Preventive Care",
              ].map((item, idx) => (
                <li key={idx} className="flex items-start text-gray-700">
                  <FaMinus className="text-primary mt-1 mr-2" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>

            {/* Experience & Call */}
            <div className="flex items-center border-t pt-6">
              {/* Icon Box */}
              <div className="flex items-center mr-8">
                <div className="text-primary text-4xl mr-3">
                  <FaFlask />
                </div>
                <div>
                  <h5 className="text-lg font-semibold">20+ Years</h5>
                  <p className="text-gray-600 text-sm">Of Medical Expertise</p>
                </div>
              </div>
              {/* Phone Box */}
              <div className="pl-8 border-l">
                <p className="text-gray-600 text-sm">Call To Ask Any Questions</p>
                <h5 className="text-lg font-semibold flex items-center">
                  <FaPhoneAlt className="mr-2 text-primary" /> +234 812 631 0488
                </h5>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src={ServiceImg1}
              alt="Endoscopy Service"
              className="shadow-lg w-full"
            />
          </div>
        </div>

        {/* Service Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Image */}
          <div>
            <img
              src={ServiceImg2}
              alt="Imaging Service"
              className=" shadow-lg w-full"
            />
          </div>

          {/* Text with Progress Bars */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">
              Imaging & Cancer Care
            </h4>
            <p className="text-gray-600 mb-6">
              Our centre is equipped with advanced imaging facilities and a
              dedicated oncology team, ensuring precise diagnosis, early cancer
              detection, and comprehensive treatment planning.
            </p>

            {/* Progress Bars */}
            {[
              { title: "Ultrasound & X-Ray Imaging", percent: 90 },
              { title: "Cancer Screening & Diagnosis", percent: 95 },
              { title: "Chemotherapy & Oncology Support", percent: 85 },
              { title: "Palliative & Preventive Care", percent: 88 },
            ].map((bar, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between mb-1">
                  <span>{bar.title}</span>
                  <span>{bar.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full"
                    style={{ width: `${bar.percent}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
