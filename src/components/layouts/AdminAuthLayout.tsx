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

  if (authLoading) return <LoadingScreen />;

  return (
    <div className="min-h-screen  grid grid-cols-1 lg:grid-cols-7 bg-white">
      {/* Left - Side*/}
      <div className="flex flex-col items-start px-6 gap-8  col-span-7">
        <Link to={'/'} className="flex justify-center  p-4 md:p-4">
          <img src={website?.logo} alt="Logo"

            className={` ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`}

          /> </Link>
        <Outlet />
      </div>

      {/* Right - Image & Testimonial Swiper */}
      {/* <PartnerInfoCarousel/> */}
    </div>
  );
}

export default AdminAuthLayout;
