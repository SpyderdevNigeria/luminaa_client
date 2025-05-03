interface ResidentialDetailsProps {
  submitform: (e: React.FormEvent) => void;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
  data: {
    address: string;
    city: string;
    state: string;
    country: string;
    stateOfOrigin: string;
    lga: string;
    postalCode: string;
    street: string;
  };
}

function ResidentialDetails({
  submitform,
  handleChange,
  data,
}: ResidentialDetailsProps) {
  return (
    <div>
      <form
        onSubmit={(e) => {
          submitform(e);
        }}
      >
        <h2 className="text-2xl md:text-3xl my-8 px-20  text-center text-text-secondary">
          Residential Details
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-1 gap-4">
          {/* Street */}
          <div className="col-span-2">
            <label htmlFor="street" className="form-label text-primary">
              Street
            </label>
            <input
              type="text"
              name="street"
              id="street"
              onChange={handleChange}
              value={data?.street}
              placeholder="Street Address"
              className="form-input focus:outline-primary text-gray-light"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-4">
              {/* City */}
              <div className="mt-2">
                <select
                  name="city"
                  id="city"
                  onChange={handleChange}
                  value={data?.country}
                  className="form-input focus:outline-primary text-gray-light"
                >
                  <option value="">city</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  {/* Add more countries as needed */}
                </select>
              </div>

              {/* State */}
              <div className=" md:mt-2">
                <select
                  name="state"
                  id="state"
                  onChange={handleChange}
                  value={data?.country}
                  className="form-input focus:outline-primary text-gray-light"
                >
                  <option value="">state</option>
                  <option value="Nigeria">Nigeria</option>
                  <option value="Ghana">Ghana</option>
                  <option value="Kenya">Kenya</option>
                  <option value="South Africa">South Africa</option>
                  {/* Add more countries as needed */}
                </select>
              </div>
            </div>
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
              value={data?.country}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select Country</option>
              <option value="Nigeria">Nigeria</option>
              <option value="Ghana">Ghana</option>
              <option value="Kenya">Kenya</option>
              <option value="South Africa">South Africa</option>
              {/* Add more countries as needed */}
            </select>
          </div>

          {/* State of Origin */}
          <div className="col-span-2">
            <label htmlFor="stateOfOrigin" className="form-label text-primary">
              State of Origin
            </label>
            <select
              name="stateOfOrigin"
              id="stateOfOrigin"
              onChange={handleChange}
              value={data?.stateOfOrigin}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select State</option>
              <option value="Lagos">Lagos</option>
              <option value="Abuja">Abuja</option>
              <option value="Enugu">Enugu</option>
              <option value="Rivers">Rivers</option>
              {/* Add more states as needed */}
            </select>
          </div>

          {/* LGA */}
          <div className="col-span-2">
            <label htmlFor="lga" className="form-label text-primary">
              Local Government Area (LGA)
            </label>
            <select
              name="lga"
              id="lga"
              onChange={handleChange}
              value={data?.lga}
              className="form-input focus:outline-primary text-gray-light"
            >
              <option value="">Select LGA</option>
              <option value="Ikeja">Ikeja</option>
              <option value="Kosofe">Kosofe</option>
              <option value="Enugu North">Enugu North</option>
              <option value="Port Harcourt">Port Harcourt</option>
              {/* Update this dynamically based on state, if needed */}
            </select>
          </div>

          {/* Postal Code */}
          <div className="col-span-2">
            <label htmlFor="postalCode" className="form-label text-primary">
              Postal Code
            </label>
            <input
              type="text"
              name="postalCode"
              id="postalCode"
              onChange={handleChange}
              value={data?.postalCode}
              placeholder="Postal Code"
              className="form-input focus:outline-primary text-gray-light"
            />
          </div>
        </div>

        <button
          type="submit"
          className=" text-base  bg-primary text-white px-4  py-3 font-semibold w-full rounded-md  mt-4 "
        >
          Continue
        </button>
        {/* <button
                type="button"
                onClick={handleBack}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded"
              >
                Back
              </button> */}
      </form>
    </div>
  );
}

export default ResidentialDetails;
