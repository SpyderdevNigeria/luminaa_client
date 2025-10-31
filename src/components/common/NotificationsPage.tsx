import { IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import useNotifications from "../../hooks/useNotifications"; 
import { useState } from "react";

export default function NotificationsPage() {
  const {
    notifications,
    unreadCount,
    selectedNotification,
    loading,
    detailLoading,
    page,
    limit,
    setPage,
    clearSelected,
    viewNotification,
    markAsRead,
    markAllAsRead,
  } = useNotifications();

  //  Local toggle for showing all or unread only
  const [showAll, setShowAll] = useState(false);

  //  Filter based on toggle
  const filteredNotifications = showAll
    ? notifications
    : notifications.filter((n) => !n.isRead);

  return (
    <div className="p-4 relative bg-white">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg md:text-2xl font-semibold">
          {showAll ? "All Notifications" : "Unread Notifications"}{" "}
          {unreadCount > 0 && !showAll && (
            <motion.span
              className="ml-2 text-sm bg-red-500 text-white rounded-full px-2 py-0.5"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {unreadCount}
            </motion.span>
          )}
        </h2>

        <div className="flex items-center space-x-2">
          {unreadCount > 0 && (
            <button
              onClick={markAllAsRead}
              className="border border-gray-300 rounded-md px-2 py-1 text-sm hover:bg-gray-100"
            >
              Mark all as read
            </button>
          )}

          <button
            onClick={() => setShowAll((prev) => !prev)}
            className="border border-gray-300 rounded-md px-2 py-1 text-sm hover:bg-gray-100"
          >
            {showAll ? "Show Unread Only" : "Show All"}
          </button>
        </div>
      </div>

      {loading ? (
        <div className="p-4 text-gray-500  min-h-[500px] flex flex-col items-center justify-center">Loading...</div>
      ) : filteredNotifications.length > 0 ? (
        <>
          <div className="space-y-2 mt-2 mx-2 max-h-[75vh] overflow-y-auto">
            <AnimatePresence>
              {filteredNotifications.map((e) => (
                <motion.div
                  key={e.id}
                  layout
                  initial={{ opacity: 0, y: 10, scale: 0.98 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.97 }}
                  transition={{ duration: 0.25 }}
                  className={`p-3 border border-gray-100 shadow rounded-lg transition ${
                    e.isRead ? "bg-white" : "bg-blue-50"
                  }`}
                >
                  <div className="flex flex-row items-center justify-between">
                    <h3
                      className="text-base cursor-pointer hover:underline"
                      onClick={() => viewNotification(e.id)}
                    >
                      {e.title}{" "}
                      <span className="text-xs font-light ml-2 text-gray-500">
                        {timeAgo(e.createdAt)}
                      </span>
                    </h3>
                    <motion.div
                      whileTap={{ scale: 0.8 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <IoMdClose
                        onClick={() => markAsRead(e.id)}
                        className="cursor-pointer text-gray-500 hover:text-gray-700"
                      />
                    </motion.div>
                  </div>

                  <p className="text-xs text-gray-600 font-light py-4">
                    {e.message.length > 80
                      ? e.message.slice(0, 80) + "..."
                      : e.message}
                  </p>

                  <div className="flex space-x-2">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => markAsRead(e.id)}
                      className="text-xs text-gray-500"
                    >
                      Dismiss
                    </motion.button>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => viewNotification(e.id)}
                      className="text-xs font-semibold text-primary"
                    >
                      View
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {/*  Pagination Controls */}
          <div className="flex justify-between items-center mt-4 px-4">
            <button
              onClick={() => setPage(Math.max(page - 1, 1))}
              disabled={page === 1}
              className={`text-sm px-3 py-1 rounded-md border ${
                page === 1
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-primary border-primary hover:bg-primary hover:text-white"
              }`}
            >
              Previous
            </button>

            <span className="text-sm text-gray-600">Page {page}</span>

            <button
              onClick={() => setPage(page + 1)}
              disabled={filteredNotifications.length < limit}
              className={`text-sm px-3 py-1 rounded-md border ${
                filteredNotifications.length < limit
                  ? "text-gray-400 border-gray-200 cursor-not-allowed"
                  : "text-primary border-primary hover:bg-primary hover:text-white"
              }`}
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="p-4 text-base text-gray-500 min-h-[500px] flex flex-col items-center justify-center">
          {showAll
            ? "No notifications available"
            : "No unread notifications "}
        </div>
      )}

      {/* Notification Detail Modal */}
      <AnimatePresence>
        {selectedNotification && (
          <motion.div
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white rounded-xl shadow-lg w-[90%] md:w-[500px] max-h-[80vh] overflow-y-auto p-6 relative"
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={clearSelected}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                <IoMdClose size={20} />
              </motion.button>

              {detailLoading ? (
                <div className="text-gray-500 text-sm py-8 text-center">
                  Loading notification...
                </div>
              ) : (
                <>
                  <h2 className="text-lg font-semibold mb-1">
                    {selectedNotification.title}
                  </h2>
                  <p className="text-xs text-gray-500 mb-4">
                    {timeAgo(selectedNotification.createdAt)}
                  </p>
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm text-gray-700 leading-relaxed"
                  >
                    {selectedNotification.message}
                  </motion.p>
                </>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

function timeAgo(dateString: string) {
  const date = new Date(dateString);
  const seconds = Math.floor((Date.now() - date.getTime()) / 1000);
  const intervals: [number, string][] = [
    [31536000, "year"],
    [2592000, "month"],
    [86400, "day"],
    [3600, "hour"],
    [60, "minute"],
  ];
  for (const [secs, label] of intervals) {
    const interval = Math.floor(seconds / secs);
    if (interval >= 1)
      return `${interval} ${label}${interval > 1 ? "s" : ""} ago`;
  }
  return "Just now";
}
