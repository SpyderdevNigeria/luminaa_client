import { useState } from "react";

const PharmacyForm = () => {
  const [data, setData] = useState({
    pharmacy: "",
    notes: "",
  });

  const handleChange = (e:any) => {
    const { name, value } = e.target;
    setData({
      ...data,
      [name]: value,
    });
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Info Label */}
      <div className="col-span-2">
        <p className="text-primary font-medium text-base">Need to connect to a pharmacy</p>
      </div>

      {/* Select Pharmacy */}
      <div className="col-span-2">
        <label htmlFor="pharmacy" className="form-label !text-base !font-light">
          Select Pharmacy
        </label>
        <select
          name="pharmacy"
          id="pharmacy"
          onChange={handleChange}
          value={data.pharmacy}
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="">Choose a pharmacy</option>
          <option value="Pharmacy A">Pharmacy A</option>
          <option value="Pharmacy B">Pharmacy B</option>
          <option value="Pharmacy C">Pharmacy C</option>
        </select>
      </div>

      {/* Symptoms / Notes */}
      <div className="col-span-2">
        <label htmlFor="notes" className="form-label !text-base !font-light">
          Symptoms / Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          placeholder="Enter symptoms or notes"
          onChange={handleChange}
          value={data.notes}
          className="form-input focus:outline-primary text-gray-light resize-none"
        ></textarea>
      </div>
    </form>
  );
};

export default PharmacyForm;
