import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import { navItemsDoctor } from "../../utils/dashboardUtils";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import { useLayoutEffect, useRef } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout, updateUser } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import DoctorApi from "../../api/doctorApi";

function DoctorLayout() {
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
   if (user.role !== "doctor") {
      dispatch(logout());
      navigate(routeLinks?.auth?.partnerLogin);
      return;
    }
  if (!licenseNumber && !hasFetchedProfile.current) {
      hasFetchedProfile.current = true;
      fetchProfile();
    }
    
  }, [authLoading, userProfile, navigate]);


    const fetchProfile = async () => {
    try {
      const res = await DoctorApi.getProfile();
      if (res?.data && userProfile) {
        dispatch(updateUser({
         ...res.data
        }));
      }
    } catch (error) {
      console.error("Failed to fetch profile:", error);
    }
  };

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  return (
    <div>
      <DashboardLayout links={navItemsDoctor} type={userProfile?.user?.role || ""} >
        <Outlet />
      </DashboardLayout>
    </div>
  );
}

export default DoctorLayout;
