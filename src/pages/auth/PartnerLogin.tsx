import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import routeLinks from "../../utils/routes";
import useFlatErrorList from "../../hooks/useFlatErrorList";
import AuthApi from "../../api/authApi";
import FeedbackMessage from "../../components/common/FeedbackMessage";
import { login } from "../../reducers/authSlice";
import { IPayload } from "../../types/Interfaces";
import { useAppDispatch } from "../../hooks/reduxHooks";
import { returnPartnerNavigationUrlLogic } from "../../utils/dashboardUtils";

const initialFormState = {
  email: "",
  password: "",
  eye: false,
};

function PartnerLogin() {
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

  useEffect(() => {
    setMessage({
      message: "",
      type: "",
    });
  }, [formData]);
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors([]);

    try {
      const response = await AuthApi.login(email, password);
      const { accessToken, user, refreshToken } = response.data.data;
      console.log(response.data.data);
      const payload: IPayload = {
        token: accessToken,
        refreshToken: refreshToken,
        user: { ...user, user: user },
      };
      if (
        user?.role === "patient" ||
        user?.role === "admin" ||
        user?.role === "super_admin"
      ) {
        return setMessage({
          message: "Unauthorized access",
          type: "error",
        });
      }
      setMessage({
        message: "Login was successful",
        type: "success",
      });
      dispatch(login(payload));
      if (!payload?.user?.isEmailVerified) {
        await AuthApi.requestEmailOtp(email);
        navigate(routeLinks?.auth?.partnerEmailVerification);
        return;
      }

      const url = returnPartnerNavigationUrlLogic(user.role, user);
      navigate(url);
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

  return (
    <div className="w-full max-w-md 2xl:max-w-lg  mx-auto space-y-6">
      <div className="text-center">
        <h2 className="text-xl md:text-2xl 2xl:text-4xl px-6 md:px-20 text-text-secondary">
          Login to your account
        </h2>
        <p className="text-sm 2xl:text-base text-gray-500 mt-1">
          Welcome back, please enter your details
        </p>
      </div>

      {message.message && (
        <FeedbackMessage type={message.type} message={message.message} />
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="form-label text-primary 2xl:text-xl"
          >
            Email address
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={email}
            onChange={handleChange}
            placeholder="Enter your email"
            className={`form-input  py-4 ${
              getFieldErrors("email")
                ? "outline outline-red-600"
                : "focus:outline-primary"
            } border border-gray-light`}
          />
          {getFieldErrors("email")}
        </div>

        {/* Password */}
        <div>
          <label
            htmlFor="password"
            className="form-label text-primary 2xl:text-xl"
          >
            Password
          </label>
          <div className="relative mt-1">
            <input
              id="password"
              type={eye ? "text" : "password"}
              name="password"
              value={password}
              onChange={handleChange}
              placeholder="Enter your password"
              className={`form-input py-4 ${
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
                <AiOutlineEyeInvisible size={20} className="text-gray-600" />
              ) : (
                <AiOutlineEye size={20} className="text-gray-600" />
              )}
            </div>
          </div>
          {getFieldErrors("password")}
        </div>

        {/* Keep me logged in + Forgot password */}
        <div className="flex justify-between items-center text-sm 2xl:text-base">
          <label className="flex items-center gap-2">
            <input type="checkbox" className="form-checkbox" />
            Keep me logged in
          </label>
          <Link to="/forgot-password" className="text-primary">
            Forgot password?
          </Link>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={isLoading}
          className="form-primary-button bg-primary mt-4 text-base 2xl:text-xl"
        >
          {isLoading ? "Loading..." : "Log in"}
        </button>
      </form>
    </div>
  );
}

export default PartnerLogin;
