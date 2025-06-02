import Modal from "./modal";
import { FaFilePdf } from "react-icons/fa6";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";

type MedicalReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
};

function MedicalReportModal({
  isModalOpen,
  setModalOpen,
  data,
}: MedicalReportModalProps) {
  const diagnosis = data;
  const printRef = useRef<HTMLDivElement>(null);

  const handleDownloadPDF = async () => {
    if (!printRef.current) return;

    try {
      const canvas = await html2canvas(printRef.current, {
        useCORS: true,
        scale: 2,
        backgroundColor: "#ffffff",
      });

      const imgData = canvas.toDataURL("image/png");

      const pdf = new jsPDF("p", "mm", "a4");
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save("medical_report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      alert("Something went wrong while generating the PDF. Please try again.");
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Medical Report Details"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0"
        buttonText="Download"
        handleSubmit={handleDownloadPDF}
      >
        <main className="min-h-[200px] flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Diagnosis</h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.primaryDiagnosis}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Diagnosis Code
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.diagnosisCode}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Severity</h4>
            <h3 className="text-sm text-text-primary capitalize">
              {diagnosis?.severity}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Date Diagnosed
            </h4>
            <h3 className="text-sm text-text-primary">
              {moment(diagnosis?.createdAt).format("MMMM D, YYYY")}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Status</h4>
            <StatusBadge status={diagnosis?.severity} />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Doctor&apos;s Note
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.notes || "No note available."}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Additional Recommendations
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.additionalRecommendations || "None"}
            </h3>
          </div>

          <div className="space-y-1 print:hidden">
            <h4 className="text-sm text-text-secondary font-[300]">Attachment</h4>
            <button
              type="button"
              className="text-white bg-red-600 font-base flex items-center py-2 px-4 gap-2 rounded-md"
            >
              <FaFilePdf />
              Diagnosis.pdf
            </button>
          </div>
        </main>
      </Modal>

      {/* ✅ Hidden printable version ONLY used for PDF rendering */}
      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0px",
          padding: "20px",
          backgroundColor: "#ffffff",
          width: "600px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
        }}
      >
        <h2 style={{ marginBottom: "10px", fontSize: "18px" }}>Medical Report</h2>
        <p>
          <strong>Diagnosis:</strong> {diagnosis?.primaryDiagnosis}
        </p>
        <p>
          <strong>Diagnosis Code:</strong> {diagnosis?.diagnosisCode}
        </p>
        <p>
          <strong>Severity:</strong> {diagnosis?.severity}
        </p>
        <p>
          <strong>Date Diagnosed:</strong>{" "}
          {moment(diagnosis?.createdAt).format("MMMM D, YYYY")}
        </p>
        <p>
          <strong>Status:</strong> {diagnosis?.severity}
        </p>
        <p>
          <strong>Doctor&apos;s Note:</strong> {diagnosis?.notes || "No note available."}
        </p>
        <p>
          <strong>Additional Recommendations:</strong>{" "}
          {diagnosis?.additionalRecommendations || "None"}
        </p>
      </div>
    </>
  );
}

export default MedicalReportModal;
