import React from "react";
import Background from "../../assets/images/business/pagetitle/pagetitle-bg.jpg";
interface PageTitleProps {
  title: string;
  breadcrumb?: { name: string; href?: string }[];
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumb }) => {
  return (
    <div
      className="relative w-full bg-cover bg-center bg-no-repeat h-[240px] "
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="absolute inset-0 bg-black/40 z-0"></div>
      <div className="business-container  h-full relative z-10 mt-20">
        <div className="flex flex-col items-start justify-center text-center h-full">
          {/* Title with left bar */}
          <div className="relative inline-block mb-3">
            <h2 className="text-3xl md:text-4xl font-bold text-white pl-6 relative">
              {title}
            </h2>
            <span className="absolute left-0 top-0 h-full w-1 bg-primary"></span>
          </div>

          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex space-x-2 text-gray-200 text-sm">
              {breadcrumb.map((item, index) => (
                <React.Fragment key={index}>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="hover:text-primary transition-colors"
                    >
                      {item.name}
                    </a>
                  ) : (
                    <span>{item.name}</span>
                  )}
                  {index < breadcrumb.length - 1 && <span>/</span>}
                </React.Fragment>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PageTitle;
