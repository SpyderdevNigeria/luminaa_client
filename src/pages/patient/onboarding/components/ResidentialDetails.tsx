import React, { useEffect, useState } from "react";
import { Country, State } from "country-state-city";
import { nigerianStates } from "../../../../utils/dashboardUtils";

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

  // Load countries (set default to Nigeria)
  useEffect(() => {
    const allCountries = Country.getAllCountries();
    setCountries(allCountries.map((c) => c.name));

    if (!data.country) {
      const event = {
        target: { name: "country", value: "Nigeria" },
      } as React.ChangeEvent<HTMLSelectElement>;
      handleChange(event);
    }
  }, []);

  // Load states based on selected country
  useEffect(() => {
    if (data.country === "Nigeria") {
      setStates(nigerianStates.slice(1)); // use your Nigeria list
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
              disabled
              className="form-input focus:outline-primary border border-gray-light scrollbar-visible bg-gray-100 text-gray-700 cursor-not-allowed"
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
