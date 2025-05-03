import { useState } from "react";
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
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    setModalOpen(true)
  };
  const [isModalOpen, setModalOpen] = useState(false);
const [data, setData] = useState({
    email:'',
    password:'',
    eye:false,
    phone:'',
    lastName:'',
    firstName:'',
})
  return (
    <main className="max-w-[500px] w-full mx-auto px-2 md:px-4 ">
      <div className="text-center ">
        <h5 className="text-2xl md:text-3xl px-20 md:px-28  text-text-secondary">
          Welcome to {website?.name}
        </h5>
        <p className=" my-4 px-4 text-text-primary leading-5">
          Please enter your email, Phone Number and password to get started with
          your medical account
        </p>
      </div>

      {/* Register form  */}
      <form action="" onSubmit={handleSubmit}>
            {/* First Name */}
            <div className=" col-span-2 mt-8">
            <label
              htmlFor="firstName"
              className="form-label text-primary"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={data?.firstName}
              placeholder="First Name"
              className="form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Last Name */}
          <div className="col-span-2 mt-4">
            <label
              htmlFor="lastName"
              className="form-label text-primary"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={data?.lastName}
              placeholder="Last Name"
              className="form-input focus:outline-primary text-gray-light"
            />
          </div>
        <div className="mb-4 col-span-2 mt-4">
          <label
            htmlFor="Email"
            className="form-label text-primary"
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
            className="form-input focus:outline-primary text-gray-light"
          />
          {handleErrorMessagesList("email")}
        </div>

        <div className="mb-4 col-span-2 mt-4">
          <label
            htmlFor="Phone Number"
            className="form-label text-primary"
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
            className="form-label text-primary"
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
              className="form-input focus:outline-primary text-gray-light"
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
            className=" form-primary-button bg-primary  mt-4 "
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>

        <h5 className="text-text-secondary text-base text-center mt-4">
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

          <h2 className="text-2xl  font-semibold">Email Confirmation</h2>

          <h5 className="text-text-secondary text-sm text-center ">
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
