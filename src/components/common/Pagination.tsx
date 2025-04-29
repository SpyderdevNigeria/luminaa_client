import { IPaginationResponse } from "../../types/Interfaces";

type Props = {
  pagination: IPaginationResponse;
  currentPage: number;
  onPageChange: (number: number) => void;
};

const Pagination = ({ pagination, currentPage, onPageChange }: Props) => {
  if (!pagination) return null;

  return (
    <div className="mt-10 w-full">
      <div className="md:flex items-center justify-between">
      <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={!pagination.hasPrevPage}
            className="px-4 py-2 border border-gray-light rounded-sm text-sm"
          >
            Previous
          </button>

        <div className="text-sm  ">
          Page {currentPage} of {pagination.totalPages} 
        </div>

          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!pagination.hasNextPage}
            className="px-4 py-2 border border-gray-light rounded-sm text-sm"
          >
            Next
          </button>

      </div>
    </div>
  );
};

export default Pagination;