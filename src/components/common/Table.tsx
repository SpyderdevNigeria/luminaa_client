import PaginationComponent from "./PaginationComponent";

export type Column<T> = {
  key: keyof T | string;
  label: string;
  render?: (item: T) => React.ReactNode;
  arrows?: boolean;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  showPaginate?: boolean;
     total? : number;
    totalPages? : number;
    setPage? : (page : number ) => void;
    page: number;
    limit:number;
};

const Table = <T extends object>({
  data,
  columns,
  page,
  limit,
  total,
  totalPages,
  setPage,
  showPaginate = true,
}: Props<T>) => {
  const gettotalPages = Math.ceil((total ?? 0) / limit);

  return (
    <div className="">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm border-separate border-spacing-y-2">
          <thead className="bg-primary text-white">
            <tr>
              <th className="p-3 font-light">S/N</th>
              {columns.map((col, index) => (
                <th key={index} className="p-3 font-light">
                  <div
                    className={`${
                      col.arrows ? "flex flex-row items-center gap-2 whitespace-nowrap" : ""
                    }`}
                  >
                    {col.label}
                    {col.arrows && (
                      <div>
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
                              strokeWidth="1.5343"
                              strokeLinecap="round"
                              strokeLinejoin="round"
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
                              strokeWidth="1.5343"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            />
                          </svg>
                        </div>
                      </div>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="text-text-primary">
            {data.map((item, rowIndex) => (
              <tr
                key={rowIndex}
                className="bg-white border-gray-100 hover:bg-gray-50"
              >
                <td className="p-3">
                  {(page - 1) * limit + rowIndex + 1}
                </td>
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="p-3">
                    {col.render
                      ? col.render(item)
                      : (item[col.key as keyof T] as React.ReactNode)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {showPaginate && (
        <div>
          <PaginationComponent
            page={page}
            total={total ?? 0}
            limit={limit}
            totalPages={totalPages ? totalPages : gettotalPages || 1}
            onPageChange={(e: number) => {
              if (setPage) setPage(e);
            }}
          />
        </div>
      )}
    </div>
  );
};


export default Table;
