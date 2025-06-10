import { Outlet, useNavigate, Link } from "react-router-dom";
import website from "../../utils/website";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import { useLayoutEffect } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { returnPartnerNavigationUrlLogic } from "../../utils/dashboardUtils";
import PartnerImage from "../../assets/images/auth/partnerAuth.png";
function PartnerAuthLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = usePartnerAuth();

  useLayoutEffect(() => {
    if (userProfile && !authLoading) {
      const redirectUrl = returnPartnerNavigationUrlLogic(
        userProfile.user.role,
        userProfile
      );
      navigate(redirectUrl);
    }
  }, [userProfile, authLoading, navigate]);

  if (authLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Logo + Image + Description */}
      <div
        className="bg-[#E9F6FF]   hidden md:block relative overflow-hidden bg-no-repeat bg-bottom bg-cover"
        style={{ backgroundImage: `url(${PartnerImage})`,  }}
      >
     <section className="max-w-md 2xl:max-w-xl mx-auto mt-18 2xl:mt-28  ">
         {/* Logo */}
        <div className="mb-6 text-start">
          <Link to="/" className="block">
            <img src={website?.logo} alt="Logo" className="h-10 2xl:h-16" />
          </Link>
        </div>

        {/* Heading */}
        <div className="">
          <h2 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 leading-18 tracking-tight  ">
            Get started with
            <br />
            <span className="text-primary">{website?.name}</span>
          </h2>
        </div>
     </section>
      </div>

      {/* Right - Form Area */}
      <div className="md:flex items-center justify-center px-6 sm:px-16 py-12 bg-white">
        {/* Logo for mobile */}
        <div className="mb-12 block md:hidden">
          <Link to="/" className="block">
            <img src={website?.logo} alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="w-full max-w-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default PartnerAuthLayout;
