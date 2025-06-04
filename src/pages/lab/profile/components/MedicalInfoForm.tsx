// MedicalInfoForm.jsx
import React from "react";
import { IoClose } from "react-icons/io5";
import DoctorProfilePicForm from "./LabProfilePicForm";
interface MedicalInfoFormProps {
  data: {
    name: string;
    firstName: string;
    lastName: string;
    annualLicense: string;

    phoneNumber: string;
    registrationLicence: string;
    specialty: string;
    graduationCertificate: string;
    additionalCertificates: string;
    experience: string;
    contactInfo: string;
  };
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: () => void;
  handleImageUpload: (file: File) => void;
  handleClose: () => void;
  userProfile:any
}

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  data,
  handleChange,
  handleSubmit,
  handleClose,
  userProfile,
}) => {

  return (
    <main className="bg-white rounded-lg border border-dashboard-gray max-w-6xl mx-auto">
      <div className="flex items-center justify-between p-4 border-b border-dashboard-gray">
        <h4 className="text-2xl 2xl:text-4xl ">Update Medical Information</h4>
        <IoClose
          className="text-2xl 2xl:text-4xl text-dashboard-gray cursor pointer "
          onClick={handleClose}
        />
      </div>
      <div className="p-4 grid grid-cols-2 gap-6">
        {/* Left: Form Section */}
        <div className=" grid grid-cols-2 gap-4">
          {/* Doctor name */}
          <div className="col-span-2">
            <label
              htmlFor="firstName"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={data.firstName}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>
          {/* Doctor name */}
          <div className="col-span-2">
            <label
              htmlFor="lastName"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={data.lastName}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Doctor annual license */}
          <div className="col-span-2">
            <label
              htmlFor="annualLicense"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Doctor annual license
            </label>
            <input
              type="text"
              name="annualLicense"
              id="annualLicense"
              onChange={handleChange}
              value={data.annualLicense}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Phone number */}
          <div className="col-span-2">
            <label
              htmlFor="phoneNumber"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Phone Number
            </label>
            <input
              type="text"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Full registration licence */}
          <div className="col-span-2">
            <label
              htmlFor="registrationLicence"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Doctor full registration licence
            </label>
            <input
              type="text"
              name="registrationLicence"
              id="registrationLicence"
              onChange={handleChange}
              value={data.registrationLicence}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Doctor specialty */}
          <div className="col-span-2">
            <label
              htmlFor="specialty"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Doctor specialty
            </label>
            <input
              type="text"
              name="specialty"
              id="specialty"
              onChange={handleChange}
              value={data.specialty}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Graduation certificate */}
          <div className="col-span-2">
            <label
              htmlFor="graduationCertificate"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Graduation certificate
            </label>
            <input
              type="text"
              name="graduationCertificate"
              id="graduationCertificate"
              onChange={handleChange}
              value={data.graduationCertificate}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Additional certificates */}
          <div className="col-span-2">
            <label
              htmlFor="additionalCertificates"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Doctor additional certificates
            </label>
            <input
              type="text"
              name="additionalCertificates"
              id="additionalCertificates"
              onChange={handleChange}
              value={data.additionalCertificates}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Years of experience */}
          <div className="col-span-2">
            <label
              htmlFor="experience"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Years of experience
            </label>
            <input
              type="text"
              name="experience"
              id="experience"
              onChange={handleChange}
              value={data.experience}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Contact Information */}
          <div className="col-span-2">
            <label
              htmlFor="contactInfo"
              className="form-label !text-base !font-light flex items-center gap-2"
            >
              Contact Information
            </label>
            <input
              type="text"
              name="contactInfo"
              id="contactInfo"
              onChange={handleChange}
              value={data.contactInfo}
              className="form-input focus:outline-primary text-gray-light w-full border border-gray-300 rounded-md px-3 py-2"
            />
          </div>

          {/* Submit Button */}
          <div className="col-span-2 mt-4">
            <button
              onClick={handleSubmit}
              className="w-full bg-primary text-white py-2 rounded-md hover:bg-primary transition"
            >
              Update Information
            </button>
          </div>
        </div>

        {/* Right: Upload Image */}
        <div className="flex items-start justify-center">
        <DoctorProfilePicForm userProfile={userProfile}/>
        </div>
      </div>
    </main>
  );
};

export default MedicalInfoForm;
