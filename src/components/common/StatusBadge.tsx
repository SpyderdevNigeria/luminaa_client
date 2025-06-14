import React from "react";

type StatusBadgeProps = {
  status:
    | "Ongoing"
    | "Completed"
    | "Pending"
    | "Cancelled"
    | "In Progress"
    | "Paid"
    | "success"
    | "failed"
    | "error"
    | string;
};

const statusStyles: Record<string, { bg: string; dot: string; text: string }> =
  {
    ongoing: {
      bg: "bg-amber-50",
      dot: "bg-amber-400",
      text: "text-amber-400",
    },
    completed: {
      bg: "bg-green-50",
      dot: "bg-green-500",
      text: "text-green-500",
    },
    pending: {
      bg: "bg-blue-50",
      dot: "bg-blue-400",
      text: "text-blue-400",
    },
    cancelled: {
      bg: "bg-red-50",
      dot: "bg-red-400",
      text: "text-red-400",
    },
    inprogress: {
      bg: "bg-yellow-50",
      dot: "bg-yellow-400",
      text: "text-yellow-500",
    },
      in_progress: {
      bg: "bg-yellow-50",
      dot: "bg-yellow-400",
      text: "text-yellow-500",
    },
    paid: {
      bg: "bg-green-50",
      dot: "bg-green-400",
      text: "text-green-600",
    },
    success: {
      bg: "bg-emerald-50",
      dot: "bg-emerald-400",
      text: "text-emerald-600",
    },
    failed: {
      bg: "bg-rose-50",
      dot: "bg-rose-400",
      text: "text-rose-500",
    },
    active: {
      bg: "bg-emerald-50",
      dot: "bg-emerald-400",
      text: "text-emerald-600",
    },
    inactive: {
      bg: "bg-rose-50",
      dot: "bg-rose-400",
      text: "text-rose-500",
    },
    error: {
      bg: "bg-red-100",
      dot: "bg-red-500",
      text: "text-red-600",
    },
  };

const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
  const style = statusStyles[status.toLowerCase()] || {
    bg: "bg-gray-50",
    dot: "bg-gray-400",
    text: "text-gray-400",
  };

  return (
    <div>
      <button
        className={`flex items-center space-x-2 py-1 px-2 rounded-full ${style.bg}`}
      >
        <span className={`w-2 h-2 rounded-full ${style.dot}`}></span>
        <h4 className={`text-xs font-[300] capitalize ${style.text}`}>
          {status}
        </h4>
      </button>
    </div>
  );
};

export default StatusBadge;
