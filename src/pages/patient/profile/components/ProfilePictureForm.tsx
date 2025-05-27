import React, { useState, FormEvent, DragEvent, ChangeEvent } from "react";
import PatientApi from "../../../../api/patientApi";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";
import { IoIosCloudUpload } from "react-icons/io";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { updateUser } from "../../../../reducers/authSlice";
interface PersonalFormProps {
  userProfile: any;
}

const ProfilePictureForm: React.FC<PersonalFormProps> = ({ userProfile }) => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userProfile?.user?.profilePicture?.url || null
  );
  const dispatch = useAppDispatch()
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ message: "", type: "" });

  const handleFileSelect = (file: File) => {
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileSelect(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleFileSelect(e.target.files[0]);
    }
  };

const handleSubmit = async (e: FormEvent) => {
  e.preventDefault();
  if (!selectedFile) {
    setMessage({ message: "Please select a file first.", type: "error" });
    return;
  }

  const formData = new FormData();
  formData.append("file", selectedFile);

  try {
    setIsLoading(true);
    const response = await PatientApi.updateProfilePicture(formData);
    if (response?.data) {
    const data = response?.data;
    setMessage({
      message:
        response?.data?.message || "Profile picture updated successfully!",
      type: "success",
    });

      dispatch(updateUser({
        ...userProfile,
        user: { ...data}
      }));
    }

  } catch (error: any) {
    const { response } = error;
    console.log(error)
    setMessage({
      message: response?.data?.message || "Failed to update profile picture",
      type: "error",
    });
  } finally {
    setIsLoading(false);
  }
};

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {message.message && (
        <FeedbackMessage type={message.type} message={message.message} />
      )}

      <div className="text-center">
        {previewUrl ? (
          <img
            src={previewUrl}
            alt="Profile Preview"
            className="w-32 h-32 rounded-full object-cover mx-auto border"
          />
        ) : (
          ""
        )}
      </div>
      {previewUrl ? (
        <div className="text-center">
                  <button className="text-red-500 "
        onClick={()=>{
            setSelectedFile(null)
            setPreviewUrl(null)
        }}
        > Remove Image </button>
        </div>
      ) : (
        <div
          className={`bg-gray-50 text-gray-500 rounded-lg w-90 h-70 flex flex-col items-center justify-center text-center p-4 cursor-pointer text-sm border-2 mx-auto ${
            isDragging ? "border-green-500" : "border-dashed border-gray-300"
          }`}
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
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
            <div className="mb-2">
              <IoIosCloudUpload size={48} className="text-green-500" />
            </div>
            <p className="my-2 font-medium text-green-500">Upload Image</p>
            <p>Upload a profile image for your account.</p>
            <p>
              File Format <span className="text-black">jpeg, png</span> |
              Recommended Size <span className="text-black">600×600 (1:1)</span>
            </p>
          </label>
        </div>
      )}
      <div className="text-center">
        <button
          type="submit"
          disabled={isLoading || !selectedFile}
          className="bg-primary text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {isLoading ? "Updating..." : "Update Picture"}
        </button>
      </div>
    </form>
  );
};

export default ProfilePictureForm;
