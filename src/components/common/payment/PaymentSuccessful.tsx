import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import routeLinks from "../../../utils/routes";
import { updateUser } from "../../../reducers/authSlice";
import SuccessGif from "../../../assets/images/success.gif";
import { EntityType } from "../../../types/Interfaces";

interface PaymentData {
  paymentId: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  entityType: EntityType;
  entityId: string;
}

export default function PaymentSuccess() {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state: any) => state.auth);
  const data = location.state as PaymentData | undefined;

  useEffect(() => {
    if (!data) {
      navigate("/");
      return;
    }

    // Handle only successful payments
    if (data.status === "completed") {
      switch (data.entityType) {
        case EntityType.PATIENT_REGISTRATION:

          dispatch(updateUser({...user, registrationPaymentStatus: "completed" }));

          // Redirect to appointment booking
          setTimeout(() => {
            navigate(routeLinks?.patient?.appointment);
          }, 3000);
          break;

        case EntityType.APPOINTMENT:
          setTimeout(() => {
            navigate(`${routeLinks?.patient?.consultations}/${data.entityId}`);
          }, 3000);
          break;

        case EntityType.MEDICATION_ORDER:
          setTimeout(() => {
            navigate(`${routeLinks?.patient?.orders}/${data.entityId}`);
          }, 3000);
          break;

        case EntityType.PROCEDURE:
          setTimeout(() => {
            navigate(`${routeLinks?.patient?.procedures}/${data.entityId}`);
          }, 3000);
          break;

        default:
          setTimeout(() => {
            navigate(routeLinks?.patient?.dashboard);
          }, 3000);
          break;
      }
    } else {
      // Payment failed or not completed
      setTimeout(() => {
        navigate("/payment/failed");
      }, 3000);
    }
  }, [data, dispatch, navigate]);

  if (!data) return null;

  return (
    <div className="flex flex-col items-center justify-center h-[80vh] text-center space-y-4">
      {data.status === "completed" ? (
        <>
          <img src={SuccessGif} alt="Success" className="w-32 h-32" />
          <h2 className="text-2xl font-semibold text-green-600">Payment Successful!</h2>
          <p className="text-gray-600">{data.message}</p>
          <p className="text-gray-500">Reference: <strong>{data.reference}</strong></p>
          <p className="text-gray-500">Amount: ₦{data.amount.toLocaleString()}</p>
          <p className="text-sm text-gray-400 mt-4">Redirecting you shortly...</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-semibold text-red-600">Payment Failed</h2>
          <p className="text-gray-600">{data.message}</p>
          <p className="text-sm text-gray-400 mt-4">Redirecting you shortly...</p>
        </>
      )}
    </div>
  );
}
