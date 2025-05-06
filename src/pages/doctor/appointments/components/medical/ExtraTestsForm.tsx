import { useState } from "react";

const ExtraTestsForm = () => {
  const [data, setData] = useState({
    connectToLab: "",
    testType: "",
    status: "",
    lab: "",
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
      {/* Need to connect to a Lab? */}
      <div className="col-span-2">
        <label htmlFor="connectToLab" className="form-label !text-base !font-light">
          Need to connect to a Lab?
        </label>
        <input
          type="text"
          name="connectToLab"
          id="connectToLab"
          placeholder="Yes / No / Notes"
          onChange={handleChange}
          value={data.connectToLab}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Test Type */}
      <div className="col-span-2">
        <label htmlFor="testType" className="form-label !text-base !font-light">
          Test Type
        </label>
        <input
          type="text"
          name="testType"
          id="testType"
          placeholder="e.g. Blood, X-Ray"
          onChange={handleChange}
          value={data.testType}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Status */}
      <div className="col-span-2">
        <label htmlFor="status" className="form-label !text-base !font-light">
          Status
        </label>
        <select
          name="status"
          id="status"
          onChange={handleChange}
          value={data.status}
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="Completed">Completed</option>
          <option value="In Progress">In Progress</option>
        </select>
      </div>

      {/* Select Lab */}
      <div className="col-span-2">
        <label htmlFor="lab" className="form-label !text-base !font-light">
          Select Lab
        </label>
        <select
          name="lab"
          id="lab"
          onChange={handleChange}
          value={data.lab}
          className="form-input focus:outline-primary text-gray-light"
        >
          <option value="">Choose a lab</option>
          <option value="Lab A">Lab A</option>
          <option value="Lab B">Lab B</option>
          <option value="Lab C">Lab C</option>
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

export default ExtraTestsForm;
