// components/common/UploadCsvModal.tsx
import { useState } from "react";
import Modal from "./modal";
import { useToaster } from "../common/ToasterContext";
import FileDropzone from "../common/FileDropzone";

interface UploadCsvModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
}

export default function UploadCsvModal({ isOpen, onClose, onUpload }: UploadCsvModalProps) {
  const [csvFile, setCsvFile] = useState<File | null>(null);
  const { showToast } = useToaster();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!csvFile) {
      showToast("Please select a valid CSV file.", "error");
      return;
    }

    onUpload(csvFile);
    setCsvFile(null);
    onClose();
  };

  return (
    <Modal open={isOpen} onClose={onClose} hideCancel={true} title="Upload CSV File">
      <form onSubmit={handleSubmit} className="space-y-4">
        <FileDropzone
          label="Upload CSV"
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
        <div className="flex justify-end gap-2">
          <button type="button" onClick={onClose} className="text-primary cursor-pointer py-2 px-4 bg-white rounded-md text-sm">
            Cancel
          </button>
          <button type="submit" className="text-white cursor-pointer py-2 px-4 bg-primary rounded-md text-sm">
            Upload CSV
          </button>
        </div>
      </form>
    </Modal>
  );
}
