import React, { useRef, useEffect, useState } from "react";
import { FiLogOut, FiMenu, FiUser, FiX } from "react-icons/fi";
import Notification from "./Notification";
import { useAppSelector, useAppDispatch } from "../../hooks/reduxHooks";
import UserImage from "../../assets/images/patient/user.png";
import PartnerImage from "../../assets/images/doctor/doctor.png";
import { useNavigate } from "react-router-dom";
import routeLinks from "../../utils/routes";
import LogoutModal from "../modal/LogoutModal";
import { logout } from "../../reducers/authSlice";
import Multilingual from "../common/Multilingual";

// import ThemeToggle from "../common/ThemeToggle";

type NavbarProps = {
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  active: {
    title: string;
    sublink?: string;
  };
  type:string
};

function Navbar({ sidebarOpen, setSidebarOpen, active, type}: NavbarProps) {
  const userProfile = useAppSelector((state) => state.auth.user);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
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

  const handleNavigate = () => {
    switch (userProfile?.user?.role) {
      case "patient":
        return navigate(routeLinks?.patient?.profile);
      case "doctor":
        return navigate(routeLinks?.doctor?.profile);
      case "lab_tech":
        return navigate(routeLinks?.lab?.profile);
      case "pharmacist":
        return navigate(routeLinks?.pharmacist?.profile);
      case "admin":
        return navigate(routeLinks?.admin?.profile);
      case "super_admin":
        return navigate(routeLinks?.superAdmin?.profile);
      default:
        break;
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutOpen(false);
    navigate(routeLinks.auth.login);
  };
  return (
    <div>
      <header className="  px-4 2xl:px-10 py-4 bg-white   flex items-center justify-between">
        <div>
          <h1 className="text-base md:text-2xl text-primary-text font-semibold text-primary uppercase">{type}</h1>
                <h1 className="text-base md:text-sm text-primary-text ">
          <span className={`${active?.sublink && "font-light"}`}>
            {active?.title}
          </span>{" "}
          {active?.sublink}
        </h1>
        </div>


        <div className="flex items-center gap-4">
          <Multilingual/>
          <Notification />

          {/* Avatar & Dropdown */}
          <div className="relative hidden md:block" ref={dropdownRef}>
            <img
              src={
                userProfile?.user?.profilePicture
                  ? userProfile?.user?.profilePicture?.url
                  : userProfile?.role === "patient"
                  ? UserImage
                  : PartnerImage
              }
              alt={
                userProfile?.user?.firstName + " " + userProfile?.user?.lastName
              }
              className="w-10 h-10 rounded-full cursor-pointer bg-gray-100"
              onClick={() => setDropdownOpen(!dropdownOpen)}
            />
            {dropdownOpen && (
              <div className="absolute right-0 mt-2 w-40 bg-white  rounded-md shadow-lg z-50">
                <button
                  onClick={handleNavigate}
                  className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiUser /> Profile
                </button>
                <button
                  onClick={() => setIsLogoutOpen(true)}
                  className="w-full px-4 py-2 text-sm hover:bg-gray-100 flex items-center gap-2"
                >
                  <FiLogOut /> Logout
                </button>
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
      <LogoutModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        handleLogout={handleLogout}
      />
    </div>
  );
}

export default Navbar;
