import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import routeLinks from "../../../utils/routes";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import website from "../../../utils/website";
import FeedbackMessage from "../../../components/common/FeedbackMessage";
import AuthApi from "../../../api/authApi";
import useFlatErrorList from "../../../hooks/useFlatErrorList";

interface RegisterFormData {
  email: string;
  password: string;
  confirmPassword: string;
  eye: boolean;
  eye2: boolean;
  lastName: string;
  firstName: string;
}

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });
  const navigate = useNavigate();
  const { errors, setErrors, getFieldErrors } = useFlatErrorList();

  const dataFields: RegisterFormData = {
    email: "",
    password: "",
    confirmPassword: "",
    eye: false,
    eye2: false,
    lastName: "",
    firstName: "",
  };

  const [data, setData] = useState<RegisterFormData>(dataFields);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErrors([]);

    if (data.password !== data.confirmPassword) {
      setErrors([...errors, "Password does not match"]);
      return;
    }

    const payload = {
      email: data.email,
      firstName: data.firstName,
      lastName: data.lastName,
      password: data.password,
    };

    setIsLoading(true);
    AuthApi.register(payload)
      .then((res) => {
        setMessage({ message: res.data.message, type: "success" });
        setErrors([]);
        setTimeout(() => {  
        setData(dataFields);
        setIsLoading(false);
        navigate(routeLinks?.auth?.login);
        }, 2000);
      })
      .catch((error) => {
        if (error.response?.data?.statusCode <= 400) {
          setErrors(error.response.data.message || ["Something went wrong"]);
        } else {
          setMessage({
            message: error.response.data.message || "An error occurred",
            type: "error",
          });
        }
        setIsLoading(false);
      });
  };

  useEffect(() => {
    setMessage({
      message: "",
      type: "",
    });
  }, [data]);
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const toggleEye = (field: "eye" | "eye2") => {
    setData((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  return (
    <main className="max-w-[500px] w-full mx-auto px-2 md:px-4">
      <div className="text-center mb-8">
        <h5 className="text-2xl md:text-3xl px-20 md:px-28 text-text-secondary">
          Welcome to {website?.name}
        </h5>
        <p className="my-4 px-4 text-text-primary leading-5">
          Please enter your email, Phone Number and password to get started with
          your medical account
        </p>
      </div>

      {message.message && (
        <FeedbackMessage type={message.type} message={message.message} />
      )}

      <form onSubmit={handleSubmit}>
        {/* First Name */}
        <div className="col-span-2">
          <label htmlFor="firstName" className="form-label text-primary">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            id="firstName"
            onChange={handleChange}
            value={data.firstName}
            placeholder="First Name"
            className={`form-input ${
              getFieldErrors("firstName")
                ? "outline outline-red-600"
                : "focus:outline-primary"
            } border border-gray-light`}
          />
          {getFieldErrors("firstName")}
        </div>

        {/* Last Name */}
        <div className="col-span-2 mt-4">
          <label htmlFor="lastName" className="form-label text-primary">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            id="lastName"
            onChange={handleChange}
            value={data.lastName}
            placeholder="Last Name"
            className={`form-input ${
              getFieldErrors("lastName")
                ? "outline outline-red-600"
                : "focus:outline-primary"
            } border border-gray-light`}
          />
          {getFieldErrors("lastName")}
        </div>

        {/* Email */}
        <div className="mb-4 col-span-2 mt-4">
          <label htmlFor="email" className="form-label text-primary">
            Email
          </label>
          <input
            type="text"
            name="email"
            id="email"
            onChange={handleChange}
            value={data.email}
            placeholder="Email"
            className={`form-input ${
              getFieldErrors("email")
                ? "outline outline-red-600"
                : "focus:outline-primary"
            } border border-gray-light`}
          />
          {getFieldErrors("email")}
        </div>

        {/* Password */}
        <div className="mb-4 col-span-2">
          <label htmlFor="password" className="form-label text-primary">
            Password
          </label>
          <div className="mb-4 relative">
            <input
              type={data.eye ? "text" : "password"}
              name="password"
              id="password"
              onChange={handleChange}
              value={data.password}
              placeholder="Password"
              className={`form-input ${
                getFieldErrors("password")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {data.eye ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="text-primary"
                  onClick={() => toggleEye("eye")}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="text-primary"
                  onClick={() => toggleEye("eye")}
                />
              )}
            </div>
          </div>
          {getFieldErrors("password")}
        </div>

        {/* Confirm Password */}
        <div className="mb-4 col-span-2">
          <label htmlFor="confirmPassword" className="form-label text-primary">
            Confirm Password
          </label>
          <div className="mb-4 relative">
            <input
              type={data.eye2 ? "text" : "password"}
              name="confirmPassword"
              id="confirmPassword"
              onChange={handleChange}
              value={data.confirmPassword}
              placeholder="Confirm Password"
              className={`form-input ${
                getFieldErrors("password")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            />
            <div className="absolute right-3 top-1/2 transform -translate-y-1/2 cursor-pointer">
              {data.eye2 ? (
                <AiOutlineEyeInvisible
                  size={20}
                  className="text-primary"
                  onClick={() => toggleEye("eye2")}
                />
              ) : (
                <AiOutlineEye
                  size={20}
                  className="text-primary"
                  onClick={() => toggleEye("eye2")}
                />
              )}
            </div>
          </div>
    
        </div>

        {/* Submit Button */}
        <div className="w-full">
          <button
            className="form-primary-button bg-primary mt-4"
            disabled={isLoading}
            type="submit"
          >
            {isLoading ? "Loading..." : "Continue"}
          </button>
        </div>

        {/* Login Link */}
        <h5 className="text-text-secondary text-base text-center my-4">
          Already have an account?{" "}
          <Link to={routeLinks?.auth?.login} className="text-primary">
            Log in
          </Link>
        </h5>
      </form>
    </main>
  );
}

export default Register;
