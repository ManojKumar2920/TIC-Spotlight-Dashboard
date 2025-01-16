import Button from '@/components/ReusableComponents/Button';
import React, { useState } from 'react';
import { ToastContainer, toast } from "react-toastify";
import Image from 'next/image';
import { AppleIcon, FaceBookIcon, GoogleIcon, InstaIcon, SubmitIcon } from '@/components/ReusableComponents/Icon';
import Link from 'next/link';


interface StepProps {
  onNext: (name: string) => void;
  initialName: string;
}


const NameStep: React.FC<StepProps> = ({ initialName, onNext }) => {
  const [name, setName] = useState<string>(initialName);

  const handleNext = () => {
    if (name.trim() === '') {
      toast.error("Please enter your name!");
    } else {
      onNext(name);
    }
  };

  const handleRegister = () => { 
       
    const authUrl = `/api/google-auth`; 
    window.location.href = authUrl;
};

  return (
    <div className="flex flex-grow flex-col space-y-6 p-5 dark:bg-[#1e1e1e] min-h-[430px]">
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

        <div className="px-1">
          <Button
          onClick={handleRegister}
            className="relative w-full h-[44px] bg-[#161515] text-white py-2 rounded flex items-center justify-center dark:bg-[#111111] hover:bg-black"
          >
            <span className="flex-grow text-center">Continue With Google</span>
            <div className="absolute left-2 p-2 rounded-full w-[35px] h-[35px] text-white dark:text-black flex items-center justify-center">
              <Image src={GoogleIcon} alt={"logo"} />
            </div>
          </Button>
        </div>




      </div>
    </div>
  );
};

export default NameStep;
