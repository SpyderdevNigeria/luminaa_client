import { useEffect, useState } from "react";
import api from "../../api/apiConfig";
import PatientVitals from "./patientDetailsComponent/PatientVitals";

interface MedicalHistorySectionProps {
  procedure: any;
  type?: "doctor" | "admin" | "patient";
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
  const [activeTab, setActiveTab] = useState<"vitals" | "history">("vitals"); // 👈 New state

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
        `/doctor/appointments/${procedure?.id}/medical-history`,
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
    <div className="bg-white p-4  ">
      {type !== "patient" && (
        <button
          onClick={handleBack}
          className="text-sm text-gray-500 hover:text-gray-700"
        >
          ← Back
        </button>
      )}

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

      {/* Tabs (only for doctor) */}
      {type === "doctor" && (
        <div className="flex border-b border-gray-200 mb-4">
          <button
            onClick={() => setActiveTab("vitals")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "vitals"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Patient Vitals
          </button>
          <button
            onClick={() => setActiveTab("history")}
            className={`px-4 py-2 text-sm font-medium ${
              activeTab === "history"
                ? "border-b-2 border-primary text-primary"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Medical History
          </button>
        </div>
      )}

      {/* Tab Content */}
      {type === "doctor" && activeTab === "vitals" && (
        <PatientVitals patient={procedure?.patient} />
      )}

      {(!type || type !== "doctor" || activeTab === "history") && (
        <>
          {!editing ? (
            hasMedicalHistory ? (
              <div className="space-y-4 text-sm">
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
            type === "doctor" && (
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 md:grid-cols-2 gap-4"
              >
                {Object.keys(formData).map((key) => (
                  <div
                    key={key}
                    className={`flex flex-col ${
                      key.includes("urogenital") ||
                      key.includes("centralNervous")
                        ? "md:col-span-2"
                        : ""
                    }`}
                  >
                    <label className="capitalize">
                      {key.replace(/([A-Z])/g, " $1")}
                    </label>
                    <textarea
                      value={(formData as any)[key]}
                      onChange={(e) =>
                        handleChange(key as keyof MedicalHistoryData, e.target.value)
                      }
                      className="border p-2 rounded border-gray-200"
                    />
                  </div>
                ))}

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
            )
          )}
        </>
      )}
    </div>
  );
};

export default MedicalHistorySection;

const Info = ({
  label,
  value,
  full,
}: {
  label: string;
  value?: any;
  full?: boolean;
}) => (
  <div className={full ? "col-span-2" : ""}>
    <p className="text-gray-800 font-medium">{label}</p>
    <p className="text-sm text-gray-500 border border-gray-200 p-2">
      {value || "—"}
    </p>
  </div>
);
