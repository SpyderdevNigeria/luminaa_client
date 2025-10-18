import { useEffect, useState } from "react";
import { useToaster } from "../common/ToasterContext";
import NurseApi from "../../api/nurseApi";
import Modal from "./modal";

interface Props {
  open: boolean;
  report?: any;
  onClose: () => void;
  onBack: () => void;
}

export default function NurseReportModal({ open, report, onClose, onBack }: Props) {
  const { showToast } = useToaster();

  const [formData, setFormData] = useState({
    reportType: report?.reportType || "daily",
    content: report?.content || "",
    month: report?.month || "",
  });

  useEffect(()=> {
    if (report) {
      setFormData({
        reportType: report?.reportType || "daily",
        content: report?.content || "",
        month: report?.month || "",
      })
    }
  }, [report])

  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    setLoading(true);
    try {
      if (report) {
        await NurseApi.updateReport(report.id, formData);
        showToast("Report updated successfully", "success");
      } else {
        await NurseApi.createReport(formData);
        showToast("Report created successfully", "success");
      }
      onClose();
    } catch (error) {
      console.error(error);
      showToast("Failed to save report", "error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal
      open={open}
      onClose={() => {
          setFormData({
            reportType: "daily",
            content:  "",
            month:  "",
          })
          onBack();
      }}
      title={report ? "Edit Report" : "Add Report"}
      handleSubmit={handleSubmit}
      buttonText={loading ? "Processing..." : report ? "Update" : "Save"}
      loading={loading}
    >
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium">Report Type</label>
          <select name="reportType" value={formData.reportType} id=""   onChange={handleChange} className="border border-gray-300 p-2 rounded-md w-full ">
            <option value="daily">Daily</option>
            <option value="weekly">Weekly</option>
            <option value="monthly">Monthly</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Content</label>
          <textarea
            name="content"
            value={formData.content}
            onChange={handleChange}
            rows={4}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Month</label>
          <input
            type="text"
            name="month"
            placeholder="YYYY-MM"
            value={formData.month}
            onChange={handleChange}
            className="border border-gray-300 p-2 rounded-md w-full"
          />
        </div>
      </div>
    </Modal>
  );
}
