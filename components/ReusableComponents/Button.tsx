import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; 
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit" | "reset"; 
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className , type = "button"}) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`px-4 py-2 rounded-[30px] text-center focus:outline-none ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : ''
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
