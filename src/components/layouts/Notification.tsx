import { useState, useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import api from "../../api/apiConfig";

interface NotificationProps {
  role: string | undefined;
}

function Notification({ role }: NotificationProps) {
  const [unreadCount, setUnreadCount] = useState(0);
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Fetch unread notifications count
  const fetchUnreadCount = async () => {
    try {
      const res = await api.get(`/notifications/unread-count`);
      setUnreadCount(res?.data?.data?.count || 0);
    } catch (error) {
      console.error("Failed to fetch unread count:", error);
    }
  };

  useEffect(() => {
    fetchUnreadCount();
  }, []);

  // Navigate to the notifications page
  const handleNavigateToNotifications = () => {
    navigate(`/${role}/notifications`);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Bell Icon with badge */}
      <div
        className="relative flex flex-col items-center justify-center gap-2  cursor-pointer hover:bg-primary/10 transition"
        onClick={handleNavigateToNotifications}
      >
        <FiBell className="text-lg text-primary" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-semibold rounded-full w-4 h-4 flex items-center justify-center">
            {unreadCount > 9 ? "9+" : unreadCount}
          </span>
        )}
      </div>
    </div>
  );
}

export default Notification;
