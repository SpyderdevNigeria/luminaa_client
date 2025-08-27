import { useState } from "react";
import { faqs } from "../../utils/businessUtils";
import website from "../../utils/website";

export default function FAQPage() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <div className="relative py-16">
      <div className="business-container mx-auto flex flex-col lg:flex-row gap-8">
        {/* FAQ Section */}
        <div className="lg:w-2/3 w-full md:p-8">
          <div className="mb-6">
            <h5 className="text-3xl md:text-4xl font-bold mt-2 mb-4">
              Frequently Asked Questions
            </h5>
            <p className="text-gray-600 mt-2">
              Below you’ll find answers to some of the most frequently asked questions at Tectxon. 
              We are constantly adding more questions to this page, so if you don’t see your answer, 
              feel free to email us at{" "}
              <a href={`mailto:${website?.contact?.email}`} className="text-primary underline">
                {website?.contact?.email}
              </a>.
            </p>
          </div>

          {/* Accordion */}
          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <div key={faq.id} className="border-b border-gray-200 rounded-md overflow-hidden">
                <button
                  onClick={() => setActiveIndex(activeIndex === i ? null : i)}
                  className={`w-full flex justify-between items-center text-left font-medium p-4 transition-colors ${
                    activeIndex === i ? "bg-primary text-white" : "bg-primary/10 text-gray-800 hover:bg-primary/20"
                  }`}
                >
                  {faq.question}
                  <span className="text-xl">{activeIndex === i ? "−" : "+"}</span>
                </button>
                {activeIndex === i && (
                  <div className="p-4 bg-primary/10 text-gray-700 text-sm">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Submit Question Form */}
        <div className="lg:w-1/3 w-full">
          <div className="lg:sticky lg:top-32 bg-gray-100 p-4 md:p-6 rounded-md shadow-md">
            <div className="mb-6 text-center">
              <h2 className="text-xl font-semibold mb-2">Submit Question</h2>
              <p className="text-gray-700 text-sm">
                Fill in your details to consult with our team.
              </p>
            </div>

            <form className="space-y-4">
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
                  className="w-full bg-primary text-white py-3 rounded-md font-medium hover:bg-primary-dark transition"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
