import React from "react";

function BioData({ submitform = (e: React.FormEvent<HTMLFormElement>) => {}, handleChange = () => {}, data }) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitform(e);
        }}
      >
        <h2 className="text-2xl md:text-3xl my-8 px-20 font-[500] text-center text-text-muted">
          Bio Data
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* First Name */}
          <div className=" col-span-2 ">
            <label
              htmlFor="firstName"
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              First Name
            </label>
            <input
              type="text"
              name="firstName"
              id="firstName"
              onChange={handleChange}
              value={data?.firstName}
              placeholder="First Name"
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
            />
          </div>

          {/* Last Name */}
          <div className="col-span-2 ">
            <label
              htmlFor="lastName"
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Last Name
            </label>
            <input
              type="text"
              name="lastName"
              id="lastName"
              onChange={handleChange}
              value={data?.lastName}
              placeholder="Last Name"
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
            />
          </div>

          {/* Date of Birth */}
          <div className="col-span-2 ">
            <label
              htmlFor="dob"
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Date of Birth
            </label>
            <input
              type="date"
              name="dob"
              id="dob"
              onChange={handleChange}
              value={data?.dob}
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
            />
          </div>

          {/* Gender */}
          <div className="col-span-2 ">
            <label
              htmlFor="gender"
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Gender
            </label>
            <select
              name="gender"
              id="gender"
              onChange={handleChange}
              value={data?.gender}
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
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
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Marital Status
            </label>
            <select
              name="maritalStatus"
              id="maritalStatus"
              onChange={handleChange}
              value={data?.maritalStatus}
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
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
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Level of Education
            </label>
            <select
              name="educationLevel"
              id="educationLevel"
              onChange={handleChange}
              value={data?.educationLevel}
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
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
              className="block  text-xs md:text-sm font-[500] leading-6 mb-2  text-primary"
            >
              Religion
            </label>
            <select
              name="religion"
              id="religion"
              onChange={handleChange}
              value={data?.religion}
              className="w-full p-3 text-xs md:text-sm  rounded-lg font-[300] border focus:outline-primary text-gray-light"
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
           className=" text-xs md:text-sm  bg-primary text-white px-4  py-3 font-semibold w-full rounded-md  mt-4 "
        >
          Next
        </button>
      </form>
    </div>
  );
}

export default BioData;
