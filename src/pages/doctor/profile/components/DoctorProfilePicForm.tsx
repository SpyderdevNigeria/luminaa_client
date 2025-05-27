import { useState, FormEvent } from "react";
import PatientApi from "../../../../api/patientApi";
import ProfilePictureForm from "../../../../components/common/ProfilePictureForm";
import { useAppDispatch } from "../../../../hooks/reduxHooks";
import { updateUser } from "../../../../reducers/authSlice";
import FeedbackMessage from "../../../../components/common/FeedbackMessage";

interface PersonalFormProps {
  userProfile: any;
}

function DoctorProfilePicForm({ userProfile }: PersonalFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    userProfile?.user?.profilePicture?.url || null
  );
  const [message, setMessage] = useState({ message: "", type: "" });
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useAppDispatch();

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
      const data = response?.data;

      if (data) {
        setMessage({
          message: data.message || "Profile picture updated successfully!",
          type: "success",
        });
        setPreviewUrl(data?.profilePicture?.url);
        setSelectedFile(null);
      dispatch(updateUser({ ...userProfile, user: { ...data} }));
      }
    } catch (error: any) {
      const { response } = error;
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

      <ProfilePictureForm
        previewUrl={previewUrl}
        setPreviewUrl={setPreviewUrl}
        selectedFile={selectedFile}
        setSelectedFile={setSelectedFile}
      />

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
}

export default DoctorProfilePicForm;
