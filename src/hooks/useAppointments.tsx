import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setAllAppointments,
  setAppointmentPage,
} from "../reducers/appointmentSlice";

function useAppointments(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingAppointment, setLoadingAppointment] = useState(false);
  const [status, setStatus] = useState("");
  const [dataFrom, setDataFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [errorAppoint, setErrorAppoint] = useState("");

  const { appointments, page, total, limit, totalPages } = useSelector(
    (state: RootState) => state.appointments
  );

  const handleSetPage = (newPage: number) => {
    dispatch(setAppointmentPage(newPage));
  };

  const getAppointments = async () => {
    setLoadingAppointment(true);
    setErrorAppoint("");
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (dataFrom) params.append("dataFrom", dataFrom);
      if (dateTo) params.append("dateTo", dateTo);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getAppointments(query);

      if (res?.data?.data) {
        dispatch(
          setAllAppointments({
            data: res.data.data,
            total: res.data.total || 0,
            limit: res.data.limit || 10,
            totalPages: res.data.totalPages || 1,
            page: res.data.page || 1,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching appointments:", error);
      setErrorAppoint("Error fetching appointments");
    } finally {
      setLoadingAppointment(false);
    }
  };

  return {
    loadingAppointment,
    appointments,
    page,
    total,
    limit,
    totalPages,
    status,
    dataFrom,
    dateTo,
    setStatus,
    setDataFrom,
    setDateTo,
    getAppointments,
    handleSetPage,
    errorAppoint,
    setLoadingAppointment,
  };
}

export default useAppointments;
