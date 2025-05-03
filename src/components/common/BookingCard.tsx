import { useState } from "react";
import UnionIcon from "../../assets/images/appointment/Union.png";
import CrossHealthIcon from "../../assets/images/appointment/cross-health.png";

function BookingCard({ title = "", type = "default" }: { title?: string; type?: "default" | "small" }) {
  const [selectedType, setSelectedType] = useState("1");

  const isSmall = type === "small";

  const AppointmentType = [
    {
      id: "1",
      icon: UnionIcon,
      name: "A General Doctor",
      recommended: true,
      description:
        "Hey there!  We've sent you an important link to validate your account. This link will help you complete the registration process and gain access to all the features we offer. Don't forget to check your spam folder just in case it ended up there!",
    },
    {
      id: "2",
      icon: CrossHealthIcon,
      name: "A Specialist",
      recommended: false,
      description:
        "Hey there!  We've sent you an important link to validate your account. This link will help you complete the registration process and gain access to all the features we offer. Don't forget to check your spam folder just in case it ended up there!",
    },
  ];

  return (
    <main className="max-w-2xl w-full mx-auto p-2 md:p-4 rounded-lg border border-gray-light">
      <h5 className={`text-center  text-secondary-text ${isSmall ? "text-[16px]" : "text-xl md:text-2xl"}`}>
        {title}
      </h5>

      <section className={`${isSmall ? '' : 'mt-4'}`}>
        {AppointmentType.map((e) => (
          <div
            key={e.id}
            className={`cursor-pointer ${isSmall ? 'p-4 ' : 'p-4 md:p-6'} rounded-lg border mb-5 ${selectedType === e.id ? "border-primary shadow" : "border-gray-light"
              }`}
            onClick={() => setSelectedType(e.id)}
          >
            <div className="flex flex-row items-center justify-between">
              <span className={`w-5 h-5 border flex items-center justify-center border-primary rounded-full`}>
                {selectedType === e.id && <span className="w-3 h-3 bg-primary rounded-full"></span>}
              </span>
              <img src={e.icon} alt="" className={isSmall ? "w-6 h-6" : "w-8 h-8"} />
            </div>

            <div className={`${isSmall ? 'mt-2' : 'mt-5'}`}>
              <h6 className={`font-medium mb-1 ${isSmall ? "text-base md:text-lg" : "text-base md:text-lg"}`}>
                {e.name}
                {e.recommended && (
                  <span className={`pl-4 ${isSmall ? "text-[9px]" : "text-[11px]"} text-[#646363]`}>
                    (Recommended)
                  </span>
                )}
              </h6>
              <p className={isSmall ? "text-sm" : "text-sn"}>{e.description}</p>
            </div>
          </div>
        ))}
      </section>

      <section className="mt-4">
        <h5 className={` mb-1 ${isSmall ? "text-[14px]" : "text-lg"}`}>Available Doctors</h5>
        <div className={`mt-2  ${isSmall ? 'max-h-[200px]' : 'max-h-[400px]'} overflow-y-scroll`}>
          {[1, 2, 3, 4, 5, 6, 7].map((e) => (
            <div
              key={e}
              className="flex flex-row items-center justify-between border border-gray-light p-4 mt-2 rounded-lg"
            >
              <div className="flex flex-row items-center gap-2">
                <div className={`overflow-hidden rounded-full cursor-pointer ${isSmall ? "w-10 h-10" : "w-18 h-18"}`}>
                  <img
                    src="https://i.pravatar.cc/40"
                    alt="Profile"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h5 className={isSmall ? "text-base" : "text-sm"}>Dr Herr Jonnes</h5>
                  <h6 className={isSmall ? "text-[9px] text-[#ABABAB]" : "text-xs text-[#ABABAB]"}>Dr Herr Jonnes</h6>
                  <h6 className={isSmall ? "text-[9px] text-[#ABABAB]" : "text-xs text-[#ABABAB]"}>PH.D</h6>
                </div>
              </div>

              <span className="w-5 h-5 border flex items-center justify-center border-primary rounded-full">
                {selectedType === "1" && <span className="w-3 h-3 bg-primary rounded-full"></span>}
              </span>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default BookingCard;
