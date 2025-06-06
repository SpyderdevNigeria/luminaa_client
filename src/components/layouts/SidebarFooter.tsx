import { AiOutlineLogout } from "react-icons/ai";
import { BsQuestionCircle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import routeLinks from "../../utils/routes";
import { useState } from "react";
import LogoutModal from "../modal/LogoutModal";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { logout } from "../../reducers/authSlice";

function SidebarFooter() {
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
    setIsLogoutOpen(false);
    navigate(routeLinks.auth.login);
  };

  return (
    <div className="flex flex-col gap-3">
      <LogoutModal
        open={isLogoutOpen}
        onClose={() => setIsLogoutOpen(false)}
        handleLogout={handleLogout}
      />
      <Link to="" className="flex items-center text-sm p-2 font-[400]">
        <BsQuestionCircle className="w-6 h-6 mx-2" />
        Help me
      </Link>

      {/* Wire this button to open the logout confirmation */}
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
