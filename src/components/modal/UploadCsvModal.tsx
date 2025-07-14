// components/common/UploadCsvModal.tsx
import { useState } from "react";
import Modal from "./modal";
import { useToaster } from "../common/ToasterContext";
import FileDropzone from "../common/FileDropzone";

interface UploadCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  loadingUpload?: boolean;
}

export default function UploadCsvModal({loadingUpload, isOpen, onClose, onUpload }: UploadCsvModalProps) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { showToast } = useToaster();

  const handleSubmit = () => {
    if (!csvFile) {
      showToast("Please select a valid CSV file.", "error");
      return;
    }

    onUpload(csvFile);
    setCsvFile(null);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} hideCancel={false} handleSubmit={handleSubmit} buttonText="Upload CSV" loading={loadingUpload} title="Upload CSV File">
      <div className="space-y-4 mb-4">
        <FileDropzone
          label="Upload"
          file={csvFile}
          onDrop={(file) => {
            if (file && file.name.toLowerCase().endsWith(".csv")) {
              setCsvFile(file);
            } else {
              showToast("Only CSV files are allowed.", "error");
              setCsvFile(null);
            }
          }}
          accept=".csv"
          allowedExtensions={[".csv"]}
        />
      </div>
    </Modal>
  );
}
