import { useState } from "react";
import { FiTrash2, FiUpload, FiX } from "react-icons/fi";
import { FaFileAlt } from "react-icons/fa";
import Modal from "../modal/modal";
import labApi from "../../api/labApi";
import ConfirmModal from "../modal/ConfirmModal";

const LabOrderDocuments = ({
  resultId,
  documents,
  refreshDocuments,
  type,
}: {
  resultId?: string;
  documents: {
    id: string;
    name: string;
    description: string;
    file: { url: string };
    url: string;
  }[];
  refreshDocuments?: () => void;
  type?: string;
}) => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [newDocs, setNewDocs] = useState<
    { name: string; file: File | null; description: string }[]
  >([{ name: "", file: null, description: "" }]);
  const [uploading, setUploading] = useState(false);
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [confirmMessage, setConfirmMessage] = useState("");
  const [confrimLoading, setConfrimLoading] = useState(false);
  const [documentDelete, setDocumentDelete] = useState<{ name: string; id: string } | null>(null);
  const handleAddField = () => {
    setNewDocs([...newDocs, { name: "", file: null, description: "" }]);
  };

  const handleRemoveField = (index: number) => {
    const updated = [...newDocs];
    updated.splice(index, 1);
    setNewDocs(updated);
  };

  const handleFieldChange = (
    index: number,
    field: "name" | "file" | "description",
    value: any
  ) => {
    const updated = [...newDocs];
    updated[index][field] = value;
    setNewDocs(updated);
  };

  const handleSubmitDocuments = async () => {
    if (!resultId) return;

    setUploading(true);
    try {
      for (const doc of newDocs) {
        if (doc.name && doc.file && doc.description) {
          const body = new FormData();
          body.append("name", doc.name);
          body.append("files", doc.file);
          body.append("description", doc.description);
          console.log(resultId, body);
          await labApi.createLabOrderDocuments(resultId, body);
        }
      }
      console.log(resultId);
      if (refreshDocuments) {
        refreshDocuments();
      }
      //   setModalOpen(false);
      setNewDocs([{ name: "", file: null, description: "" }]);
    } catch (error) {
      console.error("Upload failed", error);
    } finally {
      setUploading(false);
    }
  };

  const handleDelete = (doc:any) => {
   setConfirmMessage(`Are you sure you want to delete this document? ${doc?.name}`);
   setDocumentDelete(doc)
    setConfirmOpen(true);
  };

  const onConfirm = async () => {
    setConfrimLoading(true);
    try {
      if (resultId && documentDelete?.id) {
        await labApi.deleteLabOrderDocumentById(resultId, documentDelete.id);
      }
      if (refreshDocuments) {
        refreshDocuments();
      }
    } catch (err) {
      console.error("Delete failed", err);
    }
    setConfirmOpen(false);
  };
  console.log(documents);
  return (
    <div className="mt-6">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-lg font-semibold">Attached Documents</h3>
        {type === "lab" && (
          <button
            onClick={() => setModalOpen(true)}
            className="flex items-center gap-2 bg-primary text-white text-sm py-1.5 px-3 rounded-md hover:bg-primary/90"
          >
            <FiUpload /> Add Document
          </button>
        )}
      </div>

      {documents?.length > 0 ? (
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {documents.map((doc) => (
            <li
              key={doc.id}
              className="bg-white   rounded-lg p-4 shadow-sm flex items-start justify-between gap-4"
            >
              <div className="flex gap-3 items-start">
                <FaFileAlt className="text-gray-500 text-xl mt-1" />
                <div>
                  <h4 className="font-medium text-gray-900">{doc.name}</h4>
                  <p className="text-sm text-gray-600 line-clamp-2">
                    {doc.description}
                  </p>
                  <a
                    href={doc?.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-sm text-primary mt-1 inline-block"
                  >
                    View File
                  </a>
                </div>
              </div>
              {type === "lab" && (
                <button
                  onClick={() => handleDelete(doc)}
                  className="text-red-600 hover:text-red-800"
                >
                  <FiTrash2 />
                </button>
              )}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-sm text-gray-500">No documents added.</p>
      )}
      <ConfirmModal
        open={confirmOpen}
        description={confirmMessage}
        onConfirm={onConfirm}
        onClose={() => setConfirmOpen(false)}
        loading={confrimLoading}
      />

      <Modal
        open={isModalOpen}
        onClose={() => setModalOpen(false)}
        loading={uploading}
        title="Add Lab Result Documents"
        hideCancel={false}
        style="md:min-w-6xl !md:mx-4 !md:mx-0"
        buttonText={uploading ? "Uploading..." : "Upload"}
        handleSubmit={handleSubmitDocuments}
      >
        <div>
          <div className="relative grid grid-cols-1 md:grid-cols-3 gap-4  p-4 rounded-lg  max-h-[500px] overflow-y-scroll">
            {newDocs.map((doc, idx) => (
              <div
                key={idx}
                className="relative grid grid-cols-1 md:grid-cols-1 gap-4 bg-gray-50 p-4 rounded-lg"
              >
                <input
                  type="text"
                  placeholder="Document Name"
                  className="p-2 rounded-md bg-white  shadow-sm"
                  value={doc.name}
                  onChange={(e) =>
                    handleFieldChange(idx, "name", e.target.value)
                  }
                />
                <label className="flex items-center justify-center p-4 bg-white  rounded-md shadow-sm border-2 border-dashed border-gray-300 cursor-pointer text-sm text-gray-600 hover:bg-gray-50">
                  <input
                    type="file"
                    onChange={(e) =>
                      handleFieldChange(
                        idx,
                        "file",
                        e.target.files?.[0] || null
                      )
                    }
                    className="hidden"
                  />
                  {doc.file ? doc.file.name : "Drag or select file"}
                </label>
                <textarea
                  placeholder="Description"
                  className="p-2 rounded-md bg-white  shadow-sm"
                  value={doc.description}
                  rows={7}
                  onChange={(e) =>
                    handleFieldChange(idx, "description", e.target.value)
                  }
                />
                <button
                  type="button"
                  onClick={() => handleRemoveField(idx)}
                  className="absolute top-2 right-2 text-gray-400 hover:text-red-500"
                  title="Remove"
                >
                  <FiX />
                </button>
              </div>
            ))}
          </div>
          <button
            type="button"
            onClick={handleAddField}
            className="text-sm text-primary hover:underline"
          >
            + Add another document
          </button>
        </div>
      </Modal>
    </div>
  );
};

export default LabOrderDocuments;
