import React, { useState } from "react";
import CommonFormField from "../common/CommonFormField";
import LabApi from "../../api/labApi";
import Modal from "./modal";
import { useToaster } from "../common/ToasterContext";
interface UpdateSampleCollectionModalProps {
  id: string;
open: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

// const sampleOptions = [
//   { value: "Blood", label: "Blood" },
//   { value: "Urine", label: "Urine" },
//   { value: "Saliva", label: "Saliva" },
//    { value: "Saliva", label: "" },
// ];

// const containerTypeOptions = [
//   { value: "Vacutainer", label: "Vacutainer" },
//   { value: "Syringe", label: "Syringe" },
//   { value: "Tube", label: "Tube" },
// ];

const UpdateSampleCollectionModal: React.FC<UpdateSampleCollectionModalProps> = ({ id, onClose, onSuccess, open}) => {
  const [form, setForm] = useState({
    sample: "",
    collectionDate: "",
    volume: "",
    containerType: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
    const { showToast } = useToaster();
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setError("");
    if (form?.sample === "" || form?.collectionDate === "") return showToast("All fields are required to submit this form", "error");
      setLoading(true);
    try {
      await LabApi.updateSampleCollection(id, {
        sampleDetails: {
          ...form,
          collectionDate: new Date(form.collectionDate).toISOString(),
        },
      });
       showToast("Sample Collection updated successfully", "success");
      onSuccess();
      onClose();
    } catch (err) {
        console.log(err)
    showToast("Failed to update sample collection.", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
     <Modal
      open={open}
      onClose={onClose}
      title={"Update Sample Collection"}
      buttonText={loading ? "Updating..." : "Update"}
      handleSubmit={handleSubmit}
      loading={loading}
    >


        <form onSubmit={handleSubmit} className="space-y-4">
          <CommonFormField
            type="text"
            name="sample"
            label="Sample Type"
            value={form.sample}
            onChange={handleChange}
            required
          />
          <CommonFormField
            type="datetime-local"
            name="collectionDate"
            label="Collection Date & Time"
            value={form.collectionDate}
            onChange={handleChange}
            required
          />
          {/* <CommonFormField
            type="text"
            name="volume"
            label="Volume"
            value={form.volume}
            onChange={handleChange}
            required
          />
          <CommonFormField
            type="text"
            name="containerType"
            label="Container Type"
            value={form.containerType}
            onChange={handleChange}
            required
          /> */}

          {error && <p className="text-red-500 text-sm">{error}</p>}

        </form>
    </Modal>
  );
};

export default UpdateSampleCollectionModal;
