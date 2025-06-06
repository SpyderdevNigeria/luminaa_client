import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { navItemsDoctor } from "../../utils/dashboardUtils";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import { useLayoutEffect } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

function DoctorLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = usePartnerAuth();
  const dispatch = useAppDispatch();

  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.partnerLogin);
    }

     if (userProfile && userProfile.user &&  userProfile.user.isEmailVerified !== true) {
      navigate(routeLinks?.auth?.partnerEmailVerification);
    }
    if (userProfile && userProfile.user && userProfile.user.role !== "doctor") {
      dispatch(logout());
      navigate(routeLinks?.auth?.partnerLogin);
    }

    
  }, [authLoading, userProfile, navigate]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  return (
    <div>
      <DashboardLayout links={navItemsDoctor} bg={"bg-white"}>
        <Outlet />
      </DashboardLayout>
    </div>
  );
}

export default DoctorLayout;
