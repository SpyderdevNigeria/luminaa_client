import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { navItemsPatient } from "../../utils/dashboardUtils";
import useAuth from "../../hooks/useAuth";
import { useLayoutEffect } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";

function PatientLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAuth();
  const dispatch = useAppDispatch();

  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.login);
    }
    if (userProfile && userProfile.user && userProfile.user.role !== 'patient') {
      dispatch(logout());
      navigate(routeLinks?.auth?.login);
    }
  }, [authLoading, userProfile, navigate]);

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  
  return (
    <div>
      <DashboardLayout links={navItemsPatient}>
        <Outlet />
      </DashboardLayout>
    </div>
  );
}

export default PatientLayout;


