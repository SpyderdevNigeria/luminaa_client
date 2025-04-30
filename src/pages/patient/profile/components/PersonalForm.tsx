import React from 'react'
import { useState } from 'react';

function PersonalForm() {
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        dob: '',
        gender: '',
        maritalStatus: '',
        educationLevel: '',
        religion: '',
    });

    function handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>): void {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    function submitform(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        console.log(formData);
    }

    return (
    <div>
      <form
        onSubmit={submitform}
      >
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
              value={formData?.firstName}
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
              value={formData?.lastName}
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
              value={formData?.dob}
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
              value={formData?.gender}
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
              value={formData?.maritalStatus}
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
              value={formData?.educationLevel}
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
              value={formData?.religion}
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
          Submit
        </button>
      </form>
    </div>
  );
}

export default PersonalForm