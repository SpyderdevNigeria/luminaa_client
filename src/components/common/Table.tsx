import Pagination from "./Pagination";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  arrows?:boolean
};

type PaginationType = {
  hasNextPage: boolean;
  hasPrevPage: boolean;
  totalPages: number;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  pagination?: PaginationType;
  currentPage?: number;
  onPageChange?: (page: number) => void;
};

const Table = <T extends object>({
  data,
  columns,
  pagination,
  currentPage = 1,
  onPageChange,
}: Props<T>) => {
  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead className="bg-[#F9F9F9] text-gray-700">
            <tr>
              {columns.map((col, index) => (
                <th key={index} className={`p-3 font-light `}>
                 <div className={`${col.arrows && 'flex flex-row items-center gap-2'}`}>
                 {col.label}

{col.arrows && 
  <div className="">
  <span className="down-arrow">
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.21631 3.44305L3.91486 1.1416L1.61342 3.44305"
        stroke="#727272"
        stroke-width="1.5343"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </span>
  <div className="up-arrow">
    <svg
      width="7"
      height="5"
      viewBox="0 0 7 5"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M6.21631 1.04621L3.91486 3.34766L1.61342 1.04621"
        stroke="#727272"
        stroke-width="1.5343"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  </div>
</div>
}
                 </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-gray-700">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-gray-100 hover:bg-gray-50"
              >
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {col.render ? col.render(item) : (item[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && onPageChange && (
        <Pagination
          pagination={pagination}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      )}
    </div>
  );
};

export default Table;
