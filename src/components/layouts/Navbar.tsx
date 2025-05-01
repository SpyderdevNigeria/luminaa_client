import React from "react";
import { FiUser, FiLogOut, FiMenu, FiX } from "react-icons/fi";
import Notification from "./Notification";
import { Link } from "react-router-dom";
import routeLinks from "../../utils/routes";
type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: object
};
function Navbar({ sidebarOpen, setSidebarOpen, active }: NavbarProps) {
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  return (
    <header className="bg-white shadow px-4 md:px-24 py-6 flex items-center justify-between">

      <h1 className="text-base md:text-2xl text-primary-text font-semibold">{active?.title}</h1>

      <div className="flex items-center gap-4">
        {/* Notification */}
        <Notification />
        <div className="relative hidden md:block">
          <img
            src="https://i.pravatar.cc/40"
            alt="Profile"
            className="w-10 h-10 rounded-full cursor-pointer"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-40 bg-white rounded-md shadow-lg z-50">
              <Link
                to={routeLinks?.patient?.profile}
                className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiUser /> Profile
              </Link>
              <a
                href="#"
                className="px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
              >
                <FiLogOut /> Logout
              </a>
            </div>
          )}
        </div>

        {/* Hamburger Menu */}
        <button
          className="md:hidden"
          onClick={() => setSidebarOpen(!sidebarOpen)}
        >
          {sidebarOpen ? (
            <FiX className="text-xl" />
          ) : (
            <FiMenu className="text-xl" />
          )}
        </button>
      </div>
    </header>
  );
}

export default Navbar;
