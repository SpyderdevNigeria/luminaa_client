import { useDispatch, useSelector } from "react-redux";

import { useCallback } from "react";
import { setReports, setReportsError, setReportsFilters, setReportsLoading } from "../reducers/reportSlice";
import { RootState } from "../store";

export const useReports = (api: any) => {
  const dispatch = useDispatch();
  const { data, loading, error, total, filters } = useSelector(
    (state: RootState) => state.reports
  );

  const fetchReports = useCallback(async (id:any) => {
    try {
      dispatch(setReportsLoading(true));
      const res = await api.getReports({...filters, nurseId: id}); 
       dispatch(setReports({ data: res.data?.data, total: res?.data?.total }));
    } catch (err: any) {
      dispatch(setReportsError(err.message || "Failed to fetch reports"));
    } finally {
      dispatch(setReportsLoading(false));
    }
  }, [dispatch, filters]);

  const updateFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch(setReportsFilters(newFilters));
    },
    [dispatch]
  );

  return {
    data,
    loading,
    error,
    total,
    filters,
    fetchReports,
    updateFilters,
  };
};
