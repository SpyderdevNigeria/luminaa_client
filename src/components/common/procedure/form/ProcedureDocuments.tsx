import { useState } from "react";
import { useToaster } from "../../ToasterContext";
import AdminApi from "../../../../api/adminApi";
import ConfirmModal from "../../../modal/ConfirmModal";
interface ProcedureDocumentsProps {
    procedure: any;
    procedureId: string;
    fetchProcedure?: () => void;
}

const ProcedureDocuments = ({ procedure, procedureId, fetchProcedure }: ProcedureDocumentsProps) => {
    const { showToast } = useToaster();

    const [name, setName] = useState("");
    const [type, setType] = useState("");
    const [file, setFile] = useState<File | null>(null);
    const [loading, setLoading] = useState(false);

    // State for confirm delete modal
    const [confirmOpen, setConfirmOpen] = useState(false);
    const [confirmLoading, setConfirmLoading] = useState(false);
    const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
    const [confirmMessage, setConfirmMessage] = useState("");

    const handleUpload = async () => {
        if (!name  || !file) {
            showToast("Name,  and file are required", "error");
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append("name", name);
            formData.append("type", type);
            formData.append("files", file);

            await AdminApi.uploadProcedureDocument(procedureId, formData);
            showToast("Document uploaded successfully", "success");

            setName("");
            setType("");
            setFile(null);
            fetchProcedure?.();
        } catch (error) {
            console.error("Upload failed:", error);
            showToast("Failed to upload document", "error");
        } finally {
            setLoading(false);
        }
    };

    const confirmDelete = (documentId: string) => {
        setSelectedDocumentId(documentId);
        setConfirmMessage("Are you sure you want to delete this document?");
        setConfirmOpen(true);
    };

    const onConfirmDelete = async () => {
        if (!selectedDocumentId) return;
        setConfirmLoading(true);
        try {
            await AdminApi.deleteProcedureDocument(procedureId, selectedDocumentId);
            showToast("Document deleted successfully", "success");
            fetchProcedure?.();
        } catch (error) {
            console.error("Delete error:", error);
            showToast("Failed to delete document", "error");
        } finally {
            setConfirmOpen(false);
            setConfirmLoading(false);
            setSelectedDocumentId(null);
        }
    };

    return (
        <div className="flex flex-col gap-3">
            <h2 className="text-sm font-medium text-gray-700">Upload New Document</h2>

            <input
                className="form-input border p-2"
                placeholder="Document Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
            />
            <input
                className="form-input border p-2"
                placeholder="Document Type"
                value={type}
                onChange={(e) => setType(e.target.value)}
            />
            <input
                type="file"
                className="form-input border p-2"
                onChange={(e) => setFile(e.target.files?.[0] || null)}
            />

            <button
                onClick={handleUpload}
                className="bg-primary text-white px-4 py-2 rounded"
                disabled={loading}
            >
                {loading ? "Uploading..." : "Upload Document"}
            </button>

            {procedure?.
                procedureDocuments
                ?.length > 0 && (
                    <div className="mt-4">
                        <h3 className="text-sm font-semibold text-gray-700 mb-2">Documents</h3>
                        <ul className="space-y-2">
                            {procedure.
                                procedureDocuments
                                .map((doc: any) => (
                                    <li key={doc.id} className="flex justify-between items-center bg-gray-50 p-3 rounded">
                                        <div className="flex flex-col md:flex-row items-center gap-2 ">
                                            <div>
                                                <img src={doc.url} alt="" className="w-12 h-12 " />
                                            </div>
                                            <div>
                                                <p className="font-medium text-sm">{doc.name}</p>
                                            <p className="text-xs text-gray-500">{doc.type}</p>
                                            </div>
                                        </div>
                                        <button
                                            onClick={() => confirmDelete(doc.id)}
                                            className="text-red-500 hover:underline text-sm"
                                        >
                                            Delete
                                        </button>
                                    </li>
                                ))}
                        </ul>
                    </div>
                )}

            <ConfirmModal
                open={confirmOpen}
                description={confirmMessage}
                onConfirm={onConfirmDelete}
                onClose={() => {
                    setConfirmOpen(false);
                    setConfirmLoading(false);
                    setSelectedDocumentId(null);
                }}
                loading={confirmLoading}
            />
        </div>
    );
};

export default ProcedureDocuments;
