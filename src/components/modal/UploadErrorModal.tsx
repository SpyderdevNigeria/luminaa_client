import Modal from "./modal";
type UploadError = {
  row: number;
  error: string;
};

interface UploadErrorModalProps {
  open: boolean;
  onClose: () => void;
  errors: UploadError[];
}

const UploadErrorModal = ({ open, onClose, errors }: UploadErrorModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title="Upload Errors">
      {errors.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 text-sm">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b border-gray-200">Row</th>
                <th className="px-4 py-2 border-b border-gray-200">Error</th>
              </tr>
            </thead>
            <tbody>
              {errors.map((err, idx) => (
                <tr
                  key={idx}
                  className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}
                >
                  <td className="px-4 py-2 border-b border-gray-200">
                    {err.row}
                  </td>
                  <td className="px-4 py-2 border-b border-gray-200">
                    {err.error}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p className="text-gray-500">No errors found.</p>
      )}
    </Modal>
  );
};

export default UploadErrorModal;
