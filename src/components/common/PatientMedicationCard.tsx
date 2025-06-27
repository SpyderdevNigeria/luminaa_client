import React, { useState } from "react";
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
}

const PatientMedicationCard: React.FC<PatientMedicationCardProps> = ({
  medication,
  onAddPrescription,
  buttonText = "Add to Cart",
  cartItems = [],
}) => {
  const [open, setOpen] = useState(false);
  const isInCart = cartItems.some((item) => item.id === medication.id);

  return (
    <>
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex flex-col justify-between hover:shadow-md transition relative">
        {/* Top: Icon + Medication Name */}
        <div className="flex items-center space-x-3">
          <div className="bg-primary/10 text-primary p-2 rounded-full">
            <PiPillDuotone className="w-6 h-6" />
          </div>
        </div>

        {/* Middle: Few Key Info */}
        <div className="mt-2 space-y-2">
          <div>
            <h2 className="text-base font-semibold text-gray-900 line-clamp-2">
              {medication.name}
            </h2>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">strength</p>
            <p className="text-xs">{medication.strength}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">Dosage Form</p>
            <p className="text-xs ">{medication.dosageForm}</p>
          </div>
          <div>
            <p className="text-xs text-gray-500 uppercase">description</p>
            <p className="text-xs line-clamp-2">{medication.description}</p>
          </div>

          <p className="text-sm font-medium text-gray-800">
            NGN {medication.price}
          </p>
        </div>

        {/* Cart/Prescription Actions */}
        <div className="mt-4 flex flex-row gap-2">
          <button
            className="p-2 text-white bg-primary rounded-md"
            onClick={() => setOpen(true)}
          >
            <MdRemoveRedEye />
          </button>
          <button
            onClick={ () => { isInCart ? "" : onAddPrescription?.() }}
            className="w-full text-sm font-medium bg-white text-primary border border-primary py-1 px-4 rounded-md hover:text-white hover:bg-primary transition"
          >
            {isInCart ? "Already Added" : buttonText}
          </button>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={()=>{setOpen(false)} }  hideCancel={false} buttonText={isInCart ? "Already Added" : buttonText} style="lg:min-w-3xl !md:mx-4 !md:mx-0 " handleSubmit={ ()=> { isInCart ? "" : onAddPrescription?.() }}>
        <div className="my-4" >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Left Side */}
            <div className=" min-w-[150px] bg-gray-100 my-auto rounded-lg h-full flex items-center justify-center">
              <PiPillDuotone className="text-primary w-20 h-20" />
            </div>

            {/* Right Side */}
            <div className="grid grid-cols-1 md:grid-cols-2 space-y-3 md:col-span-2">
              <h2 className="text-xl font-semibold md:col-span-2 text-gray-900">
                {medication.name}
              </h2>

              <div>
                <p className="text-xs text-gray-500 uppercase">Generic Name</p>
                <p className="text-sm">{medication.genericName}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Manufacturer</p>
                <p className="text-sm">{medication.manufacturer}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Dosage Form</p>
                <p className="text-sm">{medication.dosageForm}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Strength</p>
                <p className="text-sm">{medication.strength}</p>
              </div>

              <div>
                <p className="text-xs text-gray-500 uppercase">Category</p>
                <p className="text-sm">{medication.category}</p>
              </div>



              <div>
                <p className="text-xs text-gray-500 uppercase ">
                  Requires Prescription
                </p>
                <p className="text-sm">
                  {medication.requiresPrescription ? "Yes" : "No"}
                </p>
              </div>

                     <div>
                           <p className="text-xs text-gray-500 uppercase ">
                  Price
                </p>
                <p className="text-sm">NGN {medication.price}</p>
              </div>
                        <p className="text-sm  md:col-span-2">{medication.description}</p>


            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default PatientMedicationCard;
