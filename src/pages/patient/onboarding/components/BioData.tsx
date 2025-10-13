import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import {
  formatDate,
  getMaxDateFor18YearsOld,
  nigerianStates,
} from "../../../../utils/dashboardUtils";
import { FiInfo } from "react-icons/fi";

type BioDataProps = {
  submitform: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: {
    country: string;
    gender: string;
    maritalStatus: string;
    dateOfBirth: string;
    religion: string;
    phoneNumber: string;
    emergencyContactName: string;
    emergencyContactPhone: string;
    stateOfOrigin: string;
    hmoNumber: string;
  };
};

function BioData({ submitform, handleChange, data }: BioDataProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  // Load countries and set default country to Nigeria
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries.map((c) => c.name));

    if (!data.country) {
      const event = {
        target: {
          name: "country",
          value: "Nigeria",
        },
      } as React.ChangeEvent<HTMLSelectElement>;
      handleChange(event);
    }
  }, []);

  // Load states based on selected country
  useEffect(() => {
    if (data.country === "Nigeria") {
      // Use your Nigerian states list
      setStates(nigerianStates.slice(1));
    } else if (data.country) {
      const selectedCountry = Country.getAllCountries().find(
        (c) => c.name === data.country
      );
      if (selectedCountry) {
        const countryStates = State.getStatesOfCountry(selectedCountry.isoCode);
        setStates(countryStates.map((s) => s.name));
      } else {
        setStates([]);
      }
    } else {
      setStates([]);
    }
  }, [data.country]);

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
              value={formatDate(data.dateOfBirth)}
              required
              className="form-input focus:outline-primary border border-gray-light"
              max={getMaxDateFor18YearsOld()}
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
              className="form-input focus:outline-primary border border-gray-light"
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
              className="form-input focus:outline-primary border border-gray-light"
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
              className="form-input focus:outline-primary border border-gray-light"
            >
              <option value="">Select Religion</option>
              <option value="Christianity">Christianity</option>
              <option value="Islam">Islam</option>
              <option value="Traditional">Traditional</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Country */}
          <div className="col-span-2">
            <label htmlFor="country" className="form-label text-primary">
              Country
            </label>
            <select
              name="country"
              id="country"
              onChange={handleChange}
              value={data.country}
              required
              disabled
              className="form-input focus:outline-primary border border-gray-light bg-gray-100 text-gray-700 cursor-not-allowed"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* State of Origin */}
          {data.country && (
            <div className="col-span-2">
              <label htmlFor="stateOfOrigin" className="form-label text-primary">
                State of Origin
              </label>
              <select
                name="stateOfOrigin"
                id="stateOfOrigin"
                onChange={handleChange}
                value={data.stateOfOrigin}
                required
                className="form-input focus:outline-primary border border-gray-light scrollbar-visible"
              >
                <option value="">Select State</option>
                {states.map((state) => (
                  <option key={state} value={state}>
                    {state}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Phone Number */}
          <div className="col-span-2">
            <label htmlFor="phoneNumber" className="form-label text-primary">
              Phone Number
            </label>
            <input
              type="tel"
              name="phoneNumber"
              id="phoneNumber"
              onChange={handleChange}
              value={data.phoneNumber}
              required
              placeholder="Enter phone number"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Emergency Contact Name */}
          <div className="col-span-2">
            <label
              htmlFor="emergencyContactName"
              className="form-label text-primary"
            >
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
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* Emergency Contact Phone */}
          <div className="col-span-2">
            <label
              htmlFor="emergencyContactPhone"
              className="form-label text-primary"
            >
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
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>


          {/* HMO Number */}
          <div className="col-span-2 relative">
            <label htmlFor="hmoNumber" className="form-label text-primary flex items-center gap-2">
              HMO Number
              <span className="text-xs text-gray-500">(optional)</span>
              <div className="relative group cursor-pointer">
                <FiInfo className="text-gray-500 hover:text-primary" />
                <div className="absolute left-6 top-1/2 -translate-y-1/2 w-64 bg-gray-800 text-white text-xs rounded-md p-2 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                  Your HMO (Health Maintenance Organization) number identifies your health insurance provider.
                  Enter it if you have one for verification and claim purposes.
                </div>
              </div>
            </label>

            <input
              type="text"
              name="hmoNumber"
              id="hmoNumber"
              onChange={handleChange}
              value={data.hmoNumber}
              placeholder="Enter HMO number"
              className="form-input focus:outline-primary border border-gray-light"
            />

            <p className="text-xs text-gray-500 mt-1">
              If you don’t have an HMO, you can leave this field empty.
            </p>
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
