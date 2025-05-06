import { useEffect, useRef } from "react";
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
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().indexOf("MAC") >= 0;
      const isCmdF = (isMac && e.metaKey && e.key === "f") || (!isMac && e.ctrlKey && e.key === "f");

      if (isCmdF) {
        e.preventDefault();
        inputRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <div className="relative w-full md:w-sm">
      <IoSearch className="absolute left-2 top-2.5 text-lg text-gray-600" />
      <input
        ref={inputRef}
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full text-sm py-2 px-8 border border-gray-300 rounded-sm"
      />
      <div className="absolute right-2 top-2.5 text-xs text-gray-500 flex flex-row items-center gap-1">
        <span>⌘</span> <span>F</span>
      </div>
    </div>
  );
}
