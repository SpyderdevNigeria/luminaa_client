import { MdEdit } from "react-icons/md";

const ResultCard = ({ result, onEdit }: any) => {
  return (
    <div className="rounded-xl border border-gray-200 p-4 shadow-sm bg-white">
      {/* Top Header */}
      <div className="flex items-start justify-between mb-3">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-sm font-semibold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              {result.testName}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            <span className="font-medium text-gray-700">Reference Range:</span> {result.referenceRange}
          </p>
        </div>

        <button
          onClick={() => onEdit(result)}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <MdEdit size={20} />
        </button>
      </div>

      {/* Main Content */}
      <div className="text-sm text-gray-700 space-y-1">
        <p>
          <span className="font-medium">Result:</span> {result.result} {result.unit}
        </p>
        {result.notes && (
          <p className="text-gray-600 italic">
            Notes: {result.notes}
          </p>
        )}
      </div>
    </div>
  );
};

export default ResultCard;
