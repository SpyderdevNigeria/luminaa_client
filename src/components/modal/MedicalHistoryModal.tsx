import { useEffect, useState } from "react";
import api from "../../api/apiConfig";
import Modal from "./modal";

interface MedicalHistoryModalProps {
  open: boolean;
  onClose: () => void;
  procedureId: string;
  medicalHistory?: MedicalHistoryData | null;
  onSuccess?: () => void;
}

interface MedicalHistoryData {
  presentingComplaint: string;
  historyOfPresentingComplaint: string;
  pastMedicalAndSurgicalHistory: string;
  drugHistory: string;
  socialHistory: string;
  generalPhysicalExamination: string;
  abdominalExamination: string;
  cardiovascularSystemExam: string;
  respiratorySystemExam: string;
  musculoskeletalSystemExam: string;
  urogenitalSystemExam: string;
  centralNervousSystemExam: string;
}

const MedicalHistoryModal = ({
  open,
  onClose,
  procedureId,
  medicalHistory,
  onSuccess,
}: MedicalHistoryModalProps) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState<MedicalHistoryData>({
    presentingComplaint: "",
    historyOfPresentingComplaint: "",
    pastMedicalAndSurgicalHistory: "",
    drugHistory: "",
    socialHistory: "",
    generalPhysicalExamination: "",
    abdominalExamination: "",
    cardiovascularSystemExam: "",
    respiratorySystemExam: "",
    musculoskeletalSystemExam: "",
    urogenitalSystemExam: "",
    centralNervousSystemExam: "",
  });

  useEffect(() => {
    if (medicalHistory) {
      setFormData({ ...medicalHistory });
    } else {
      setFormData({
        presentingComplaint: "",
        historyOfPresentingComplaint: "",
        pastMedicalAndSurgicalHistory: "",
        drugHistory: "",
        socialHistory: "",
        generalPhysicalExamination: "",
        abdominalExamination: "",
        cardiovascularSystemExam: "",
        respiratorySystemExam: "",
        musculoskeletalSystemExam: "",
        urogenitalSystemExam: "",
        centralNervousSystemExam: "",
      });
    }
  }, [medicalHistory, open]);

  const handleChange = (field: keyof MedicalHistoryData, value: string) => {
    setFormData({ ...formData, [field]: value });
  };

  const handleSubmit = async () => {
    try {
      setLoading(true);
      await api.patch(`/doctor/procedures/${procedureId}/medical-history`, formData);
      onSuccess?.();
      onClose();
    } catch (error) {
      console.error("Failed to update medical history:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={onClose}
      title="Update Medical History"
      loading={loading}
      handleSubmit={handleSubmit}
      buttonText={loading ? "Processing..." : "Update"}
    >
      <div className="grid grid-cols-1 gap-3 max-h-[70vh] overflow-y-auto">
        <textarea
          placeholder="Presenting Complaint"
          value={formData.presentingComplaint}
          onChange={(e) => handleChange("presentingComplaint", e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="History of Presenting Complaint"
          value={formData.historyOfPresentingComplaint}
          onChange={(e) =>
            handleChange("historyOfPresentingComplaint", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Past Medical and Surgical History"
          value={formData.pastMedicalAndSurgicalHistory}
          onChange={(e) =>
            handleChange("pastMedicalAndSurgicalHistory", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Drug History"
          value={formData.drugHistory}
          onChange={(e) => handleChange("drugHistory", e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Social History"
          value={formData.socialHistory}
          onChange={(e) => handleChange("socialHistory", e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="General Physical Examination"
          value={formData.generalPhysicalExamination}
          onChange={(e) =>
            handleChange("generalPhysicalExamination", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Abdominal Examination"
          value={formData.abdominalExamination}
          onChange={(e) => handleChange("abdominalExamination", e.target.value)}
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Cardiovascular System Exam"
          value={formData.cardiovascularSystemExam}
          onChange={(e) =>
            handleChange("cardiovascularSystemExam", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Respiratory System Exam"
          value={formData.respiratorySystemExam}
          onChange={(e) =>
            handleChange("respiratorySystemExam", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Musculoskeletal System Exam"
          value={formData.musculoskeletalSystemExam}
          onChange={(e) =>
            handleChange("musculoskeletalSystemExam", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Urogenital System Exam"
          value={formData.urogenitalSystemExam}
          onChange={(e) =>
            handleChange("urogenitalSystemExam", e.target.value)
          }
          className="border p-2 rounded"
        />

        <textarea
          placeholder="Central Nervous System Exam"
          value={formData.centralNervousSystemExam}
          onChange={(e) =>
            handleChange("centralNervousSystemExam", e.target.value)
          }
          className="border p-2 rounded"
        />
      </div>
    </Modal>
  );
};

export default MedicalHistoryModal;
