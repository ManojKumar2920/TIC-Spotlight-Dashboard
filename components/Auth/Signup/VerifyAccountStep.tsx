"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../../ReusableComponents/Button";
import { SubmitIcon } from "../../ReusableComponents/Icon";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation"; 

type VerifyAccountStepProps = {
  email: string;
  password: string;
  phoneNumber: string;
  name: string;
};

const VerifyAccountStep: React.FC<VerifyAccountStepProps> = ({ email, password, phoneNumber, name }) => {
  const [code, setCode] = useState<string[]>(["", "", "", "", "", ""]);
  const router = useRouter();

  const handleChange = (value: string, index: number) => {
    if (value.length > 1) return;
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < code.length - 1) {
      const nextInput = document.getElementById(`code-input-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-input-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleSubmit = async () => {
    if (code.every((digit) => digit)) {
      const otp = code.join("");
      const userDetails = { email, emailOtp: otp, password, phoneNumber, name };
      
      try {
        const response = await axios.post("/api/signup", userDetails);
        if (response.data.message === "User created successfully") {
          toast.success("User registered successfully!");
          router.push("/");
        } else {
          toast.error(response.data.message || "Failed to verify OTP.");
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          toast.error(`Error: ${error.response?.data.message || "Failed to verify OTP. Please try again."}`);
        } else {
          toast.error("Error verifying OTP. Please try again.");
        }
      }
    }
  };

  return (
    <div className="flex flex-col flex-grow space-y-9 p-5 h-[370px]">
      <ToastContainer />
      <div className="text-center space-y-2 mt-7">
        <h2 className="text-2xl font-bold">Verify Your Account</h2>
        <span className="text-sm text-center">
          Enter the passcode sent to your email to verify
          <br />
          your account and ensure its security.
        </span>
      </div>
      <div className="flex justify-center space-x-2">
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
            className="w-[60.74px] h-[75.02px] text-center text-lg px-4 py-2 border rounded focus:outline-none focus:ring focus:ring-blue-200"
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
          alt="Submit"
          className="absolute right-2 w-[35px] h-[35px]"
        />
      </Button>
    </div>
  );
};

export default VerifyAccountStep;
