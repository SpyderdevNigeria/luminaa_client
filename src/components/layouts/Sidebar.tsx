import { useState } from "react";
import { Link } from "react-router-dom";
import website from "../../utils/website";
import Footer from "./SidebarFooter";

type LinkItem = {
  to: string;
  label: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  subLinks?: (LinkItem & { visible?: boolean })[];
};

type SidebarProps = {
  links: LinkItem[];
  active: { label: string };
};

function Sidebar({ links, active }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <aside className="hidden md:flex w-63 fixed inset-y-0 left-0 z-40 bg-white px-4 flex-col justify-between pb-2">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4">
          <img
            src={website?.logo}
            alt={website?.name}
            className="h-10 md:h-10"
          />
        </div>
        <h4 className="py-2 text-xs text-inactive font-medium">DASHBOARD</h4>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto  scrollbar-visible max-h-[calc(100vh-200px)] pr-1">
          <nav className="flex flex-col gap-1 font-medium mt-2">
            {links.map((item, idx) => {
              const isActive = active?.label === item.label;
              const hasDropdown = !item.to && item.subLinks?.length;

              return (
                <div key={idx} className="mb-1">
                  {hasDropdown ? (
                    <button
                      onClick={() => toggleDropdown(item.label)}
                      className={`w-full flex items-center text-sm p-1 rounded-lg mb-1 ${
                        isActive ? "text-primary" : "text-inactive"
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          className={`w-6 h-6 mx-2 ${
                            isActive ? "text-primary" : "text-inactive"
                          }`}
                        />
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.label ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>
                  ) : (
                    <Link
                      to={item.to}
                      className={`flex items-center text-sm p-1 my-1 rounded-lg  ${
                        isActive ? "text-primary" : "text-inactive"
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          className={`w-6 h-6 mx-2 ${
                            isActive ? "text-primary" : "text-inactive"
                          }`}
                        />
                      )}
                      {item.label}
                    </Link>
                  )}

                  {/* Dropdown content */}
                  {hasDropdown && openDropdown === item.label && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {item
                        .subLinks!.filter((sub) => sub?.visible !== false) // only show if visible !== false
                        .map((sub, subIdx) => (
                          <Link
                            key={subIdx}
                            to={sub.to}
                            className={`text-sm py-1 px-2 rounded ${
                              active?.label === sub.label
                                ? "text-primary font-semibold"
                                : "text-inactive"
                            }`}
                          >
                            {sub.label}
                          </Link>
                        ))}
                    </div>
                  )}
                </div>
              );
            })}
          </nav>
        </div>

        <Footer />
      </div>
    </aside>
  );
}

export default Sidebar;
