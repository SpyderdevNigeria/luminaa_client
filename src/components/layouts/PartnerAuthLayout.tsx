import { Outlet, useNavigate, Link } from "react-router-dom";
import website from "../../utils/website";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import { useLayoutEffect } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { returnPartnerNavigationUrlLogic } from "../../utils/dashboardUtils";
import PartnerInfoCarousel from "../common/PartnerInfoCarousel";
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

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen  grid grid-cols-1 lg:grid-cols-2 bg-white">
      {/* Left - Side*/}
      <div className="flex flex-col justify-center px-6 sm:px-16">
        <Link to={'/'} className="flex justify-center mb-4">
  <img src={website?.logo} alt="Logo" className="w-32 2xl:w-50  h-10 2xl:h-15 mb-4" />        </Link>
        <Outlet />
      </div>

      {/* Right - Image & Testimonial Swiper */}
      <PartnerInfoCarousel/>
    </div>
  );
}

export default PartnerAuthLayout;
