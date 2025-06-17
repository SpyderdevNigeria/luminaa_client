import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setAdmins,
  setAdminsLoading,
  setAdminsError,
  setAdminsPagination,
  setAdminsSearch,
} from "../reducers/superAdminSlice";

function useSuperAdmin(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const { admins } = useSelector((state: RootState) => state.superAdmin);

  const getAdmins = async () => {
    dispatch(setAdminsLoading(true));
    dispatch(setAdminsError(null));

    try {
      const params = new URLSearchParams();
      params.append("page", admins.page.toString());
      params.append("limit", admins.limit.toString());
      if (admins.search) params.append("search", admins.search);

      const res = await api.getAdmins(`?${params.toString()}`);
      dispatch(
        setAdmins({
          data: res?.data?.data,
          total: res.data?.total ?? 0,
          limit: res?.data?.limit,
          page: res?.data?.page,
        })
      );
    } catch (err) {
      dispatch(setAdminsError("Failed to fetch admins"));
    } finally {
      dispatch(setAdminsLoading(false));
    }
  };

  return {
    // Admins
    admins: admins.data,
    adminsPage: admins.page,
    adminsLimit: admins.limit,
    adminsTotal: admins.total,
    adminsLoading: admins.loading,
    adminsError: admins.error,
    adminsSearch: admins.search,

    setAdminsPage: (val: number) =>
      dispatch(setAdminsPagination({ page: val, limit: admins.limit })),
    setAdminsLimit: (val: number) =>
      dispatch(setAdminsPagination({ page: admins.page, limit: val })),
    setAdminsSearch: (val: string) => dispatch(setAdminsSearch(val)),

    getAdmins,
  };
}

export default useSuperAdmin;
