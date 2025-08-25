import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiX } from "react-icons/fi";

interface FileDropzoneProps {
  label: string;
  onDrop: (file: File | null) => void;
  file: File | null;
  accept: undefined | string | string[]; 
  allowedExtensions?: string[]; 
}

const FileDropzone: React.FC<FileDropzoneProps> = ({
  label,
  onDrop,
  file,
  accept,
  allowedExtensions = [],
}) => {
  const [error, setError] = useState("");

  // Convert accept prop to the format expected by react-dropzone
  const parseAccept = (accept: string | string[] | undefined) => {
    if (!accept) return undefined;
    if (typeof accept === "string") {
      return accept.split(",").reduce<Record<string, string[]>>((acc, type) => {
        const trimmed = type.trim();
        if (trimmed) acc[trimmed] = [];
        return acc;
      }, {});
    }
    if (Array.isArray(accept)) {
      return accept.reduce<Record<string, string[]>>((acc, type) => {
        const trimmed = type.trim();
        if (trimmed) acc[trimmed] = [];
        return acc;
      }, {});
    }
    return undefined;
  };

  const { getRootProps, getInputProps } = useDropzone({
    accept: parseAccept(accept),
    multiple: false,
    onDrop: (acceptedFiles) => {
      const selectedFile = acceptedFiles[0];

      if (!selectedFile) return;

      if (
        allowedExtensions.length > 0 &&
        !allowedExtensions.some((ext) =>
          selectedFile.name.toLowerCase().endsWith(ext.toLowerCase())
        )
      ) {
        setError(`Only files of type: ${allowedExtensions.join(", ")} are allowed.`);
        onDrop(null);
        return;
      }

      setError("");
      onDrop(selectedFile);
    },
  });

  return (
    <div className="space-y-2">
      <label className="form-label">{label}</label>
      <div
        {...getRootProps()}
        className="relative border border-dashed border-gray-400 rounded-md p-4 min-h-[150px] text-center flex justify-center items-center cursor-pointer bg-gray-50 hover:bg-gray-100 transition overflow-hidden"
      >
        <input {...getInputProps()} />
        {file ? (
          <div className="relative w-full h-full">
            {file.type.startsWith("image/") ? (
              <img
                src={URL.createObjectURL(file)}
                alt="Preview"
                className="w-full h-full object-cover rounded-md"
              />
            ) : (
              <p className="text-sm text-gray-700">{file.name}</p>
            )}
            <button
              type="button"
              className="absolute top-2 right-2 bg-white  rounded-full p-1 shadow hover:bg-red-500 hover:text-white transition"
              onClick={(e) => {
                e.stopPropagation();
                onDrop(null);
              }}
            >
              <FiX size={16} />
            </button>
          </div>
        ) : (
          <p className="text-sm text-gray-500">Drag & drop or click to upload</p>
        )}
      </div>

      {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
    </div>
  );
};

export default FileDropzone;
