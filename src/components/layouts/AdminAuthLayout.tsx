import { Outlet, useNavigate, Link } from "react-router-dom";
import website from "../../utils/website";
import useAdminAuth from "../../hooks/useAdminAuth";
import { useLayoutEffect } from "react";
import LoadingScreen from "../loading/LoadingScreen";
import { returnAdminNavigationUrlLogic } from "../../utils/dashboardUtils";
import Multilingual from "../common/Multilingual";
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
    <div className="min-h-screen bg-white">
      {/* Left - Side*/}
      <div className="">
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

        <div className="px-4">
          <Outlet />
        </div>
      </div>

      {/* Right - Image & Testimonial Swiper */}
      {/* <PartnerInfoCarousel/> */}
    </div>
  );
}

export default AdminAuthLayout;
