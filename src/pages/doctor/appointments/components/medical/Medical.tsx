import { useState } from "react";
// import DiagnosisForm from "./DiagnosisForm";
import PrescriptionsForm from "./PrescriptionsForm";
import PharmacyForm  from "./PharmacyForm";
import ExtraTestsForm from "./ExtraTestsForm";

type Props = {
  handleNext: () => void;
  handleBack: () => void;
};

type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => (
  <h3 className="text-xl font-light mb-2">{title}</h3>
);

function Medical({ handleBack }: Props) {
  const [step, setStep] = useState(1);
  const goToNextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const goToPrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (step === 1) {
      handleBack();
    }
  };

  const stepTitles = [
    "Diagnosis",
    "Prescriptions",
    "Pharmacy",
    "Extra Tests",
  ];

  const stepDescriptions = [
    "Fill in your Personal information and why you want to see a Doctor",
    "Select a doctor to attend to you based on your symtomps",
    "Select a time that bests suits you and the doctor",
    "review your consultation details and make payments to confirm your bookings",
  ];

  return (
    <div>
      {" "}
      <div className="w-full bg-white rounded-lg overflow-hidden relative">
        <div className="flex min-h-[85vh]  overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 bg-[#F2F2F2]  p-6">
            <h2 className="text-xl font-[400] mb-8">
            Update Patient Records
            </h2>

            {[1, 2, 3, 4].map((num) => (
              <div key={num} className="flex items-start gap-3  relative">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-6 h-6 rounded-full flex text-[10px] items-center justify-center z-10 ${
                      step >= num
                        ? "bg-primary text-white"
                        : "border border-[#B3B3B3] text-[#B3B3B3]"
                    }`}
                  >
                    {num}
                  </div>

                  {num < 4 && (
                    <div
                      className={`w-px h-15 ${
                        step >= num ? "bg-primary " : "bg-[#B3B3B3]"
                      }`}
                    ></div>
                  )}
                </div>

                <div>
                  <p className={`font-[450] text-sm `}>{stepTitles[num - 1]}</p>
                  <p
                    className={`text-sm font-[300] ${
                      step >= num ? "text-[#1B1A1A]" : "text-[#DADADA]"
                    }`}
                  >
                    {stepDescriptions[num - 1]}
                  </p>
                </div>
              </div>
            ))}
          </div>

          {/* Right Content */}
          <div className="w-2/3 px-6 py-6 flex flex-col justify-between">
            <div className="flex-1">
              {step === 1 && (
                <>
                  <Header title="Complete your diagnosis report  " />
                  <div className="">
                    {/* <DiagnosisForm /> */}
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <Header title="Add a prescription for this Consultation" />
                  <div className="">
                    <PrescriptionsForm />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <Header title="Connect to a Pharmacy" />
                  <div className="">
                    <PharmacyForm  />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <Header title="Connect to a Pharmacy" />
                  <div className="">
                    <ExtraTestsForm />
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={goToPrevStep}
                className="px-5 py-2 border-[1.5px]  border-primary text-primary rounded-md text-sm"
              >
                {step == 1 ? "Cancel" : "Back"}
              </button>

              {step < 4 ? (
                <button
                  onClick={goToNextStep}
                  className="px-5 py-2 bg-primary text-white rounded-md text-sm"
                >
                  Save & Continue
                </button>
              ) : (
                <button
                  onClick={() => {
                    // submit action here
                    handleBack();
                  }}
                  className="px-5 py-2 bg-primary text-white rounded-md text-sm"
                >
                  Update
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Medical;
