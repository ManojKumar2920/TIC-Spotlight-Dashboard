"use client";

import React, { useState } from "react";
import axios from "axios";
import LabelInput from "@/components/ReusableComponents/LabelInput";
import Button from "@/components/ReusableComponents/Button";
import { GoArrowRight } from "react-icons/go";


const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setMessage("");
    setError("");

    try {
      const response = await axios.post("/api/forgot-password", { email });
      setMessage(response.data.message);
    } catch (err: any) {
      setError(err.response?.data?.message || "Something went wrong.");
    }
  };

  return (

   
      <div className="w-full max-w-md bg-whitep-6 rounded-lg  p-5">
        <h1 className="text-2xl font-semibold mb-4">Forgot Password</h1>
        <div className=""><form onSubmit={handleSubmit}>
          <LabelInput
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Email"
                      labelText={""} 
                      htmlFor={"email"}         
                       />
          <Button
            onClick={handleSubmit}
            className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center dark:bg-[#111111] hover:bg-black"
          >
            <span className="flex-grow text-center">Login</span>
            <div className="absolute right-2 p-2 rounded-full w-[35px] h-[35px] bg-white text-white dark:text-black flex items-center justify-center">
              <GoArrowRight className="w-6 h-6 text-black" />
            </div>
          </Button>
        </form></div>
        
        {message && <p className="mt-4 text-green-500">{message}</p>}
        {error && <p className="mt-4 text-red-500">{error}</p>}
      </div>

  );
};

export default ForgotPassword;
