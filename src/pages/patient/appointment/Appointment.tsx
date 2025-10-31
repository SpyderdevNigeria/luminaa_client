import { useLayoutEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import website from "../../../utils/website";
import Booking from "./components/Booking";
import BookingCondition from "./components/BookingCondition";
import routeLinks from "../../../utils/routes";
import useAuth from "../../../hooks/useAuth";
import { logout } from "../../../reducers/authSlice";
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import ConditionImage from '../../../assets/images/appointment/condition.jpg';
function Appointment() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { userProfile, authLoading } = useAuth();


  const [showChoice, setShowChoice] = useState(false);
  const [showPremorbidForm, setShowPremorbidForm] = useState(false);

  // Redirect if not logged in or not a patient
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.login);
    }
    if (userProfile && userProfile.user && userProfile.user.role !== "patient") {
      dispatch(logout());
      navigate(routeLinks?.auth?.login);
    }
  }, [authLoading, userProfile, navigate, dispatch]);

  // Show choice screen if patient has no medical history
  useLayoutEffect(() => {
    if (!authLoading && userProfile && !userProfile?.medicalHistory) {
      setShowChoice(true);
    }
  }, [authLoading, userProfile, userProfile?.medicalHistory]);

  const handleSkip = () => {
   setShowChoice(false);
    setShowPremorbidForm(false);
    // Here you can proceed to booking directly if desired
    // e.g., setShowPremorbidForm(false)
  };

  const handleContinue = () => {
    setShowChoice(false);
    setShowPremorbidForm(true);
  };

  if (authLoading) return <LoadingScreen />;

  return (
    <div>
      {/* Header */}
      <div className="p-4 md:p-8">
        <div className="flex flex-row items-center justify-between">
          <Link to={routeLinks?.patient?.dashboard}>
            <img
              src={website?.logo}
              alt="logo"
              className={`object-contain mx-auto md:mx-0 ${
                website?.square
                  ? website?.logoSquareSize
                  : website?.logoRegularSize
              }`}
            />
          </Link>

          <Link
            to={routeLinks?.patient?.dashboard}
            className="text-primary hover:underline"
          >
            Dashboard
          </Link>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-col items-center justify-center p-4">
        {/* CASE 1: Show choice prompt if no medical history */}
        {showChoice && !showPremorbidForm && (
        <div className="bg-white p-8 max-w-6xl mx-auto  flex flex-col md:flex-row items-center gap-8 text-center md:text-left">
        {/* Left image section */}
        <div className="flex-shrink-0 w-full md:w-1/2 flex justify-center">
          <img
            src={ConditionImage}
            alt="Premorbid Condition"
            className="w-64 md:w-90 h-auto object-contain"
          />
        </div>

        {/* Right content section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-lg md:text-2xl font-semibold text-gray-800 mb-4">
            Premorbid Condition Required
          </h2>

          <p className="text-gray-600 mb-6 text-sm leading-relaxed">
            To help doctors provide you with the best possible care, we need some 
            background information about your health. Your 
            <strong> Premorbid Condition </strong> form includes important details such as your 
            <strong> blood group, genotype, </strong> and any previous medical history like 
            <strong> hypertension, diabetes, asthma, kidney or liver disease,</strong> and others. 
            This information helps your doctor understand your health risks, avoid 
            potential complications, and make informed decisions during your consultation.
            <br />
            <br />
            Please take a moment to fill in these details. It only takes a few minutes and 
            ensures you receive accurate and safe medical attention. If you prefer to skip 
            it for now, you can still proceed — but you’ll be reminded until it’s completed.
          </p>

          <div className="flex flex-col sm:flex-row justify-center md:justify-start gap-4">
            <button
              onClick={() => handleSkip()}
              className="px-6 py-2 border border-primary text-primary rounded-lg font-medium hover:bg-primary/10 transition-colors duration-200"
            >
              Skip
            </button>
            <button
              onClick={handleContinue}
              className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors duration-200"
            >
              Continue
            </button>
          </div>
        </div>
      </div>

        )}

        {/* CASE 2: Show Premorbid form */}
        {showPremorbidForm && <BookingCondition userProfile={userProfile} />}

        {/* CASE 3: Show Booking if medicalHistory already exists */}
        {!showChoice && !showPremorbidForm && (
          <Booking />
        )}
      </div>


    </div>
  );
}

export default Appointment;
