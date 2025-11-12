import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { usePaystackPayment } from "../../../hooks/usePaystackPayment";
import routeLinks from "../../../utils/routes";


export default function PaymentCallback() {
  const [params] = useSearchParams();
  const reference = params.get("reference");
  const navigate = useNavigate();
  const { verifyPayment, message, loading } = usePaystackPayment();

  useEffect(() => {
    if (!reference) {
      navigate(routeLinks?.patient?.dashboard);
      return;
    }
    if (reference) {
      void verifyPayment(reference);
    }
  }, [reference, navigate, verifyPayment]);

  return (
    <div className="p-10 text-center">
      <h2 className="text-2xl font-bold mb-3">
        {loading ? "Verifying Payment..." : "Payment Status"}
      </h2>
      <p className="text-gray-600">{message || "Please wait..."}</p>
    </div>
  );
}
