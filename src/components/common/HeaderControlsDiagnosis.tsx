import { ChangeEvent } from "react";

type HeaderControlsProps = {
//   search: string;
//   onSearchChange: (e: ChangeEvent<HTMLInputElement>) => void;
  severity: string;
  onSeverityChange: (e: ChangeEvent<HTMLSelectElement>) => void;
};

const HeaderControlsDiagnosis = ({
//   search,
//   onSearchChange,
  severity,
  onSeverityChange,
}: HeaderControlsProps) => {
  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
      {/* Search Input */}
      {/* <input
        type="text"
        placeholder="Search diagnosis or doctor"
        value={search}
        onChange={onSearchChange}
        className="border border-gray-300 rounded-md px-4 py-2 w-full md:max-w-sm text-sm"
      /> */}

      {/* Severity Dropdown */}
      <select
        value={severity}
        onChange={onSeverityChange}
        className="border border-gray-300 rounded-md px-3 py-2 text-sm"
      >
        <option value="">All Severities</option>
        <option value="mild">Mild</option>
        <option value="moderate">Moderate</option>
        <option value="severe">Severe</option>
      </select>

    </div>
  );
};

export default HeaderControlsDiagnosis;
