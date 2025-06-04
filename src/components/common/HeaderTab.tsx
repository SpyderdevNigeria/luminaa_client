import FilterDropdown from "../dropdown/FilterDropdown";
import SortDropdown from "../dropdown/SortDropdown";
import SearchInput from "./SearchInput";

type HeaderTabProps = {
  title: string;
  showSearch?: boolean;
  showSort?: boolean;
  showFilter?: boolean;
};

function HeaderTab({
  title,
  showSearch = true,
  showSort = true,
  showFilter = true,
}: HeaderTabProps) {
  const handleSort = (value: string) => {
    console.log("Sort by:", value);
  };

  const handleFilter = (value: string) => {
    console.log("Filter by:", value);
  };
  return (
    <div className="flex flex-col md:flex-row gap-4  items-center justify-between mb-4">
      <h1 className="text-base md:text-xl">{title}</h1>

      <div className="flex flex-row items-center gap-3  ">
        {/* Search */}
        {showSearch && (
        <div className="w-full">
        <SearchInput onChange={(e) => console.log(e.target.value)} />
      </div>
        )}

        {/* Sort */}
        {showSort && (
          <SortDropdown
            options={["Newest First", "Oldest First", "A-Z"]}
            onSelect={handleSort}
          />
        )}

        {/* Filter */}
        {showFilter && (
          <FilterDropdown
            options={["By Date", "By Status", "By Category"]}
            onSelect={handleFilter}
          />
        )}
      </div>
    </div>
  );
}

export default HeaderTab;
