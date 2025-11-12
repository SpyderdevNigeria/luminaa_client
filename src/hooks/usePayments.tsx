import { useState, useCallback } from "react";

export interface Payment {
  id: string;
  entityId: string;
  entityType: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: string;
  paystackReference?: string;
  paystackStatus?: string;
  paystackPaidAt?: string;
  paystackChannel?: string;
  offlinePaymentMethod?: string;
  offlineReference?: string;
  offlineVerified?: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Filters {
  patientId?: string;
  entityType?: string;
  status?: string;
}

export function usePayments(api:any) {
  const [payments, setPayments] = useState<Payment[]>([]);
  const [payment, setPayment] = useState<Payment | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  const getPayments = useCallback(async (filters?: Filters) => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (filters?.patientId) params.append("patientId", filters.patientId);
      if (filters?.entityType) params.append("entityType", filters.entityType);
      if (filters?.status) params.append("status", filters.status);

      const res = await api.getPayments(params.toString());
      setPayments(res.data);
    } catch (err: any) {
      console.error("Error fetching payments:", err);
      setError(err.response?.data?.message || "Failed to fetch payments");
    } finally {
      setLoading(false);
    }
  }, []);


  const getPaymentById = useCallback(async (id: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getPaymentById(id);
      setPayment(res.data);
    } catch (err: any) {
      console.error("Error fetching payment details:", err);
      setError(err.response?.data?.message || "Failed to fetch payment details");
    } finally {
      setLoading(false);
    }
  }, []);


  const getPaymentsByEntity = useCallback(async (entityType: string, entityId: string) => {
    setLoading(true);
    setError(null);
    try {
      const res = await api.getPaymentsByEntity(entityType, entityId);
      setPayments(res.data);
    } catch (err: any) {
      console.error("Error fetching payments for entity:", err);
      setError(err.response?.data?.message || "Failed to fetch entity payments");
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    payments,
    payment,
    loading,
    error,
    getPayments,
    getPaymentById,
    getPaymentsByEntity,
  };
}
