import { useEffect, useState } from "react";
import BookingCard from "../common/BookingCard";
import BookingDateCard from "../common/BookingDateCard";
type Props = {
  open: boolean;
  onClose: () => void;
};

type HeaderProps = {
  title: string;
};
const Header = ({ title }: HeaderProps) => (
  <h3 className="text-base font-light mb-2">{title}</h3>
);

const AppointmentBookModal = ({ open, onClose }: Props) => {
  const [step, setStep] = useState(1);

  useEffect(() => {
    if (open) {
      const handleEscape = (e: KeyboardEvent) => {
        if (e.key === "Escape") {
          onClose();
        }
      };
      window.addEventListener("keydown", handleEscape);
      return () => window.removeEventListener("keydown", handleEscape);
    }
  }, [open, onClose]);

  if (!open) return null;

  const goToNextStep = () => setStep((prev) => Math.min(prev + 1, 4));
  const goToPrevStep = () => {
    setStep((prev) => Math.max(prev - 1, 1));
    if (step === 1) {
      onClose();
    }
  };

  const stepTitles = [
    "Patient Information",
    "Doctor’s Information",
    "Appointment’s Information",
    "Payment Information",
  ];

  const stepDescriptions = [
    "Fill in your Personal information and why you want to see a Doctor",
    "Select a doctor to attend to you based on your symptoms",
    "Select a time that best suits you and the doctor",
    "Review your consultation details and make payments to confirm your bookings",
  ];

  return (
    <div className="fixed inset-0 bg-black/50 bg-opacity-50 flex justify-center items-center z-50">
      <div className="w-full max-w-5xl bg-white rounded-lg overflow-hidden relative">
        <div className="flex min-h-[700px]  overflow-hidden">
          {/* Sidebar */}
          <div className="w-1/3 bg-[#F2F2F2] p-6">
            <h2 className="text-base font-[400] mb-8">
              Create New Appointment
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
                    className={`text-[12px] font-[300] ${
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
                  <Header title="Fill out your Symptoms form to continue" />
                  <div className="">
                    <label
                      htmlFor="symptoms"
                      className="block  text-xs md:text-sm  leading-6 mb-2 "
                    >
                      Symptoms
                    </label>
                    <textarea
                      name="symptoms"
                      id="symptoms"
                      rows={6}
                      placeholder="Please Specify"
                      className=" w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
                    ></textarea>
                  </div>
                </>
              )}

              {step === 2 && (
                <>
                  <Header title="Select your doctor & Specialty" />
                  <div className="max-w-lg">
                    <BookingCard type="small" />
                  </div>
                </>
              )}

              {step === 3 && (
                <>
                  <Header title="Appointment Date" />
                  <div className="max-w-lg">
                    <BookingDateCard type="small" />
                  </div>
                </>
              )}

              {step === 4 && (
                <>
                  <Header title="Confirm your Payment" />
                  <div className="max-w-lg">
                  <PaymentMethod />
                  </div>
                </>
              )}
            </div>

            {/* Buttons */}
            <div className="flex justify-end gap-4 mt-6">
              <button
                onClick={goToPrevStep}
                className="px-5 py-2 border-[1.5px] font-[500] border-primary text-primary rounded-md text-sm"
              >
                {step == 1 ? "Cancel" : "Back"}
              </button>

              {step < 4 ? (
                <button
                  onClick={goToNextStep}
                  className="px-5 py-2 bg-primary text-white rounded-md text-sm"
                >
                  Continue
                </button>
              ) : (
                <button
                  onClick={() => {
                    // submit action here
                    onClose();
                  }}
                  className="px-5 py-2 bg-primary text-white rounded-md text-sm"
                >
                  Submit
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PaymentMethod = () => {
    const [selectedType, setSelectedType] = useState('');
    const payment = [
        {
            id:'1',
            name:'Bank Transfer'
        },
        {
            id:'2',
            name:'Paystack'
        },
        {
            id:'3',
            name:'USSD'
        }
        ,
        {
            id:'4',
            name:'Opay'
        },

    ]
  return (
    <div>
        <h1 className="text-xs mb-4">Payment Method</h1>
        <div className="space-y-4">
        {payment.map((e) => (
          <div
            key={e.id}
            className={`cursor-pointer p-4  rounded-lg border  ${
              selectedType === e.id ? "border-primary shadow" : "border-gray-light"
            }`}
            onClick={() => setSelectedType(e.id)}
          >
            <div className="flex flex-row items-center ">
              <span className={`w-5 h-5 border flex items-center justify-center ${selectedType == e?.id ? 'border-primary': 'border-gray-light'} rounded-full`}>
                {selectedType === e.id && <span className="w-3 h-3 bg-primary rounded-full"></span>}
              </span>
                <h4 className="mx-2">{e?.name}</h4>
            </div>

          </div>
        ))}
        </div>
    </div>
  );
};

export default AppointmentBookModal;
