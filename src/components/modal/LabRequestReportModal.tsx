import Modal from "./modal";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useToaster } from "../common/ToasterContext";
import SheetHeader from "../common/SheetHeader";
import { IResult } from "../../types/Interfaces";

const th = {
  padding: "10px",
  border: "1px solid #ccc",
  fontWeight: "bold",
  fontSize: "13px",
};

const td = {
  padding: "10px",
  border: "1px solid #ccc",
  fontSize: "13px",
};

// Types
type Person = {
  firstName?: string;
  lastName?: string;
  email?: string;
  specialty?: string;
};

// type LabResult = {
//   testName: string;
//   result: string;
//   unit: string;
//   referenceRange: string;
// };

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
    resultList?: IResult[] | undefined | null;
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
      pdf.save("Lab_Request_Report.pdf");
    } catch (error) {
      console.error("PDF generation failed:", error);
      showToast(
        "Something went wrong while generating the PDF. Please try again.",
        "error"
      );
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
            <h4 className="text-sm text-text-secondary font-light">
              Test Name
            </h4>
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
            <h4 className="text-sm text-text-secondary font-light">
              Sample Collected
            </h4>
            <h3 className="text-sm text-text-primary">
              {collectedSample ? "Yes" : "No"}
            </h3>
          </div>

          <div className="space-y-1">
            <h4 className="text-sm text-text-secondary font-light">
              Requested On
            </h4>
            <h3 className="text-sm text-text-primary">
              {moment(createdAt).format("MMMM D, YYYY h:mm A")}
            </h3>
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
          padding: "40px",
          backgroundColor: "#ffffff",
          width: "800px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
          fontSize: "14px",
          lineHeight: 1.6,
        }}
      >
        <SheetHeader />

        <h2
          style={{ marginBottom: "40px", marginTop: "10px" }}
          className="text-2xl text-primary text-center underline"
        >
          Lab Test Results
        </h2>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            gap: "2rem",
            flexWrap: "wrap",
            marginTop: "30px",
          }}
        >
          {/* Patient Info */}
          <div style={{ flex: 1, minWidth: "300px" }}>
            <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
              Patient Information
            </h3>
            <p>
              Name:{" "}
              <u>{`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`}</u>
            </p>
            <p>
              Email: <u>{patient?.email ?? "N/A"}</u>
            </p>
          </div>
        </div>

        {/* Test Results */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Test Results
          </h3>
          {(resultList ?? []).length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ccc",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                  <th style={th}>Test Name</th>
                  <th style={th}>Result</th>
                  <th style={th}>Unit</th>
                  <th style={th}>Reference Range</th>
                </tr>
              </thead>
              <tbody>
                {(resultList ?? []).map((result, index) => (
                  <tr key={index}>
                    <td style={td}>{result.testName}</td>
                    <td style={td}>{result.result}</td>
                    <td style={td}>{result.unit}</td>
                    <td style={td}>{result.referenceRange}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results available.</p>
          )}
        </div>

        {/* Documents */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Attachment Documents
          </h3>
          {documents.length > 0 ? (
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                border: "1px solid #ccc",
              }}
            >
              <thead>
                <tr style={{ backgroundColor: "#f4f4f4", textAlign: "left" }}>
                  <th style={th}>Name</th>
                  <th style={th}>Description</th>
                  <th style={th}>View</th>
                </tr>
              </thead>
              <tbody>
                {documents.map((doc, index) => (
                  <tr key={index}>
                    <td style={td}>{doc.name}</td>
                    <td style={td}>{doc.description}</td>
                    <td style={td}>
                      <a
                        href={doc.file.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          color: "#007BFF",
                          textDecoration: "underline",
                        }}
                      >
                        View
                      </a>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No documents available.</p>
          )}
        </div>

        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Interpretation
          </h3>
          <p>{notes !== "" ? notes : "No not available "}</p>
        </div>

        {/* Doctor Info */}
        <div style={{ marginTop: "50px", minWidth: "300px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Prescribing Doctor
          </h3>
          <p>
            <strong>Name:</strong> Dr. {doctor?.firstName} {doctor?.lastName}
          </p>
          <p>
            <strong>Specialty:</strong> {doctor?.specialty ?? "N/A"}
          </p>
        </div>
      </div>

      {/* Inline Styles for Reuse */}
    </>
  );
}

export default LabRequestReportModal;
