import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { navItemsPatient } from "../../utils/dashboardUtils";
import useAuth from "../../hooks/useAuth";
import { useLayoutEffect } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";

function PatientLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAuth();

  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
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
