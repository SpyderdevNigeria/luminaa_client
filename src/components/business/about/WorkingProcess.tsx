import React from "react";

interface ProcessStep {
  icon: string; // Icon class or React Icon component
  number: string;
  title: string;
  description: string;
  arrow?: string; // Optional arrow image URL
  arrowFlip?: boolean; // Flip arrow if needed
}

interface WorkingProcessProps {
  sectionTitle: string;
  subtitle: string;
  description: string;
  steps: ProcessStep[];
  bgImage: string;
  bgColor?: string;
}

const WorkingProcess: React.FC<WorkingProcessProps> = ({
  sectionTitle,
  subtitle,
  description,
  steps,
  bgImage,
  bgColor = "bg-gray-100",
}) => {
  return (
    <section
      className={`relative py-20 ${bgColor} bg-cover bg-center`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12">
          <h5 className="text-gray-700 uppercase">{sectionTitle}</h5>
          <h2 className="text-3xl md:text-4xl font-bold mt-2">{subtitle}</h2>
          <p className="text-gray-600 mt-3">{description}</p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, idx) => (
            <div key={idx} className="text-center relative">
              <div className="flex flex-col items-center bg-white p-6 rounded-lg shadow-lg">
                <div className="relative mb-4">
                  <div className="bg-skincolor text-white w-16 h-16 flex items-center justify-center rounded-full text-2xl relative">
                    <i className={step.icon}></i>
                    <span className="absolute -top-3 -right-3 bg-white text-skincolor w-6 h-6 flex items-center justify-center rounded-full font-bold text-sm">
                      {step.number}
                    </span>
                  </div>
                </div>
                <h5 className="font-semibold mb-2">{step.title}</h5>
                <p className="text-gray-600">{step.description}</p>
              </div>

              {step.arrow && (
                <div
                  className={`absolute top-1/2 transform -translate-y-1/2 ${
                    step.arrowFlip ? "right-full mr-4 rotate-180" : "left-full ml-4"
                  }`}
                >
                  <img src={step.arrow} alt="arrow" className="w-12 h-auto" />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WorkingProcess;
