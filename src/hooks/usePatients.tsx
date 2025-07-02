import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setAllPatients,
  setPatientPage,
} from "../reducers/patientSlice";
function usePatients(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingPatients, setLoadingPatients] = useState(false);
  const [search, setSearch] = useState("");
  const [speciality, setSpeciality] = useState("");
  const [errorPatients, setErrorPatients] = useState("");

  const { patients, page, limit, total, totalPages } = useSelector(
    (state: RootState) => state.patients
  );

  const handleSetPage = (newPage: number) => {
    dispatch(setPatientPage(newPage));
  };

  const getPatients = async () => {
    setLoadingPatients(true);
    setErrorPatients("");
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (speciality) params.append("speciality", speciality);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getPatients(query);
      if (res?.data?.data) {
        dispatch(
          setAllPatients({
            data: res.data.data,
            total: res.data.total || 0,
            limit: res.data.limit || 10,
            totalPages: res.data.total || 1,
            page: res.data.page || 1,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching patients:", error);
      setErrorPatients("Error fetching patients");
    } finally {
      setLoadingPatients(false);
    }
  };

  return {
    loadingPatients,
   patients,
    page,
    limit,
    total,
    totalPages,
    search,
    speciality,
    setSearch,
    setSpeciality,
    getPatients,
    handleSetPage,
    errorPatients,
    setLoadingPatients,
  };
}

export default usePatients;
