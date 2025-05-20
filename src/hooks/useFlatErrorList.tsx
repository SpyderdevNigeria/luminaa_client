import { useState } from 'react';

type ErrorType = string | string[];

export const useFlatErrorList = () => {
  const [errors, setErrors] = useState<ErrorType>([]);

  const getFieldErrors = (field: string) => {
    if (!field || typeof field !== 'string') return null;

    // Handle single string error
    if (typeof errors === 'string') {
      if (errors.toLowerCase().includes(field.toLowerCase())) {
        return (
          <div className="mt-2">
            <p className="text-red-600 text-sm">{errors}</p>
          </div>
        );
      }
      return null;
    }

    // Handle array of strings
    if (Array.isArray(errors)) {
      const filtered = errors.filter((msg) =>
        msg.toLowerCase().includes(field.toLowerCase())
      );

      if (filtered.length === 0) return null;

      return (
        <div className="mt-2">
          {filtered.map((msg, index) => (
            <p className="text-red-600 text-sm" key={index}>
              {msg}
            </p>
          ))}
        </div>
      );
    }

    return null;
  };

  return {
    errors,
    setErrors,
    getFieldErrors,
  };
};

export default useFlatErrorList;
