"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../ReusableComponents/Button";
import { SubmitIcon } from "../../ReusableComponents/Icon";
import Image from "next/image";
import LabelInput from "@/components/ReusableComponents/LabelInput";

interface PasswordStepProps {
  onNext: (password: string) => void;
  initialPassword: string;
}

const PasswordStep: React.FC<PasswordStepProps> = ({ initialPassword,onNext }) => {
  const [password, setPassword] = useState<string>(initialPassword);


  const handleNext = () => {
    if (!password) {
      toast.error("Password is required.");
      return;
    }
    else {
    onNext(password);
    }

  };

  return (
    <div className="flex flex-grow flex-col space-y-6 mt-5 h-[370px]">
      <ToastContainer />
      <div className="dark:bg-[#1e1e1e]">
        <h2 className="text-2xl font-semibold text-center">Create a Password</h2>
        <p className="text-center text-gray-600 dark:text-white">
          Set a strong password for your verified account to enhance security.
        </p>
      </div>

      <div className="flex flex-col space-y-3">
        <LabelInput
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          labelText=""
          htmlFor="password"
        />
        <span className="text-sm text-gray-500">
          Use 8+ characters with a mix of letters and numbers for a strong password.
        </span>
      </div>

      <Button
        onClick={handleNext}
        className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center hover:bg-black"
      >
        <span className="flex-grow text-center">Continue</span>
        <Image
          src={SubmitIcon}
          alt="Submit"
          className="absolute right-2 w-[35px] h-[35px]"
        />
      </Button>
    </div>
  );
};

export default PasswordStep;
