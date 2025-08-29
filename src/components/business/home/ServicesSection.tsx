import { FaMinus, FaPhoneAlt, FaFlask } from "react-icons/fa";
import { motion } from "framer-motion";
import ServiceImg1 from "../../../assets/images/business/single-img-four.webp";
import ServiceImg2 from "../../../assets/images/business/single-img-five.jpg";

export default function ServicesSection() {
  return (
    <section className="relative bg-gray-100 py-16">
      <div className="business-container mx-auto px-4">
        {/* Section Header */}
        <motion.div
          className="max-w-2xl mx-auto text-center mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
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
        </motion.div>

        {/* Service Block 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10 mb-20">
          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-semibold mb-4">
              Endoscopy & Minimal Access Surgery
            </h4>
            <p className="text-gray-600 mb-6">
              We specialize in minimally invasive procedures that ensure early
              detection, accurate diagnosis, and faster recovery for our
              patients. Our advanced endoscopic technology brings global best
              practices to Port Harcourt.
            </p>

            {/* List with stagger */}
            <motion.ul
              className="space-y-3 mb-6"
              initial="hidden"
              whileInView="visible"
              variants={{
                hidden: {},
                visible: {
                  transition: { staggerChildren: 0.15 },
                },
              }}
              viewport={{ once: true }}
            >
              {[
                "Upper & Lower GI Endoscopy",
                "Diagnostic & Therapeutic Laparoscopy",
                "Hysteroscopy & Cystoscopy",
                "Cancer Screening & Preventive Care",
              ].map((item, idx) => (
                <motion.li
                  key={idx}
                  className="flex items-start text-gray-700"
                  initial={{ opacity: 0, y: 20 }}
                  variants={{ visible: { opacity: 1, y: 0 } }}
                  transition={{ duration: 0.5 }}
                >
                  <FaMinus className="text-primary mt-1 mr-2" />
                  <span>{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Experience & Call */}
            <motion.div
              className="flex items-center border-t pt-6"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              viewport={{ once: true }}
            >
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
            </motion.div>
          </motion.div>

          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={ServiceImg1}
              alt="Endoscopy Service"
              className="shadow-lg w-full"
            />
          </motion.div>
        </div>

        {/* Service Block 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 items-center gap-10">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <img
              src={ServiceImg2}
              alt="Imaging Service"
              className="shadow-lg w-full"
            />
          </motion.div>

          {/* Text with Progress Bars */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h4 className="text-2xl font-semibold mb-4">
              Imaging & Cancer Care
            </h4>
            <p className="text-gray-600 mb-6">
              Our centre is equipped with advanced imaging facilities and a
              dedicated oncology team, ensuring precise diagnosis, early cancer
              detection, and comprehensive treatment planning.
            </p>

            {/* Animated Progress Bars */}
            {[
              { title: "Ultrasound & X-Ray Imaging", percent: 90 },
              { title: "Cancer Screening & Diagnosis", percent: 95 },
              { title: "Chemotherapy & Oncology Support", percent: 85 },
              { title: "Palliative & Preventive Care", percent: 88 },
            ].map((bar, idx) => (
              <motion.div
                key={idx}
                className="mb-4"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: idx * 0.2 }}
                viewport={{ once: true }}
              >
                <div className="flex justify-between mb-1">
                  <span>{bar.title}</span>
                  <span>{bar.percent}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                  <motion.div
                    className="bg-primary h-2 rounded-full"
                    initial={{ width: 0 }}
                    whileInView={{ width: `${bar.percent}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                    viewport={{ once: true }}
                  ></motion.div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
