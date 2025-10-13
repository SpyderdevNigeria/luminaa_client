import Modal from "./modal";
import { FaFilePdf } from "react-icons/fa6";
// import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useToaster } from "../common/ToasterContext";
import SheetHeader from "../common/SheetHeader";

type MedicalReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (e: any) => void;
  data: any;
  type?: string;
};
const sectionTitle = {
  fontSize: "16px",
  fontWeight: "bold",
  marginBottom: "10px",
  borderBottom: "1px solid #ccc",
  paddingBottom: "4px",
};

function MedicalReportModal({
  isModalOpen,
  setModalOpen,
  data,
  type = "patient"
}: MedicalReportModalProps) {
  const diagnosis = data;
  const printRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToaster();
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
      showToast("Something went wrong while generating the PDF. Please try again.", "error");
    }
  };

  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        title="Diagnosis Report Details"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0"
        buttonText="Download"
        handleSubmit={type === "patient" ? handleDownloadPDF : undefined}
      >
        <main className="min-h-[200px] flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Reason for the Appointment
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.primaryDiagnosis}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Patient Symptoms
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.symptoms}
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

          {/* <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Status</h4>
            <StatusBadge status={diagnosis?.severity} />
          </div> */}

   <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">Diagnosis Code</h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.diagnosisCode || "No code available."}
            </h3>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Doctor&apos;s Note
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.notes || "No note available."}
            </h3>
          </div>

          {/* <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Examination Findings
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.additionalRecommendations || "None"}
            </h3>
          </div>
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-[300]">
              Diagnosis
            </h4>
            <h3 className="text-sm text-text-primary">
              {diagnosis?.diagnosis || "None"}
            </h3>
          </div> */}
          {type === "patient" && <div className="space-y-1 print:hidden">
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
          </div>}

        </main>
      </Modal>

      <div
        ref={printRef}
        style={{
          position: "absolute",
          left: "-9999px",
          top: "0px",
          padding: "40px",
          backgroundColor: "#ffffff",
          width: "900px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
          lineHeight: 1.6,
          fontSize: "14px",
        }}
      >
        <SheetHeader />

        <h2
          style={{ marginBottom: "40px", marginTop: "10px" }}
          className="text-2xl text-primary text-center"
        >
          Diagnosis Report
        </h2>

        {/* Patient & Appointment Details */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
          }}
        >
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={sectionTitle}>Patient Details</h3>
            <p>
              Name:{" "}

              {diagnosis?.appointment?.patient?.user?.firstName}{" "}
              {diagnosis?.appointment?.patient?.user?.lastName}

            </p>
            <p>
              Date of Birth:{" "}

              {moment(diagnosis?.appointment?.patient?.dateOfBirth).format(
                "MMMM D, YYYY"
              )}

            </p>
            <p>
              Gender: {diagnosis?.appointment?.patient?.gender}
            </p>
            <p>
              Phone:{diagnosis?.appointment?.patient?.phoneNumber}
            </p>
            <p className="capitalize">
              Address:{" "}

              {diagnosis?.appointment?.patient?.address},{" "}
              {diagnosis?.appointment?.patient?.city},{" "}
              {diagnosis?.appointment?.patient?.state},{" "}
              {diagnosis?.appointment?.patient?.country} -{" "}
              {diagnosis?.appointment?.patient?.zipCode}

            </p>
          </div>

          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={sectionTitle}>Appointment Details</h3>
            <p>
              Date & Time:{" "}
              {moment(diagnosis?.appointment?.scheduledDate).format(
                "MMMM D, YYYY [at] h:mm A"
              )}
            </p>
            <p>Status: {diagnosis?.appointment?.status}</p>
            <p>Patient Note: {diagnosis?.appointment?.patientNote}</p>
            <p>Location: {diagnosis?.appointment?.location}</p>
          </div>
        </div>

        {/* Date Diagnosed */}
        <p style={{ marginTop: "30px" }}>
          <strong>Date Diagnosed:</strong>{" "}
          {moment(diagnosis?.createdAt).format("MMMM D, YYYY")}
        </p>

        {/* Diagnosis Section */}
        <div style={{ marginTop: "30px", }} >
          <h3 style={{
            fontSize: "16px",
            fontWeight: "bold",
            marginBottom: "10px",
            paddingBottom: "4px",
          }} className=" text-center">Diagnosis</h3>
          <div className="overflow-x-auto border rounded-lg">
            <table className="min-w-full table-auto border-collapse">
              <tbody>
                <tr className="border-b">
                  <td className="font-semibold px-4 py-2 border-r w-1/3">Reason for the Appointment</td>
                  <td className="px-4 py-2">{diagnosis?.primaryDiagnosis || "—"}</td>
                </tr>
                <tr className="border-b">
                  <td className="font-semibold px-4 py-2 border-r">Patient Symptoms</td>
                  <td className="px-4 py-2">{diagnosis?.symptoms || "—"}</td>
                </tr>
                 <tr className="border-b">
                  <td className="font-semibold px-4 py-2 border-r">Diagnosis Code</td>
                  <td className="px-4 py-2">{diagnosis?.diagnosisCode || "—"}</td>
                </tr>
                <tr className="">
                  <td className="font-semibold px-4 py-2 border-r">Doctor's Note</td>
                  <td className="px-4 py-2">{diagnosis?.notes || "No note available."}</td>
                </tr>
                {/* <tr className="border-b">
                  <td className="font-semibold px-4 py-2 border-r">Examination Findings</td>
                  <td className="px-4 py-2">{diagnosis?.additionalRecommendations || "None"}</td>
                </tr>
                <tr >
                  <td className="font-semibold px-4 py-2 border-r">Diagnosis</td>
                  <td className="px-4 py-2">{diagnosis?.diagnosis || "None"}</td>
                </tr> */}
              </tbody>
            </table>
          </div>

        </div>

        {/* Doctor at Bottom */}
        <div style={{ marginTop: "40px" }}>
          <h4 style={{ marginBottom: "8px" }}>Attending Doctor</h4>
          <p style={{ fontWeight: "bold" }}>
            Dr. {diagnosis?.appointment?.doctor?.user?.firstName}{" "}
            {diagnosis?.appointment?.doctor?.user?.lastName}
          </p>
          <p>
            Specialty: {diagnosis?.appointment?.doctor?.specialty ?? "N/A"}
          </p>
        </div>
      </div>



    </>
  );
}

export default MedicalReportModal;
