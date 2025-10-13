import { useEffect, useState } from "react";
import ConsentFormSection from "../tab/ConsentFormSection";

const ActionConsent = ({
  setConsentFiles,
  noteForConsent,
  setNoteForConsent,
  handleConsentUpload,
  loading,
  procedure,
}: any) => {
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (!procedure?.consentForm) {
      setEdit(true);
    } else {
      setEdit(false);
    }
  }, [procedure?.consentForm]);

  return (
    <div className="flex flex-col gap-2">
      {procedure?.consentForm && !edit && (
        <div >
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-sm font-medium text-gray-700">Consent Form</h1>
                 <button
            onClick={() => setEdit(true)}
            className="text-primary hover:underline"
          >
            Edit
          </button>
          </div>
            <ConsentFormSection procedure={procedure} />
     
        </div>
      )}

      {edit && (
        <div className="flex flex-col gap-2">
          <label className="text-sm text-gray-600">Upload Consent Form</label>
          <input
            type="file"
            multiple
            onChange={(e) => setConsentFiles(e.target.files)}
            className="w-full form-input rounded p-2 mt-1"
          />
          <textarea
            placeholder="Add note (optional)"
            className="w-full form-input rounded p-2 mt-2"
            value={noteForConsent}
            onChange={(e) => setNoteForConsent(e.target.value)}
          />
          <button
            onClick={handleConsentUpload}
            className="mt-3 px-4 py-2 bg-primary text-white rounded w-full"
            disabled={loading}
          >
            {loading ? "Uploading..." : "Upload Consent"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ActionConsent;
