import React from "react";

interface PageTitleProps {
  title: string;
  breadcrumb?: { name: string; href?: string }[];
}

const PageTitle: React.FC<PageTitleProps> = ({ title, breadcrumb }) => {
  return (
    <div className="bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center">
          {/* Title */}
          <h2 className="text-3xl font-bold mb-2">{title}</h2>

          {/* Breadcrumb */}
          {breadcrumb && breadcrumb.length > 0 && (
            <div className="flex space-x-2 text-gray-600 text-sm">
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
