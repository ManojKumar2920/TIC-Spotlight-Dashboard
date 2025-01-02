"use client";

import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Button from "../ReusableComponents/Button";
import { SubmitIcon } from "../ReusableComponents/Icon";
import Image from "next/image";
import { useRouter } from 'next/navigation'

type CreatePasswordStepProps = {
  email: string;
};

const CreatePasswordStep: React.FC<CreatePasswordStepProps> = ({ email }) => {
  const router = useRouter()
  const [password, setPassword] = useState("");
 
  const handleSubmit = () => {
    if (password.length >= 8) {
      toast.success("Password created successfully!");
      setTimeout(() => {
        router.push("/");
      }, 1500);
    } else {
      toast.error("Password must be at least 8 characters.");
    }
  };

  return (
    <div className="flex flex-grow flex-col space-y-6 p-5 mt-5">
      <ToastContainer />
      <div>
        <h2 className="text-2xl font-semibold text-center">Create a Password</h2>
        <p className="text-center text-gray-600">
          Set a strong password for your verified account to enhance security.
        </p>
      </div>

      <input
        type="email"
        value={email}
        onChange={(e) => setPassword(e.target.value)}
        disabled
        className="block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white text-sm shadow-sm focus:outline-none border border-[#9B9797]"
      />
      <div className="flex flex-col space-y-3">
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Create a password"
          className="block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white text-sm shadow-sm focus:outline-none border border-[#9B9797]"
        />
        <span className="text-sm text-gray-500">
          Use 8+ characters with a mix of letters, numbers, and symbols for a strong password
        </span>
      </div>

      <Button
        onClick={handleSubmit}
        className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center hover:bg-black"
      >
        <span className="flex-grow text-center">Submit</span>
        <Image
          src={SubmitIcon}
          alt={""}
          className="absolute right-2 w-[35px] h-[35px]"
        />
      </Button>
    </div>
  );
};

export default CreatePasswordStep;
