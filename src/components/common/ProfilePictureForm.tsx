import React, {
  DragEvent,
  ChangeEvent,
  Dispatch,
  SetStateAction,
} from "react";
import { IoIosCloudUpload } from "react-icons/io";

interface ProfilePictureFormProps {
  previewUrl: string | null;
  setPreviewUrl: Dispatch<SetStateAction<string | null>>;
  selectedFile: File | null;
  setSelectedFile: Dispatch<SetStateAction<File | null>>;
}

const ProfilePictureForm: React.FC<ProfilePictureFormProps> = ({
  previewUrl,
  setPreviewUrl,
  setSelectedFile,
}) => {
  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

  return (
    <>
      <div className="text-center">
        {previewUrl ? (
          <>
            <img
              src={previewUrl}
              alt="Profile Preview"
              className="w-32 h-32 rounded-full object-cover mx-auto border"
            />
            <button
              type="button"
              className="text-red-500 mt-2"
              onClick={() => {
                setSelectedFile(null);
                setPreviewUrl(null);
              }}
            >
              Remove Image
            </button>
          </>
        ) : (
          <div
            className="bg-gray-50 text-gray-500 rounded-lg w-90 h-70 flex flex-col items-center justify-center text-center p-4 cursor-pointer text-sm border-dashed border-2 border-gray-300 mx-auto"
            onDrop={handleDrop}
            onDragOver={(e) => e.preventDefault()}
          >
            <input
              type="file"
              accept="image/*"
              onChange={handleChange}
              className="hidden"
              id="fileInput"
            />
            <label
              htmlFor="fileInput"
              className="w-full h-full flex flex-col items-center justify-center cursor-pointer"
            >
              <IoIosCloudUpload size={48} className="text-green-500 mb-2" />
              <p className="font-medium text-green-500">Upload Image</p>
              <p>Upload a profile image for your account.</p>
              <p>
                File Format <span className="text-black">jpeg, png</span> |
                Recommended Size{" "}
                <span className="text-black">600×600 (1:1)</span>
              </p>
            </label>
          </div>
        )}
      </div>
    </>
  );
};

export default ProfilePictureForm;
