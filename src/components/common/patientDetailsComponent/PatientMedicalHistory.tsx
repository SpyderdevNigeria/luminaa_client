import InfoLabel from "../InfoLabel";
import { IPatient } from "../../../types/Interfaces";
type Props = {
  user: IPatient;
};


function PatientMedicalHistory({ user }: Props) {
  console.log(user)
  return (
    <div>
      <h4 className="text-inactive text-base mb-4">
        An overview of the Patient's Medical History
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        {Object?.entries(user?.medicalHistory).map(([key, value]) => (
          <InfoLabel key={key} label={value || "N/A"} info={key.replace(/([A-Z])/g, " $1")} />
        ))}
      </div>
    </div>
  );
}

export default PatientMedicalHistory;
