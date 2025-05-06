import { FaShieldAlt, FaUserMd } from 'react-icons/fa';
import { useState } from 'react';
import MedicalInfoForm from './components/MedicalInfoForm';


const DoctorProfile = () => {
  const [showMedicalForm, setShowMedicalForm] = useState(false);

  const handleShowForm = () => setShowMedicalForm(true);

  const [data, setData] = useState({
    name: '',
    annualLicense: '',
    phone: '',
    registrationLicence: '',
    specialty: '',
    graduationCertificate: '',
    additionalCertificates: '',
    experience: '',
    contactInfo: '',
  });

  const handleChange = (e:any) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    console.log('Submitted Data:', data);
    // Add logic to send data to API or update state
  };

  const handleClose  = () => {
    setShowMedicalForm(false)
  }

  return (
    <div>
      {!showMedicalForm ? (
        <Settings onMedicalClick={handleShowForm} />
      ) : (
        <MedicalInfoForm
                      data={data}
                      handleChange={handleChange}
                      handleSubmit={handleSubmit} handleImageUpload={function (_file: File): void {
                          throw new Error('Function not implemented.');
                      } }     handleClose={handleClose}   />
      )}
    </div>
  );
};


const Settings = ({ onMedicalClick }: { onMedicalClick: () => void }) => {
    return (
      <div className="max-w-3xl md:max-w-5xl mx-auto p-4">
        <div className="flex items-center justify-between py-4 border-b border-dashboard-gray">
          <div className="flex items-center gap-3">
            <FaShieldAlt className="text-xl" />
            <div>
              <h3 className="text-lg ">Security & Preferences</h3>
              <p className="text-xs text-gray-500">Manage your account and preferences</p>
            </div>
          </div>
          <span className="text-xl">&gt;</span>
        </div>
  
        <div
          className="flex items-center justify-between py-4 border-b border-dashboard-gray cursor-pointer"
          onClick={onMedicalClick}
        >
          <div className="flex items-center gap-3">
            <FaUserMd className="text-xl" />
            <div>
              <h3 className="text-lg ">Medical Information</h3>
              <p className="text-xs text-gray-500">Update your account and preferences</p>
            </div>
          </div>
          <span className="text-xl">&gt;</span>
        </div>
      </div>
    );
  };
export default DoctorProfile;
