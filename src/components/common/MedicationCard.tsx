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
}

const MedicationCard: React.FC<MedicationCardProps> = ({
  medication,
  prescriptions,
  onView,
  onAddPrescription,
}) => {
  const findMedicationInPrescription = (id: string) => {
    return prescriptions?.find(
      (i: { medication: { id: string } }) => i?.medication?.id === id
    );
  };
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition relative">
      {/* Dropdown Menu */}
      {(onView || onAddPrescription) && !prescriptions ? (
        <div className="absolute top-3 right-3">
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
                  <FiPlusCircle /> Add as Prescription
                </li>
              )}
            </ul>
          </Dropdown>
        </div>
      ) : ""}

      {/* Top: Icon + Medication Name */}
      <div className="flex items-center space-x-3">
        <div className="bg-primary/10 text-primary p-2 rounded-full">
          <PiPillDuotone className="w-6 h-6" />
        </div>
        <div>
          <h2 className="text-lg font-semibold text-gray-900">
            {medication.name}
          </h2>
          <p className="text-sm text-gray-500">
            Added on{" "}
            {new Date(medication.createdAt).toLocaleDateString(undefined, {
              year: "numeric",
              month: "short",
              day: "numeric",
            })}
          </p>
        </div>
      </div>

      {/* Middle: Key Medication Info */}
      <div className="mt-4 space-y-2">
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Generic Name</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.genericName}
          </p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Dosage</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.strength} / {medication.dosageForm}
          </p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Manufacturer</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.manufacturer}
          </p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Strength</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.strength}
          </p>
        </div>
        <div>
          <h4 className="text-xs text-gray-500 uppercase">Requires Rx</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.requiresPrescription ? "Yes" : "No"}
          </p>
        </div>

        <div>
          <h4 className="text-xs text-gray-500 uppercase">Price</h4>
          <p className="text-sm font-medium text-gray-800">
            {medication.price}
          </p>
        </div>

        <div>
          <h4 className="text-xs text-gray-500 uppercase">description</h4>
          <p className="text-sm font-medium text-gray-800 line-clamp-2">
            {medication.description}
          </p>
        </div>
      </div>

      {/* Bottom: Add as Prescription Button */}
      {onAddPrescription && !prescriptions ? (
        <div className="mt-6">
          <button
            onClick={onAddPrescription}
            className="w-full text-sm font-medium bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition"
          >
            Add as Prescription
          </button>
        </div>
      ) : (
        <>
          {findMedicationInPrescription(medication?.id) ? (
            <div className="mt-6">
              <button className="w-full text-sm font-medium bg-gray-100 py-2 px-4 rounded-lg  transition">
                Already Added
              </button>
            </div>
          ) : (
            <div className="mt-6">
              <button
                onClick={onAddPrescription}
                className="w-full text-sm font-medium bg-primary text-white py-2 px-4 rounded-lg hover:bg-primary/90 transition"
              >
                Add as Prescription
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default MedicationCard;
