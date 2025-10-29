import { useDispatch, useSelector } from "react-redux";
import { useCallback } from "react";
import { RootState } from "../store";
import {
  setPartners,
  setPartnersError,
  setPartnersFilters,
  setPartnersLoading,
} from "../reducers/partnerSlice";

export const usePartners = (api: any) => {
  const dispatch = useDispatch();
  const { data, loading, error, total, filters } = useSelector(
    (state: RootState) => state.partners
  );

const fetchPartners = useCallback(async () => {
  try {
    dispatch(setPartnersLoading(true));
    const filteredFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([, value]) =>
          value !== null &&
          value !== undefined &&
          value !== "" &&
          !(typeof value === "string" && value.trim() === "")
      )
    );

    const response = await api.getPartners(filteredFilters);

    dispatch(
      setPartners({
        data: response?.data?.data || [],
        total: response?.data?.total || 0,
      })
    );
  } catch (err: any) {
    dispatch(setPartnersError(err.message || "Failed to fetch partners"));
  } finally {
    dispatch(setPartnersLoading(false));
  }
}, [dispatch, filters]);


  const updateFilters = (newFilters: Partial<typeof filters>) => {
    dispatch(setPartnersFilters(newFilters));
  };

  return {
    data,
    loading,
    error,
    total,
    filters,
    fetchPartners,
    updateFilters,
  };
};
