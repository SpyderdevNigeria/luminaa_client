import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import PatientApi from "../../../../api/PatientApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { updateUser } from "../../../../reducers/authSlice";
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
}

const yesNoDetailsOptions = ["not sure", "Yes", "No",];


function BookingCondition({userProfile}: { userProfile: any }) {
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
  const dispatch = useAppDispatch();
    const [isSubmitting, setIsSubmitting] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true)
    try {
     await PatientApi.updateMedicalHistory(formData).then((res) => {
      if (res) {
      setMessage({
        message:"Medical history updated successfully.",
        type: "success",
      });
      dispatch(updateUser({...userProfile, medicalHistory: { ...formData } }));
      }
      });
    } catch (error) {
      
      console.error("Failed to update medical history", error);
      setMessage({
        message: (error instanceof Error ? error.message : typeof error === "string" ? error : "An error occurred"),
        type: "error",
      });
    }finally {
      setIsSubmitting(false);
    }
  };

  
      useEffect(() => {
        setMessage({
          message: "",
          type: "",
        });
      }, [formData])

  return (
    <div className="w-full">
      <main className="max-w-2xl w-full mx-auto p-2 pt-0 md:p-4">
        <h5 className="text-xl md:text-2xl text-center text-secondary-text">
          Premorbid Condition
        </h5>


          {message.message && (
          <FeedbackMessage type={message.type} message={message.message} />
        )}


        <form onSubmit={handleSubmit} className="space-y-4 mt-8 gap-4 w-full">
          {/* Genotype */}
          <div>
            <label htmlFor="Genotype" className="block text-xs md:text-lg leading-6 mb-2 text-primary">
              Genotype
            </label>
            <select
              id="Genotype"
              name="Genotype"
              value={formData.Genotype}
              onChange={handleChange}
              required
              className="form-input focus:outline-primary text-gray-light"
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
            <label htmlFor="BloodGroup" className="block text-xs md:text-lg leading-6 mb-2 text-primary">
              Blood Group
            </label>
            <select
              id="BloodGroup"
              name="BloodGroup"
              value={formData.BloodGroup}
              onChange={handleChange}
              required
              className="form-input focus:outline-primary text-gray-light"
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
            { id: "PastDelivery", label: "Past Delivery", options: [ "None", "1", "2-3", "4+"] },
            { id: "PastHospitalAdmission", label: "Past Hospital Admission" },
            { id: "Hypertension", label: "Hypertension" },
            { id: "Diabetes", label: "Diabetes" },
            { id: "Asthma", label: "Asthma" },
            { id: "KidneyDisease", label: "Kidney Disease" },
            { id: "LiverDisease", label: "Liver Disease" },
            { id: "Epilepsy", label: "Epilepsy" },
            { id: "SickleCellDisease", label: "Sickle Cell Disease" },
          ].map(({ id, label, options }) => (
            <div key={id}>
              <label htmlFor={id} className="block text-xs md:text-lg leading-6 mb-2 text-primary">
                {label}
              </label>
              <select
                id={id}
                name={id}
                value={formData[id as keyof MedicalHistoryFormData]}
                onChange={handleChange}
                required
                className="form-input focus:outline-primary text-gray-light"
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
              disabled={isSubmitting}
          className={`form-primary-button bg-primary my-4 ${
            isSubmitting ? "opacity-50 cursor-not-allowed" : ""
          }`}
          >
           {isSubmitting ? "Submitting..." : "Finish"}
          </button>
        </form>
      </main>
    </div>
  );
}

export default BookingCondition;
