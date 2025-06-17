import Modal from "./modal";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import website from "../../utils/website";

// Types
type Person = {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialty?: string;
};

type LabResult = {
  testName: string;
  result: string;
  unit: string;
  referenceRange: string;
};

type DocumentFile = {
  url: string;
};

type LabDocument = {
  name: string;
  description: string;
  file: DocumentFile;
};

type LabRequestReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  results: {
    testName: string;
    status: string;
    priority: string;
    collectedSample: boolean;
    createdAt: string;
    patient?: Person;
    notes?: string;
    doctor?: Person;
    resultList?: LabResult[];
    documents?: LabDocument[];
  };
};

function LabRequestReportModal({
  isModalOpen,
  setModalOpen,
  results,
}: LabRequestReportModalProps) {
  const {
    testName,
    status,
    priority,
    collectedSample,
    createdAt,
    patient,
    doctor,
    notes,
    resultList = [],
    documents = [],
  } = results;

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
      pdf.save("Lab_Request_Report.pdf");
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
        title="Lab Request Report"
        hideCancel={false}
        style="!md:max-w-2xl !md:mx-4 !md:mx-0"
        buttonText="Download"
        handleSubmit={handleDownloadPDF}
      >
        <main className="min-h-[200px] flex flex-col gap-4 py-4">
          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">Test Name</h4>
            <h3 className="text-sm text-text-primary">{testName}</h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">Status</h4>
            <StatusBadge status={status} />
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">Priority</h4>
            <h3 className="text-sm text-text-primary capitalize">{priority}</h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">Sample Collected</h4>
            <h3 className="text-sm text-text-primary">{collectedSample ? "Yes" : "No"}</h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">Requested On</h4>
            <h3 className="text-sm text-text-primary">{moment(createdAt).format("MMMM D, YYYY h:mm A")}</h3>
          </div>
        </main>
      </Modal>

      {/* Hidden Printable Area */}
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
        <h2>Lab Request Details</h2>
        <p><strong>Hospital:</strong> {website?.name}</p>
        <p><strong>Test Name:</strong> {testName}</p>
        <p><strong>Status:</strong> {status}</p>
        <p><strong>Priority:</strong> {priority}</p>
        <p><strong>Collected Sample:</strong> {collectedSample ? "Yes" : "No"}</p>
        <p><strong>Requested On:</strong> {moment(createdAt).format("MMM D, YYYY h:mm A")}</p>
        <p><strong>Notes:</strong> {notes}</p>
        <h3>Patient Information</h3>
        <p><strong>Name:</strong> {`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`}</p>
        <p><strong>Email:</strong> {patient?.email ?? "N/A"}</p>

        <h3>Doctor Information</h3>
        <p><strong>Name:</strong> {`${doctor?.firstName ?? ""} ${doctor?.lastName ?? ""}`}</p>
        <p><strong>Specialty:</strong> {doctor?.specialty ?? "N/A"}</p>

        <h3>Test Results</h3>
        {resultList.length > 0 ? (
          resultList.map((result, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p><strong>Test Name:</strong> {result.testName}</p>
              <p><strong>Result:</strong> {result.result}</p>
              <p><strong>Unit:</strong> {result.unit}</p>
              <p><strong>Reference Range:</strong> {result.referenceRange}</p>
            </div>
          ))
        ) : (
          <p>No results available.</p>
        )}

        <h3>Documents</h3>
        {documents.length > 0 ? (
          documents.map((doc, index) => (
            <div key={index} style={{ marginBottom: "10px" }}>
              <p><strong>Name:</strong> {doc.name}</p>
              <p><strong>Description:</strong> {doc.description}</p>
              <p>
                <strong>URL:</strong>{" "}
                <a href={doc.file.url} target="_blank" rel="noopener noreferrer">
                  {doc.file.url}
                </a>
              </p>
            </div>
          ))
        ) : (
          <p>No documents available.</p>
        )}
      </div>
    </>
  );
}

export default LabRequestReportModal;
