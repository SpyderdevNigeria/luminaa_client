/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { IUser } from "../types/Interfaces";
import { useAppDispatch, useAppSelector } from "./reduxHooks";
import ProfileApi from "../api/PatientApi";
import { updateUser, logout } from "../reducers/authSlice";
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

export const useAuth = (): AuthInfo => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [authLoading, setAuthLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!isTokenValid(token)) {
      setAuthLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const res = await ProfileApi.getProfile();
        if (res) {
          console.log(res)
          dispatch(updateUser(res));
          if (!res.user.isEmailVerified) {
            navigate(routeLinks?.auth?.emailVerification);
          } else
          if (!res.isBioDataCompleted) {
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