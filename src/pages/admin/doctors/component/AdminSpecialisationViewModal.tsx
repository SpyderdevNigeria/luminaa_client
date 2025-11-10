import React from "react";
import type { Specialisation } from "../../../../hooks/useSpecialisations";

type Props = {
  specialisation: Specialisation | null;
  onClose: () => void;
};

const AdminSpecialisationViewModal: React.FC<Props> = ({ specialisation, onClose }) => {
  if (!specialisation) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md p-6 animate-fadeIn">
        <h2 className="text-xl font-semibold mb-4">View Specialisation</h2>

        <div className="space-y-3 text-gray-700">
          <p>
            <strong>Name:</strong> {specialisation.name}
          </p>
          <p>
            <strong>Description:</strong> {specialisation.description || "-"}
          </p>
          <p>
            <strong>Consultation Price:</strong>{" "}
            ₦{specialisation.consultationPrice?.toLocaleString()}
          </p>
          <p>
            <strong>Additional Info:</strong> {specialisation.additionalInfo || "-"}
          </p>
        </div>

        <div className="mt-6 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-md hover:bg-gray-700"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminSpecialisationViewModal;
