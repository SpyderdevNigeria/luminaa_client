import { useState } from "react";
import BioData from "./components/BioData";
import { Link } from 'react-router-dom';
import website from '../../../utils/website';
import ResidentialDetails from "./components/ResidentialDetails";
import OnBoardingSuccessful from "./components/OnBoardingSuccessful";
import Background from '../../../assets/images/auth/Desktop - 7.webp'; 
import routeLinks from "../../../utils/routes";
function Onboarding() {
  const [step, setStep] = useState(1);
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="p-4 md:p-8">
        <Link to={routeLinks?.patient?.onboarding}>
          <img src={website?.logo} alt="Logo" />
        </Link>
      </div>

      <div className="flex flex-col items-center justify-center p-4 ">
        <main className="max-w-lg w-full mx-auto px-2 md:px-4">
          {step !== 3 && (
            <div className="flex  items-center justify-between mb-4 max-w-[170px] mx-auto">
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center  ${
                  step >= 1
                    ? "bg-primary text-white"
                    : "bg-white border border-primary text-primary"
                }`}
              >
                1
              </div>
              <div className=" bg-gray-300 flex-1 mx-2  rounded-full">
                <div
                  className={`h-[0.5px] ${
                    step >= 2 ? "bg-primary" : "bg-gray-300"
                  } rounded-full transition-all duration-300`}
                />
              </div>
              <div
                className={`w-12 h-12 rounded-full flex items-center justify-center  ${
                  step >= 2
                    ? "bg-primary text-white"
                    : "bg-white border border-primary text-primary"
                }`}
              >
                2
              </div>
            </div>
          )}

          {step === 1 && (
            <BioData
              submitform={(e: any) => {
                e.preventDefault();
                handleNext();
              }}
              handleChange={handleChange}
              data={form}
            />
          )}

          {step === 2 && (
            <ResidentialDetails
              submitform={(e: any) => {
                e.preventDefault();
                handleNext();
              }}
              handleChange={handleChange}
              handleBack={handleBack}
              data={form}
            />
          )}

          {step === 3 && <OnBoardingSuccessful />}
        </main>
      </div>
    </div>
  );
}

export default Onboarding;
