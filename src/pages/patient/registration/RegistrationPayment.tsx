import {usePaystackPayment} from "../../../hooks/usePaystackPayment"; 
import website from "../../../utils/website";
import { EntityType } from "../../../types/Interfaces";
import { useNavigate } from "react-router-dom";
import { useEffect, useLayoutEffect } from "react";
import routeLinks from "../../../utils/routes";
import useAuth from "../../../hooks/useAuth";
import { logout } from "../../../reducers/authSlice";
import { useAppDispatch } from "../../../hooks/reduxHooks";


export default function RegistrationPayment() {
  const { initializePayment, loading, message } = usePaystackPayment();
    const  navigate = useNavigate();
      const { userProfile, authLoading } = useAuth();
    const dispatch = useAppDispatch();
  const handlePayment = () => {
    if (!userProfile?.id) return alert("User not found. Please log in again.");
    initializePayment(EntityType.PATIENT_REGISTRATION, userProfile?.id);
  };

    useLayoutEffect(() => {
      if (!authLoading && !userProfile) {
        navigate(routeLinks?.auth?.login);
      }
      if (userProfile && userProfile.user && userProfile.user.role !== "patient") {
        dispatch(logout());
        navigate(routeLinks?.auth?.login);
      }
    }, [authLoading, userProfile, navigate, dispatch]);
  useEffect(() => {
    if (userProfile?.registrationPaymentStatus === "completed") {
      navigate(routeLinks?.patient?.dashboard);
    }
  }, [userProfile, navigate]);
  console.log(  userProfile);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg space-y-6">
        {/* Website Logo */}
        {website?.logo && (
          <img
            src={website.logo}
            alt="logo"
            className={`object-contain mx-auto ${
              website?.square
                ? website?.logoSquareSize || "w-24 h-24"
                : website?.logoRegularSize || "w-32 h-20"
            }`}
          />
        )}

        {/* Heading */}
        <h2 className="text-2xl font-bold text-center text-gray-800">
          Complete Your Registration Payment
        </h2>

        {/* Description */}
        <p className="text-gray-600 text-center">
          Thank you for registering with us. To complete your registration,
          please proceed to make a secure payment via Paystack.
        </p>

        {/* Info Box */}
        {message && (
          <div className="bg-blue-50 border border-blue-100 text-blue-700 text-sm p-3 rounded-lg text-center">
            {message}
          </div>
        )}

        {/* Payment Summary */}
        <div className="bg-gray-50 border border-gray-100 rounded-lg p-4 space-y-1 text-sm">
          <p>
            <span className="font-semibold text-gray-700">Patient Name:</span>{" "}
            {userProfile?.user?.firstName} {userProfile?.user?.lastName}
          </p>
          <p>
            <span className="font-semibold text-gray-700">Email:</span>{" "}
            {userProfile?.user?.email || "N/A"}
          </p>
        </div>

        {/* Pay Button */}
        <button
          onClick={handlePayment}
          disabled={loading}
          className="w-full bg-primary text-white font-semibold py-3 rounded-lg hover:bg-primary/90 transition disabled:opacity-50"
        >
          {loading ? "Processing Payment..." : "Pay with Paystack"}
        </button>

        {/* Footer */}
        <p className="text-xs text-gray-500 text-center">
          You’ll be redirected to Paystack’s secure checkout to complete your
          payment. Once successful, your registration will be activated
          automatically.
        </p>
      </div>
    </div>
  );
}


