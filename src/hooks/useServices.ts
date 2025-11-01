import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState, AppDispatch } from "../store";
import { fetchServices, fetchServicesForPatient, updateFilters } from "../reducers/serviceSlice";

export const useServices = () => {
  const dispatch = useDispatch<AppDispatch>();

  const { data, total, loading, error, filters } = useSelector(
    (state: RootState) => state.services
  );


  const fetchServicesList = useCallback(() => {
    dispatch(fetchServices());
  }, [dispatch, filters]);

  const fetchServicesListPatient = useCallback(() => {
    dispatch(fetchServicesForPatient());
  }, [dispatch, filters]);

  const setFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(updateFilters(newFilters));
  };

  return {
    data,
    total,
    loading,
    error,
    filters,
    fetchServices: fetchServicesList,
    updateFilters: setFilters,
    fetchServicesListPatient  :fetchServicesListPatient
  };
};
