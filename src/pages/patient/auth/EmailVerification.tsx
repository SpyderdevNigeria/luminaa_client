import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import { Timer } from "../../../components/common/Timer";
import website from "../../../utils/website";
import AuthApi from "../../../api/authApi";
import useAuth from "../../../hooks/useAuth";
import routeLinks from "../../../utils/routes";
import LoadingScreen from "../../../components/loading/LoadingScreen";
import { useDispatch } from "react-redux";
import { updateUser } from "../../../reducers/authSlice";

function EmailVerification() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(Array(6).fill(""));
  const [errMsg, setErrMsg] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const { userProfile, authLoading } = useAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  useLayoutEffect(() => {
    if (!userProfile) {
      navigate(routeLinks?.auth?.login);
    }
    if (userProfile?.user?.isEmailVerified) {
      navigate(routeLinks?.patient?.onboarding);
    }
  }, [userProfile, navigate]);

  const { fields } = usePinInput({
    values: otpCode,
    onChange: setOtpCode,
  });

  const handleConfirm = async () => {
    const otp = otpCode.join("").trim();

    if (otp.length < 6) {
      setErrMsg("Please enter a valid 6-digit OTP.");
      return;
    }
    ;

    if (!userProfile?.user?.email) {
      setErrMsg("User email not found.");
      return;
    }

    setLoading(true);
    setErrMsg("");

    try {
      await AuthApi.verifyEmailOtp(userProfile?.user?.email, otp).then(
        (res) => {
          if (res) {
            dispatch(updateUser({ ...userProfile, user: {...userProfile.user, isEmailVerified  : true} }));
            navigate(routeLinks?.patient?.onboarding);
          }
        }
      );
    } catch (err: any) {
      console.error("OTP verification failed:", err);
      setErrMsg(err?.response?.data?.message || "Verification failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async () => {
    ;

    if (!userProfile?.user?.email) {
      setErrMsg("User email not found.");
      return;
    }

    setResendLoading(true);
    setErrMsg("");

    try {
      await AuthApi.requestEmailOtp(userProfile?.user?.email);
      setOtpCode(Array(6).fill(""));
      setIsTimerExpired(false);
      setTimerKey((prev) => prev + 1);
    } catch (err: any) {
      console.error("Resend failed:", err);
      setErrMsg(err?.response?.data?.message || "Failed to resend OTP");
    } finally {
      setResendLoading(false);
    }
  };
  // Loading while auth is verifying
  if (authLoading) return <LoadingScreen />;
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-50 px-4">
      <div className=" absolute top-6 left-6">
        <Link to="/">
          <img src={website?.logo} alt="Logo"  className={` ${website?.square ? website?.logoSquareSize : website?.logoRegularSize}`} />
        </Link>
      </div>

      <div className="rounded-xl w-full max-w-[500px] p-8 text-center">
        <h2 className="text-xl md:text-3xl px-20 md:px-28 text-primary">
          Verify OTP
        </h2>
        <p className="mt-4 px-4 text-text-primary leading-5">
          Please enter the OTP sent to your registered email to complete your
          verification.
        </p>

        <div className="flex justify-center gap-3 my-8">
          {fields.map((fieldProps, index) => (
            <input
              key={index}
              className="w-14 h-14 border border-gray-300 rounded-md text-center text-lg focus:outline-primary"
              {...fieldProps}
              maxLength={1}
            />
          ))}
        </div>

        {errMsg && (
          <p className="text-red-600 text-xs text-center mb-2">{errMsg}</p>
        )}

        <div className="flex justify-between items-center text-sm text-black mb-6 px-1">
          <div className="flex items-center">
            Remaining time:{" "}
            <span className="text-primary">
              <Timer
                key={timerKey}
                id="otp-timer"
                registerInterval={() => {}}
                clearTimer={() => {}}
                onExpire={() => setIsTimerExpired(true)}
              />
            </span>
          </div>
          {isTimerExpired && (
            <button
              onClick={handleResendOtp}
              disabled={resendLoading}
              className="text-primary"
            >
              <span className="text-black">Didn't get code? </span>
              {resendLoading ? "Sending..." : "Resend"}
            </button>
          )}
        </div>

        <button
          onClick={handleConfirm}
          disabled={loading}
          className="w-full bg-primary text-white py-3 rounded-md text-base font-semibold mb-3"
        >
          {loading ? "Verifying..." : "Verify"}
        </button>
      </div>

      <div className="text-center mt-6 text-sm text-gray-600">
        Want to know why email verification is important?{" "}
        <span className="text-primary underline cursor-pointer">
          Find out here
        </span>
      </div>
    </div>
  );
}

export default EmailVerification;
