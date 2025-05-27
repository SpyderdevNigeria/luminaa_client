import { Link, useNavigate } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import { Timer } from "../../components/common/Timer";
import website from "../../utils/website";
import AuthApi from "../../api/authApi";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { returnPartnerNavigationUrlLogic } from "../../utils/dashboardUtils";
import PartnerInfoCarousel from "../../components/common/PartnerInfoCarousel";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/authSlice";
function PartnerEmailVerification() {
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);
  const [otpCode, setOtpCode] = useState(Array(6).fill(""));
  const [errMsg, setErrMsg] = useState("");
  const [timerKey, setTimerKey] = useState(0);
  const [isTimerExpired, setIsTimerExpired] = useState(false);
  const { userProfile, authLoading } = usePartnerAuth();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!userProfile) {
      navigate(routeLinks?.auth.partnerLogin);
    }
    if (userProfile?.user?.isEmailVerified) {
      const redirectUrl = returnPartnerNavigationUrlLogic(
        userProfile.user.role,
        userProfile
      );
      navigate(redirectUrl);
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
    console.log(userProfile);

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
            dispatch(updateUser({ ...res?.data, user: res?.data }));
            const redirectUrl = returnPartnerNavigationUrlLogic(
              userProfile.user.role,
              userProfile
            );
            navigate(redirectUrl);
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
    console.log(userProfile);

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
    <div className="min-h-screen  grid grid-cols-1 lg:grid-cols-2 bg-white">
      <div className="flex flex-col items-center justify-center px-6 sm:px-16">
        <div className="rounded-xl w-full max-w-md 2xl:max-w-lg p-8 text-center">
          <Link to={"/"} className="flex justify-center mb-4">
             <img src={website?.logo} alt="Logo" className="w-32 2xl:w-50  h-10 2xl:h-15 mb-4" />  
          </Link>

          <h2 className="text-xl md:text-3xl 2xl:text-4xl px-6 md:px-20 text-text-secondary">
            OTP verification
          </h2>

          <p className="mt-4 px-4 text-sm md:text-base 2xl:text-lg text-text-primary leading-5">
            Please enter the OTP sent to your registered email to complete your
            verification.
          </p>

          <div className="flex justify-center gap-3 my-8">
            {fields.map((fieldProps, index) => (
              <input
                key={index}
                className="w-14 h-14 2xl:w-17 2xl:h-17 border border-gray-300 rounded-md text-center text-lg focus:outline-primary"
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
            className="w-full bg-primary text-white py-3 rounded-md text-base 2xl:text-xl font-semibold mb-3"
          >
            {loading ? "Verifying..." : "Verify"}
          </button>
        </div>
      </div>

      {/* Right - Image & Testimonial Swiper */}
      <PartnerInfoCarousel
        image={
          "https://images.pexels.com/photos/8413295/pexels-photo-8413295.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
        }
      />
    </div>
  );
}

export default PartnerEmailVerification;
