import { FiEdit, FiEye, FiTrash2 } from "react-icons/fi";
import { MdMedicalServices } from "react-icons/md";
import StatusBadge from "./StatusBadge";
import Dropdown from "../dropdown/dropdown";
import { HiOutlineDotsVertical } from "react-icons/hi";
import moment from "moment";

interface DiagnosisCardProps {
  diagnosis: {
    id?: string;
    primaryDiagnosis: string;
    severity?: string;
    createdAt?: string;
  };
  onView?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
}

function DiagnosisCard({ diagnosis, onView, onEdit, onDelete }: DiagnosisCardProps) {
  const { primaryDiagnosis, createdAt, severity } = diagnosis;

  const hasActions = onEdit || onDelete;

  return (
    <main className="border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition bg-white text-black flex flex-col gap-4">
      {/* Header */}
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
        <div>
              <div className="w-12 h-12 flex items-center justify-center bg-primary rounded-full">
            <MdMedicalServices className="text-white text-2xl" />
          </div>
        </div>
          <div>
            <h3 className="text-base font-semibold line-clamp-1 capitalize">{primaryDiagnosis}</h3>
            <p className="text-sm text-gray-500">Diagnosed on {moment(createdAt).format("MMM D, YYYY")}</p>
          </div>
        </div>

        {hasActions && (
          <Dropdown
            showArrow={false}
            triggerLabel=""
            triggerIcon={<HiOutlineDotsVertical className="" />}
          >
            <ul className="space-y-2 text-sm">
              {onView && (
                <li
                  onClick={() => onView()}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                >
                  <FiEye /> View
                </li>
              )}
              {onEdit && (
                <li
                  onClick={() => onEdit()}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2"
                >
                  <FiEdit /> Edit
                </li>
              )}
              {onDelete && (
                <li
                  onClick={() => onDelete()}
                  className="cursor-pointer hover:bg-gray-100 p-1 rounded flex items-center gap-2 text-red-600"
                >
                  <FiTrash2 /> Delete
                </li>
              )}
            </ul>
          </Dropdown>
        )}
      </div>

      {/* Status */}
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-600">Severity:</span>
        <StatusBadge status={severity || "pending"} />
      </div>
       {!hasActions && (
      <button className="bg-primary text-white p-2 rounded-lg " onClick={onView}>
        view 
      </button>
       )}
    </main>
  );
}

export default DiagnosisCard;
