import { Outlet, useNavigate } from "react-router-dom";
import { useLayoutEffect, useRef } from "react";
import DashboardLayout from "./DashboardLayout";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout, updateUser } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import LabApi from "../../api/labApi";
import { navItemsLab } from "../../utils/dashboardUtils";
function LabLayout() {
  const navigate = useNavigate();
  const { userProfile, authLoading } = usePartnerAuth();
  const dispatch = useAppDispatch();
  const hasFetchedProfile = useRef(false);

  useLayoutEffect(() => {
    if (authLoading) return;

    if (!userProfile) {
      navigate(routeLinks?.auth?.partnerLogin);
      return;
    }

    const { user, licenseNumber } = userProfile;

    if (!user.isEmailVerified) {
      navigate(routeLinks?.auth?.partnerEmailVerification);
      return;
    }

    if (user.role !== "lab_tech") {
      dispatch(logout());
      navigate(routeLinks?.auth?.partnerLogin);
      return;
    }

    if (!licenseNumber && !hasFetchedProfile.current) {
      hasFetchedProfile.current = true;
      fetchProfile();
    }

  }, [authLoading, userProfile, navigate, dispatch]);

  const fetchProfile = async () => {
    try {
      const res = await LabApi.getProfile();
      if (res?.data && userProfile) {
        dispatch(updateUser({
          ...userProfile,
          user: {
            ...userProfile.user,
            ...res.data,
          }
        }));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  if (authLoading) return <LoadingScreen />;

  return (
    <DashboardLayout links={navItemsLab} bg="bg-white">
      <Outlet />
    </DashboardLayout>
  );
}

export default LabLayout;
