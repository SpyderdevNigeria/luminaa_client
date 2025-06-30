import Modal from "./modal";
import StatusBadge from "../common/StatusBadge";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import { useToaster } from "../common/ToasterContext";
import SheetHeader from "../common/SheetHeader";
import { IResult } from "../../types/Interfaces";
import useAuth from "../../hooks/useAuth";



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
    statusHistory?: any[];
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
     statusHistory,
  } = results;

  const printRef = useRef<HTMLDivElement>(null);
  const { showToast } = useToaster();
 const { userProfile, } = useAuth();
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
    style={{
      marginBottom: "40px",
      marginTop: "10px",
      fontSize: "20px",
      textAlign: "center",
      color: "#0F62FE",
      textDecoration: "underline",
    }}
  >
    Lab Test Order
  </h2>

  {/* Patient Info */}
  <div
    style={{
      display: "block",
      justifyContent: "space-between",
      flexWrap: "wrap",
      rowGap: "20px",
      columnGap: "2rem",
      marginBottom: "40px",
    }}
  >
<div
  style={{
    display: "flex",
    flexWrap: "wrap",
    gap: "10px",
    marginBottom: "20px",
  }}
>
  <h3 style={{ width: "100%", fontWeight: "bold", marginBottom: "10px" }}>
    Patient Information
  </h3>

  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Name:</strong> {`${patient?.firstName ?? ""} ${patient?.lastName ?? ""}`}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Email:</strong> {patient?.email ?? "N/A"}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Address:</strong> {userProfile?.address ?? "N/A"}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>City:</strong> {userProfile?.city ?? "N/A"}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Country:</strong> {userProfile?.country ?? "N/A"}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Date of Birth:</strong> {userProfile?.dateOfBirth ?? "N/A"}</p>
  </div>
  <div style={{ flex: "1 1 300px" }}>
    <p><strong>Gender:</strong> {userProfile?.gender ?? "N/A"}</p>
  </div>
</div>



    <div style={{ flex: "1 1 200px" }}>
      <p><strong>Test Name:</strong><br /> {testName}</p>
      <p><strong>Status:</strong><br /> {status}</p>
      <p><strong>Priority:</strong><br /> {priority}</p>
      <p><strong>Sample Collected:</strong><br /> {collectedSample ? "Yes" : "No"}</p>
      <p><strong>Requested On:</strong><br /> {moment(createdAt).format("MMMM D, YYYY h:mm A")}</p>
    </div>
  </div>

  {/* Doctor Info */}
        {doctor && labPersonnel ? (
          <div style={{ display: "flex",  justifyContent: "space-between", gap: "20px", marginTop: "50px" }}>
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

export default LabRequestReportModal;
