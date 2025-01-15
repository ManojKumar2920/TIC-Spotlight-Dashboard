"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import NameStep from "@/components/Auth/Signup/NameStep";
import EmailPhoneStep from "@/components/Auth/Signup/EmailPhoneStep";
import PasswordStep from "@/components/Auth/Signup/PasswordStep";
import VerifyAccountStep from "@/components/Auth/Signup/VerifyAccountStep";
import axios from "axios";
import { FaArrowLeft as BackIcon } from "react-icons/fa6";

type Step = "name" | "emailPhone" | "password" | "verifyAccount";

const SignupPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("name");
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleNextStep = (step: Step) => {
    setCurrentStep(step);
  };

  const handlePrevStep = () => {
    if (currentStep === "emailPhone") {
      setCurrentStep("name");
    } else if (currentStep === "password") {
      setCurrentStep("emailPhone");
    } else if (currentStep === "verifyAccount") {
      setCurrentStep("password");
    }
  };

  const handleSendOtp = async (password: string) => {
    try {
      if (!password) {
        toast.error("Password is required.");
        return;
      }
      console.log("Sending OTP with data:", { name, email, phoneNumber, password });
      const response = await axios.post("/api/signup", {
        name,
        email,
        phoneNumber,
        password,
      });
      if (response.data.otpSent) {
        console.log(response.data.otpSent);
        toast.success("OTP sent successfully!");
        handleNextStep("verifyAccount");
      } else {
        toast.error(response.data.message || "Failed to send OTP.");
      }
    } catch (error: any) {
        toast.error(`Error: ${error.response.data.message || "Failed to send OTP. Please try again."}`);
      
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="w-[444px] max-w-md bg-white shadow-md rounded-[20px] p-6 dark:bg-[#1e1e1e] dark:text-white">
        {(currentStep === "emailPhone" || currentStep === "password" || currentStep === "verifyAccount") && (
          <div className="flex justify-start mb-4">
            <button
              onClick={handlePrevStep}
              className="text-[rgba(0,0,0,0.66)] hover:text-black"
            >
              <BackIcon />
            </button>
          </div>
        )}

        {currentStep === "name" && (
          <NameStep
            onNext={(name) => {
              setName(name);
              handleNextStep("emailPhone");
            }}
          />
        )}
        {currentStep === "emailPhone" && (
          
            <EmailPhoneStep
              onNext={(email, phoneNumber) => {
                setEmail(email);
                setPhoneNumber(phoneNumber);
                handleNextStep("password");
              }}
            />
         
        )}
        {currentStep === "password" && (
        
            <PasswordStep
              onNext={(password) => {
                setPassword(password); 
                handleSendOtp(password);
              }}
            />
         
        )}
        {currentStep === "verifyAccount" && (
          <VerifyAccountStep 
            email={email} 
            password={password} 
            phoneNumber={phoneNumber} 
            name={name} 
          />
        )}
      </div>
    </div>
  );
};

export default SignupPage;
