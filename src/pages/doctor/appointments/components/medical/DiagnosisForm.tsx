import { useState } from "react";

const DiagnosisForm = () => {
  const [data, setData] = useState({
    title: "",
    type: "",
    notes: "",
    file: null,
    status: "",
  });

  const handleChange = (e: any) => {
    const { name, value, files } = e.target;
    setData({
      ...data,
      [name]: files ? files[0] : value,
    });
  };

  return (
    <form className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Diagnosis Title */}
      <div className="col-span-2">
        <label htmlFor="Diagnosis Title" className="form-label !text-base !font-light">
          Diagnosis Title
        </label>
        <input
          type="text"
          name="Diagnosis Title"
          id="Diagnosis Title"
          placeholder="Diagnosis Title"
          onChange={handleChange}
          value={data.title}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Diagnosis Type */}
      <div className="col-span-2">
        <label htmlFor="type" className="form-label !text-base !font-light ">
          Diagnosis Type
        </label>
        <input
          type="text"
          name="type"
          id="type"
          onChange={handleChange}
          value={data.type}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Symptoms / Notes */}
      <div className="col-span-2">
        <label htmlFor="notes" className="form-label !text-base !font-light ">
          Symptoms / Notes
        </label>
        <textarea
          name="notes"
          id="notes"
          rows={4}
          onChange={handleChange}
          value={data.notes}
          className="form-input focus:outline-primary text-gray-light resize-none"
        ></textarea>
      </div>

      {/* Upload File */}
      <div className="col-span-2">
        <label htmlFor="file" className="form-label !text-base !font-light ">
          Upload File
        </label>
        <input
          type="file"
          name="file"
          id="file"
          onChange={handleChange}
          className="form-input focus:outline-primary text-gray-light"
        />
      </div>

      {/* Status */}
      <div className="col-span-2">
        <label htmlFor="status" className="form-label !text-base !font-light ">
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
          <option value="Ongoing">Ongoing</option>
        </select>
      </div>
    </form>
  );
};

export default DiagnosisForm;
