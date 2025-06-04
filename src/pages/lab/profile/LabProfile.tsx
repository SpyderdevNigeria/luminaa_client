import { FaShieldAlt, FaUserMd } from "react-icons/fa";
import { SetStateAction, useEffect, useState } from "react";
import MedicalInfoForm from "./components/MedicalInfoForm";
import SecurityPreferences from "./components/SecurityPreferences";
import { useAppSelector } from "../../../hooks/reduxHooks";

const LabProfile = () => {
  const userProfile = useAppSelector((state) => state.auth.user);

  const [showMedicalForm, setShowMedicalForm] = useState("");

  const handleShowForm = (e: SetStateAction<string>) => setShowMedicalForm(e);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    name: "",
    annualLicense: "",
    phoneNumber: "",
    registrationLicence: "",
    specialty: "",
    graduationCertificate: "",
    additionalCertificates: "",
    experience: "",
    contactInfo: "",
  });

  useEffect(() => {
    if (userProfile?.user) {
    setData({
    firstName: userProfile?.user?.firstName,
    lastName: userProfile?.user?.lastName,
    name: "",
    annualLicense: "",
    phoneNumber: userProfile?.user?.phoneNumber,
    registrationLicence: "",
    specialty: "",
    graduationCertificate: "",
    additionalCertificates: "",
    experience: "",
    contactInfo: "",
  });
    }
  }, [userProfile]);
  const handleChange = (e: any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log("Submitted Data:", data);
    // Add logic to send data to API or update state
  };

  const handleClose = () => {
    setShowMedicalForm('');
  };

  return (
    <div>
      {showMedicalForm === 'security' &&  <SecurityPreferences  handleClose={handleClose}/>}
      {showMedicalForm === '' && (
        <Settings onMedicalClick={(e)=> {handleShowForm(e)}} />
      )} {showMedicalForm === 'update' && <MedicalInfoForm
          data={data}
          userProfile={userProfile}
          handleChange={handleChange}
          handleSubmit={handleSubmit}
          handleImageUpload={function (_file: File): void {
            throw new Error("Function not implemented.");
          }}
          handleClose={handleClose}
        />}

    </div>
  );
};

const Settings = ({ onMedicalClick }: { onMedicalClick: (e: any) => void }) => {
  return (
    <div className="max-w-3xl md:max-w-6xl mx-auto p-4">
      <div className="flex items-center justify-between py-4 border-b border-dashboard-gray"
         onClick={()=> {onMedicalClick('security')}}
      >
        <div className="flex items-center gap-3">
          <FaShieldAlt className="text-xl" />
          <div>
            <h3 className="text-lg ">Security & Preferences</h3>
            <p className="text-xs text-gray-500">
              Manage your account and preferences
            </p>
          </div>
        </div>
        <span className="text-xl">&gt;</span>
      </div>

      <div
        className="flex items-center justify-between py-4 border-b border-dashboard-gray cursor-pointer"
        onClick={()=> {onMedicalClick('update')}}
      >
        <div className="flex items-center gap-3">
          <FaUserMd className="text-xl" />
          <div>
            <h3 className="text-lg ">Medical Information</h3>
            <p className="text-xs text-gray-500">
              Update your account and preferences
            </p>
          </div>
        </div>
        <span className="text-xl">&gt;</span>
      </div>
    </div>
  );
};
export default LabProfile;
