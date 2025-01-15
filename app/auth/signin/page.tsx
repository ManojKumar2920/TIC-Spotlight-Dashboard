
"use client";
import React from "react";
import Login from "@/components/Auth/Signin/Login";


const Page: React.FC = () => {

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 ">
      <div className="w-[444px]  max-w-md bg-white shadow-md rounded-[20px] p-6 dark:bg-[#1e1e1e] dark:text-white">

        <Login />

      </div>
    </div>
  );
};

export default Page;
