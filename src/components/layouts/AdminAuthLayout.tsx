import { Outlet, useNavigate, Link } from "react-router-dom";
import website from "../../utils/website";
import useAdminAuth from "../../hooks/useAdminAuth";
import { useLayoutEffect } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { returnAdminNavigationUrlLogic } from "../../utils/dashboardUtils";
// import PartnerInfoCarousel from "../common/PartnerInfoCarousel";
function AdminAuthLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAdminAuth();
  useLayoutEffect(() => {
    if (userProfile && !authLoading) {
      const redirectUrl = returnAdminNavigationUrlLogic(
        userProfile.user.role,
        userProfile
      );
      navigate(redirectUrl);
    }
  }, [userProfile, authLoading, navigate]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen  grid grid-cols-1 lg:grid-cols-7 bg-white">
      {/* Left - Side*/}
      <div className="flex flex-col items-start px-6 sm:px-16 col-span-7">
        <Link to={'/'} className="flex justify-center mb-4">
       <img src={website?.logo} alt="Logo" className="h-8 md:h-14 mt-12 mb-24" />        </Link>
        <Outlet />
      </div>

      {/* Right - Image & Testimonial Swiper */}
      {/* <PartnerInfoCarousel/> */}
    </div>
  );
}

export default AdminAuthLayout;
