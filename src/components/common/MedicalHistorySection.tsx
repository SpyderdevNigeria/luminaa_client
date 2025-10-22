import { useEffect, useState } from "react";
import api from "../../api/apiConfig";
import Info from "./Info";

interface MedicalHistorySectionProps {
  procedure: any;
  type?: "doctor" | "admin";
  fetchProcedure?: () => void;
  handleBack?: () => void;
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

const MedicalHistorySection = ({
  procedure,
  type = "doctor",
  fetchProcedure,
  handleBack,
}: MedicalHistorySectionProps) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);

  const medicalHistory = procedure?.medicalHistory || {};

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
    if (Object.keys(procedure?.medicalHistory || {}).length > 0) {
      setFormData({
        presentingComplaint: medicalHistory.presentingComplaint || "",
        historyOfPresentingComplaint:
          medicalHistory.historyOfPresentingComplaint || "",
        pastMedicalAndSurgicalHistory:
          medicalHistory.pastMedicalAndSurgicalHistory || "",
        drugHistory: medicalHistory.drugHistory || "",
        socialHistory: medicalHistory.socialHistory || "",
        generalPhysicalExamination:
          medicalHistory.generalPhysicalExamination || "",
        abdominalExamination: medicalHistory.abdominalExamination || "",
        cardiovascularSystemExam: medicalHistory.cardiovascularSystemExam || "",
        respiratorySystemExam: medicalHistory.respiratorySystemExam || "",
        musculoskeletalSystemExam:
          medicalHistory.musculoskeletalSystemExam || "",
        urogenitalSystemExam: medicalHistory.urogenitalSystemExam || "",
        centralNervousSystemExam:
          medicalHistory.centralNervousSystemExam || "",
      });
    }
  }, [procedure]);

  const handleChange = (field: keyof MedicalHistoryData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e?: React.FormEvent) => {
    e?.preventDefault();
    try {
      setLoading(true);
      const cleanedData = Object.fromEntries(
        Object.entries(formData).map(([k, v]) => [k, v.trim()])
      );

      await api.patch(
        `/doctor/procedures/${procedure?.id}/medical-history`,
        cleanedData
      );

      fetchProcedure?.();
      setEditing(false);
    } catch (error) {
      console.error("Failed to update medical history:", error);
      alert("An error occurred while saving medical history.");
    } finally {
      setLoading(false);
    }
  };

  const hasMedicalHistory =
    Object.keys(procedure?.medicalHistory || {}).length > 0;

  return (
    <div className="bg-white p-4 rounded shadow">

             <button
              onClick={handleBack}
              className="text-sm text-gray-500 hover:text-gray-700"
            >
              ← Back
            </button>
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-lg font-semibold text-gray-700">
          Medical History
        </h2>

        {type === "doctor" && (
          <button
            onClick={() => setEditing(!editing)}
            className="px-4 py-2 bg-primary text-white rounded"
          >
            {editing
              ? "Cancel"
              : hasMedicalHistory
              ? "Edit Medical History"
              : "Add Medical History"}
          </button>
        )}
      </div>

      {!editing ? (
        hasMedicalHistory ? (
          <div className="space-y-2 text-sm">
      <Info label="Presenting Complaint" value={medicalHistory.presentingComplaint || "N/A"} />
      <Info label="History of Presenting Complaint" value={medicalHistory.historyOfPresentingComplaint || "N/A"} />
      <Info label="Past Medical and Surgical History" value={medicalHistory.pastMedicalAndSurgicalHistory || "N/A"} />
      <Info label="Drug History" value={medicalHistory.drugHistory || "N/A"} />
      <Info label="Social History" value={medicalHistory.socialHistory || "N/A"} />
      <Info label="General Physical Examination" value={medicalHistory.generalPhysicalExamination || "N/A"} />
      <Info label="Abdominal Examination" value={medicalHistory.abdominalExamination || "N/A"} />
      <Info label="Cardiovascular System Exam" value={medicalHistory.cardiovascularSystemExam || "N/A"} />
      <Info label="Respiratory System Exam" value={medicalHistory.respiratorySystemExam || "N/A"} />
      <Info label="Musculoskeletal System Exam" value={medicalHistory.musculoskeletalSystemExam || "N/A"} />
      <Info label="Urogenital System Exam" value={medicalHistory.urogenitalSystemExam || "N/A"} />
      <Info label="Central Nervous System Exam" value={medicalHistory.centralNervousSystemExam || "N/A"} />
          </div>
        ) : (
          <p className="text-gray-500">No medical history available</p>
        )
      ) : (
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-2 gap-4"
        >
          {/* All textareas with labels (same as before) */}
          <div className="flex flex-col">
            <label>Presenting Complaint</label>
            <textarea
              value={formData.presentingComplaint}
              onChange={(e) =>
                handleChange("presentingComplaint", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>History of Presenting Complaint</label>
            <textarea
              value={formData.historyOfPresentingComplaint}
              onChange={(e) =>
                handleChange("historyOfPresentingComplaint", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Past Medical and Surgical History</label>
            <textarea
              value={formData.pastMedicalAndSurgicalHistory}
              onChange={(e) =>
                handleChange("pastMedicalAndSurgicalHistory", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Drug History</label>
            <textarea
              value={formData.drugHistory}
              onChange={(e) => handleChange("drugHistory", e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Social History</label>
            <textarea
              value={formData.socialHistory}
              onChange={(e) => handleChange("socialHistory", e.target.value)}
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>General Physical Examination</label>
            <textarea
              value={formData.generalPhysicalExamination}
              onChange={(e) =>
                handleChange("generalPhysicalExamination", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Abdominal Examination</label>
            <textarea
              value={formData.abdominalExamination}
              onChange={(e) =>
                handleChange("abdominalExamination", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Cardiovascular System Exam</label>
            <textarea
              value={formData.cardiovascularSystemExam}
              onChange={(e) =>
                handleChange("cardiovascularSystemExam", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Respiratory System Exam</label>
            <textarea
              value={formData.respiratorySystemExam}
              onChange={(e) =>
                handleChange("respiratorySystemExam", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Musculoskeletal System Exam</label>
            <textarea
              value={formData.musculoskeletalSystemExam}
              onChange={(e) =>
                handleChange("musculoskeletalSystemExam", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col">
            <label>Urogenital System Exam</label>
            <textarea
              value={formData.urogenitalSystemExam}
              onChange={(e) =>
                handleChange("urogenitalSystemExam", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="flex flex-col md:col-span-2">
            <label>Central Nervous System Exam</label>
            <textarea
              value={formData.centralNervousSystemExam}
              onChange={(e) =>
                handleChange("centralNervousSystemExam", e.target.value)
              }
              className="border p-2 rounded"
            />
          </div>

          <div className="md:col-span-2 flex justify-end mt-3">
            <button
              type="submit"
              disabled={loading}
              className="px-4 py-2 bg-primary text-white rounded"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default MedicalHistorySection;
