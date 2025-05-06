import { CiFilter } from "react-icons/ci";
import Dropdown from "./dropdown";

type FilterDropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
};

export default function FilterDropdown({ options, onSelect }: FilterDropdownProps) {
  return (
    <Dropdown triggerIcon={<CiFilter />} triggerLabel="Filter">
      <ul className="space-y-2 text-sm">
        {options.map((option, index) => (
          <li
            key={index}
            onClick={() => onSelect(option)}
            className="cursor-pointer hover:bg-gray-100 p-1 rounded"
          >
            {option}
          </li>
        ))}
      </ul>
    </Dropdown>
  );
}
