import { FaMinus, FaPhoneAlt, FaFlask } from "react-icons/fa";
import ServiceImg1 from "../../../assets/images/business/single-img-four.jpg";
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
            Our excellent team is ready to be part of your team to work into the
            different areas of diagnoses. Scientists helping scientists.
          </p>
        </div>

        {/* Service Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mb-20">
          {/* Text */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">
              We Are Laboratory Technologies
            </h4>
            <p className="text-gray-600 mb-6">
              Our scientists and engineers focus their extreme curiosity on
              national & health related challenges. Learn more about the
              Laboratory’s work below segment.
            </p>

            {/* List */}
            <ul className="space-y-3 mb-6">
              {[
                "Analytical Balances and Proper Weighing Practices",
                "Solutions for Cannabis Sample Preparation and Analysis",
                "Three Steps to Better Reproducibility in Research Labs",
                "Analytical Balances and Proper Weighing Practices",
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
                  <h5 className="text-lg font-semibold">20 Years</h5>
                  <p className="text-gray-600 text-sm">Of Lab Experience</p>
                </div>
              </div>
              {/* Phone Box */}
              <div className="pl-8 border-l">
                <p className="text-gray-600 text-sm">Call To Ask Any Questions</p>
                <h5 className="text-lg font-semibold flex items-center">
                  <FaPhoneAlt className="mr-2 text-primary" /> +123-456-7890
                </h5>
              </div>
            </div>
          </div>

          {/* Image */}
          <div>
            <img
              src={ServiceImg1}
              alt="Lab Service 1"
              className="rounded-lg shadow-lg w-full"
            />
          </div>
        </div>

        {/* Service Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Image */}
          <div>
            <img
              src={ServiceImg2}
              alt="Lab Service 2"
              className="rounded-lg shadow-lg w-full"
            />
          </div>

          {/* Text with Progress Bars */}
          <div>
            <h4 className="text-2xl font-semibold mb-4">
              The Lab Trusted Experts
            </h4>
            <p className="text-gray-600 mb-6">
              We know how to bring the security you need. With an experience in
              a wide range of fields and devices.
            </p>

            {/* Progress Bars */}
            {[
              { title: "Sample Preparation", percent: 78 },
              { title: "Environmental Testing", percent: 92 },
              { title: "Advanced Microscopy", percent: 70 },
              { title: "Environmental Testing", percent: 92 },
            ].map((bar, idx) => (
              <div key={idx} className="mb-4">
                <div className="flex justify-between  mb-1">
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
