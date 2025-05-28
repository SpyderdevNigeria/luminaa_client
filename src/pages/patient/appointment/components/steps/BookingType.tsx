import { useEffect, useState } from "react";
import UnionIcon from "../../../../../assets/images/appointment/Union.png";
import CrossHealthIcon from "../../../../../assets/images/appointment/cross-health.png";
import {  useNavigate } from "react-router-dom";
import routeLinks from "../../../../../utils/routes";
interface BookingTypeProps {
  nextStep: () => void;
  data: any;
  setData: (data: any) => void;
}

function BookingType({ nextStep, data, setData }: BookingTypeProps) {
  const [selectedType, setSelectedType] = useState("A General Doctor");
  const navigate = useNavigate()
  const AppointmentType = [
    {
      id: "1",
      icon: UnionIcon,
      name: "A General Doctor",
      recommended: true,
      description:
        "We've sent you a verification link to confirm your account. Please check your email to complete your registration and access all features. Be sure to check your spam or junk folder if you don't see it in your inbox.",
    },
    {
      id: "2",
      icon: CrossHealthIcon,
      name: "A Specialist",
      recommended: false,
      description:
        "To proceed, please verify your account using the link we've emailed you. This step is necessary to complete your signup and unlock access to specialist services. Don’t forget to check your spam folder if the email isn’t in your inbox.",
    },
  ];

  useEffect(() => {
    setData({...data, type: selectedType });
  }, [selectedType]);
  return (
    <div>
      <section className={`mt-8`}>
        {AppointmentType.map((e) => (
          <div
            key={e.id}
            className={`cursor-pointer p-4 md:p-6 rounded-lg border mb-5 ${
              selectedType === e.name
                ? "border-primary shadow"
                : ""
            }`}
            onClick={() => setSelectedType(e.name)}
          >
            <div className="flex flex-row items-center justify-between">
              <span
                className={`w-5 h-5 border flex items-center justify-center border-primary rounded-full`}
              >
                {selectedType === e.name && (
                  <span className="w-3 h-3 bg-primary rounded-full"></span>
                )}
              </span>
              <img src={e.icon} alt="" className={"w-8 h-8"} />
            </div>

            <div className={`mt-5`}>
              <h6 className={`font-medium mb-1 text-base md:text-lg`}>
                {e.name}
                {e.recommended && (
                  <span className={`pl-4 text-[11px] text-[#646363]`}>
                    (Recommended)
                  </span>
                )}
              </h6>
              <p className={"text-sm"}>{e.description}</p>
            </div>
          </div>
        ))}

        <button
          className="cursor-pointer form-primary-button bg-primary  my-4 "
          onClick={() => {
            nextStep();
          }}
        >
          {"Next"}
        </button>
        <button
          onClick={()=> {  navigate(routeLinks?.patient?.dashboard)}}
        className=" !w-full  text-primary cursor-pointer form-back-button  "
      >
        Cancel
      </button>
      </section>
    </div>
  );
}

export default BookingType;
