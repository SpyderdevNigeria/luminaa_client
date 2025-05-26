import React from "react";

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
              className={`form-input focus:outline-primary border border-gray-light`}
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
               className={`form-input focus:outline-primary border border-gray-light`}
            />
     
          </div>

          {/* State */}
          <div>
            <label htmlFor="state" className="form-label text-primary">
              State
            </label>
            <input
              required
              type="text"
              name="state"
              id="state"
              onChange={handleChange}
              value={data.state}
              placeholder="State"
              className={`form-input focus:outline-primary border border-gray-light`}
            />

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
              className={`form-input focus:outline-primary border border-gray-light`}
            >
              <option value="" disabled>
                Select Country
              </option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
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
           className={`form-input focus:outline-primary border border-gray-light`}
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
