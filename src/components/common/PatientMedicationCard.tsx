import React, { useEffect, useState } from "react";
import { PiPillDuotone } from "react-icons/pi";
import { IMedication } from "../../types/Interfaces";
import { MdRemoveRedEye } from "react-icons/md";
import Modal from "../modal/modal";

interface PatientMedicationCardProps {
  medication: IMedication;
  prescriptions?: any;
  onAddPrescription?: () => void;
  quantity?: number;
  buttonText?: string;
  cartItems?: IMedication[];
  loading?:boolean;
}

const PatientMedicationCard: React.FC<PatientMedicationCardProps> = ({
  medication,
  onAddPrescription,
  buttonText = "Add to Cart",
  cartItems = [],
  loading,
}) => {
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("")
  const isInCart = cartItems.some((item) => item.id === medication?.id);
  const handleCartAdd = (id: any) => {
    setActiveId(id);
    if (!isInCart) onAddPrescription?.();
  }

  useEffect(() => {
    if (isInCart) {
      setActiveId("");
    }
  }, [isInCart]);
  return (
    <>
      <div className="bg-white  border border-gray-200 rounded-xl shadow-sm p-4 hover:shadow-md transition flex flex-col justify-between relative">
        {/* Image */}
        <div className="w-full h-[150px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center mb-4">
          {medication?.image?.url ? (
            <img
              src={medication?.image.url}
              alt={medication?.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <PiPillDuotone className="text-4xl text-gray-400" />
          )}
        </div>

        {/* Name & Label */}
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-base font-semibold text-gray-900 line-clamp-2">{medication?.name}</h2>
          {!medication?.requiresPrescription && (
            <div className="relative group text-xs text-primary font-medium">
              OTC
              <div className="absolute bottom-full mb-1 left-1/2 -translate-x-1/2 bg-gray-800 text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20 whitespace-nowrap">
                Over-the-counter
              </div>
            </div>
          )}
        </div>

        {/* Medication Info */}
        <div className="space-y-1 text-sm text-gray-700">
          <p><span className="text-xs uppercase text-gray-500">Strength:</span> {medication?.strength}</p>
          <p><span className="text-xs uppercase text-gray-500">Dosage Form:</span> {medication?.dosageForm}</p>
          <p className="line-clamp-2">
            <span className="text-xs uppercase text-gray-500">Description:</span> {medication?.description}
          </p>
          <p className="font-medium mt-2">NGN {medication?.price || 0}</p>
        </div>

        {/* Buttons */}
        <div className="mt-4 flex gap-2">
          <button
            className="p-2 bg-primary text-white rounded-md"
            onClick={() => setOpen(true)}
          >
            <MdRemoveRedEye />
          </button>
          <button
            onClick={() => { handleCartAdd(medication?.id) }}
            className={`w-full text-sm font-medium border py-1 px-4 rounded-md transition ${
              isInCart
                ? "bg-gray-100 text-gray-500 border-gray-300 cursor-not-allowed"
                : "bg-white  text-primary border-primary hover:bg-primary hover:text-white"
            }`}
          >
           {loading && activeId === medication?.id ? "Loading..." : isInCart ? "Already Added" : buttonText}
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        hideCancel={false}
        buttonText={loading && activeId === medication?.id ? "Loading..." : isInCart ? "Already Added" : buttonText}
        style="lg:min-w-3xl !md:mx-4"
        handleSubmit={handleCartAdd.bind(null, medication?.id)}
      >
        <div className="my-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Image Preview */}
            <div className="bg-gray-100 rounded-lg h-full flex items-center justify-center min-h-[150px]">
              {medication?.image?.url ? (
                <img
                  src={medication?.image.url}
                  alt={medication?.name}
                  className="object-cover rounded-lg max-h-[150px]"
                />
              ) : (
                <PiPillDuotone className="text-primary w-20 h-20" />
              )}
            </div>

            {/* Detailed Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 md:col-span-2">
              <h2 className="text-xl font-semibold md:col-span-2">{medication?.name}</h2>

              <div>
                <p className="text-xs text-gray-500 uppercase">Generic Name</p>
                <p className="text-sm">{medication?.genericName}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Manufacturer</p>
                <p className="text-sm">{medication?.manufacturer}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Dosage Form</p>
                <p className="text-sm">{medication?.dosageForm}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Strength</p>
                <p className="text-sm">{medication?.strength}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Category</p>
                <p className="text-sm">{medication?.category}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Requires Prescription</p>
                <p className="text-sm">{medication?.requiresPrescription ? "Yes" : "No"}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Price</p>
                <p className="text-sm">NGN {medication?.price || 0}</p>
              </div>

              <div className="md:col-span-2">
                <p className="text-xs text-gray-500 uppercase">Description</p>
                <p className="text-sm">{medication?.description}</p>
              </div>
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PatientMedicationCard;
