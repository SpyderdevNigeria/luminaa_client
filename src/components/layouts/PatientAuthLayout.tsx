import { Outlet, Link, useNavigate } from "react-router-dom";
import Background from "../../assets/images/auth/Desktop - 7.webp";
import website from "../../utils/website";
import useAuth from "../../hooks/useAuth";
import { useLayoutEffect } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { returnMemberNavigationUrlLogic } from "../../utils/dashboardUtils";
import Multilingual from "../common/Multilingual";

function PatientAuthLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAuth();
  useLayoutEffect(() => {
    if (userProfile && !authLoading) {
      const redirectUrl = returnMemberNavigationUrlLogic(userProfile);
      navigate(redirectUrl);
    }
  }, [userProfile, authLoading, navigate]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="p-4 md:p-8 flex flex-row items-center justify-between  ">
        <div className="w-36 md:w-44">
          <Link to="/">
            <img
              src={website?.logo}
              alt="Logo"
              className={` mx-auto md:mx-0 ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`}
            />
          </Link>
        </div>
        <Multilingual />
      </div>

      <div className="px-4 md:px-0">
        <Outlet />
      </div>
    </div>
  );
}

export default PatientAuthLayout;
