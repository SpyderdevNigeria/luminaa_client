import React, { useEffect, useState } from "react";
import getAllCountries from "countries-states-cities";
import getStatesOfCountry from "countries-states-cities";

interface ResidentialDetailsProps {
  submitform: (e: React.FormEvent<HTMLFormElement>) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: {
    address: string;
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  isLoading: boolean;
}

function ResidentialDetails({
  submitform,
  handleChange,
  data,
  isLoading,
}: ResidentialDetailsProps) {
  const [countries, setCountries] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);

  // Load countries on mount
  useEffect(() => {
    const allCountries = getAllCountries.getAllCountries();
    setCountries(allCountries.map((country: any) => country.name));
  }, []);

  // Load states when country changes
  useEffect(() => {
    if (data.country) {
      const allCountries = getAllCountries.getAllCountries();
      const selectedCountry = allCountries.find((country: any) => country.name === data.country);
      if (selectedCountry) {
        const countryStates = getStatesOfCountry.getStatesOfCountry(selectedCountry.id);
        setStates(countryStates.map((state: any) => state.name));
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
          Residential Details
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Address */}
          <div className="col-span-2">
            <label htmlFor="address" className="form-label text-primary">
              Address
            </label>
            <input
              required
              type="text"
              name="address"
              id="address"
              onChange={handleChange}
              value={data.address}
              placeholder="Street Address"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* City */}
          <div>
            <label htmlFor="city" className="form-label text-primary">
              City
            </label>
            <input
              required
              type="text"
              name="city"
              id="city"
              onChange={handleChange}
              value={data.city}
              placeholder="City"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="form-label text-primary">
              State
            </label>
            <select
              name="state"
              id="state"
              onChange={handleChange}
              value={data.state}
              required
              disabled={!data.country}
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

          {/* Country */}
          <div className="col-span-2">
            <label htmlFor="country" className="form-label text-primary">
              Country
            </label>
            <select
              required
              name="country"
              id="country"
              onChange={handleChange}
              value={data.country}
              className="form-input focus:outline-primary border border-gray-light scrollbar-visible"
            >
              <option value="">Select Country</option>
              {countries.map((country) => (
                <option key={country} value={country}>
                  {country}
                </option>
              ))}
            </select>
          </div>

          {/* Zip Code */}
          <div className="col-span-2">
            <label htmlFor="zipCode" className="form-label text-primary">
              Zip Code
            </label>
            <input
              required
              type="text"
              name="zipCode"
              id="zipCode"
              onChange={handleChange}
              value={data.zipCode}
              placeholder="Zip Code"
              className="form-input focus:outline-primary border border-gray-light"
            />
          </div>
        </div>

        <button
          type="submit"
          className="text-base bg-primary text-white px-4 py-3 font-semibold w-full rounded-md mt-4"
          disabled={isLoading}
        >
          {isLoading ? "Submitting..." : "Submit"}
        </button>
      </form>
    </div>
  );
}

export default ResidentialDetails;
