import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void; // Optional onClick handler
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ children, onClick, disabled = false, className }) => {
  return (
    <button
      onClick={onClick} // Pass the onClick handler here
      disabled={disabled}
      className={`px-4 py-2 rounded-lg focus:outline-none ${className} ${
        disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
      }`}
    >
      {children}
    </button>
  );
};

export default Button;
