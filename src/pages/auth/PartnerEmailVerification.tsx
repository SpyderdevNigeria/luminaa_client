import { useNavigate, Link } from "react-router-dom";
import { useLayoutEffect, useState } from "react";
import { usePinInput } from "react-pin-input-hook";
import { Timer } from "../../components/common/Timer";
import AuthApi from "../../api/authApi";
import usePartnerAuth from "../../hooks/usePartnerAuth";
import routeLinks from "../../utils/routes";
import LoadingScreen from "../../components/loading/LoadingScreen";
import { returnPartnerNavigationUrlLogic } from "../../utils/dashboardUtils";
import PartnerImage from "../../assets/images/auth/partnerAuth.png";
import { useDispatch } from "react-redux";
import { updateUser } from "../../reducers/authSlice";
import website from "../../utils/website";
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
            dispatch(
              updateUser({
                ...userProfile,
                user: { ...userProfile.user, isEmailVerified: true },
              })
            );
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
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* Left - Logo + Image + Description */}
      <div
        className="bg-[#E9F6FF]   hidden lg:block relative overflow-hidden bg-no-repeat bg-bottom bg-cover"
        style={{
          backgroundImage: `url(${PartnerImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <section className="max-w-md 2xl:max-w-xl mx-auto mt-18 2xl:mt-28  ">
          {/* Logo */}
          <div className="mb-6 text-start">
            <Link to="/" className="block">
              <img src={website?.logo} alt="Logo" className="h-10 2xl:h-16" />
            </Link>
          </div>

          {/* Heading */}
          <div className="">
            <h2 className="text-4xl xl:text-6xl 2xl:text-7xl font-bold text-gray-800 leading-18 tracking-tight  ">
              Get started with
              <br />
              <span className="text-primary">{website?.name}</span>
            </h2>
          </div>
        </section>
      </div>

      {/* Right - Form Area */}
      <div className="md:flex items-center justify-center px-6 sm:px-16 py-12 bg-white">
        {/* Logo for mobile */}
        <div className="mb-12 block md:hidden">
          <Link to="/" className="block">
            <img src={website?.logo} alt="Logo" className="h-10" />
          </Link>
        </div>
        <div className="w-full max-w-lg">
          <div className="w-full max-w-sm   mx-auto space-y-6">
            <div className="text-center">
              <h2 className="text-xl md:text-2xl 2xl:text-4xl px-6 md:px-20 text-text-secondary">
                OTP verification
              </h2>

              <p className="text-sm 2xl:text-base text-gray-500 mt-1">
                Please enter the OTP sent to your registered email to complete
                your verification.
              </p>

              <div className="flex justify-center gap-3 my-8">
                {fields.map((fieldProps, index) => (
                  <input
                    key={index}
                    className="w-14 h-14  border border-gray-300 rounded-md text-center text-lg focus:outline-primary"
                    {...fieldProps}
                    maxLength={1}
                  />
                ))}
              </div>

              {errMsg && (
                <p className="text-red-600 text-xs text-center mb-2">
                  {errMsg}
                </p>
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
        </div>
      </div>
    </div>
  );
}

export default PartnerEmailVerification;
