import { useState } from "react";
import Info from "../../Info";

const ConsentFormSection = ({ procedure }: { procedure: any }) => {
  const [showImage, setShowImage] = useState(false);

  if (!procedure?.consentForm) return null;

  const { consentForm } = procedure;

  return (
    <>
      <div className="flex flex-col lg:flex-row items-start md:items-center gap-4 bg-gray-50 p-4 rounded-lg border border-gray-200">
         <a
                    href={procedure?.consentForm?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src={procedure?.consentForm?.url}
                      alt="Consent Form"
                      className="rounded-xl shadow-md max-w-xs mt-2"
                    />
                  </a>
        <div className="flex-1">
          <Info label="File Name" value={consentForm.name || "—"} />
          <Info
            label="Uploaded At"
            value={
              consentForm.uploadedAt
                ? new Date(consentForm.uploadedAt).toLocaleString()
                : "—"
            }
          />
        
        </div>
      </div>

      {/* Image Modal */}
      {showImage && (
        <div
          className="fixed inset-0 bg-black/40 flex items-center justify-center z-50"
          onClick={() => setShowImage(false)}
        >
          <div className="relative max-w-3xl max-h-[90vh]">
            <img
              src={consentForm.url}
              alt={consentForm.name}
              className="rounded-lg max-h-[90vh] object-contain"
            />
            <button
              onClick={() => setShowImage(false)}
              className="absolute top-3 right-3 text-white bg-black bg-opacity-50 rounded-full p-2 hover:bg-opacity-80 transition text-xs"
            >
              ✕
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ConsentFormSection;
