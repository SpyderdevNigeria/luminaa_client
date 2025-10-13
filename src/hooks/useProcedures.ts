import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import {
  setProcedures,
  setProceduresLoading,
  setProceduresError,
  setProceduresFilters,
  resetProcedures,
} from "../reducers/procedureSlice";

const useProcedures = (api: any) => {
  const dispatch = useDispatch();
  const { data, loading, error, total, filters } = useSelector(
    (state: RootState) => state.procedures
  );


  const updateFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setProceduresFilters(newFilters));
  };


  const loadProcedures = async () => {
    dispatch(setProceduresLoading(true));
    try {
      // Properly attach filters as query params
      const response = await api?.getProcedures({ params: filters });

      dispatch(
        setProcedures({
          data: response?.data?.data || [],
          total: response?.data?.total || 0,
        })
      );
      if (error) {
        setProceduresError("")
      }
    } catch (err: any) {
      console.log(err)
      dispatch(
        setProceduresError(
          err?.response?.data?.message || err.message || "Failed to fetch procedures"
        )
      );
    } finally {
      dispatch(setProceduresLoading(false));
    }
  };

  
  const reset = () => {
    dispatch(resetProcedures());
  };

  return {
    data,
    loading,
    error,
    total,
    filters,
    updateFilters,
    loadProcedures,
    reset,
  };
};

export default useProcedures;
