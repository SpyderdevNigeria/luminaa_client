// components/common/ResultCard.tsx
import { MdEdit } from "react-icons/md";

const ResultCard = ({ result, onEdit }: any) => {
  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white flex justify-between items-start gap-4">
      <div className="flex-1">
        <h3 className="font-semibold text-lg text-gray-800">{result.testName}</h3>
        <p><span className="font-medium">Result:</span> {result.result} {result.unit}</p>
        <p><span className="font-medium">Reference Range:</span> {result.referenceRange}</p>
        {result.notes && <p className="mt-2 text-gray-600 italic">Notes: {result.notes}</p>}
      </div>
      <div className="flex gap-3 mt-1">
        <button
          onClick={() => onEdit(result)}
          className="text-blue-600 hover:text-blue-800"
          title="Edit"
        >
          <MdEdit size={20} />
        </button>
        {/* <button
          onClick={() => onDelete(result)}
          className="text-red-600 hover:text-red-800"
          title="Delete"
        >
          <MdDelete size={20} />
        </button> */}
      </div>
    </div>
  );
};

export default ResultCard;
