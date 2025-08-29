import { Outlet, Link, useNavigate } from "react-router-dom";
import website from "../../utils/website";
// import useAuth from "../../hooks/useAuth";
import { useLayoutEffect } from "react";
// import LoadingScreen from "../loading/LoadingScreen";
import { returnMemberNavigationUrlLogic } from "../../utils/dashboardUtils";
import Multilingual from "../common/Multilingual";
import ResetTheme from "../common/Resettheme";
import PatientImage from "../../assets/images/auth/auth-bg.jpg";
import { useSelector } from "react-redux";
function PatientAuthLayout() {
  const navigate = useNavigate();
  // const { userProfile, authLoading } = useAuth();
  const {user} = useSelector((state: any) => state.auth);
  // console.log(user);
  useLayoutEffect(() => {
    if (user) {
      console.log(user);
      const redirectUrl = returnMemberNavigationUrlLogic(user);
      navigate(redirectUrl);
    }
  }, [user, navigate]);

  // if (authLoading) return <LoadingScreen />;

  return (
    <ResetTheme>
<div className="min-h-screen flex flex-col lg:flex-row h-full">
  {/* LEFT SIDE (fixed sidebar) */}
  <div className="hidden lg:flex w-[500px] min-h-screen h-full text-white flex-col justify-between fixed left-0 top-0">
    {/* Background Image with Black Overlay */}
    <div
      className="absolute inset-0 bg-cover bg-center"
      style={{ backgroundImage: `url(${PatientImage})` }}
    ></div>
    <div className="absolute inset-0 bg-black/70"></div>

    {/* Top Logo */}
    <div className="relative z-10 p-6 flex justify-start">
      <Link to="/">
        <img
          src={website?.logo}
          alt="Hospital Logo"
          className={`mx-auto md:mx-0 ${
            website?.square ? website?.logoSquareSize : website?.logoRegularSize
          }`}
        />
      </Link>
    </div>

    {/* Center Content */}
    <div className="relative z-10 flex flex-col items-center justify-center text-center flex-grow px-6">
      <h2 className="text-3xl font-bold mb-2">Welcome to Our Care</h2>
      <h3 className="text-lg italic mb-4">Your Health, Our Priority</h3>
      <p className="text-gray-200 max-w-xs">
        Access world-class healthcare services and manage your hospital
        visits with ease.
      </p>
    </div>

    {/* Footer */}
    <div className="relative z-10 text-center text-white/60 text-sm pb-6">
      <p>© {new Date().getFullYear()} {website?.name}. All rights reserved.</p>
    </div>
  </div>

  {/* RIGHT SIDE (auth forms) */}
  <div className="flex-1 flex flex-col justify-center lg:ml-[500px]">
    {/* Header */}
    <div className="p-4 md:px-8 flex flex-row items-center justify-between">
      {/* Logo (mobile) */}
      <div className="w-28 md:w-36 md:hidden">
        <Link to="/">
          <img
            src={website?.logo}
            alt="Logo"
            className={`mx-auto md:mx-0 ${
              website?.square ? website?.logoSquareSize : website?.logoRegularSize
            }`}
          />
        </Link>
      </div>

      {/* Multilingual (desktop) */}
      <div className="hidden md:block">
        <Multilingual />
      </div>
    </div>

    {/* Outlet Content Centered */}
    <div className="flex-grow px-4 md:px-10 flex items-center justify-center">
      <Outlet />
    </div>

    {/* Mobile Multilingual */}
    <div className="md:hidden p-4 flex justify-center">
      <Multilingual />
    </div>
  </div>
</div>

    </ResetTheme>
  );
}

export default PatientAuthLayout;
