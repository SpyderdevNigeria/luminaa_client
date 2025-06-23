import Modal from "./modal";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import website from "../../utils/website";
import { useToaster } from "../common/ToasterContext";
import { IPrescription } from "../../types/Interfaces";

// Props
type PrescriptionDownloadModalProps = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  prescriptions: IPrescription[];
};

const thStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  backgroundColor: "#f5f5f5",
  textAlign: "left" as const,
};

const tdStyle = {
  border: "1px solid #ccc",
  padding: "8px",
  verticalAlign: "top",
};

function PrescriptionDownloadModal({
  isModalOpen,
  setModalOpen,
  prescriptions,
}: PrescriptionDownloadModalProps) {
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
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = pdf.internal.pageSize.getHeight();

      const imgProps = pdf.getImageProperties(imgData);
      const imgHeight = (imgProps.height * pdfWidth) / imgProps.width;

      let heightLeft = imgHeight;
      let position = 0;

      pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
      heightLeft -= pdfHeight;

      while (heightLeft > 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, position, pdfWidth, imgHeight);
        heightLeft -= pdfHeight;
      }

      pdf.save("Prescriptions_Report.pdf");
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
        title="Prescription Report"
        hideCancel={false}
        style="!min-w-xl !md:mx-4 !md:mx-0"
        buttonText="Download"
        handleSubmit={handleDownloadPDF}
      >
        <main className=" flex flex-col gap-4 py-4">
          <div className="flex flex-col items-center justify-center h-[50px]">
            <p className="text-sm text-text-secondary">
              Click “Download” to export all prescriptions into a PDF document.
            </p>
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
          width: "1000px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h2 className="text-2xl text-primary">{website?.name}</h2>
          <img src={website?.logo} alt="" style={{ width: "300px", height: "80px" }} />
        </div>

        <h2 style={{ marginBottom: "20px", marginTop: "10px" }}>Prescription{prescriptions.length > 1 ? "s":''}</h2>

        {prescriptions.length > 0 ? (
          <>
            <table
              style={{
                width: "100%",
                borderCollapse: "collapse",
                fontSize: "14px",
                marginBottom: "40px",
              }}
            >
              <thead>
                <tr>
                  <th style={thStyle}>#</th>
                  <th style={thStyle}>Medication</th>
                  <th style={thStyle}>Dosage</th>
                  <th style={thStyle}>Frequency</th>
                  <th style={thStyle}>Duration</th>
                  <th style={thStyle}>Instructions</th>
                  <th style={thStyle}>Prescription Date</th>
                </tr>
              </thead>
              <tbody>
                {prescriptions.map((prescription, index) => (
                  <tr key={prescription.id}>
                    <td style={tdStyle}>{index + 1}</td>
                    <td style={tdStyle}>{prescription.medicationName || "N/A"}</td>
                    <td style={tdStyle}>{prescription.dosage}</td>
                    <td style={tdStyle}>{prescription.frequency}</td>
                    <td style={tdStyle}>{prescription.duration}</td>
                    <td style={tdStyle}>{prescription.instructions}</td>
                    <td style={tdStyle}>
                      {moment(prescription.createdAt).format("MMM D, YYYY h:mm A")}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Doctor Info - Only show the last prescribing doctor (assuming same for all) */}
            <div>
              <h4 style={{ marginBottom: "8px" }}>Prescribing Doctor</h4>
              <p style={{ fontWeight: "bold" }}>
                {`${prescriptions[prescriptions.length - 1]?.doctor?.firstName ?? ""} ${
                  prescriptions[prescriptions.length - 1]?.doctor?.lastName ?? ""
                }`}
              </p>
              <p>
                <strong>Specialty:</strong>{" "}
                {prescriptions[prescriptions.length - 1]?.doctor?.specialty ?? "N/A"}
              </p>
            </div>

            {/* Signature Area */}
            <div style={{ marginTop: "60px", textAlign: "right" }}>
              <p style={{ borderTop: "1px solid #000", display: "inline-block", paddingTop: "4px" }}>
                {`${prescriptions[prescriptions.length - 1]?.doctor?.firstName ?? ""} ${
                  prescriptions[prescriptions.length - 1]?.doctor?.lastName ?? ""
                }`}
              </p>
              <p style={{ fontSize: "12px" }}>Signature</p>
            </div>
          </>
        ) : (
          <p>No prescriptions available.</p>
        )}
      </div>
    </>
  );
}

export default PrescriptionDownloadModal;
