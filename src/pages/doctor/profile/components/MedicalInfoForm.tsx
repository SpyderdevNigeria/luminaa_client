// MedicalInfoForm.jsx
import React, { useCallback } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { useDropzone } from "react-dropzone";
import { IoClose } from "react-icons/io5";
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
}

const MedicalInfoForm: React.FC<MedicalInfoFormProps> = ({
  data,
  handleChange,
  handleSubmit,
  handleImageUpload,
  handleClose,
}) => {
  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      handleImageUpload(acceptedFiles[0]);
    },
    [handleImageUpload]
  );

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png"] },
  });

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
          <div
            {...getRootProps()}
            className="bg-gray-50 text-gray-500 rounded-lg w-90 h-70 flex flex-col items-center justify-center text-center p-4 cursor-pointer text-sm"
          >
            <input {...getInputProps()} />
            <div className=" mb-2">
              <svg
                width="48"
                height="48"
                viewBox="0 0 48 48"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  opacity="0.4"
                  d="M34.11 47.0758H13.8878C5.9795 47.0758 0.666748 41.5293 0.666748 33.2725V14.2149C0.666748 5.95811 5.9795 0.40918 13.8878 0.40918H34.1123C42.0207 0.40918 47.3334 5.95811 47.3334 14.2149V33.2725C47.3334 41.5293 42.0207 47.0758 34.11 47.0758Z"
                  fill="#17B26A"
                />
                <path
                  d="M31.9995 26.2852C32.5175 25.6062 34.4403 23.4831 36.9253 24.9951C38.5096 25.9471 39.8425 27.2343 41.2681 28.6133C41.8118 29.1406 42.2009 29.7431 42.4575 30.3848C43.2345 32.3261 42.8312 34.6594 42.0005 36.582C41.0159 38.871 39.1306 40.6004 36.7554 41.3564C35.7007 41.6948 34.5944 41.8389 33.4907 41.8389H13.9351C11.9891 41.8389 10.2667 41.3864 8.85501 40.5371C7.971 40.0051 7.81494 38.7804 8.47024 37.9824C9.56691 36.6524 10.6497 35.317 11.7417 33.9707C13.8228 31.3951 15.2252 30.6483 16.7837 31.3037C17.4161 31.5744 18.0513 31.9828 18.7046 32.4121C20.4453 33.5648 22.865 35.147 26.0523 33.4297C28.2455 32.2303 29.5127 30.1723 30.6187 28.3896C31.0713 27.6641 31.5003 26.9407 31.9995 26.2852ZM16.44 10.1836C19.6366 10.1836 22.2388 12.7877 22.2388 15.9844C22.2387 19.181 19.6366 21.7822 16.44 21.7822C13.2411 21.7821 10.6422 19.1809 10.6421 15.9844C10.6421 12.7878 13.241 10.1837 16.44 10.1836Z"
                  fill="#17B26A"
                />
              </svg>
            </div>
            <p className=" my-4 font-medium text-green-500 flex items-center">
              <IoIosCloudUpload className="mx-2" />
              Upload Image
            </p>
            <p>Upload a cover image for your product.</p>
            <p>
              File Format <span className="text-black">jpeg, png</span>{" "}
              Recommended Size <span className="text-black">600×600 (1:1)</span>{" "}
            </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MedicalInfoForm;
