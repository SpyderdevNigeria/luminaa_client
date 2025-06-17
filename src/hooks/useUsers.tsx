import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../store";
import {
  setAllUsers,
  setUserPage,
} from "../reducers/userSlice";

function useUsers(api: any) {
  const dispatch = useDispatch<AppDispatch>();
  const [loadingUsers, setLoadingUsers] = useState(false);
  const [status, setStatus] = useState("");
  const [dateFrom, setDateFrom] = useState("");
  const [dateTo, setDateTo] = useState("");
  const [errorUsers, setErrorUsers] = useState("");

  const { users, page, total, limit, totalPages } = useSelector(
    (state: RootState) => state.users
  );

  const handleSetPage = (newPage: number) => {
    dispatch(setUserPage(newPage));
  };

  const getUsers = async () => {
    setLoadingUsers(true);
    setErrorUsers("");
    try {
      const params = new URLSearchParams();
      if (status) params.append("status", status);
      if (dateFrom) params.append("dateFrom", dateFrom);
      if (dateTo) params.append("dateTo", dateTo);
      params.append("page", page.toString());
      params.append("limit", limit.toString());

      const query = `?${params.toString()}`;
      const res = await api.getUsers(query);

      if (res?.data?.data) {
        dispatch(
          setAllUsers({
            data: res.data.data,
            total: res.data.total || 0,
            limit: res.data.limit || 10,
            totalPages: res.data.totalPages || 1,
            page: res.data.page || 1,
          })
        );
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      setErrorUsers("Error fetching users");
    } finally {
      setLoadingUsers(false);
    }
  };

  return {
    loadingUsers,
    users,
    page,
    total,
    limit,
    totalPages,
    status,
    dateFrom,
    dateTo,
    setStatus,
    setDateFrom,
    setDateTo,
    getUsers,
    handleSetPage,
    errorUsers,
    setLoadingUsers,
  };
}

export default useUsers;
