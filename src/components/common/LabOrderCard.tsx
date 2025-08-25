import { PiTestTubeBold } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import routeLinks from "../../utils/routes";
import StatusBadge from "./StatusBadge";
import Dropdown from "../dropdown/dropdown";
import { useNavigate } from "react-router-dom";
import moment from "moment";

const STATUS_STEPS = ["PENDING", "IN_PROGRESS", "COMPLETED"];

function LabCard({
  order,
  type = "lab",
  onEdit,
  onDelete,
  onView,
}: {
  order: any;
  type: string;
  onEdit?: () => void;
  onView?:() => void;
  onDelete?: () => void;
}) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    switch (type) {
      case "lab":
        return navigate(`${routeLinks?.lab?.labRequests}/${order?.id}`);
      case "doctor":
        return navigate(`${routeLinks?.doctor?.labOrders}/${order?.id}`);
      case "patient":
        return navigate(`${routeLinks?.patient?.lab}/${order?.id}`);
      default:
        break;
    }
  };

  const testName = order?.testName || "Lab Test";
  const testNotes = order?.notes || "No additional notes provided.";
  const priority = order?.priority || "normal";
  const status = order?.status || "PENDING";
  const createdAt = moment(order?.createdAt).format("MMM D, YYYY h:mm A");
  const currentStatusIndex = STATUS_STEPS.indexOf(status);

  return (
    <main className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition bg-white  text-black flex flex-col gap-6 relative">
      {/* Dropdown */}
      {(onEdit || onDelete) && (
        <div className="absolute top-4 right-4">
          <Dropdown
            showArrow={false}
            triggerLabel=""
            triggerIcon={<HiOutlineDotsVertical />}
          >
            <ul className="space-y-2 text-sm">
              <li
                onClick={onView}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              >
                <FiEye /> View
              </li>
              {onEdit && (
                <li
                  onClick={onEdit}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                >
                  <FiEdit /> Edit
                </li>
              )}
              {onDelete && (
                <li
                  onClick={onDelete}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
                >
                  <FiTrash2 /> Delete
                </li>
              )}
            </ul>
          </Dropdown>
        </div>
      )}

      {/* Header */}
      <div className="flex items-center gap-4">
     <div>
         <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
          <PiTestTubeBold className="text-white text-2xl" />
        </div>
     </div>
        <div>
          <h3 className="text-lg font-semibold capitalize line-clamp-1">
            {testName}
          </h3>
          <p className="text-sm text-gray-500">Requested on {createdAt}</p>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="w-full">
        <h4 className="text-sm font-medium text-gray-600 mb-2">Progress</h4>
        <div className="flex items-center justify-between relative">
          {STATUS_STEPS.map((step, index) => {
            const isCompleted = index <= currentStatusIndex;
            return (
              <div
                key={step}
                className="flex-1 flex items-center justify-center relative"
              >
                <div
                  className={`w-4 h-4 z-10 rounded-full ${
                    isCompleted ? "bg-primary" : "bg-gray-300"
                  }`}
                />
                {index !== STATUS_STEPS.length - 1 && (
                  <div
                    className={`absolute top-1/2 left-1/2 h-1 w-full transform -translate-y-1/2 ${
                      index < currentStatusIndex ? "bg-primary" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
        <div className="flex justify-between mt-2 text-xs text-gray-600">
          {STATUS_STEPS.map((step) => (
            <span key={step}>{step.replace("_", " ")}</span>
          ))}
        </div>
      </div>

      {/* Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <h4 className="text-sm font-medium text-gray-600">Priority</h4>
          <span
            className={`inline-block px-3 py-1 mt-1 rounded-full text-xs font-semibold capitalize ${
              priority === "high"
                ? "bg-red-100 text-red-600"
                : priority === "medium"
                ? "bg-yellow-100 text-yellow-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {priority} priority
          </span>
        </div>
            {type !== "patient" && 
                  <div className="md:col-span-2">
          <h4 className="text-sm font-medium text-gray-600">Patient</h4>
          <p className="text-sm text-gray-800">  <span>
          {order.patient?.firstName && order.patient?.lastName ? order.patient?.firstName + " " + order.patient?.lastName : "N/A"}
        </span></p>
        </div>
        }

        {type !== "patient" && 
                  <div className="md:col-span-2">
          <h4 className="text-sm font-medium text-gray-600">Notes</h4>
          <p className="text-sm text-gray-800">{testNotes}</p>
        </div>
        }
      </div>

      {/* Footer */}
      {type !== "" && (
        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
          <StatusBadge status={status} />
          <button
            onClick={handleNavigate}
            className="bg-primary text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90"
          >
            View Test Request
          </button>
        </div>
      )}
    </main>
  );
}

export default LabCard;
