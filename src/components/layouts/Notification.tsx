import { useRef, useEffect } from "react";
import { FiBell } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import useNotifications from "../../hooks/useNotifications";
import { useLocation } from 'react-router-dom';
interface NotificationProps {
  role: string | undefined;
}

function Notification({ role }: NotificationProps) {
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null);
    const location = useLocation();
    const {
      unreadCount,
      fetchUnreadCountFunc,
    } = useNotifications();

    useEffect(() => {
      if (location.pathname) {
        fetchUnreadCountFunc();
        console.log(location.pathname);
      }
    }, [location.pathname]);

    
  
  // Fetch unread notifications count

  // Navigate to the notifications page
  const handleNavigateToNotifications = () => {
    navigate(`/${role?.replace(" ", "-")}/notifications`);
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

