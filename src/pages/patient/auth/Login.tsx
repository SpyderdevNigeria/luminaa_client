import { useState } from "react";
import { Link , useNavigate} from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import useErrorMessageHooks from "../../../hooks/useErrorMessageHooks";

function Register() {
    
  const { errMsg, handleChange, handleErrorMessagesList } = useErrorMessageHooks();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate()
  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setIsLoading(true)
    navigate('/patient/dashboard')
  };
const [data, setData] = useState({
    email:'',
    password:'',
    eye:false,
})
  return (
    <main className="max-w-[500px] w-full mx-auto px-2 md:px-4 2xl:mt-24">
      <div className="text-center ">
        <h5 className="text-2xl md:text-3xl px-20 md:px-28  text-text-secondary">
        Welcome Back
        </h5>
        <p className="mt-4 px-4 text-text-primary leading-5">
        Please enter your email and password to get 
        started with your medical account
        </p>
      </div>

      {/* Register form  */}
      <form action="" onSubmit={handleSubmit}>
        <div className="mb-4 col-span-2 mt-8">
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
          Don't have an account?{" "}
          <Link to={routeLinks?.auth?.register} className="text-primary">
           Register
          </Link>
        </h5>
      </form>

    </main>
  );
}

export default Register;
