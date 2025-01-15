import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../ReusableComponents/Button";
import { SubmitIcon } from "../../ReusableComponents/Icon";
import Image from "next/image";

type VerifyAccountStepProps = {
  email: string;
  onNext: () => void;
};

const VerifyAccountStep: React.FC<VerifyAccountStepProps> = ({ onNext }) => {
  const [code, setCode] = useState(["", "", "", ""]);

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      // If backspace is pressed and current input is empty, move to the previous input
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = () => {
    if (code.every((digit) => digit)) {
      toast.success("Code verified successfully!");
      onNext();
    } else {
      toast.error("Please enter the 4-digit code.");
    }
  };

  return (
    <div className="flex flex-grow flex-col space-y-9 p-5">
      <ToastContainer />
      <div className="text-center space-y-2 mt-7">
        <h2 className="text-2xl font-bold text-center">Verify Your Account</h2>
        <span className="text-sm flex flex-col text-center justify-center">
          <span>Enter the passcode sent to your email to verify</span>
          <span>your account and ensure its security</span>
        </span>
      </div>
      <div className="flex space-x-2">
        {code.map((digit, index) => (
          <input
            key={index}
            id={`code-input-${index}`}
            type="text"
            value={digit}
            onChange={(e) => handleChange(e.target.value, index)}
            onKeyDown={(e) => handleKeyDown(e, index)}
            placeholder="-"
            maxLength={1}
            className="w-[78.74px] h-[99.02px] text-center px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
          />
        ))}
      </div>

      <Button
        onClick={handleSubmit}
        className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center hover:bg-black"
      >
        <span className="flex-grow text-center">Verify</span>
        <Image
          src={SubmitIcon}
          alt={""}
          className="absolute right-2 w-[35px] h-[35px]"
        />
      </Button>
    </div>
  );
};

export default VerifyAccountStep;
