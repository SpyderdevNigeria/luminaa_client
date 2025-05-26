import React from "react";

type BioDataProps = {
  submitform: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  data: {
    gender: string;
    maritalStatus: string;
    dateOfBirth: string;
    religion: string;
    phoneNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
  };
};

function BioData({ submitform, handleChange, data, }: BioDataProps) {
  return (
    <div>
      <form onSubmit={submitform}>
        <h2 className="text-2xl md:text-3xl my-8 px-20 text-center text-text-secondary">
          Bio Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

          {/* Date of Birth */}
          <div className="col-span-2">
            <label htmlFor="dateOfBirth" className="form-label text-primary">
              Date of Birth
            </label>
            <input
              type="date"
              name="dateOfBirth"
              id="dateOfBirth"
              onChange={handleChange}
              value={data.dateOfBirth}
              required
              className={`form-input focus:outline-primary border border-gray-light`}
            />
          </div>

          {/* Gender */}
          <div className="col-span-2">
            <label htmlFor="gender" className="form-label text-primary">
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              value={data.gender}
              required
             className={`form-input focus:outline-primary border border-gray-light`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          
          </div>

          {/* Marital Status */}
          <div className="col-span-2">
            <label htmlFor="maritalStatus" className="form-label text-primary">
              Marital Status
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              onChange={handleChange}
              value={data.maritalStatus}
              required
               className={`form-input focus:outline-primary border border-gray-light`}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
           
          </div>

          {/* Religion */}
          <div className="col-span-2">
            <label htmlFor="religion" className="form-label text-primary">
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              onChange={handleChange}
              value={data.religion}
              required
              className={`form-input focus:outline-primary border border-gray-light`}
            >
              <option value="">Select Religion</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Traditional">Traditional</option>
              <option value="Other">Other</option>
            </select>
            
          </div>

          {/* Phone Number */}
          <div className="col-span-2">
            <label htmlFor="phoneNumber" className="form-label text-primary">
              Phone Number <br />
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              required
              placeholder="Enter phone number"
              className={`form-input focus:outline-primary border border-gray-light`}
            />
           
          </div>

          {/* Emergency Contact Name */}
          <div className="col-span-2">
            <label htmlFor="emergencyContactName" className="form-label text-primary">
              Emergency Contact Name
            </label>
            <input
              type="text"
              name="emergencyContactName"
              id="emergencyContactName"
              onChange={handleChange}
              value={data.emergencyContactName}
              required
              placeholder="Full name"
               className={`form-input focus:outline-primary border border-gray-light`}
            />
           
          </div>

          {/* Emergency Contact Phone */}
          <div className="col-span-2">
            <label htmlFor="emergencyContactPhone" className="form-label text-primary">
              Emergency Contact Phone
            </label>
            <input
              type="tel"
              name="emergencyContactPhone"
              id="emergencyContactPhone"
              onChange={handleChange}
              value={data.emergencyContactPhone}
              required
              placeholder="Phone number"
              className={`form-input focus:outline-primary border border-gray-light`}
            />
          
          </div>
        </div>

        <button
          type="submit"
          className="text-base bg-primary text-white px-4 py-3 font-semibold w-full rounded-md mt-4"
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default BioData;
