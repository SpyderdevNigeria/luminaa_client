import { useDispatch, useSelector } from "react-redux";


import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { clearSelected, fetchNotifications, fetchUnreadCount, markAllAsRead, markAsRead, setPage, viewNotification } from "../reducers/notificationSlice";

export default function useNotifications() {
  const dispatch = useDispatch<AppDispatch>();
  const {
    notifications,
    unreadCount,
    selectedNotification,
    loading,
    detailLoading,
    page,
    limit,
  } = useSelector((state: RootState) => state.notifications);

  useEffect(() => {
    dispatch(fetchNotifications({ page, limit }));
    dispatch(fetchUnreadCount());
  }, [dispatch, page]);

  return {
    notifications,
    unreadCount,
    selectedNotification,
    loading,
    detailLoading,
    page,
    limit,

    // actions
    setPage: (p: number) => dispatch(setPage(p)),
    clearSelected: () => dispatch(clearSelected()),

    viewNotification: (id: string) => dispatch(viewNotification(id)),
    markAsRead: (id: string) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
  };
}
