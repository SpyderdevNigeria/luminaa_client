import React from "react";
import { IInventoryItem } from "../../types/Interfaces";
import { format } from "date-fns";
import {
  FiPackage,
  FiBox,
  FiMapPin,
  FiCalendar,
  FiAlertTriangle,
  FiAlertCircle,
  FiHash,
  FiTag,
  FiEye,
  FiEdit2,
} from "react-icons/fi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import Dropdown from "../dropdown/dropdown";

interface InventoryCardProps {
  inventory: IInventoryItem;
  onEdit?: () => void;
  onView?: () => void;
}

const InventoryCard: React.FC<InventoryCardProps> = ({
  inventory,
  onEdit,
  onView,
}) => {
  const medicationName =
    inventory.medication?.name || inventory.medicationName || "Unknown Medication";

  const genericName =
    inventory.medication?.genericName || inventory.medicationGenericName || "";

  const isExpired = inventory.isExpired;
  const isLowStock = inventory.isLowStock;

  return (
    <div className="rounded-xl p-4 bg-white  shadow-md hover:shadow-lg transition-all relative">
      {/* Top Section */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-lg font-semibold ">{medicationName}</h2>
          {genericName && <p className="text-sm italic ">{genericName}</p>}
        </div>

        {/* Dropdown Actions */}
        <Dropdown
          showArrow={false}
          triggerLabel=""
          triggerIcon={<HiOutlineDotsVertical className="" />}
        >
          <ul className="space-y-2 text-sm">
            {onView && (
              <li
                onClick={onView}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
              >
                <FiEye /> View Details
              </li>
            )}
            {onEdit && (
              <li
                onClick={onEdit}
                className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 "
              >
                <FiEdit2 /> Edit Inventory
              </li>
            )}
          </ul>
        </Dropdown>
      </div>

      {/* Highlighted Stats */}
      <div className="grid grid-cols-2 gap-3 mb-3">
        <div className="bg-gray-50 p-2 rounded flex items-center gap-2 text-sm">
          <FiBox className="text-gray-400" />
          <div>
            <div className=" font-medium">Qty</div>
            <div className="font-semibold ">{inventory.quantity}</div>
          </div>
        </div>
        <div className="bg-gray-50 p-2 rounded flex items-center gap-2 text-sm">
          <FiCalendar className="text-gray-400" />
          <div>
            <div className=" font-medium">Expiry</div>
            <div className="">
              {inventory.expiryDate
                ? format(new Date(inventory.expiryDate), "dd MMM yyyy")
                : "N/A"}
            </div>
          </div>
        </div>
      </div>

      {/* Metadata List */}
      <ul className="text-sm  space-y-1">
        <li className="flex items-center gap-2">
          <FiHash className="text-gray-400" />
          <span className="truncate">Batch: {inventory.batchNumber}</span>
        </li>
        <li className="flex items-center gap-2">
          <FiMapPin className="text-gray-400" />
          <span>Location: {inventory.location}</span>
        </li>
        <li className="flex items-center gap-2">
          <FiPackage className="text-gray-400" />
          <span>Supplier: {inventory.supplier}</span>
        </li>
        <li className="flex items-center gap-2">
          <FiTag className="text-gray-400" />
          <span>Barcode: {inventory.barcode}</span>
        </li>
        <li className="flex items-center gap-2">
          <FiBox className="text-gray-400" />
          <span>Reference: {inventory.reference}</span>
        </li>
      </ul>

      {/* Status Badges */}
      <div className="mt-3 flex gap-2 flex-wrap">
        {isExpired && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs bg-red-100 text-red-700 rounded">
            <FiAlertCircle size={12} /> Expired
          </span>
        )}
        {isLowStock && (
          <span className="flex items-center gap-1 px-2 py-1 text-xs bg-yellow-100 text-yellow-700 rounded">
            <FiAlertTriangle size={12} /> Low Stock
          </span>
        )}
      </div>
    </div>
  );
};

export default InventoryCard;
