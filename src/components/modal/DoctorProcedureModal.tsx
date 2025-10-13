import React, { useState } from "react";
import Modal from "./modal";
import DoctorApi from "../../api/doctorApi";
import FeedbackMessage from "../common/FeedbackMessage";
import { useToaster } from "../common/ToasterContext";
import { procedureType } from "../../utils/dashboardUtils";

interface DoctorProcedureModalProps {
  open: boolean;
  onClose: () => void;
  patientId: string;
  appointmentId: string;
  onSuccess?: () => void;
}

const DoctorProcedureModal: React.FC<DoctorProcedureModalProps> = ({
  open,
  onClose,
  patientId,
  appointmentId,
  onSuccess,
}) => {
  const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState({ message: "", type: "" });
  const [procedureData, setProcedureData] = useState({
    nurseMessage: "",
    patientMessage: "",
    type: "",
    note: "",
  });
   const { showToast } = useToaster();
  // handle form input
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setProcedureData((prev) => ({ ...prev, [name]: value }));
  };

  // handle submit
  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        ...procedureData,
        patientId,
        appointmentId,
      };
      console.log(payload)
       const response = await DoctorApi.createProcedure(payload);
      console.log("Procedure created:", payload);

      setProcedureData({
        nurseMessage: "",
        patientMessage: "",
        type: "",
        note: "",
      });
        setMessage({
        message: response?.data?.message || "Nurse updated successfully",
        type: "success",
      });
       showToast(`${response?.data?.message || "Procedure created successfully"}`, "success");
       onSuccess && onSuccess();
    } catch (error) {
      console.error("Error creating procedure:", error);
       console.error(error);
      setMessage({
        message: "An error occurred",
        type: "error",
      });
      
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Add Procedure"
      handleSubmit={handleSubmit}
      buttonText={loading ? "Processing..." : "Add Procedure"}
      loading={loading}
    >
      <div className="flex flex-col gap-4">
        <div className="">
            {message.message && (
              <FeedbackMessage type={message.type} message={message.message} />
            )}
          </div>
          
        <textarea
          name="nurseMessage"
          value={procedureData.nurseMessage}
          onChange={handleChange}
          placeholder="Nurse Message"
          className="form-input"
        />
        <textarea
          name="patientMessage"
          value={procedureData.patientMessage}
          onChange={handleChange}
          placeholder="Patient Message"
          className="form-input"
        />
        <select
          name="type"
          value={procedureData.type}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Procedure Type</option>
          {procedureType.map((type) => (
            <option key={type} value={type}>
              {type}
            </option>
          ))}
        </select>
        <textarea
          name="note"
          value={procedureData.note}
          onChange={handleChange}
          placeholder="Additional Notes"
          className="form-input"
        />
      </div>
    </Modal>
  );
};

export default DoctorProcedureModal;
