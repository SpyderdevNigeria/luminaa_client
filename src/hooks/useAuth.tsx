/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IUser } from "../types/Interfaces";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import ProfileApi from "../api/profileApi";
import { updateUser, logout } from "../reducers/authSlice";
import routeLinks from "../utils/routes";
import { useNavigate } from "react-router-dom";

export interface AuthInfo {
  userProfile: IUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
}

export const useAuth = (): AuthInfo => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await ProfileApi.getProfile();
        if (res?.data) {
          dispatch(updateUser(res.data));
          if (!res.data.isEmailVerified) {
            navigate(routeLinks?.auth?.emailVerification);
          } else if (!res.data.dateOfBirth) {
            navigate(routeLinks?.patient?.onboarding);
          }
        }
      } catch (error: any) {
        console.error("Failed to fetch user profile:", error);
        if (error?.response?.status === 401) {
          dispatch(logout());
        }
      } finally {
        setAuthLoading(false);
      }
    };

    fetchProfile();
  }, []);

  const userProfile = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return { userProfile, isAuthenticated, authLoading };
};

export default useAuth;
