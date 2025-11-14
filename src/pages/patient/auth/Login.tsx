import { useEffect, useState } from "react";
import { useNavigate, } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

import routeLinks from "../../../utils/routes";
import useFlatErrorList from "../../../hooks/useFlatErrorList";
import AuthApi from "../../../api/authApi";
import FeedbackMessage from "../../../components/common/FeedbackMessage";
import { login } from "../../../reducers/authSlice";
import { IPayload } from "../../../types/Interfaces";
import { useAppDispatch } from "../../../hooks/reduxHooks";
import { returnMemberNavigationUrlLogic } from "../../../utils/dashboardUtils";


const initialFormState = {
  email: "",
  password: "",
  eye: false,
};

function Login() {
  const [formData, setFormData] = useState(initialFormState);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });

  const { setErrors, getFieldErrors } = useFlatErrorList();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { email, password, eye } = formData;

  const toggleEye = () => setFormData((prev) => ({ ...prev, eye: !prev.eye }));

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await AuthApi.login(email, password);
      const { accessToken, user, refreshToken } = response.data.data;
      
      const payload: IPayload = {
        token: accessToken,
        refreshToken: refreshToken,
        user: { ...user, user: user },
      };

      if (user?.role !== "patient") {
        return setMessage({
          message: "Unauthorized access",
          type: "error",
        });
      }
      dispatch(login(payload));
      if (!user?.isEmailVerified) {
        await AuthApi.requestEmailOtp(email);
        navigate(routeLinks?.auth?.emailVerification);
        return;
      }
      const redirectUrl = returnMemberNavigationUrlLogic(user);
      navigate(redirectUrl);
    } catch (error: any) {
      const { response } = error;
      if (response?.data?.statusCode <= 400) {
        setErrors(response.data.message || "Something went wrong");
      } else {
        setMessage({
          message: response?.data?.message || "An error occurred",
          type: "error",
        });
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    setMessage({
      message: "",
      type: "",
    });
  }, [formData]);

  return (
    <main className="max-w-[500px] w-full mx-auto px-2 md:px-4 ">
      <div className="text-start my-8">
        <h5 className="text-2xl md:text-3xl  text-primary font-bold ">
          Welcome Back
        </h5>
        <p className="mt-4  text-text-primary leading-5">
          Please enter your email and password to get started with your medical
          account
        </p>
      </div>

      {message.message && (
        <FeedbackMessage type={message.type} message={message.message} />
      )}

      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Email Field */}
        <div className="md:col-span-2">
          <label htmlFor="email" className="">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            placeholder="Email"
            className={`form-input ${
              getFieldErrors("email")
                ? "outline outline-red-600"
                : "focus:outline-primary"
            } border border-gray-light`}
          />
          {getFieldErrors("email")}
        </div>

        {/* Password Field */}
        <div className="md:col-span-2">
          <label htmlFor="password" className="">
            Password
          </label>
          <div className="mb-4 relative">
            <input
              type={eye ? "text" : "password"}
              name="password"
              id="password"
              value={password}
              onChange={handleChange}
              placeholder="Password"
              className={`form-input ${
                getFieldErrors("password")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            />
            <div
              className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer"
              onClick={toggleEye}
            >
              {eye ? (
                <AiOutlineEyeInvisible size={20} className="text-primary" />
              ) : (
                <AiOutlineEye size={20} className="text-primary" />
              )}
            </div>
          </div>
          {getFieldErrors("password")}
        </div>

        {/* Submit Button */}
        <div className="w-full md:col-span-2">
          <button
            type="submit"
            disabled={isLoading}
            className="form-primary-button bg-primary"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>

        {/* Footer */}

      </form>
              <h5 className="text-text-secondary text-base text-center mt-4 md:col-span-2">
          Don't have an account?{" "}
          <button onClick={()=>{navigate(routeLinks?.auth?.register)}} className="text-primary">
            Register
          </button>
        </h5>
    </main>
  );
}

export default Login;
