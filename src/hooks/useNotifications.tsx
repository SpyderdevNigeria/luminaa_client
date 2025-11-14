import { useDispatch, useSelector } from "react-redux";
// import api from "../api/apiConfig";
import { io } from "socket.io-client";
import { useEffect } from "react";
import { AppDispatch, RootState } from "../store";
import { clearSelected, fetchNotifications,addNotification, fetchUnreadCount, markAllAsRead, markAsRead, setPage, viewNotification } from "../reducers/notificationSlice";
import notifySound from "../assets/sounds/notify.mp3";
import toast from "react-hot-toast";
function playNotificationSound() {
  const audio = new Audio(notifySound);
  audio.play().catch(() => {});
}

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
 // -------------------------------
  //  SOCKET.IO INTEGRATION HERE
  // -------------------------------
  useEffect(() => {
    const token = localStorage.getItem("token");

    const socket = io(`${import.meta.env.VITE_API_BASE_URL}/notifications`, {
      transports: ["websocket"],
      extraHeaders: {
       Authorization :`Bearer ${token}`,
      },
    });
      //  See when socket connects
  socket.on("connect", () => {
    console.log("🔌 Socket connected:", socket.id);
  });

  //  See when socket disconnects
  socket.on("disconnect", (reason) => {
    console.log("❌ Socket disconnected:", reason, import.meta.env.VITE_API_BASE_URL );
  });

  // Errors
  socket.on("connect_error", (err) => {
    console.log("⚠️ Socket connection error:", err.message, import.meta.env.VITE_API_BASE_URL);
  });
    //  Listen for new notifications
    socket.on("new_notification", (data) => {
      dispatch(addNotification(data));
      dispatch(fetchUnreadCount());
      playNotificationSound();

      toast((t) => (
      <div
        onClick={() => {
          dispatch(viewNotification(data.id));
          toast.dismiss(t.id);
        }}
        className="cursor-pointer flex flex-col"
      >
        <span className="font-semibold">{data.title}</span>
        <span className="text-sm text-gray-600">{data.message}</span>
      </div>
    ));
    });

    // Cleanup when component unmounts
    return () => {
      socket.disconnect();
    };
  }, [dispatch]);

  function fetchUnreadCountFunc() {
    dispatch(fetchUnreadCount());
  }

  return {
    notifications,
    unreadCount,
    selectedNotification,
    loading,
    detailLoading,
    page,
    limit,
    fetchUnreadCountFunc,
    // actions
    setPage: (p: number) => dispatch(setPage(p)),
    clearSelected: () => dispatch(clearSelected()),

    viewNotification: (id: string) => dispatch(viewNotification(id)),
    markAsRead: (id: string) => dispatch(markAsRead(id)),
    markAllAsRead: () => dispatch(markAllAsRead()),
  };
}
