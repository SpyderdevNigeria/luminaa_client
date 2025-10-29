import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../store";
import { fetchServicePrices, updateFilters } from "../reducers/servicePriceSlice";

export const useServicePrices = () => {
  const dispatch = useDispatch();
  const { data, total, loading, error, filters } = useSelector(
    (state: RootState) => state.servicePrices
  );

  const getServicePrices = useCallback(() => {
    dispatch(fetchServicePrices() as any);
  }, [dispatch, filters]);

  const setFilters = useCallback(
    (newFilters: Partial<typeof filters>) => {
      dispatch(updateFilters(newFilters));
    },
    [dispatch]
  );

  return {
    data,
    total,
    loading,
    error,
    filters,
    fetchServicePrices: getServicePrices,
    updateFilters: setFilters,
  };
};
