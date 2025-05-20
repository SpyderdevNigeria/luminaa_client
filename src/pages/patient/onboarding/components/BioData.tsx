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
  getFieldErrors: (field: string) => React.ReactNode;
};

function BioData({ submitform, handleChange, data, getFieldErrors }: BioDataProps) {
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
              className={`form-input ${
                getFieldErrors("dateOfBirth")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            />
            {getFieldErrors("dateOfBirth")}
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
              className={`form-input ${
                getFieldErrors("gender")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
            {getFieldErrors("gender")}
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
              className={`form-input ${
                getFieldErrors("maritalStatus")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
            {getFieldErrors("maritalStatus")}
          </div>

          {/* Religion */}
          <div className="mb-4 col-span-2">
            <label htmlFor="religion" className="form-label text-primary">
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              onChange={handleChange}
              value={data.religion}
              className={`form-input ${
                getFieldErrors("religion")
                  ? "outline outline-red-600"
                  : "focus:outline-primary"
              } border border-gray-light`}
            >
              <option value="">Select Religion</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Traditional">Traditional</option>
              <option value="Other">Other</option>
            </select>
            {getFieldErrors("religion")}
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
