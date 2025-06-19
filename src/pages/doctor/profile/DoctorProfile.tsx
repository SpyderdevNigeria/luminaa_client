import { FaShieldAlt, FaUserMd } from "react-icons/fa";
import { ChangeEvent, SetStateAction, useEffect, useState } from "react";
import MedicalInfoForm from "./components/MedicalInfoForm";
import SecurityPreferences from "./components/SecurityPreferences";
import { useAppSelector } from "../../../hooks/reduxHooks";

const DoctorProfile = () => {
  const userProfile = useAppSelector((state) => state.auth.user);

  const [showMedicalForm, setShowMedicalForm] = useState("");

  const handleShowForm = (e: SetStateAction<string>) => setShowMedicalForm(e);

  const [data, setData] = useState({
    firstName: "",
    lastName: "",
    email:"",
    dateOfBirth:"",
    specialty: "",
    licenseNumber: "",
    contactNumber: "",
    gender:"",
  });

  useEffect(() => {
    if (userProfile?.user) {
    setData({
    firstName: userProfile?.user?.firstName,
    lastName: userProfile?.user?.lastName,
    email: userProfile?.user?.email,
    licenseNumber: userProfile?.licenseNumber,
    contactNumber: userProfile?.contactNumber,
    gender: userProfile?.gender,
    specialty: userProfile?.specialty,
    dateOfBirth:userProfile?.dateOfBirth,
  });
    }
  }, [userProfile]);
   const handleChange = (
     e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
   ) => {
     const { name, value } = e.target;
     setData((prev) => ({
       ...prev,
       [name]: value,
     }));
   };


  const handleClose = () => {
    setShowMedicalForm('');
  };

  return (
    <div className="container-bd">
      {showMedicalForm === 'security' &&  <SecurityPreferences  handleClose={handleClose}/>}
      {showMedicalForm === '' && (
        <Settings onMedicalClick={(e)=> {handleShowForm(e)}} />
      )} {showMedicalForm === 'update' && <MedicalInfoForm
        data={data}
        userProfile={userProfile}
        handleChange={handleChange}
        handleClose={handleClose}        />}

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
export default DoctorProfile;
