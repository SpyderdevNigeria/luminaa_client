import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import website from "../../utils/website";
import Footer from "./SidebarFooter";

export type LinkItem = {
  id: string;
  to?: string;
  label: string;
  title: string;
  icon?: React.ComponentType<{ className?: string }>;
  subLinks?: (LinkItem & { visible?: boolean })[];
};

type SidebarProps = {
  links: LinkItem[];
  active: {
    label: string;
    id: string;
  };
  type: string;
};

function Sidebar({ links, active, type }: SidebarProps) {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdown(openDropdown === id ? null : id);
  };

  useEffect(() => {
    setOpenDropdown(null)
    links.forEach((link) => {
      if (link.subLinks?.some((sub) => sub.id === active.id)) {
        setOpenDropdown(link.id);
      }
    });
  }, [active, links]);

  return (
    <aside className="hidden md:flex w-63 fixed inset-y-0 left-0 z-40 bg-white   px-4 flex-col justify-between pb-2">
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between py-4">
          <img
            src={website?.logo}
            alt={website?.name}
            className={`${
              website?.square
                ? website?.logoSquareSize
                : website?.logoRegularSize
            }`}
          />
        </div>
        <h4 className="py-2 text-xs text-inactive font-medium uppercase">{type || "Dashboard"}</h4>

        {/* Scrollable nav */}
        <div className="flex-1 overflow-y-auto scrollbar-visible max-h-[calc(100vh-200px)] pr-1">
          <nav className="flex flex-col gap-1 font-medium mt-2">
            {links.map((item) => {
              const hasDropdown = !item.to && item.subLinks?.length;

              return (
                <div key={item.id} className="mb-1">
                  {hasDropdown ? (
                    <button
                      type="button"
                      onClick={() => toggleDropdown(item.id)}
                      className={`w-full flex items-center text-sm p-1 rounded-lg mb-1 ${
                        openDropdown === item.id ? "text-primary" : "text-inactive"
                      }`}
                    >
                      {item.icon && (
                        <item.icon
                          className={`w-6 h-6 mx-2 ${
                            openDropdown === item.id ? "text-primary" : "text-inactive"
                          }`}
                        />
                      )}
                      <span className="flex-1 text-left">{item.label}</span>
                      <svg
                        className={`w-4 h-4 transform transition-transform ${
                          openDropdown === item.id ? "rotate-180" : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
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
                    item.to && (
                      <NavLink
                        to={item.to}
                        className={({ isActive }) =>
                          `flex items-center text-sm p-1 my-1 ${
                            isActive ? "text-primary  bg-primary/10 border-l-4 border-primary"  : "text-inactive"
                          }`
                        }
                      >
                        {item.icon && (
                          <item.icon
                            className={`w-6 h-6 mx-2 ${
                              openDropdown === item.id ? "text-primary" : "text-inactive "
                            } ${ active?.id === item.id ? "text-primary" : "text-inactive"}`}
                            
                          />
                        )}
                        {item.label}
                      </NavLink>
                    )
                  )}

                  {hasDropdown && openDropdown === item.id && (
                    <div className="ml-8 mt-1 flex flex-col gap-1">
                      {item.subLinks!
                        .filter((sub) => sub.visible !== false)
                        .map((sub) => (
                          <NavLink
                            key={sub.id}
                            to={sub.to!}
                            className={({ isActive }) =>
                              `text-sm py-1 px-2 rounded ${
                                isActive ? "text-primary font-semibold" : "text-inactive"
                              }`
                            }
                          >
                            {sub.label}
                          </NavLink>
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
