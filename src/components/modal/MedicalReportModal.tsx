import Modal from "./modal";
import { FaFilePdf } from "react-icons/fa6";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import website from "../../utils/website";

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
      pdf.save("diagnosis_report.pdf");
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
            <h4 className="text-sm text-text-secondary font-[300]">
              Diagnosis
            </h4>
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
            <h4 className="text-sm text-text-secondary font-[300]">
              Attachment
            </h4>
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
        <h2 style={{ fontSize: "18px", marginBottom: "10px" }}>
          Diagnosis Report
        </h2>
        <p>
          <strong>Hospital:</strong> {website?.name}
        </p>
        <p>
          <strong>Date Diagnosed:</strong>{" "}
          {moment(diagnosis?.createdAt).format("MMMM D, YYYY")}
        </p>

        <hr style={{ margin: "10px 0" }} />

        <h3 style={{ marginTop: "10px", fontSize: "16px" }}>Patient Details</h3>
        <p>
          <strong>Name:</strong>{" "}
          {diagnosis?.appointment?.patient?.user?.firstName}{" "}
          {diagnosis?.appointment?.patient?.user?.lastName}
        </p>
        <p>
          <strong>Date of Birth:</strong>{" "}
          {moment(diagnosis?.appointment?.patient?.dateOfBirth).format(
            "MMMM D, YYYY"
          )}
        </p>
        <p>
          <strong>Gender:</strong> {diagnosis?.appointment?.patient?.gender}
        </p>
        <p>
          <strong>Phone:</strong> {diagnosis?.appointment?.patient?.phoneNumber}
        </p>
        <p>
          <strong>Address:</strong> {diagnosis?.appointment?.patient?.address},{" "}
          {diagnosis?.appointment?.patient?.city},{" "}
          {diagnosis?.appointment?.patient?.state},{" "}
          {diagnosis?.appointment?.patient?.country} -{" "}
          {diagnosis?.appointment?.patient?.zipCode}
        </p>

        <hr style={{ margin: "10px 0" }} />

        <h3 style={{ marginTop: "10px", fontSize: "16px" }}>
          Appointment Details
        </h3>
        <p>
          <strong>Date & Time:</strong>{" "}
          {moment(diagnosis?.appointment?.scheduledDate).format(
            "MMMM D, YYYY [at] h:mm A"
          )}
        </p>
        <p>
          <strong>Status:</strong> {diagnosis?.appointment?.status}
        </p>
        <p>
          <strong>Patient Note:</strong> {diagnosis?.appointment?.patientNote}
        </p>
        <p>
          <strong>Location:</strong> {diagnosis?.appointment?.location}
        </p>

        <hr style={{ margin: "10px 0" }} />

        <h3 style={{ marginTop: "10px", fontSize: "16px" }}>Doctor Details</h3>
        <p>
          <strong>Name:</strong> Dr.{" "}
          {diagnosis?.appointment?.doctor?.user?.firstName}{" "}
          {diagnosis?.appointment?.doctor?.user?.lastName}
        </p>
        <p>
          <strong>Email:</strong> {diagnosis?.appointment?.doctor?.user?.email}
        </p>
        <p>
          <strong>Specialty:</strong>{" "}
          {diagnosis?.appointment?.doctor?.specialty}
        </p>
        <p>
          <strong>License Number:</strong>{" "}
          {diagnosis?.appointment?.doctor?.licenseNumber}
        </p>
        <p>
          <strong>Contact:</strong>{" "}
          {diagnosis?.appointment?.doctor?.contactNumber}
        </p>

        <hr style={{ margin: "10px 0" }} />

        <h3 style={{ marginTop: "10px", fontSize: "16px" }}>Diagnosis</h3>
        <p>
          <strong>Diagnosis:</strong> {diagnosis?.primaryDiagnosis}
        </p>
        <p>
          <strong>Diagnosis Code:</strong> {diagnosis?.diagnosisCode || "N/A"}
        </p>
        <p>
          <strong>Severity:</strong> {diagnosis?.severity}
        </p>
        <p>
          <strong>Symptoms:</strong> {diagnosis?.symptoms}
        </p>
        <p>
          <strong>Doctor's Note:</strong>{" "}
          {diagnosis?.notes || "No note available."}
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
