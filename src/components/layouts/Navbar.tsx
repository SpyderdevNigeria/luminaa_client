import React, { useRef, useEffect } from "react";
import {  FiMenu, FiX } from "react-icons/fi";
import Notification from "./Notification";
import { useAppSelector } from "../../hooks/reduxHooks";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: {
    title: string;
    sublink?: string
  };
};

function Navbar({ sidebarOpen, setSidebarOpen, active }: NavbarProps) {
  const userProfile = useAppSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="bg-white  px-4 md:px-8 py-6 border border-dashboard-gray flex items-center justify-between">
      <h1 className="text-base md:text-2xl text-primary-text font-semibold">
        <span className={`${active?.sublink && 'font-light'}`}>{active?.title}</span> {active?.sublink}
      </h1>

      <div className="flex items-center gap-4">
        <Notification />

        {/* Avatar & Dropdown */}
        <div className="relative hidden md:block" ref={dropdownRef}>
          <img
            src={userProfile?.user?.profilePicture?.url || "ee" }
            alt={userProfile?.user?.firstName + " " + userProfile?.user?.lastName}
            className="w-10 h-10 rounded-full cursor-pointer bg-gray-100"
            onClick={() => setDropdownOpen(!dropdownOpen)}
          />
          {/* {dropdownOpen && (
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
          )} */}
        </div>

        {/* Hamburger Menu */}
        <button className="md:hidden" onClick={() => setSidebarOpen(!sidebarOpen)}>
          {sidebarOpen ? <FiX className="text-xl" /> : <FiMenu className="text-xl" />}
        </button>
      </div>
    </header>
  );
}

export default Navbar;