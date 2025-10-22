import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";

import JoditEditor from "jodit-react";
import { useToaster } from "../../../components/common/ToasterContext";
import NurseApi from "../../../api/nurseApi";

export default function NurseReportCreateEdit() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { showToast } = useToaster();
  const { user } = useSelector((state: any) => state.auth);

  const editor = useRef(null);

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const defaultReportType = user?.isMatron ? "monthly" : "daily";

  const [formData, setFormData] = useState({
    reportType: defaultReportType,
    message: "",
    month: "",
  });

  useEffect(() => {
       if (!id) return;
    fetchReport();
  }, [id, defaultReportType]);

      const fetchReport = async () => {
      setFetching(true);
      try {
        const res = await NurseApi.getReportById(id);
        const data = res?.data || res;
        setFormData({
          reportType: data.reportType || defaultReportType,
          message: data.content || "",
          month: data.month || "",
        });
        setError(null);
      } catch (err: any) {
        console.error(err);
        setError("Failed to load report details.");
      } finally {
        setFetching(false);
      }
    };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
 

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const payload = {
        reportType: formData.reportType,
        content: formData.message,
        month: formData.month,
      };

      if (id) {
        await NurseApi.updateReport(id, payload);
        showToast("Report updated successfully", "success");
      } else {
        await NurseApi.createReport(payload);
        showToast("Report created successfully", "success");
      }
      navigate(-1);
    } catch (error) {
      console.error(error);
      showToast("Failed to save report", "error");
    } finally {
      setLoading(false);
    }
  };

  if (fetching) {
    return (
      <div className="p-6 text-center text-gray-500">
        Loading report details...
      </div>
    );
  }

  if (error ) {
    return (
      <div className="p-6 text-center">
        <p className="text-red-500">{error}</p>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-gray-500 text-white rounded-md"
        >
          Back
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow">
      <h2 className="text-xl font-semibold mb-4">
        {id ? "Edit Report" : "Create Report"}
      </h2>

      <div className="space-y-6">
        {/* Report Type */}
        <div>
          <label className="block text-sm font-medium mb-1">
            Report Type
          </label>
          <select
            name="reportType"
            value={formData.reportType}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
            disabled // readonly since it's role-based
          >
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
          <p className="text-xs text-gray-500 mt-1">
            (Report type is automatically set based on your role)
          </p>
        </div>

                {/* Month (date input for month) */}
        <div>
          <label className="block text-sm font-medium mb-1">Month</label>
          <input
            type="date"
            name="month"
            value={formData.month}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        {/* Content (Jodit Editor) */}
        <div>
          <label className="block text-sm font-medium mb-1">Content</label>
          <JoditEditor
            ref={editor}
            value={formData.message}
            onChange={(newContent: any) =>
              setFormData((prev) => ({ ...prev, message: newContent }))
            }
          />
        </div>

      </div>

      {/* Buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={() => navigate("/nurse/reports")}
          className="px-4 py-2 text-primary rounded-md"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-primary text-white rounded-md disabled:opacity-50"
        >
          {loading ? "Processing..." : id ? "Update" : "Save"}
        </button>
      </div>
    </div>
  );
}
