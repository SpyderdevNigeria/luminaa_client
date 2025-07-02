import InfoLabel from "../InfoLabel";
import { IPatient } from "../../../types/Interfaces";

type Props = {
  user: IPatient;
};

function PatientInformation({ user }: Props) {
  return (
    <div>
      <h4 className="text-inactive text-base">
        An overview of the Patient's information
      </h4>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 py-4">
        <InfoLabel label={user.firstName} info="First Name" />
        <InfoLabel label={user.lastName} info="Last Name" />
        <InfoLabel label={user.gender} info="Gender" />
        <InfoLabel
          label={`${user.address}, ${user.city}, ${user.state}, ${user.country}`}
          info="Location"
        />
        <InfoLabel label={user.phoneNumber} info="Phone Number" />
        <InfoLabel label={user.email} info="Email" />
        <InfoLabel
          label={new Date(user.dateOfBirth).toLocaleDateString()}
          info="Date of Birth"
        />
        <InfoLabel label={user.emergencyContactName} info="Emergency Contact Name" />
        <InfoLabel label={user.emergencyContactPhone} info="Emergency Contact Phone" />
        {/* <InfoLabel
          label={`${user.totalAppointments}`}
          info="Total Appointments"
        /> */}
        {/* <InfoLabel
          label={new Date(user.lastAppointmentDate).toLocaleString()}
          info="Last Appointment"
        /> */}
      </div>
    </div>
  );
}

export default PatientInformation;
