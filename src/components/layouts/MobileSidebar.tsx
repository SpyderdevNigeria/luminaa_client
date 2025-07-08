import { useState } from "react";
import { Link } from "react-router-dom";
import website from "../../utils/website";
import { GoSidebarExpand } from "react-icons/go";
import Footer from "./SidebarFooter";

type LinkItem = {
  to: string;
  label: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  subLinks?: (LinkItem & { visible?: boolean })[];
};

type MobileSidebarProps = {
  links: LinkItem[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: {
    label: string;
  };
};

function MobileSidebar({
  active,
  links,
  sidebarOpen,
  setSidebarOpen,
}: MobileSidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (label: string) => {
    setOpenDropdown(openDropdown === label ? null : label);
  };

  return (
    <div>
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/50 z-40">
          <aside
            className={`fixed top-0 left-0 h-full w-full sm:w-64 bg-white shadow-md z-40 transform transition-transform duration-300 ease-in-out px-4 flex flex-col justify-between pb-2`}
          >
            <div>
              <div className="flex items-center justify-between py-4">
                <img
                  src={website?.logo}
                  alt={website?.name}
                 className={` ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`}
                />
                <div className="hidden md:flex items-center gap-2 text-base text-primary-text ml-6 md:ml-18">
                  <GoSidebarExpand className="w-5 h-5" />
                </div>
              </div>

              <h4 className="py-2 text-xs text-inactive font-medium">DASHBOARD</h4>

              <nav className="flex flex-col gap-1 font-medium">
                {links.map((item, idx) => {
                  const isActive = active?.label === item.label;
                  const hasDropdown = !item.to && item.subLinks?.length;

                  return (
                    <div key={idx} className="mb-1">
                      {hasDropdown ? (
                        <button
                          onClick={() => toggleDropdown(item.label)}
                          className={`w-full flex items-center text-sm p-1 my-1 rounded-lg font-[400] ${
                            isActive
                              ? "bg-active-primary text-primary"
                              : "text-inactive"
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
                          className={`flex items-center text-sm p-1 my-1 rounded-lg font-[400] ${
                            isActive
                              ? "bg-active-primary text-primary"
                              : "text-inactive"
                          }`}
                          onClick={() => setSidebarOpen(false)}
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

                      {/* Dropdown sublinks */}
                      {hasDropdown && openDropdown === item.label && (
                        <div className="ml-8 mt-1 flex flex-col gap-1">
                          {item.subLinks!
                            .filter((sub) => sub.visible !== false)
                            .map((sub, subIdx) => (
                              <Link
                                key={subIdx}
                                to={sub.to}
                                onClick={() => setSidebarOpen(false)}
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
          </aside>
        </div>
      )}
    </div>
  );
}

export default MobileSidebar;
