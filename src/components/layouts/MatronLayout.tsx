import { Outlet, useNavigate } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";
import {  navItemsMatron } from "../../utils/dashboardUtils";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import { useLayoutEffect, useRef } from "react";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../loading/LoadingScreen";
import { logout, updateUser } from "../../reducers/authSlice";
import { useAppDispatch } from "../../hooks/reduxHooks";
import NurseApi from "../../api/nurseApi";


function MatronLayout() {
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

     const { user, licenseNumber, } = userProfile;

     if (!user.isEmailVerified) {
      navigate(routeLinks?.auth?.partnerEmailVerification);
      return;
    }
   if (user.role !== "nurse" ) {
      dispatch(logout());
      navigate(routeLinks?.auth?.partnerLogin);
      return;
    }
    if ( userProfile?.isMatron !== true) {
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
      const res = await NurseApi.getProfile();
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
      <DashboardLayout links={navItemsMatron} type={"matron"} >
        <Outlet />
      </DashboardLayout>
    </div>
  );
}

export default MatronLayout;
