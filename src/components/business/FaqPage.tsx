import { useState } from "react";
import { motion } from "framer-motion";
import { faqs } from "../../utils/businessUtils";
import website from "../../utils/website";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <motion.div
      className="relative py-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
    >
      <div className="business-container mx-auto flex flex-col lg:flex-row gap-8">
        {/* FAQ Section */}
        <motion.div
          className="lg:w-2/3 w-full md:p-8"
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="mb-6">
            <motion.h5
              className="text-3xl md:text-4xl font-bold mt-2 mb-4"
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Frequently Asked Questions
            </motion.h5>
            <motion.p
              className="text-gray-600 mt-2"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              Below you’ll find answers to some of the most frequently asked
              questions at {website?.name}. We are constantly adding more
              questions to this page, so if you don’t see your answer, feel free
              to email us at{" "}
              <a
                href={`mailto:${website?.contact?.email}`}
                className="text-primary underline"
              >
                {website?.contact?.email}
              </a>
              .
            </motion.p>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <motion.div
                key={faq.id}
                className="border-b border-gray-200 overflow-hidden"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: 0.1 * i }}
              >
                <button
                  onClick={() =>
                    setActiveIndex(activeIndex === i ? null : i)
                  }
                  className={`w-full flex justify-between items-center text-left font-medium p-4 transition-colors ${
                    activeIndex === i
                      ? "bg-primary text-white"
                      : "bg-primary/10 text-gray-800 hover:bg-primary/20"
                  }`}
                >
                  {faq.question}
                  <span className="text-xl">
                    {activeIndex === i ? "−" : "+"}
                  </span>
                </button>
                {activeIndex === i && (
                  <motion.div
                    className="p-4 bg-primary/10 text-gray-700 text-sm"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <p>{faq.answer}</p>
                  </motion.div>
                )}
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Submit Question Form */}
        <motion.div
          className="lg:w-1/3 w-full"
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="lg:sticky lg:top-32 bg-gray-100 p-4 md:p-6  shadow-md">
            <motion.div
              className="mb-6 text-center"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.6 }}
            >
              <h2 className="text-xl font-semibold mb-2">Submit Question</h2>
              <p className="text-gray-700 text-sm">
                Fill in your details to consult with our team.
              </p>
            </motion.div>

            <motion.form
              className="space-y-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.7 }}
            >
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  className="w-full p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Email"
                  required
                  className="w-full p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Phone Number"
                  required
                  className="w-full p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              <div>
                <textarea
                  rows={4}
                  placeholder="Message"
                  required
                  className="w-full p-3 rounded border bg-white border-gray-300 focus:outline-none focus:ring-2 focus:ring-primary"
                ></textarea>
              </div>
              <div>
                <button
                  type="submit"
                  className="w-full bg-primary text-white py-3 font-medium hover:bg-primary-dark transition "
                >
                  Submit
                </button>
              </div>
            </motion.form>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}
