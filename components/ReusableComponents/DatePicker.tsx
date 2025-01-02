import React from 'react';

interface DatePickerProps {
  labelText: string;
  htmlFor: string;
  type: string;
  value: string;
  onChange: React.ChangeEventHandler<HTMLInputElement>;
  required?: boolean;
  placeholder?: string;
  name?: string; 
}

const DatePicker: React.FC<DatePickerProps> = ({
    labelText,
    htmlFor,
    type = 'text',
    value,
    onChange,
    required = false,
    placeholder = 'DD/MM/YYYY',
    name = '',
  }) => {
    return (
      <div className="mb-4">
        <label
          htmlFor={htmlFor}
          className="block text-sm font-medium leading-[19px]"
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
          className="w-full h-[44px] rounded-[25px] px-6 py-2 mt-2 bg-[#FAFBFC] text-sm leading-[19px] focus:outline-none placeholder:text-gray-400" 
          style={{color: 'black'}} // Add custom inline style
        />
      </div>
    );
  };

  

export default DatePicker;
