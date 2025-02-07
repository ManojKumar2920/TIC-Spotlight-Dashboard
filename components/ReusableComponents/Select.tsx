import React from 'react';
import { DownArrowIcon } from './Icon';
// import { DownArrowIcon } from './Icon';
interface SelectProps {
  label: string;
  name: string;
  options: { label: string; value: string }[];
  value: string | undefined;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  required?: boolean;
  placeholder?: string;
  className?: string;
}

const Select: React.FC<SelectProps> = ({
  label,
  name,
  options,
  value,
  onChange,
  required = false,
  placeholder = '',
  className = '',
}) => {
  const isPlaceholderSelected = value === '' || value === undefined;

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-[#151414] dark:text-white mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <div className="relative flex items-center">
        <select
          id={name}
          name={name}
          value={value || ''}
          onChange={onChange}
          required={required}
          className={`w-full h-[44px] rounded-[25px] px-6 py-2 bg-[#FAFBFC] dark:bg-[#333333] font-[Objectivity] text-sm leading-[19px] focus:outline-none appearance-none pr-10 ${isPlaceholderSelected ? 'placeholder-selected' : ''}`}
        >
          <option value="" disabled>
            {placeholder || 'Select an option'}
          </option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <div className="absolute right-4 pointer-events-none">
          <DownArrowIcon
          />
        </div>
      </div>
    </div>
  );
};

export default Select;
