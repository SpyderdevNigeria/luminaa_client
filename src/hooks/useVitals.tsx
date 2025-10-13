import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../store";
import { setVitals, setVitalsError, setVitalsFilters, setVitalsLoading } from "../reducers/vitalSlice";


export const useVitals = (api:any) => {
  const dispatch = useDispatch();
  const { data, loading, error, total, filters } = useSelector(
    (state: RootState) => state.vitals
  );

  const fetchVitals = useCallback(async () => {
    try {
      dispatch(setVitalsLoading(true));
      const response = await api.getVitals(filters); 
      console.log(response)
      // response should return { data, total }
      dispatch(setVitals({ data: response?.data?.data, total: response?.data?.total }));
    } catch (err: any) {
      dispatch(setVitalsError(err.message || "Failed to fetch vitals"));
    } finally {
      dispatch(setVitalsLoading(false));
    }
  }, [dispatch, filters]);

  const updateFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setVitalsFilters(newFilters));
  };

  return {
    data,
    loading,
    error,
    total,
    filters,
    fetchVitals,
    updateFilters,
  };
};
