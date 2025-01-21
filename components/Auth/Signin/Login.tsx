"use client";

import React, { useState } from "react";
import Button from "../../ReusableComponents/Button";
import { GoArrowRight } from "react-icons/go";
import { GoogleIcon } from "@/components/ReusableComponents/Icon";
import Image from "next/image";
import Link from "next/link";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { handleLogin, loginWithGoogle } from "@/components/Api/Api";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleSubmit = async () => {
    try {
        const response = await handleLogin(email, password);
        toast.success("Signin successful!");
        router.push("/");
        console.log(response.data);
    } catch (error: any) {
        if (error instanceof Error) {
            toast.error(error.message || "An unexpected error occurred.");
            // Remove error rethrow
            if (error.message !== "Invalid password") {
            
            }
        } else if (error.response && error.response.data) {
            toast.error(error.response.data.message || "An error occurred.");
           
        } else {
            toast.error("An unexpected error occurred. Please try again.");
          
        }
    }
};


  return (
    <div>
      <div className="flex flex-grow flex-col space-y-5 p-5 dark:bg-[#1e1e1e] h-[560px]">
        <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
        />

        <div className="text-center space-y-2 mt-7">
          <h2 className="text-2xl font-bold leading-[24.72px]">
            Welcome to Spotlight
          </h2>
          <p className="text-[rgba(0,0,0,0.66)] dark:text-white text-sm leading-[22px]">
            Sign into your account. If you don&apos;t have one, <br />
            you&apos;ll be prompted to create one.
          </p>
        </div>

        <div className="w-[304px] space-y-5 flex flex-col items-center justify-center mx-auto">
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white dark:bg-[#333333] text-sm shadow-sm focus:outline-none border border-[#9B9797]"
          />
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Enter your password"
            className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white dark:bg-[#333333] text-sm shadow-sm focus:outline-none border border-[#9B9797]"
          />

          <Link href="/auth/forgot-password" className="ml-auto">
            <span className="font-medium">Forgot Password?</span>
          </Link>

          <Button
            onClick={handleSubmit}
            className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center dark:bg-[#111111] hover:bg-black"
          >
            <span className="flex-grow text-center">Login</span>
            <div className="absolute right-2 p-2 rounded-full w-[35px] h-[35px] bg-white text-white dark:text-black flex items-center justify-center">
              <GoArrowRight className="w-6 h-6 text-black" />
            </div>
          </Button>
        </div>

        <div className="space-y-5">
          <div className="flex items-center my-4">
            <div className="flex-grow border-t border-[#8D8B8B]"></div>
            <span className="mx-4 text-[#9B9797]">OR</span>
            <div className="flex-grow border-t border-[#8D8B8B]"></div>
          </div>

          <Link href="/auth/signup">
            <div className="text-center">
              <span>Don't have an account? </span>
              <span className="font-medium">Signup here</span>
            </div>
          </Link>

          <div className="px-5">
            <Button
              onClick={loginWithGoogle}
              className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center dark:bg-[#111111] hover:bg-black"
            >
              <span className="flex-grow text-center">
                Continue With Google
              </span>
              <div className="absolute left-2 p-2 rounded-full w-[35px] h-[35px] text-white dark:text-black flex items-center justify-center">
                <Image src={GoogleIcon} alt={"logo"} />
              </div>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
