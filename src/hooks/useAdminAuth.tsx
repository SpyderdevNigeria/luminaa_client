/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IUser } from "../types/Interfaces";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import { updateUser, logout } from "../reducers/authSlice";
import routeLinks from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import AdminApi from "../api/adminApi";

export interface AuthInfo {
  userProfile: IUser | null;
  isAuthenticated: boolean;
  authLoading: boolean;
}

interface DecodedToken {
  exp: number;
}

const isTokenValid = (token: string | null): boolean => {
  if (!token) return false;

  try {
    const decoded = jwtDecode<DecodedToken>(token);
    const currentTime = Date.now() / 1000;
    return decoded.exp > currentTime;
  } catch (err) {
    console.error("Invalid token:", err);
    return false;
  }
};

 const useAdminAuth = (): AuthInfo => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

    const fetchProfile = async () => {
    try {
      const res = await AdminApi.getProfile();
      if (res?.data) {
        dispatch(updateUser({ ...res?.data, user: res?.data }));
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


useEffect(() => {
  const token = localStorage.getItem("token");

  // If no valid token, or already have a userProfile, exit early
  if (!isTokenValid(token) || userProfile) {
    setAuthLoading(false);
    return;
  }

  // If the user is patient, log them out
  if (userProfile?.user?.role !== "admin") {
    dispatch(logout());
    navigate(routeLinks.auth.login);
    return;
  }

  // Only fetch if authenticated and no existing profile
  if (isAuthenticated && !userProfile) {
    fetchProfile();
    return;
  }

  // Fallback - fetch anyway if token exists and we’re not authenticated
  if (token && !isAuthenticated) {
    fetchProfile();
  } else {
    setAuthLoading(false);
  }
}, []);



  const userProfile = useAppSelector((state) => state.auth.user);
  const isAuthenticated = !!useAppSelector(
    (state) => state.auth.isAuthenticated
  );

  return { userProfile, isAuthenticated, authLoading };
};

export default useAdminAuth;
