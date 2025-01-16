"use client";
import React, { useState } from "react";
import Button from "../../ReusableComponents/Button";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { GoArrowRight } from "react-icons/go";

type EmailPhoneStepProps = {
  initialEmail: string;
  initialPhoneNumber: string;
  onNext: (email: string, phoneNumber: string) => void;
};

const EmailPhoneStep: React.FC<EmailPhoneStepProps> = ({ initialEmail,
  initialPhoneNumber, onNext }) => {
  const [email, setEmail] = useState<string>(initialEmail);
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhoneNumber);

  const handleNext = () => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!email || !emailRegex.test(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }
    const phoneRegex = /^[0-9]{10}$/;
    if (!phoneNumber || !phoneRegex.test(phoneNumber)) {
      toast.error("Please enter a valid 10-digit phone number.");
      return;
    }

    onNext(email, phoneNumber);
  };


  return (
    <div className="flex flex-grow flex-col space-y-6 p-5 dark:bg-[#1e1e1e] h-[365px] ">
      <ToastContainer />
      <div className="text-center space-y-2 mt-7">
        <h2 className="text-2xl font-bold leading-[24.72px]">
          Email & Phone Number
        </h2>
        <p className="text-[rgba(0,0,0,0.66)] dark:text-white text-sm leading-[22px]">
          Please provide your email and phone number to continue.
        </p>
      </div>

      <div className="w-[304px] space-y-5 flex flex-col items-center justify-center mx-auto">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your email"
          className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white dark:bg-[#333333] text-sm shadow-sm focus:outline-none border border-[#9B9797]"
        />

        <input
          type="text"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          placeholder="Phone Number"
          className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white dark:bg-[#333333] text-sm shadow-sm focus:outline-none border border-[#9B9797]"
        />
        <Button
          onClick={handleNext}
          className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center dark:bg-[#111111] hover:bg-black"
        >
          <span className="flex-grow text-center">Continue</span>
          <div className="absolute right-2 p-2 rounded-full w-[35px] h-[35px] bg-white text-white dark:text-black flex items-center justify-center">
            <GoArrowRight className="w-6 h-6 text-black" />
          </div>
        </Button>
      </div>
    </div>
  );
};

export default EmailPhoneStep;
