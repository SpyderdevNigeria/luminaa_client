import { Link } from "react-router-dom";
import website from "../../utils/website";
import { GoSidebarExpand } from "react-icons/go";
import Footer from "./Footer";
type MobileSidebarProps = {
  links: any[];
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: {
    label:string,
  };
};
function MobileSidebar({
  active,
  links,
  sidebarOpen,
  setSidebarOpen,
}: MobileSidebarProps) {
  return (
    <div>
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50  z-40"
          onClick={() => setSidebarOpen(false)}
        >
          <aside
            className={`fixed top-0 left-0 h-full w-64 bg-white shadow-md z-50 transform transition-transform duration-300 ease-in-out ${
              sidebarOpen ? "translate-x-0" : "-translate-x-full"
            } md:hidden px-4 flex flex-col justify-between pb-2`}
          >
            <div>
              <div className="flex items-center justify-between py-4">
                <img
                  src={website?.logo}
                  alt={website?.name}
                  className="h-8 md:h-8"
                />
                <div className="hidden md:flex items-center gap-2 text-base text-primary-text ml-6 md:ml-18">
                  <GoSidebarExpand className="w-5 h-5" />
                </div>
              </div>
              <h4 className="py-2 text-xs text-inactive font-medium">
                DASHBOARD
              </h4>

              <nav className="flex flex-col gap-1  font-medium">
                {links.map((i, idx) => (
                  <Link
                    key={idx}
                    to={i?.to}
                    className={`flex items-center text-sm p-1 my-1 rounded-lg  font-[400] ${
                      active?.label === i?.label
                        ? "bg-active-primary text-primary"
                        : "text-inactive"
                    }`}
                  >
                    <i.icon
                      className={`w-6 h-6 mx-2 ${
                        active?.label === i?.label
                          ? "text-primary"
                          : "text-inactive"
                      }`}
                    />
                    {i.label}
                  </Link>
                ))}
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
