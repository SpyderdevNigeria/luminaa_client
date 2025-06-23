import Modal from "./modal";
import moment from "moment";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { useRef } from "react";
import website from "../../utils/website";
import { useToaster } from "../common/ToasterContext";
import { IPrescription, } from "../../types/Interfaces";

// Props
type PrescriptionDownloadModalProps = {
  isModalOpen: boolean;
  setModalOpen: (open: boolean) => void;
  prescriptions: IPrescription[];
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
          width: "800px",
          fontFamily: "Arial, sans-serif",
          color: "#111",
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>Prescription Report</h2>

        {prescriptions.length > 0 ? (
          prescriptions.map((prescription, index) => (
            <div
              key={prescription.id}
              style={{
                marginBottom: "30px",
                borderBottom: "1px solid #ccc",
                paddingBottom: "20px",
              }}
            >
              <h3>Prescription {index + 1}</h3>
              <p><strong>Hospital:</strong> {website?.name}</p>
              <p><strong>Medication Name:</strong> {prescription.medicationName || "N/A"}</p>
              <p><strong>Dosage:</strong> {prescription.dosage}</p>
              <p><strong>Frequency:</strong> {prescription.frequency}</p>
              <p><strong>Duration:</strong> {prescription.duration}</p>
              <p><strong>Instructions:</strong> {prescription.instructions}</p>
              <p><strong>Refillable:</strong> {prescription.isRefillable ? "Yes" : "No"}</p>
              <p><strong>Status:</strong> {prescription.status}</p>
              <p><strong>Created At:</strong> {moment(prescription.createdAt).format("MMMM D, YYYY h:mm A")}</p>

              <h4 style={{ marginTop: "10px" }}>Doctor Information</h4>
              <p><strong>Name:</strong> {`${prescription?.doctor?.firstName ?? ""} ${prescription.doctor?.lastName ?? ""}`}</p>
              <p><strong>Specialty:</strong> {prescription?.doctor?.specialty ?? "N/A"}</p>

              <h4 style={{ marginTop: "10px" }}>Appointment Information</h4>
              <p><strong>Scheduled Date:</strong> {moment(prescription?.appointment?.scheduledDate).format("MMMM D, YYYY h:mm A")}</p>
              <p><strong>Status:</strong> {prescription?.appointment?.status}</p>
            </div>
          ))
        ) : (
          <p>No prescriptions available.</p>
        )}
      </div>
    </>
  );
}

export default PrescriptionDownloadModal;
