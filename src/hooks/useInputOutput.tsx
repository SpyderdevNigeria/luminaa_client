import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../store";
import { resetInputOutput, setInputOutputData, setInputOutputError, setInputOutputFilters, setInputOutputLoading } from "../reducers/inputOutputSlice";


const useInputOutput = (api : any) => {
  const dispatch = useDispatch();

  const { data, loading, error, total, filters } = useSelector(
    (state: RootState) => state.inputOutput
  );

  const getInputOutputs = useCallback(async () => {
    try {
      dispatch(setInputOutputLoading(true));
      dispatch(setInputOutputError(null));

      const response = await api.getInputOutputs(filters); 
      if (response.data?.data) {
        console.log('response', response)
        dispatch(
          setInputOutputData({
            data: response.data?.data,
            total: response?.data?.total || response.data?.data?.length || 0,
          })
        );
      } else {
        dispatch(setInputOutputError(response?.message || "Failed to fetch data"));
      }
    } catch (err: any) {
      dispatch(setInputOutputError(err.message || "An unexpected error occurred"));
    } finally {
      dispatch(setInputOutputLoading(false));
    }
  }, [api, dispatch, filters]);

  const updateFilters = useCallback(
    (updates: Partial<typeof filters>) => {
      dispatch(setInputOutputFilters(updates));
    },
    [dispatch]
  );


  const reset = useCallback(() => {
    dispatch(resetInputOutput());
  }, [dispatch]);

  return {
    data,
    loading,
    error,
    total,
    filters,
    getInputOutputs,
    updateFilters,
    reset,
  };
};

export default useInputOutput;
