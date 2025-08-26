import React from "react";

interface Service {
  icon: string; // FontAwesome or any icon class
  title: string;
}

interface ServicesSectionProps {
  sectionTitle: string;
  subtitle: string;
  description: string;
  services: Service[];
  footerText: string;
  footerLink: string;
  bgImage: string;
  bgColor?: string;
}

const ServicesSection: React.FC<ServicesSectionProps> = ({
  sectionTitle,
  subtitle,
  description,
  services,
  footerText,
  footerLink,
  bgImage,
  bgColor = "bg-skincolor",
}) => {
  return (
    <section
      className={`relative py-20 ${bgColor} bg-cover bg-center`}
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="container mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center mb-12 text-center px-4">
          <h5 className="text-white uppercase">{sectionTitle}</h5>
          <h2 className="text-3xl md:text-4xl font-bold text-white mt-2">{subtitle}</h2>
          <p className="text-white mt-3 max-w-2xl">{description}</p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {services.map((service, idx) => (
            <div key={idx} className="flex flex-col items-center text-center">
              <div className="bg-white rounded-full p-5 mb-4 text-skincolor text-3xl shadow-lg">
                <i className={service.icon}></i>
              </div>
              <h5 className="font-semibold text-white">{service.title}</h5>
            </div>
          ))}
        </div>

        {/* Footer */}
        <div className="mt-12 text-center text-white">
          <strong>
            {footerText} <u><a href={footerLink}>{footerLink}</a></u>
          </strong>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
