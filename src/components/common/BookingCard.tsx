import { useState } from "react";
import UnionIcon from "../../assets/images/appointment/Union.png";
import CrossHealthIcon from "../../assets/images/appointment/cross-health.png";

function BookingCard({title = ""}) {
  const [type, setType] = useState("1");
    const AppointmentType = [
        {
          id: "1",
          icon: UnionIcon,
          name: "A General Doctor",
          recommended: true,
          description:
            " Hey there!  We've sent you an important link to validate your account. This link will help you complete the registration process and gain access to all the features we offer. Don't forget to check your spam folder just in case it ended up there!",
        },
        {
          id: "2",
          icon: CrossHealthIcon,
          name: "A Specialist",
          recommended: false,
          description:
            " Hey there!  We've sent you an important link to validate your account. This link will help you complete the registration process and gain access to all the features we offer. Don't forget to check your spam folder just in case it ended up there!",
        },
      ];

  return (
    <main className="max-w-2xl w-full mx-auto p-2 md:p-4 rounded-lg border border-gray-light">
    <h5 className="text-xl md:text-2xl text-center font-[500] text-secondary-text">
     {title}
    </h5>

    <section className="mt-8">
      {AppointmentType?.map((e) => (
        <div
          className={`cursor-pointer p-4 md:p-6 rounded-lg border ${
            type === e?.id ? "border-primary shadow" : "border-gray-light"
          }  mt-5`}
          key={e?.id}
          onClick={() => {
            setType(e?.id);
          }}
        >
          <div className="flex flex-row items-center justify-between">
            <span className="w-6 h-6 border flex flex-row items-center justify-center  border-primary rounded-full ">
              {type === e?.id && (
                <span className="w-4 h-4 bg-primary rounded-full "></span>
              )}
            </span>
            <img src={e?.icon} alt="" className="w-8" />
          </div>
          <div className="mt-5">
            <h6 className="text-base font-[500] mb-1">
              {e?.name}{" "}
              {e?.recommended && (
                <span className="pl-4 text-[11px] text-[#646363] font-[400]">
                  (Recommended)
                </span>
              )}
            </h6>
            <p className="text-[10px]">{e?.description}</p>
          </div>
        </div>
      ))}
    </section>

    <section className="mt-4">
      <h5 className="text-lg font-[500] mb-1">Available Doctors</h5>
      <div className="mt-2">
        {[1, 2, 3].map((e) => (
          <div
            className="flex flex-row items-center justify-between border border-gray-light p-4 mt-2 rounded-lg"
            key={e}
          >
            <div className="flex flex-row items-center  gap-2">
              <div className="w-18 h-18 overflow-hidden rounded-full cursor-pointer">
                <img
                  src="https://i.pravatar.cc/40"
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="">
                <h5 className="text-sm">Dr Herr Jonnes</h5>
                <h6 className="text-xs text-[#ABABAB]">Dr Herr Jonnes</h6>
                <h6 className="text-xs text-[#ABABAB]">PH.D</h6>
              </div>
            </div>

            <span className="w-6 h-6 border flex flex-row items-center justify-center  border-primary rounded-full ">
              {type === "1" && (
                <span className="w-4 h-4 bg-primary rounded-full "></span>
              )}
            </span>
          </div>
        ))}
      </div>
    </section>
  </main>
  )
}

export default BookingCard