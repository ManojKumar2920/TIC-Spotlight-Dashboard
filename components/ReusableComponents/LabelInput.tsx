import React from 'react';

interface LabelInputProps {
  labelText: string;
  htmlFor: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  name?: string; 
  disabled?: boolean;
}

const LabelInput: React.FC<LabelInputProps> = ({
  labelText,
  htmlFor,
  type,
  value,
  onChange,
  required = false,
  placeholder = '',
  name = '',
  disabled = false,
}) => {
  return (
    <div className="mb-4">
      <label
        htmlFor={htmlFor}
        className="block  text-sm font-medium leading-[19px]"
      >
        {labelText}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>
      <input
        type={type}
        id={htmlFor}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        name={name} 
        disabled={disabled} 
        className="w-full h-[44px] rounded-[25px] px-6 py-2 mt-2 bg-[#FAFBFC] dark:bg-[#333333] text-sm leading-[19px] focus:outline-none"
      />
    </div>
  );
};

export default LabelInput;
