import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/apiConfig";
import { EntityType } from "../types/Interfaces";
import { useToaster } from "../components/common/ToasterContext";
interface InitializeResponse {
  data: any;
  paymentId: string;
  authorizationUrl?: string;
  reference: string;
  amount: number;
  message?: string;
  hmoApproved?: boolean;
  hmoName?: string;
}

interface VerifyResponse {
  data: any;
  paymentId: string;
  status: string;
  reference: string;
  amount: number;
  message: string;
  entityType: EntityType;
  entityId: string;
}

export const usePaystackPayment = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
 const { showToast } = useToaster();
  /** Initialize payment for a given entity */
  const initializePayment = async (
    entityType: EntityType,
    entityId: string,
    callbackUrl?: string
  ): Promise<void> => {
    setLoading(true);
    setMessage(null);
    try {
      const payload = {
        entityType,
        entityId,
        callbackUrl: callbackUrl || `${window.location.origin}/patient/payment/callback`,
      };

      const res = await api.post<InitializeResponse>(
        "/patient/payments/initialize",
        payload
      );

      const data = res?.data?.data;
      console.log(data);
      if (data.hmoApproved) {
        // Automatically approved via HMO coverage
        setMessage(data.message || "Payment approved via HMO coverage");
      } else if (data.authorizationUrl) {
        // Redirect to Paystack checkout
        window.location.href = data.authorizationUrl;
      } else {
        setMessage("Unexpected payment response received.");
      }
    } catch (err: any) {
      console.error("Payment initialization error:", err);
      setMessage(err.response?.data?.message || "Failed to initialize payment.");
       showToast(err.response?.data?.message || "Failed to initialize payment.");
    } finally {
      setLoading(false);
    }
  };

  /** Verify payment after Paystack redirects back */
  const verifyPayment = async (reference: string): Promise<void> => {
    setLoading(true);
    setMessage(null);
    try {
      const res = await api.get<VerifyResponse>(
        `/patient/payments/verify/${reference}`
      );
      const data = res?.data?.data;

      if (data.status === "completed") {
        setMessage("Payment verified successfully!");
        navigate("/patient/payment/success", { state: data });
      } else {
        setMessage("Payment verification failed.");
      }
    } catch (err: any) {
      console.error("Payment verification error:", err);
      setMessage("Error verifying payment.");
    } finally {
      setLoading(false);
    }
  };

  return {
    initializePayment,
    verifyPayment,
    loading,
    message,
  };
};
