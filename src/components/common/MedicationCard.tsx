import React from "react";
import { PiPillDuotone } from "react-icons/pi";
import { HiOutlineDotsVertical } from "react-icons/hi";
import { FiEye, FiPlusCircle } from "react-icons/fi";
import Dropdown from "../dropdown/dropdown";
import { IMedication } from "../../types/Interfaces";

interface MedicationCardProps {
  medication: IMedication;
  prescriptions?: any;
  onView?: () => void;
  onAddPrescription?: () => void;
  buttonText?: string;
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  prescriptions,
  onView,
  onAddPrescription,
  buttonText = "Add as Prescription",
}) => {
  const findMedicationInPrescription = (id: string) => {
    return prescriptions?.find(
      (i: { medication: { id: string } }) => i?.medication?.id === id
    );
  };

  const isAlreadyAdded = findMedicationInPrescription(medication?.id);

  return (
    <div className="bg-white border  border-gray-300 rounded-xl shadow p-4 flex flex-col relative group hover:shadow-md transition">
      {/* Dropdown Menu */}
      {(onView || onAddPrescription) && !prescriptions && (
        <div className="absolute top-3 right-3 z-10">
          <Dropdown
            showArrow={false}
            triggerLabel=""
            triggerIcon={<HiOutlineDotsVertical />}
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
              {onAddPrescription && (
                <li
                  onClick={onAddPrescription}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-primary"
                >
                  <FiPlusCircle /> {buttonText}
                </li>
              )}
            </ul>
          </Dropdown>
        </div>
      )}

      {/* Image */}
      <div className="w-full h-[200px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
        {medication?.image?.url ? (
          <img
            src={medication.image.url}
            alt={medication.name}
            className="w-full h-full object-container"
          />
        ) : (
          <PiPillDuotone className="text-4xl text-gray-500" />
        )}
      </div>

      {/* Title & Date */}
      <div className="mb-2">
        <h2 className="text-lg font-semibold text-gray-900 truncate">
          {medication.name}
        </h2>
        <p className="text-xs text-gray-500">
          Added on{" "}
          {new Date(medication?.createdAt ?? "").toLocaleDateString(undefined, {
            year: "numeric",
            month: "short",
            day: "numeric",
          })}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 text-sm text-gray-700 mb-4">
        <div>
          <p className="text-xs text-gray-400 uppercase">Generic</p>
          <p className="font-medium">{medication.genericName}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Dosage</p>
          <p className="font-medium">
              {medication.dosageForm}
          </p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Manufacturer</p>
          <p className="font-medium">{medication.manufacturer}</p>
        </div>
        <div>
          <p className="text-xs text-gray-400 uppercase">Requires Rx</p>
          <p className="font-medium">
            {medication.requiresPrescription ? "Yes" : "No"}
          </p>
        </div>
        <div className="col-span-2">
          <p className="text-xs text-gray-400 uppercase">Price</p>
          <p className="font-medium">₦{medication.price}</p>
        </div>
        {/* <div className="col-span-2">
          <p className="text-xs text-gray-400 uppercase">Description</p>
          <p className="font-medium line-clamp-2">{medication.description}</p>
        </div> */}
      </div>

      {/* Action Button */}
      {onAddPrescription && (
        <button
          onClick={onAddPrescription}
          disabled={!!isAlreadyAdded}
          className={`w-full py-2 px-4 text-sm font-medium rounded-lg transition ${
            isAlreadyAdded
              ? "bg-gray-100 text-gray-500 cursor-not-allowed"
              : "bg-primary text-white hover:bg-primary/90"
          }`}
        >
          {isAlreadyAdded ? "Already Added" : buttonText}
        </button>
      )}
    </div>
  );
};

export default MedicationCard;
