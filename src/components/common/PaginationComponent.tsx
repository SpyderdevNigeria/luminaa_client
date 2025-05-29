interface PaginationComponentProps {
  page: number;
  totalPages: number;
  total: number;
  limit: number;
  onPageChange: (page: number) => void;
}

export default function PaginationComponent({
  page,
  totalPages,
  total,
  limit,
  onPageChange,
}: PaginationComponentProps) {
  return (
    <div className="flex justify-between items-center mt-6">
      <p className="text-sm">
        Showing {(page - 1) * limit + 1}–{Math.min(page * limit, total)} of {total}
      </p>
      <div className="flex space-x-2">
        <button
          onClick={() => onPageChange(Math.max(page - 1, 1))}
          disabled={page === 1}
          className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Prev
        </button>
        <span className="px-4 py-2 text-sm font-medium bg-gray-100 rounded">
          Page {page} of {totalPages}
        </span>
        <button
          onClick={() => onPageChange(Math.min(page + 1, totalPages))}
          disabled={page >= totalPages}
          className="px-4 py-2 rounded border border-gray-300 disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-100"
        >
          Next
        </button>
      </div>
    </div>
  );
}
