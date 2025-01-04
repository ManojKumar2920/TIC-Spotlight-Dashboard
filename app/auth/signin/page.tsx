"use client";
import React, { useState } from "react";
import WelcomeStep from "@/components/Auth/WelcomeStep";
import VerifyAccountStep from "@/components/Auth/VerifyAccountStep";
import CreatePasswordStep from "@/components/Auth/CreatePasswordStep";

type Step = "welcome" | "verifyAccount" | "createPassword";

const Page: React.FC = () => {
  const [currentStep, setCurrentStep] = useState<Step>("welcome");
  const [email, setEmail] = useState<string>("");

  const handleNextStep = (step: Step) => {
    setCurrentStep(step);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-[444px] h-[488px] max-w-md bg-white shadow-md rounded-[20px] p-6 dark:bg-[#1e1e1e] dark:text-white">
        {currentStep === "welcome" && (
          <WelcomeStep
            onNext={(email) => {
              setEmail(email);
              handleNextStep("verifyAccount");
            }}
          />
        )}
        {currentStep === "verifyAccount" && (
          <VerifyAccountStep
            email={email}
            onNext={() => handleNextStep("createPassword")}
          />
        )}
        {currentStep === "createPassword" && <CreatePasswordStep email={email} />}
      </div>
    </div>
  );
};

export default Page;
