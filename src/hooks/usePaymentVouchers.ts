import {  useState } from "react";
import { setPage, setLimit, setStatus } from "../reducers/paymentVouchersSlice";
import { useAppDispatch, useAppSelector } from "./reduxHooks";

export default function usePaymentVouchers(api:any) {
  const dispatch = useAppDispatch();
  const { page, limit, status } = useAppSelector((state) => state.paymentVouchers);

  const [vouchers, setVouchers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);

  const fetchPaymentVouchers = async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams({
        page: String(page),
        limit: String(limit),
      });
      if (status) params.append("status", status);

      const res = await api.getPaymentVouchers(params.toString());
      setVouchers(res.data.data || []);
      setTotal(res.data.total || 0);
    } catch (err: any) {
      console.error("Error fetching vouchers:", err);
      setError(err.response?.data?.message || "Failed to fetch payment vouchers");
    } finally {
      setLoading(false);
    }
  };

//   useEffect(() => {
//     fetchPaymentVouchers();
//   }, [page, limit, status]);

  return {
    vouchers,
    loading,
    error,
    page,
    limit,
    status,
    total,
    setPage: (p: number) => dispatch(setPage(p)),
    setLimit: (l: number) => dispatch(setLimit(l)),
    setStatus: (s: string) => dispatch(setStatus(s)),
    refetch: fetchPaymentVouchers,
  };
}
