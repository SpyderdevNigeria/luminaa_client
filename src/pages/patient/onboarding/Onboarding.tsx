import { useLayoutEffect, useState } from "react";
import BioData from "./components/BioData";
import ResidentialDetails from "./components/ResidentialDetails";
import OnBoardingSuccessful from "./components/OnBoardingSuccessful";
import { Link, useNavigate } from "react-router-dom";
import Background from "../../../assets/images/auth/Desktop - 7.webp";
import website from "../../../utils/website";
import ProfileApi from "../../../api/PatientApi";
import FeedbackMessage from "../../../components/common/FeedbackMessage";
import useAuth from "../../../hooks/useAuth";
import routeLinks from "../../../utils/routes";
import LoadingScreen from "../../../components/loading/LoadingScreen";

const initialData = {
  dateOfBirth: "",
  gender: "",
  maritalStatus: "",
  religion: "",
  phoneNumber: "",
  emergencyContactName: "",
  emergencyContactPhone: "",
  address: "",
  city: "",
  state: "",
  country: "",
  zipCode: "",
};

function Onboarding() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState(initialData);
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const { userProfile, authLoading } = useAuth();

  // Redirect if not logged in
  useLayoutEffect(() => {
    if (!authLoading && !userProfile) {
      navigate(routeLinks?.auth?.login);
    }
    if (userProfile?.isBioDataCompleted) {
      navigate(routeLinks?.patient?.dashboard);
    }
  }, [authLoading, userProfile, navigate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitting(true);
    setFeedback({ message: "", type: "" });

    try {
    await ProfileApi.updateBio(formData).then((res) => {
      console.log(res);
       if (res) {
        setFormData(initialData);
        handleNext();
       }
      });
    } catch (error: any) {
      const status = error?.response?.status;
      const msg = error?.response?.data?.message;
      if (status && status == 400) {
            setFeedback({
          message: msg || "An error occurred",
          type: "error",
        });
      } else if (status >= 500) {
        setFeedback({
          message: msg || "An error occurred",
          type: "error",
        });
      }
    } finally {
      setSubmitting(false);
    }
  };

  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="p-4 py-4 md:px-8">
        <Link to="/">
          <img
            src={website.logo}
            alt="Logo"
            className="w-40 object-contain mx-auto md:mx-0"
          />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-4">
        <main className="max-w-lg w-full mx-auto px-2 md:px-4">
          {step !== 3 && <ProgressIndicator step={step} />}

          {feedback.message && (
            <FeedbackMessage type={feedback.type} message={feedback.message} />
          )}

          {step === 1 && (
            <BioData
              submitform={(e) => {
                e.preventDefault();
                handleNext();
              }}
              handleChange={handleChange}
              data={formData}
           
            />
          )}

          {step === 2 && (
            <>
              <ResidentialDetails
                submitform={handleSubmit}
                handleChange={handleChange}
                data={formData}
                isLoading={submitting}
              />
              <button
                type="button"
                className="text-base border-primary text-primary px-4 py-3 font-semibold w-full rounded-md mt-4"
                onClick={handleBack}
              >
                Back
              </button>
            </>
          )}

          {step === 3 && <OnBoardingSuccessful />}
        </main>
      </div>
    </div>
  );
}

// Component for progress display
const ProgressIndicator = ({ step }: { step: number }) => (
  <div className="flex items-center justify-between mb-4 max-w-[170px] mx-auto">
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        step >= 1
          ? "bg-primary text-white"
          : "bg-white border border-primary text-primary"
      }`}
    >
      1
    </div>
    <div className="bg-gray-300 flex-1 mx-2 rounded-full">
      <div
        className={`h-[0.5px] ${
          step >= 2 ? "bg-primary" : "bg-gray-300"
        } rounded-full transition-all duration-300`}
      />
    </div>
    <div
      className={`w-12 h-12 rounded-full flex items-center justify-center ${
        step >= 2
          ? "bg-primary text-white"
          : "bg-white border border-primary text-primary"
      }`}
    >
      2
    </div>
  </div>
);

export default Onboarding;
