import React from "react";

interface AboutUsProps {
  sectionTitle: string;
  subtitle: string;
  description: string;
  listLeft: string[];
  listRight: string[];
  callNumbers: string[];
  signature: string;
  founder: string;
  founderRole: string;
  bgImage: string;
  mainImage: string;
}

const AboutUsSection: React.FC<AboutUsProps> = ({
  sectionTitle,
  subtitle,
  description,
  listLeft,
  listRight,
  callNumbers,
  signature,
  founder,
  founderRole,
  bgImage,
  mainImage,
}) => {
  return (
    <section
      className="relative py-20"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container mx-auto">
        <div className="flex flex-col lg:flex-row items-center">
          {/* Left Column */}
          <div className="lg:w-1/2 w-full lg:pl-24 mb-10 lg:mb-0">
            <div className="bg-white bg-opacity-90 p-8 rounded-lg shadow-lg">
              {/* Section Title */}
              <div className="mb-6">
                <h5 className="text-skincolor uppercase">{sectionTitle}</h5>
                <h2 className="text-3xl md:text-4xl font-bold">{subtitle}</h2>
                <p className="mt-4 text-gray-700">{description}</p>
              </div>

              {/* Lists */}
              <div className="flex flex-wrap -mx-2 mt-6">
                <div className="w-1/2 px-2">
                  <ul className="space-y-2">
                    {listLeft.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fa fa-arrow-circle-right text-skincolor mt-1 mr-2"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="w-1/2 px-2">
                  <ul className="space-y-2">
                    {listRight.map((item, idx) => (
                      <li key={idx} className="flex items-start">
                        <i className="fa fa-arrow-circle-right text-skincolor mt-1 mr-2"></i>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* Call Numbers */}
              <div className="flex flex-wrap items-center mt-8 gap-4">
                <h6 className="font-semibold">Call to ask <u>any question.</u></h6>
                <div className="flex items-center gap-2">
                  {callNumbers.map((num, idx) => (
                    <span key={idx} className="font-bold">{num}</span>
                  ))}
                </div>
              </div>

              <hr className="border-t border-gray-300 my-6" />

              {/* Signature / Founder */}
              <div className="flex items-center">
                <img src={signature} alt="signature" className="w-24 mr-4" />
                <div>
                  <h5 className="font-semibold">{founder}</h5>
                  <p className="text-gray-500">{founderRole}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:w-1/2 w-full">
            <div className="text-right">
              <img src={mainImage} alt="About us" className="mx-auto lg:mx-0" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUsSection;
