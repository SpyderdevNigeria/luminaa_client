import { useState } from "react";
import { FiPlus } from "react-icons/fi";

const PrescriptionsForm = () => {
  const [data, setData] = useState({
    drugCategory: "",
    drug: "",
    frequency: "",
    dosage: "",
    refill: "",
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
      {/* Drug Category */}
      <div className="col-span-2">
        <label htmlFor="drugCategory" className="form-label !text-base !font-light">
          Drug Category
        </label>
        <input
          type="text"
          name="drugCategory"
          id="drugCategory"
          placeholder="Drug Category"
          onChange={handleChange}
          value={data.drugCategory}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Select Drug */}
      <div className="col-span-2">
        <label htmlFor="drug" className="form-label !text-base !font-light">
          Select Drug
        </label>
        <input
          type="text"
          name="drug"
          id="drug"
          placeholder="Select Drug"
          onChange={handleChange}
          value={data.drug}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Frequency */}
      <div className="col-span-2">
        <label htmlFor="frequency" className="form-label !text-base !font-light">
          Frequency
        </label>
        <input
          type="text"
          name="frequency"
          id="frequency"
          placeholder="Frequency"
          onChange={handleChange}
          value={data.frequency}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Dosage */}
      <div className="col-span-2">
        <label htmlFor="dosage" className="form-label !text-base !font-light">
          Dosage
        </label>
        <input
          type="text"
          name="dosage"
          id="dosage"
          placeholder="Dosage"
          onChange={handleChange}
          value={data.dosage}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Select Refill */}
      <div className="col-span-2">
        <label htmlFor="refill" className="form-label !text-base !font-light">
          Select Refill
        </label>
        <select
          name="refill"
          id="refill"
          onChange={handleChange}
          value={data.refill}
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="">Select Refill</option>
          <option value="No Refill">No Refill</option>
          <option value="1 Refill">1 Refill</option>
          <option value="2 Refills">2 Refills</option>
          <option value="3+ Refills">3+ Refills</option>
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

      {/* Add Item Button */}
      <div className="col-span-2">
        <button
          type="button"
          className="px-4 py-2 rounded-md flex items-center gap-2 text-sm"
        >
          <FiPlus className="text-base" />
          Add Item
        </button>
      </div>
    </form>
  );
};

export default PrescriptionsForm;
