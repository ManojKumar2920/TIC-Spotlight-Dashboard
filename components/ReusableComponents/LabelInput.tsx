import React from 'react';

interface LabelInputProps {
  label: string;
  type?: string;
  name: string;
  value: string;
//   onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  required?: boolean;
}

const LabelInput: React.FC<LabelInputProps> = ({ label, type = 'text', name, value, placeholder, required = false }) => {
  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-gray-700">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        // onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="mt-1 block w-full px-3 py-2 rounded-[25px] bg-[#FAFBFC] shadow-sm focus:outline-none sm:text-sm"
      />
    </div>
  );
};

export default LabelInput;
