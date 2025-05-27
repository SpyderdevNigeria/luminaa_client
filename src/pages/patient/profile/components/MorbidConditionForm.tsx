import { useState, useEffect} from "react";
import PatientApi from "../../../../api/patientApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";

const yesNoDetailsOptions = ["", "Yes", "No", "Details"];

interface MedicalHistoryFormData {
  Genotype: string;
  BloodGroup: string;
  PastBloodTransfusion: string;
  PastDelivery: string;
  PastHospitalAdmission: string;
  Hypertension: string;
  Diabetes: string;
  Asthma: string;
  KidneyDisease: string;
  LiverDisease: string;
  Epilepsy: string;
  SickleCellDisease: string;
  [key: string]: string; 
}

interface BookingConditionFormProps {
  userProfile: any;
  updateUser?: (user: any) => void; 
  dispatch?: (action: any) => void;
}

const BookingConditionForm = ({
  userProfile,
  updateUser,
  dispatch
}: BookingConditionFormProps) => {
  const [formData, setFormData] = useState<MedicalHistoryFormData>({
    Genotype: "",
    BloodGroup: "",
    PastBloodTransfusion: "",
    PastDelivery: "",
    PastHospitalAdmission: "",
    Hypertension: "",
    Diabetes: "",
    Asthma: "",
    KidneyDisease: "",
    LiverDisease: "",
    Epilepsy: "",
    SickleCellDisease: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });

useEffect(() => {
  if (userProfile) {
    setFormData((prev: any) => ({
      ...prev,
      ...userProfile?.medicalHistory,
    }));
  }
}, [userProfile]);
  const handleChange = (
    e: { target: { name: any; value: any; }; }
  ) => {
    const { name, value } = e.target;
    setFormData((prev: any) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: { preventDefault: () => void; }) => {
    e.preventDefault();
    setIsSubmitting(true);
    setMessage({ message: "", type: "" });

    try {
      const res = await PatientApi.updateMedicalHistory(formData);

      if (res) {
        setMessage({
          message: "Medical history updated successfully.",
          type: "success",
        });
        if (dispatch && updateUser) {
          dispatch(updateUser({ ...userProfile, medicalHistory: { ...formData } }));
        }
      }
    } catch (error) {
      console.error("Failed to update medical history", error);
      setMessage({
        message:
          error instanceof Error
            ? error.message
            : typeof error === "string"
            ? error
            : "An error occurred",
        type: "error",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      <main>
        {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}

        <form onSubmit={handleSubmit} className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-2">
          {/* Genotype */}
          <div>
            <label htmlFor="Genotype"  className="form-label text-primary">
              Genotype
            </label>
            <select
              id="Genotype"
              name="Genotype"
              value={formData.Genotype}
              onChange={handleChange}
              required
            className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Genotype</option>
              <option value="AA">AA</option>
              <option value="AS">AS</option>
              <option value="SS">SS</option>
              <option value="AC">AC</option>
            </select>
          </div>

          {/* Blood Group */}
          <div>
            <label htmlFor="BloodGroup" className="form-label text-primary">
              Blood Group
            </label>
            <select
              id="BloodGroup"
              name="BloodGroup"
              value={formData.BloodGroup}
              onChange={handleChange}
              required
              className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Blood Group</option>
              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>
            </select>
          </div>

          {/* Dynamic Dropdown Fields */}
          {[
            { id: "PastBloodTransfusion", label: "Past Blood Transfusion" },
            { id: "PastDelivery", label: "Past Delivery", options: ["", "None", "1", "2-3", "4+"] },
            { id: "PastHospitalAdmission", label: "Past Hospital Admission" },
            { id: "Hypertension", label: "Hypertension" },
            { id: "Diabetes", label: "Diabetes" },
            { id: "Asthma", label: "Asthma" },
            { id: "KidneyDisease", label: "Kidney Disease" },
            { id: "LiverDisease", label: "Liver Disease" },
            { id: "Epilepsy", label: "Epilepsy" },
            { id: "SickleCellDisease", label: "Sickle Cell Disease" },
          ].map(({ id, label, options }) => (
            <div key={id} className="col-span-2">
              <label htmlFor={id} className="form-label text-primary">
                {label}
              </label>
              <select
                id={id}
                name={id}
                value={formData[id]}
                onChange={handleChange}
                required
             className="form-input focus:outline-primary border border-gray-light"
              >
                <option value="">Select Option</option>
                {(options || yesNoDetailsOptions).map((opt) => (
                  <option key={opt} value={opt}>
                    {opt}
                  </option>
                ))}
              </select>
            </div>
          ))}

        <button
          type="submit"
          className="w-full col-span-2 text-base bg-primary text-white px-4 py-3 font-semibold  rounded-md my-4"
          disabled={isSubmitting}
        >
          {isSubmitting ? "updating..." : "update"}
        </button>
        </form>
      </main>
    </div>
  );
};

export default BookingConditionForm;
