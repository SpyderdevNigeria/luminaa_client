import React from "react";

type BioDataProps = {
  submitform: (e: React.FormEvent) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  data: {
    firstName: string;
    lastName: string;
    dob: string;
    gender: string;
    maritalStatus: string;
    educationLevel: string;
    religion: string;
  };
}
function BioData({submitform, handleChange, data}: BioDataProps) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitform(e);
        }}
      >
        <h2 className="text-2xl md:text-3xl my-8 px-20  text-center text-text-secondary">
          Bio Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">

          {/* Date of Birth */}
          <div className="col-span-2 ">
            <label
              htmlFor="dob"
              className="form-label text-primary"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              onChange={handleChange}
              value={data?.dob}
              className="form-input focus:outline-primary text-gray-light"
            />
          </div>

          {/* Gender */}
          <div className="col-span-2 ">
            <label
              htmlFor="gender"
              className="form-label text-primary"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              value={data?.gender}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Marital Status */}
          <div className="col-span-2 ">
            <label
              htmlFor="maritalStatus"
              className="form-label text-primary"
            >
              Marital Status
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              onChange={handleChange}
              value={data?.maritalStatus}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Status</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
              <option value="Divorced">Divorced</option>
              <option value="Widowed">Widowed</option>
            </select>
          </div>

          {/* Level of Education */}
          <div className="col-span-2 ">
            <label
              htmlFor="educationLevel"
              className="form-label text-primary"
            >
              Level of Education
            </label>
            <select
              name="educationLevel"
              id="educationLevel"
              onChange={handleChange}
              value={data?.educationLevel}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Level</option>
              <option value="Primary">Primary</option>
              <option value="Secondary">Secondary</option>
              <option value="Tertiary">Tertiary</option>
              <option value="Postgraduate">Postgraduate</option>
            </select>
          </div>

          {/* Religion */}
          <div className="mb-4 col-span-2">
            <label
              htmlFor="religion"
              className="form-label text-primary"
            >
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              onChange={handleChange}
              value={data?.religion}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Religion</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Traditional">Traditional</option>
              <option value="Other">Other</option>
            </select>
          </div>
        </div>

        <button
          type="submit"
           className=" text-base bg-primary text-white px-4  py-3 font-semibold w-full rounded-md  mt-4 "
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default BioData;
