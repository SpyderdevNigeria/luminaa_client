import { useLayoutEffect, useState } from "react";
import { Link } from "react-router-dom";
import Modal from "../../../components/modal/modal";
import routeLinks from "../../../utils/routes";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useErrorMessageHooks from "../../../hooks/useErrorMessageHooks";
import EmailIcon from "../../../assets/images/auth/envelope-open-sparkle.webp";
import website from "../../../utils/website";

function Register() {
    
  const { errMsg, handleChange, handleErrorMessagesList } = useErrorMessageHooks();
  const [isLoading, setIsLoading] = useState(false);
  const handleSubmit = async (e: any) => {};
  const [isModalOpen, setModalOpen] = useState(false);
const [data, setData] = useState({
    email:'',
    password:'',
    eye:false,
    phone:''
})
  return (
    <main className="max-w-[500px] w-full mx-auto px-2 md:px-4 2xl:mt-24">
      <div className="text-center ">
        <h5 className="text-2xl md:text-3xl px-20 md:px-28 font-[500] text-text-muted">
          Welcome to {website?.name}
        </h5>
        <p className="text-sm md:text-sm mt-4 px-4 text-text-main leading-5">
          Please enter your email, Phone Number and password to get started with
          your medical account
        </p>
      </div>

      {/* Register form  */}
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-4 col-span-2 mt-8">
          <label
            htmlFor="Email"
            className="block text-xs md:text-sm font-[500]  leading-6 mb-2 text-primary"
          >
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={data?.email}
            placeholder="Email"
            className="w-full p-3 text-xs md:text-sm rounded-lg  font-[300] border focus:outline-primary text-gray-light"
          />
          {handleErrorMessagesList("email")}
        </div>

        <div className="mb-4 col-span-2 mt-4">
          <label
            htmlFor="Phone Number"
            className="block text-xs md:text-sm font-[500]  leading-6 mb-2 text-primary"
          >
            Phone Number
          </label>
          <input
            type="text"
            name="phone"
            id="phone"
            onChange={handleChange}
            value={data?.phone}
            placeholder="Phone Number"
            className="w-full p-3 text-xs md:text-sm  rounded-lg  font-[300] border focus:outline-primary text-gray-light"
          />
          {handleErrorMessagesList("phone")}
        </div>

        <div className="mb-4 col-span-2">
          <label
            htmlFor="password"
            className="block text-xs md:text-sm font-[500]  leading-6 mb-2 text-primary"
          >
            Password
          </label>
          <div className="mb-4 relative">
            <input
              type={data?.eye ? "text" : "password"}
              name="password"
              onChange={handleChange}
              value={data?.password}
              id="text"
              placeholder="Password"
              className="w-full p-3 text-xs md:text-sm rounded-lg  font-[300] border focus:outline-primary text-gray-light"
            />

            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {data?.eye ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="text-primary"
                  onClick={() => setData({ ...data, eye: !data?.eye })}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="text-primary'"
                  onClick={() => setData({ ...data, eye: !data.eye })}
                />
              )}
            </div>
          </div>
          {handleErrorMessagesList("password")}
        </div>
        <p className="text-red-600 text-xs">{errMsg}</p>

        <div className="w-full ">
          <button
            className=" text-xs md:text-sm bg-primary text-white px-4  py-3 font-semibold w-full rounded-md  mt-4 "
            disabled={isLoading}
            type="button"
            onClick={() => setModalOpen(true)}
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>

        <h5 className="text-text-muted text-xs md:text-sm font-[500] text-center mt-4">
          Already have an account?{" "}
          <Link to={routeLinks?.auth?.login} className="text-primary">
            Log in
          </Link>
        </h5>
      </form>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Reusable Modal"
        hideCancel={true}
        style="!max-w-lg !mx-4 !md:mx-0"
      >
        <div className="flex flex-col items-center justify-center gap-8">
          <img src={EmailIcon} alt="" className="w-[80px]" />

          <h2 className="text-2xl font-[500] ">Email Confirmation</h2>

          <h5 className="text-text-muted text-xs md:text-xs  font-[400] text-center ">
            If you didn't get any link,{" "}
            <Link to={routeLinks?.patient?.onboarding} className="text-primary">
              Click to resend
            </Link>
          </h5>
        </div>
      </Modal>
    </main>
  );
}

export default Register;
