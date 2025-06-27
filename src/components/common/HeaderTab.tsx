import SearchInput from "./SearchInput";

type DropdownOption = {
  label: string;
  options: string[];
  value: string;
  onChange: (value: string) => void;
};

type HeaderTabProps = {
  title: string;
  showSearch?: boolean;
  searchPlaceholder?: string;
  onSearchChange?: (value: string) => void;

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
  dropdowns = [],
  dateFrom,
  onDateFromChange,
  dateTo,
  onDateToChange,
}: HeaderTabProps) {
  return (
    <div className="flex flex-col md:flex-row  items-center justify-between mb-4">
      <h1 className="text-base md:text-xl whitespace-nowrap">{title}</h1>

      <div className="flex flex-wrap items-center gap-3">
        {/* Search Input */}
        {showSearch && (
          <div className="w-full md:w-64">
            <SearchInput
              placeholder={searchPlaceholder}
              onChange={(e) => onSearchChange(e.target.value)}
            />
          </div>
        )}

        {/* Dropdown filters */}
        {dropdowns.length > 0 &&
          dropdowns.map((dropdown, index) => (
            <select
              key={index}
              // value={dropdown.value}
              onChange={(e) => dropdown.onChange(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 text-xs"
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
            className=" bg-white border border-gray-300 rounded-md px-3 py-3 text-xs"
          />
        )}

        {onDateToChange && (
          <input
            type="date"
            value={dateTo}
            onChange={(e) => onDateToChange(e.target.value)}
            className=" bg-white border border-gray-300 rounded-md px-3 py-3 text-xs"
          />
        )}
      </div>
    </div>
  );
}

export default HeaderTab;
