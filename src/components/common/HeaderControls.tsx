import { MdOutlineArrowBackIos, MdOutlineArrowForwardIos } from "react-icons/md";
import SearchInput from "./SearchInput";
import Dropdown from "../dropdown/dropdown";
import SortDropdown from "../dropdown/SortDropdown";

export default function HeaderControls() {
  const handleSort = (value: string) => {
    console.log("Sort by:", value);
  };

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between my-4">
      {/* Left controls */}
      <div className="flex flex-wrap items-center gap-3">
        <Dropdown triggerLabel="Week" showArrow>
          <ul className="space-y-2 text-sm">
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">Day</li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">Week</li>
            <li className="cursor-pointer hover:bg-gray-100 p-1 rounded">Month</li>
          </ul>
        </Dropdown>

        <div className="text-xs p-1 px-3 flex items-center gap-2 border bg-white rounded-sm cursor-pointer">
          Today
        </div>

        <MdOutlineArrowBackIos className="text-xs cursor-pointer" />
        <MdOutlineArrowForwardIos className="text-xs cursor-pointer" />
      </div>

      {/* Right controls */}
      <div className="flex flex-col md:flex-row items-start md:items-center gap-3 w-full md:w-auto">
        <SearchInput placeholder="Search"  />
        <SortDropdown
          options={["Newest First", "Oldest First", "A-Z"]}
          onSelect={handleSort}
        />
      </div>
    </div>
  );
}
