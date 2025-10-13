import SearchInput from "./SearchInput";

type DropdownOption = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

type SearchField<T = any> = {
  label?: string;
  placeholder?: string;
  value?: string;
  onChange: (value: string, selectedItem?: T) => void; // ✅ returns both value and object
  data?: T[]; // ✅ array of full objects
  getLabel?: (item: T) => string; // ✅ defines how to display each object
  suggestions?: string[]; // ✅ still supports simple string lists
};

type HeaderTabProps = {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;
  searches?: SearchField[]; // ✅ multiple search support
  dropdowns?: DropdownOption[];

  dateFrom?: string;
  onDateFromChange?: (value: string) => void;
  dateTo?: string;
  onDateToChange?: (value: string) => void;
};

function HeaderTab({
  title,
  showSearch = true,
  searchPlaceholder = "Search",
  onSearchChange = (v) => console.log("Search:", v),
  searches,
  dropdowns = [],
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: HeaderTabProps) {
  return (
    <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-4">
      <h1 className="text-lg md:text-xl whitespace-nowrap">{title}</h1>

      <div className="flex flex-wrap items-center gap-3">
        {/* ✅ Multi or Single Search Support */}
        {showSearch &&
          (searches && searches.length > 0 ? (
            searches.map((search, index) => (
              <div key={index} className="relative w-full md:w-64">
                {search.label && (
                  <label className="text-xs text-gray-600 block mb-1">
                    {search.label}
                  </label>
                )}
                <SearchInput
                  placeholder={search.placeholder || "Search"}
                  value={search.value}
                  onChange={(e) => search.onChange(e.target.value)}
                />

                {/* ✅ Object-based suggestions */}
                {search.data &&
                  search.data.length > 0 &&
                  search.value &&
                  (
                    <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full max-h-48 overflow-auto text-sm shadow">
                      {search.data
                        .filter((item) => {
                          const label = search.getLabel
                            ? search.getLabel(item)
                            : (item as any).toString();
                          return label
                            .toLowerCase()
                            .includes(search.value!.toLowerCase());
                        })
                        .map((item, i) => {
                          const label = search.getLabel
                            ? search.getLabel(item)
                            : (item as any).toString();
                          return (
                            <li
                              key={i}
                              className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                              onClick={() => search.onChange(label, item)} // ✅ returns label + object
                            >
                              {label}
                            </li>
                          );
                        })}
                    </ul>
                  )}

                {/* ✅ Simple string-based suggestions (fallback) */}
                {search.suggestions &&
                  search.suggestions.length > 0 &&
                  search.value &&
                  !search.data && (
                    <ul className="absolute z-10 bg-white border border-gray-200 rounded-md mt-1 w-full max-h-48 overflow-auto text-sm shadow">
                      {search.suggestions
                        .filter((s) =>
                          s
                            .toLowerCase()
                            .includes(search.value?.toLowerCase() || "")
                        )
                        .map((s, i) => (
                          <li
                            key={i}
                            className="px-3 py-1 hover:bg-gray-100 cursor-pointer"
                            onClick={() => search.onChange(s)}
                          >
                            {s}
                          </li>
                        ))}
                    </ul>
                  )}
              </div>
            ))
          ) : (
            // fallback: single search (original behavior)
            <div className="w-full md:w-64">
              <SearchInput
                placeholder={searchPlaceholder}
                onChange={(e) => onSearchChange(e.target.value)}
              />
            </div>
          ))}

        {/* Dropdown filters */}
        {dropdowns.length > 0 &&
          dropdowns.map((dropdown, index) => (
            <select
              key={index}
              value={dropdown.value}
              onChange={(e) => dropdown.onChange(e.target.value)}
              className="bg-white w-full md:w-auto border border-gray-300 rounded-md px-3 py-2 text-xs"
            >
              <option value="">{dropdown.label}</option>
              {dropdown.options.map((option, i) => (
                <option key={i} value={option}>
                  {option}
                </option>
              ))}
            </select>
          ))}

        {/* Inline Date Filters */}
        {onDateFromChange && (
          <input
            type="date"
            value={dateFrom}
            onChange={(e) => onDateFromChange(e.target.value)}
            className="bg-white border w-full md:w-auto border-gray-300 rounded-md px-3 py-3 text-xs"
          />
        )}

        {onDateToChange && (
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className="bg-white border w-full md:w-auto border-gray-300 rounded-md px-3 py-3 text-xs"
          />
        )}
      </div>
    </div>
  );
}

export default HeaderTab;
