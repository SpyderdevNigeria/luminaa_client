import Modal from "./modal";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useToaster } from "../common/ToasterContext";
import SheetHeader from "../common/SheetHeader";
import { IResult } from "../../types/Interfaces";
import useAuth from "../../hooks/useAuth";
import { getAge } from "../../utils/dashboardUtils";

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

type DocumentFile = {
  url: string;
};

type LabDocument = {
  name: string;
  description: string;
  file: DocumentFile;
};

type LabRequestResultReportModalProps = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  results: {
    testName: string;
    createdAt: string;
    patient?: Person;
    doctor?: Person;
    notes?: string;
    statusHistory?: any[];
    resultList?: IResult[] | undefined | null;
    documents?: LabDocument[];
  };
};

function LabRequestResultReportModal({
  isModalOpen,
  setModalOpen,
  results,
}: LabRequestResultReportModalProps) {
  const {
    testName,
    createdAt,
    patient,
    doctor,
    notes,
    statusHistory,
    resultList = [],
  } = results;
  const { userProfile } = useAuth();
  const printRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToaster();

  // Get lab personnel from status history

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

  const labPersonnel =
    statusHistory && statusHistory.length > 0
      ? [...(statusHistory ?? [])]
          .reverse()
          .find((entry) => entry.status !== "PENDING")?.updatedBy ?? null
      : null;

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

        {/* Patient Info */}
        <div
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "10px",
            marginBottom: "20px",
          }}
        >
          <h3
            style={{ width: "100%", fontWeight: "bold", marginBottom: "10px" }}
          >
            Patient Information
          </h3>

          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Name:</strong>{" "}
              {`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Email:</strong> {patient?.email ?? "N/A"}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Address:</strong> {userProfile?.address ?? "N/A"}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>City:</strong> {userProfile?.city ?? "N/A"}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Country:</strong> {userProfile?.country ?? "N/A"}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Age:</strong>{" "}
              {getAge(userProfile?.dateOfBirth) ?? "N/A"}
            </p>
          </div>
          <div style={{ flex: "1 1 300px" }}>
            <p>
              <strong>Gender:</strong> {userProfile?.gender ?? "N/A"}
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

        {/* Interpretation */}
        <div style={{ marginTop: "30px" }}>
          <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
            Interpretation
          </h3>
          <p>{notes ? notes : "No notes available"}</p>
        </div>

        {/* Doctor Info */}
        {doctor && labPersonnel ? (
          <div style={{ display: "flex", gap: "20px", justifyContent: "space-between", marginTop: "50px" }}>
            <div style={{ minWidth: "300px" }}>
              <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                Attending Doctor
              </h3>
              <p>
                <strong>Name:</strong> Dr. {doctor?.firstName}{" "}
                {doctor?.lastName}
              </p>
              <p>
                <strong>Specialty:</strong> {doctor?.specialty ?? "N/A"}
              </p>
            </div>

            {labPersonnel && (
              <div style={{ minWidth: "300px" }}>
                <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  Laboratory Personnel
                </h3>
                <p>
                  <strong>Performed by:</strong> {labPersonnel}
                </p>
              </div>
            )}
          </div>
        ) : (
          <div>
            {doctor && (
              <div style={{ minWidth: "300px" }}>
                <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  Attending Doctor
                </h3>
                <p>
                  <strong>Name:</strong> Dr. {doctor?.firstName}{" "}
                  {doctor?.lastName}
                </p>
                <p>
                  <strong>Specialty:</strong> {doctor?.specialty ?? "N/A"}
                </p>
              </div>
            )}

            {labPersonnel && (
              <div style={{ minWidth: "300px" }}>
                <h3 style={{ marginBottom: "10px", fontWeight: "bold" }}>
                  Laboratory Personnel
                </h3>
                <p>
                  <strong>Performed by:</strong> {labPersonnel}
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default LabRequestResultReportModal;
