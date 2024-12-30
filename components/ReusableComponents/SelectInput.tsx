import React from 'react'


interface SelectProps {
    label: string;
    name: string;
    options: { label: string; value: string }[]; 
    value: string | undefined;
    onChange: (selectedOption: any) => void;
    required?: boolean;
    placeholder?: string;
    className?: string; 
  }
  

const SelectInput: React.FC<SelectProps> = ({
    label,
    name,
    options,
    value,
    onChange,
    required = false,
    placeholder = '',
    className = '',

}) => {

  return (
    <div className={`mb-4 ${className}`}>
      <label htmlFor={name} className="block text-sm font-medium text-[#151414] mb-2">
        {label}
        {required && <span className="text-red-500">*</span>}
      </label>
      <select
        id={name}
        name={name}
        value={value || ''}
        onChange={onChange}
        required={required}
        className="block w-full px-4 py-2 rounded-[25px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none"
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
    </div>
  )
}

export default SelectInput
