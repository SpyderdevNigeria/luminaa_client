import { IoFilterOutline } from "react-icons/io5";
import Dropdown from "./dropdown";

type SortDropdownProps = {
  options: string[];
  onSelect: (value: string) => void;
};

export default function SortDropdown({ options, onSelect }: SortDropdownProps) {
  return (
    <Dropdown triggerIcon={<IoFilterOutline />} triggerLabel="Sort">
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
