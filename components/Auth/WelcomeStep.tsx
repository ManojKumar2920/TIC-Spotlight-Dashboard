"use client";
import Image from "next/image";
import React, { useState } from "react";
import Button from "../ReusableComponents/Button";
import { ToastContainer, toast } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css"
import {
  AppleIcon,
  FaceBookIcon,
  GoogleIcon,
  InstaIcon,
  SubmitIcon,
} from "../ReusableComponents/Icon";
import { hr } from "date-fns/locale";

type WelcomeStepProps = {
  onNext: (email: string) => void;
};

const WelcomeStep: React.FC<WelcomeStepProps> = ({ onNext }) => {
  const [email, setEmail] = useState("");

  const handleSubmit = () => { 
    if (email) { toast.success("Email submitted successfully!"); 
      onNext(email); 
    } 
    else 
    { 
      toast.error("Please enter a valid email."); 
    } 
  };

  const icons = [
    { name: "Google", image: GoogleIcon, href: "https://google.com" },
    { name: "Instagram", image: InstaIcon, href: "https://instagram.com" },
    { name: "Facebook", image: FaceBookIcon, href: "https://facebook.com" },
    { name: "Apple", image: AppleIcon, href: "https://apple.com" },
  ];

  return (
    <div className="flex flex-grow flex-col space-y-8 p-5">
      <ToastContainer />
      <div className="text-center space-y-2 mt-7">
      <h2 className="text-2xl font-bold leading-[24.72px]">Welcome to Spotlight</h2>
        <p className="text-[rgba(0,0,0,0.66)] text-sm leading-[22px]">
          Sign into your account. If you don't have one, <br />
          you'll be prompted to create one.
        </p>
      </div>

      <div className="w-[304px] space-y-5 flex flex-col items-center justify-center mx-auto">
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Your email"
          className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white text-sm shadow-sm focus:outline-none border border-[#9B9797]"
        />
       <Button onClick={handleSubmit} 
       className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center hover:bg-black" > 
       <span className="flex-grow text-center">Submit</span>
        <Image src={SubmitIcon} alt={""} className="absolute right-2 w-[35px] h-[35px]" /> 
        </Button>
      </div>

      <div className="flex items-center my-4">
        <div className="flex-grow border-t border-[#8D8B8B]"></div>
        <span className="mx-4 text-[#9B9797]">OR</span>
        <div className="flex-grow border-t border-[#8D8B8B]"></div>
      </div>

        
      <div className="flex justify-center gap-[33px] mb-4">
        {icons.map((icon, index) => (
          <a 
          key={index} 
          href={icon.href} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="w-[54px] h-[54px] flex items-center justify-center border-[0.6px] border-[rgba(217, 212, 212, 0.2)] rounded-[3px]" > 
          <Image src={icon.image} alt={icon.name} className="w-6 h-6" /> 
          </a>
        ))}
      </div>


    </div>
  );
};

export default WelcomeStep;
