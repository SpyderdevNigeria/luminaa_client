import React, { useEffect, useState } from "react";
import Modal from "./modal";
import FeedbackMessage from "../common/FeedbackMessage";
import { useToaster } from "../common/ToasterContext";
import { procedureType } from "../../utils/dashboardUtils";
import { useServices } from "../../hooks/useServices";
import DoctorApi from "../../api/doctorApi";

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
  const { showToast } = useToaster();
  const {
    data: services,
    loading: servicesLoading,
    fetchServicesListDoctor,
  } = useServices();

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });
  const [procedureData, setProcedureData] = useState({
    nurseMessage: "",
    patientMessage: "",
    type: "",
    note: "",
    serviceId: "",
  });

  useEffect(() => {
    if (open) fetchServicesListDoctor();
  }, [open, fetchServicesListDoctor]);

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
    if  (
      !procedureData.type ||
      !procedureData.serviceId
    ) {
      showToast("Procedure Type and Service fields are required to submit this form", "error");
      return;
    }
    try {
      const payload = {
        ...procedureData,
        patientId,
        appointmentId,
      };

      console.log("Submitting procedure:", payload);

      // Assuming useServices provides a createServiceProcedure or similar
      const response = await DoctorApi.createProcedure(payload);

      setProcedureData({
        nurseMessage: "",
        patientMessage: "",
        type: "",
        note: "",
        serviceId: "",
      });

      setMessage({
        message: response?.data?.message || "Procedure created successfully",
        type: "success",
      });

      showToast(`${response?.data?.message || "Procedure created successfully"}`, "success");
      onSuccess && onSuccess();
    } catch (error) {
      console.error("Error creating procedure:", error);
      setMessage({
        message: "An error occurred while creating the procedure",
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
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}

        {/* Nurse Message */}
        <textarea
          name="nurseMessage"
          value={procedureData.nurseMessage}
          onChange={handleChange}
          placeholder="Nurse Message"
          className="form-input"
        />

        {/* Patient Message */}
        <textarea
          name="patientMessage"
          value={procedureData.patientMessage}
          onChange={handleChange}
          placeholder="Patient Message"
          className="form-input"
        />

        {/* Procedure Type */}
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

        {/* Service Selection */}
        <select
          name="serviceId"
          value={procedureData.serviceId}
          onChange={handleChange}
          className="form-input"
        >
          <option value="">Select Service</option>
          {servicesLoading && <option>Loading services...</option>}
          {!servicesLoading &&
            services?.map((service: any) => (
              <option key={service.id} value={service.id}>
                {service.name}
              </option>
            ))}
        </select>

        {/* Note */}
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
