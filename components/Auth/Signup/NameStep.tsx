import Button from '@/components/ReusableComponents/Button';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image';
import { AppleIcon, FaceBookIcon, GoogleIcon, InstaIcon, SubmitIcon } from '@/components/ReusableComponents/Icon';
import Link from 'next/link';


interface StepProps {
  onNext: (name: string) => void;
}

 const icons = [
    { name: "Google", image: GoogleIcon, href: "https://google.com" },
    { name: "Instagram", image: InstaIcon, href: "https://instagram.com" },
    { name: "Facebook", image: FaceBookIcon, href: "https://facebook.com" },
    { name: "Apple", image: AppleIcon, href: "https://apple.com" },
  ];

const NameStep: React.FC<StepProps> = ({ onNext }) => {
  const [name, setName] = useState('');

  const handleNext = () => {
    if (name.trim() === '') {
      toast.error("Please enter your name!");
    } else {
      onNext(name);
    }
  };

  return (
    <div className="flex flex-grow flex-col space-y-6 p-5 dark:bg-[#1e1e1e] h-[430px]">
      <ToastContainer />
      <div className="text-center space-y-2 mt-7">
        <h2 className="text-2xl font-bold leading-[24.72px]">
          Welcome to Spotlight
        </h2>
        <p className="text-[rgba(0,0,0,0.66)] dark:text-white text-sm leading-[22px]">
          Sign into your account. If you don&apos;t have one, <br />
          you&apos;ll be prompted to create one.
        </p>
      </div>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Name"
        className="font-medium block w-full h-[44px] px-4 py-2 rounded-[25px] bg-white dark:bg-[#333333] text-sm shadow-sm focus:outline-none border border-[#9B9797]"
      />
       <Button
        onClick={handleNext}
        className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center hover:bg-black"
      >
        <span className="flex-grow text-center">Continue</span>
        <Image
          src={SubmitIcon}
          alt={""}
          className="absolute right-2 w-[35px] h-[35px]"
        />
      </Button>

      <div className="space-y-5">
        <div className="flex items-center my-2">
          <div className="flex-grow border-t border-[#8D8B8B]"></div>
          <span className="mx-4 text-[#9B9797]">OR</span>
          <div className="flex-grow border-t border-[#8D8B8B]"></div>
        </div>


        <Link href='/auth/signin'>
          <div className="text-center mt-5">
            <span>Already have an account? </span>
            <span className="font-medium">Login here</span>
          </div>
        </Link>
        
        <div className="flex justify-center gap-[33px]">
          {icons.map((icon, index) => (
            <a
              key={index}
              href={icon.href}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[54px] h-[54px] flex items-center justify-center dark:bg-[#333333] rounded-[3px] border"
            >
              <Image src={icon.image} alt={icon.name} className="w-6 h-6 " />
            </a>
          ))}
        </div>

      </div>
    </div>
  );
};

export default NameStep;
