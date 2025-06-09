import React from "react";

export interface SelectOption {
  value: string;
  label: string;
}

export interface CommonFormFieldProps {
  type: string;
  name: string;
  label: string;
  value: any;
  required?: boolean;
  options?: SelectOption[]; // updated to support value-label pairs
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => void;
}

const CommonFormField: React.FC<CommonFormFieldProps> = ({
  type,
  name,
  label,
  value,
  required = false,
  options = [],
  onChange,
}) => {
  return (
    <div key={name}>
      {type !== "checkbox" && (
        <label htmlFor={name} className="form-label !text-base !font-light block mb-1">
          {label}
        </label>
      )}

      {type === "select" ? (
        <select
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-input focus:outline-primary text-gray-light w-full"
        >
          <option value="">Select {label}</option>
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>
              {opt.label}
            </option>
          ))}
        </select>
      ) : type === "textarea" ? (
        <textarea
          id={name}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          rows={4}
          className="form-input focus:outline-primary text-gray-light w-full resize-none"
        />
      ) : type === "checkbox" ? (
        <div className="flex items-center gap-2">
          <input
            id={name}
            type="checkbox"
            name={name}
            checked={!!value}
            onChange={onChange}
            className="form-checkbox text-primary focus:ring-primary"
          />
          <label htmlFor={name} className="text-sm text-gray-700">
            {label}
          </label>
        </div>
      ) : (
        <input
          id={name}
          type={type}
          name={name}
          value={value}
          onChange={onChange}
          required={required}
          className="form-input focus:outline-primary text-gray-light w-full"
        />
      )}
    </div>
  );
};

export default CommonFormField;
