import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { navItemsSuperAdmin } from "../../utils/dashboardUtils";
import { useLayoutEffect } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import useAdminAuth from "../../hooks/useAdminAuth";

function SuperAdminLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAdminAuth();
  const dispatch = useAppDispatch();

  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.login);
    }

    //  if (userProfile && userProfile.user &&  userProfile.user.isEmailVerified !== true) {
    //   navigate(routeLinks?.auth?.partnerEmailVerification);
    // }
    if (userProfile && userProfile.user && userProfile.user.role !== "super_admin") {
      dispatch(logout());
      navigate(routeLinks?.auth?.login);
    }

    
  }, [authLoading, userProfile, navigate]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  return (
    <div>
      <DashboardLayout links={navItemsSuperAdmin} >
        <Outlet />
      </DashboardLayout>
    </div>
  );
}

export default SuperAdminLayout;
