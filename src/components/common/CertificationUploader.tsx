import React, { useState, DragEvent, ChangeEvent } from "react";
import { IoIosCloudUpload } from "react-icons/io";
import { FaFilePdf, FaEye, FaUpload, FaTrash } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { useToaster } from "./ToasterContext";
import ConfirmModal from "../modal/ConfirmModal";

interface CertificationFile {
  key: string;
  label: string;
  file: File | null;
  previewUrl: string | null;

}

interface CertificateConfig {
  key: string;
  label: string;
}

interface Props {
  handleClose: () => void;
  userProfile: any;
  certificateFields: CertificateConfig[];
  uploadFn: (formData: FormData) => Promise<any>;
  onUploadSuccess?: (data: any) => void;
}

const CertificationUploader: React.FC<Props> = ({
  handleClose,
  userProfile,
  certificateFields,
  uploadFn,
  onUploadSuccess,
}) => {
  const { showToast } = useToaster();
  const [certifications, setCertifications] = useState<Record<string, CertificationFile>>(
    certificateFields.reduce((acc, { key, label }) => {
      const existingFile = userProfile?.[key];
      acc[key] = {
        key,
        label,
        file: null,
        previewUrl: existingFile?.url || null,
      };
      return acc;
    }, {} as Record<string, CertificationFile>)
  );

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedKey, setSelectedKey] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileSelect = (key: string, file: File) => {
    setCertifications((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        file,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : file.name,
      },
    }));
  };

  const handleDrop = (key: string, e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) handleFileSelect(key, file);
  };

  const handleChange = (key: string, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFileSelect(key, file);
  };

  const handleRemove = (key: string) => {
    setCertifications((prev) => ({
      ...prev,
      [key]: { ...prev[key], file: null, previewUrl: null },
    }));
  };

  const triggerUploadConfirm = (key: string) => {
    setSelectedKey(key);
    setConfirmOpen(true);
  };

  const handleConfirmUpload = async () => {
    if (!selectedKey) return;
    const cert = certifications[selectedKey];
    if (!cert?.file) return;

    setLoading(true);
    try {
      const formData = new FormData();
      formData.append("type", selectedKey);
      formData.append("file", cert.file);
      const response = await uploadFn(formData);

      onUploadSuccess?.(response.data);
      showToast(`${cert.label} uploaded successfully`, "success");
    } catch (err) {
      console.error(err);
      showToast(`Upload failed for ${cert.label}`, "error");
    } finally {
      setLoading(false);
      setConfirmOpen(false);
      setSelectedKey(null);
    }
  };

  const getFileIcon = (file: File | null, previewUrl: string | null) => {
    const isPdf = file?.type.includes("pdf") || (previewUrl && previewUrl.endsWith(".pdf"));
    const isImage = file?.type.startsWith("image/") || (previewUrl && previewUrl.startsWith("http"));

    if (isImage && previewUrl) {
      return (
        <img
          src={previewUrl}
          alt="Preview"
          className="w-[150px] h-[150px] object-cover rounded border border-gray-300"
        />
      );
    }

    if (isPdf) return <FaFilePdf className="text-red-500 text-3xl" />;
    return <span className="text-gray-500 text-xl">📄</span>;
  };

  return (
    <>
      <div className="bg-white rounded-lg border border-dashboard-gray max-w-6xl mx-auto">
        <div className="flex items-center justify-between p-4 border-b border-dashboard-gray">
          <h3 className="text-xl font-semibold">Upload Certifications</h3>
          <IoClose className="text-2xl text-dashboard-gray cursor-pointer" onClick={handleClose} />
        </div>

        <section className="p-4 space-y-6">
          {Object.values(certifications).map(({ key, label, file, previewUrl }) => (
            <div key={key} className="space-y-2">
              <p className="text-base font-medium">{label}</p>

              {file || previewUrl ? (
                <div className="bg-gray-50 p-3 rounded-md border border-gray-300 space-y-4">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex items-center gap-3">{getFileIcon(file, previewUrl)}</div>
                    <div className="flex flex-wrap items-center gap-2">
                      {previewUrl && (
                        <a
                          href={previewUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-primary flex items-center gap-1 px-4 py-1 rounded hover:underline"
                        >
                          <FaEye className="text-sm" /> View
                        </a>
                      )}

                      {file && (
                        <button
                          onClick={() => triggerUploadConfirm(key)}
                          className="text-primary flex items-center gap-1 px-4 py-1 rounded hover:underline"
                        >
                          <FaUpload className="text-sm" /> Upload
                        </button>
                      )}

                      <button
                        onClick={() => handleRemove(key)}
                        className="text-red-500 flex items-center gap-1 px-4 py-1 rounded hover:underline"
                      >
                        <FaTrash className="text-sm" /> Remove
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <div
                  className="bg-gray-50 text-gray-500 rounded-md w-full h-40 flex flex-col items-center justify-center text-center p-4 cursor-pointer text-sm border-dashed border-2 border-gray-300"
                  onDrop={(e) => handleDrop(key, e)}
                  onDragOver={(e) => e.preventDefault()}
                >
                  <input
                    type="file"
                    onChange={(e) => handleChange(key, e)}
                    accept=".pdf,.doc,.docx,.png,.jpg,.jpeg"
                    className="hidden"
                    id={`fileInput-${key}`}
                  />
                  <label
                    htmlFor={`fileInput-${key}`}
                    className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
                  >
                    <IoIosCloudUpload size={40} className="text-green-500 mb-2" />
                    <p className="font-medium text-green-600">Click or Drag to Upload</p>
                    <p>Accepted formats: PDF, JPG, PNG, DOC</p>
                  </label>
                </div>
              )}
            </div>
          ))}
        </section>
      </div>

      <ConfirmModal
        open={confirmOpen}
        onClose={() => {
          setConfirmOpen(false);
          setSelectedKey(null);
        }}
        title="Confirm Upload"
        description={`Are you sure you want to upload this document?`}
        confirmText="Yes, Upload"
        loading={loading}
        onConfirm={handleConfirmUpload}
      />
    </>
  );
};

export default CertificationUploader;
