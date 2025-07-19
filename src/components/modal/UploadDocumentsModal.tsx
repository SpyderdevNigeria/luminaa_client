import { useRef, useState } from "react";
import Modal from "./modal";
import { useToaster } from "../common/ToasterContext";
import { IoIosClose } from "react-icons/io";

interface UploadDocumentsModalProps {
  isOpen: boolean;
  onClose: () => void;
  onUpload: (formData: FormData) => void;
  loadingUpload?: boolean;
}

const UploadDocumentsModal = ({
  isOpen,
  onClose,
  onUpload,
  loadingUpload,
}: UploadDocumentsModalProps) => {
  const { showToast } = useToaster();
  const [files, setFiles] = useState<File[]>([]);
  const [name, setName] = useState("");
  const [type, setType] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const selectedFiles = Array.from(e.target.files);
      setFiles((prev) => [...prev, ...selectedFiles]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = () => {
    if (!name || !type || files.length === 0) {
      showToast("Please provide name, type and upload at least one file.", "error");
      return;
    }

    const formData = new FormData();
    formData.append("name", name);
    formData.append("type", type);
    formData.append("metadata", JSON.stringify({ uploadedBy: "user" }));
    files.forEach((file) => formData.append("files", file));

    onUpload(formData);
    setFiles([]);
    setName("");
    setType("");
  };
  
  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      hideCancel={false}
      handleSubmit={handleSubmit}
      buttonText={loadingUpload ? "Uploading..." : "Upload"}
      loading={loadingUpload}
      title="Upload Appointment Documents"
    >
      <div className="space-y-4 mb-4">
        <div>
          <label className="text-sm font-medium">Document Name</label>
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="form-input w-full px-3 py-2 mt-1 text-sm"
            placeholder="Enter document name"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Document Type</label>
          <input
            value={type}
            onChange={(e) => setType(e.target.value)}
            className="form-input w-full px-3 py-2 mt-1 text-sm"
            placeholder="e.g. Lab Report, Prescription"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Upload Files</label>
          <div className="flex items-center gap-4 mt-1">
            <input
              type="file"
              ref={fileInputRef}
              multiple
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="text-xs text-white bg-primary px-4 py-2 rounded"
            >
              Upload Document
            </button>
          </div>

          {files.length > 0 && (
            <ul className="mt-3 space-y-2 text-sm">
              {files.map((file, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-gray-50 px-3 py-2 border rounded"
                >
                  <span className="truncate">{file.name}</span>
                  <button
                    type="button"
                    onClick={() => handleRemoveFile(index)}
                    className="text-red-500 hover:text-red-700"
                  >
                   <IoIosClose />
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </Modal>
  );
};

export default UploadDocumentsModal;
