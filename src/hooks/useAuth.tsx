/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IUser } from "../types/Interfaces";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import patientApi from "../api/PatientApi";
import { updateUser, logout, updateAuth } from "../reducers/authSlice";
import routeLinks from "../utils/routes";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

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

const useAuth = (): AuthInfo => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const userProfile = useAppSelector((state) => state.auth.user);
  const isAuthenticated = useAppSelector((state) => state.auth.isAuthenticated);
  const [authLoading, setAuthLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await patientApi.getProfile();
      if (res) {
        console.log("Fetched profile:", res);
        dispatch(updateUser(res));

        if (!res.user.isEmailVerified) {
          navigate(routeLinks.auth.emailVerification);
        } else if (!res.isBioDataCompleted) {
          navigate(routeLinks.patient.onboarding);
        }
        dispatch(updateAuth(false));
      }
    } catch (error: any) {
      console.error("Failed to fetch user profile:", error);
      if (error?.response?.status === 401) {
        dispatch(logout());
        navigate(routeLinks.auth.login);
       
      }
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (isAuthenticated) {
      fetchProfile();
      return;
    }
    if (userProfile?.user?.role !== "patient") {
        dispatch(logout());
        navigate(routeLinks.auth.login);
    }
    if (!isTokenValid(token) || userProfile) {
      setAuthLoading(false);
      return;
    }
    fetchProfile();
  }, []);

  return {
    userProfile,
    isAuthenticated: !!isAuthenticated,
    authLoading,
  };
};

export default useAuth;
