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
    country: "",
    stateOfOrigin: "",
    lga: "",
    postalCode: "",
    street: "",
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    educationLevel: "",
    religion: "",
  });

  const handleChange = (e:any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = () => setStep((prev) => prev + 1);
  const handleBack = () => setStep((prev) => prev - 1);

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Background})` }}
    >
      <div className="p-4 py-4 md:px-8">
        <Link to={routeLinks?.patient?.onboarding}>
          <img src={website?.logo} alt="Logo" 
          className="w-40 object-contain mx-auto md:mx-0" />
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
              data={form}
            />
          )}

          {step === 2 && (
                 <button
                 type="button"
                  className=" text-xs md:text-sm  border-primary text-primary px-4  py-3 font-semibold w-full rounded-md  mt-4 "
                onClick={handleBack}
              >
                 back
               </button>
          )}
          {step === 3 && <OnBoardingSuccessful />}
        </main>
      </div>
    </div>
  );
}

export default Onboarding;
