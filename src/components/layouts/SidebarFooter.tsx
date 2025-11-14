import { AiOutlineLogout } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import routeLinks from "../../utils/routes";
import { useState } from "react";
import LogoutModal from "../modal/LogoutModal";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { logout } from "../../reducers/authSlice";

function SidebarFooter() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate(); 
  const dispatch = useAppDispatch();
  const userProfile = useAppSelector((state) => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutOpen(false);
     navigate(routeLinks.auth.login);

  };

  const handleNavigateToHelpCenter = () => {
    let url = "";

    switch (userProfile?.user?.role) {
      case "patient":
        url = routeLinks.patient?.helpCenter;
        break;
      case "doctor":
        url = routeLinks.doctor?.helpCenter;
        break;
      case "admin":
        url = routeLinks.admin?.helpCenter;
        break;
      case "super_admin":
        url = routeLinks.superAdmin?.helpCenter;
        break;
      case "pharmacist":
        url = routeLinks.pharmacist?.helpCenter;
        break;
      case "nurse":
        if (userProfile?.isMatron) {
          url = routeLinks.matron?.helpCenter;
        } else {
          url = routeLinks.nurse?.helpCenter;
        }
        break;
      case "lab_tech":
        url = routeLinks.lab?.helpCenter;
        break;
      default:
        url = "/";
        break;
    }

    navigate(url);
  };

  return (
    <div className="flex flex-col gap-3">
      <LogoutModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        handleLogout={handleLogout}
      />

      <button onClick={handleNavigateToHelpCenter} className="flex items-center text-sm p-2 font-[400]">
        <BsQuestionCircle className="w-6 h-6 mx-2" />
        Help
      </button>

      <button
        onClick={() => setIsLogoutOpen(true)}
        type="button"
        className="flex items-center text-sm p-2 font-[400]"
      >
        <AiOutlineLogout className="w-6 h-6 mx-2" />
        Log out
      </button>
    </div>
  );
}


export default SidebarFooter;


