import { Link } from "react-router-dom";
import website from "../../utils/website";
import Footer from "./SidebarFooter";
type LinkItem = {
  to: string;
  label: string;
  title: string;
  icon: React.ComponentType<{ className?: string }>;
};

type sidebarProps = {
  links: LinkItem[];
  active: { label: string };
};
function Sidebar({ links, active }: sidebarProps) {
  return (
    <aside className="hidden md:flex w-63 fixed inset-y-0 left-0 z-40 bg-white  px-4 flex-col justify-between pb-2 ">
      <div>
        <div className="flex items-center justify-between py-4">
          <img src={website?.logo} alt={website?.name} className="h-10 md:h-10" />
        </div>
        <h4 className="py-2 text-xs text-inactive font-medium">DASHBOARD</h4>
        <nav className="flex flex-col gap-1  font-medium mt-2">
          {links.map((i, idx) => (
            <Link
              key={idx}
              to={i?.to}
              className={`flex items-center text-sm p-1 my-1 rounded-lg mb-2 ${
                active?.label === i?.label
                  ? "text-primary"
                  : "text-inactive"
              }`}
            >
              <i.icon
                className={`w-6 h-6 mx-2 ${
                  active?.label === i?.label ? "text-primary" : "text-inactive"
                }`}
              />
              {i.label}
            </Link>
          ))}
        </nav>
      </div>
     <Footer/>
    </aside>
  );
}

export default Sidebar;
