import { Outlet } from "react-router-dom";
// import website from "../../utils/website";
// import useAuth from "../../hooks/useAuth";
// import { useLayoutEffect } from "react";
// import LoadingScreen from "../loading/LoadingScreen";
// import { returnMemberNavigationUrlLogic } from "../../utils/dashboardUtils";

function PartnerAuthLayout() {
//   const navigate = useNavigate();
//   const { userProfile, authLoading } = useAuth();
//   useLayoutEffect(() => {
//     if (userProfile && !authLoading) {
//       const redirectUrl = returnMemberNavigationUrlLogic(userProfile);
//       navigate(redirectUrl);
//     }
//   }, [userProfile, authLoading, navigate]);

  // Loading while auth is verifying
//   if (authLoading) return <LoadingScreen />;

  return (
      <div>
        <Outlet />
    </div>
  );
}

export default PartnerAuthLayout;
