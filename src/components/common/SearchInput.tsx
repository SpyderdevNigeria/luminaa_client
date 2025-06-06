import { IoSearch } from "react-icons/io5";

type SearchInputProps = {
  placeholder?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
};

export default function SearchInput({
  placeholder = "Search",
  value,
  onChange,
}: SearchInputProps) {


  return (
<div className="relative w-full">
  <IoSearch className="absolute left-2 top-1/2 -translate-y-1/2 text-lg text-gray-600" />
  <input
    type="text"
    placeholder={placeholder}
    value={value}
    onChange={onChange}
    className="w-full text-sm py-3 pl-8 pr-3 border border-gray-300 rounded-sm"
  />
</div>
  );
}
