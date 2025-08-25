import React from "react";
import { PiPillDuotone } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye, FiEdit, FiTrash2 } from "react-icons/fi";
import Dropdown from "../dropdown/dropdown";
import { IPrescription } from "../../types/Interfaces";


interface PrescriptionCardProps {
  prescription: IPrescription;
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

const PrescriptionCard: React.FC<PrescriptionCardProps> = ({
  prescription,
  onView,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-white  border border-gray-200 rounded-xl shadow-sm p-4 2xl:p-4 flex flex-col justify-between hover:shadow-md transition relative">
      {/* Dropdown Menu */}
      { onEdit || onDelete ? (<div className="absolute top-3 right-3">
        <Dropdown showArrow={false} triggerLabel="" triggerIcon={<HiOutlineDotsVertical />}>
          <ul className="space-y-2 text-sm">
            <li
              onClick={onView}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEye /> View
            </li>
            <li
              onClick={onEdit}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
            >
              <FiEdit /> Edit
            </li>
            <li
              onClick={onDelete}
              className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
            >
              <FiTrash2 /> Delete
            </li>
          </ul>
        </Dropdown>
      </div>) : null}

      {/* Top: Icon + Medication Name */}
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 text-primary p-2 rounded-full">
          <PiPillDuotone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {prescription?.medicationName}
          </h2>
          {prescription?.createdAt &&   <p className="text-sm text-gray-500">
            Prescribed on{" "}
            {new Date(prescription?.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>}
        </div>
      </div>

      {/* Middle: Duration & Frequency */}
      <div className="mt-4 space-y-2">
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Duration</h4>
          <p className="text-sm font-medium text-gray-800">{prescription.duration}</p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Frequency</h4>
          <p className="text-sm font-medium text-gray-800">{prescription.frequency}</p>
        </div>
           <div>
          <h4 className="text-xs text-gray-500 uppercase">Refillable</h4>
          <p className="text-sm font-medium text-gray-800">{prescription.isRefillable ? "Yes" : 'No'}</p>
        </div>
      </div>

      {/* Bottom: View Details Button */}
      <div className="mt-6">
        <button
          onClick={onView}
          className="w-full text-sm font-medium bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition"
        >
          View Details
        </button>
      </div>
    </div>
  );
};

export default PrescriptionCard;
