import React, { useRef } from 'react';
import Button from '@/components/ReusableComponents/Button';
import { Download as UploadIcon } from 'lucide-react';
import Image from 'next/image';

type RenderModelFormProps = {
  onBack: () => void;
};

const RenderModelForm: React.FC<RenderModelFormProps> = ({ onBack }) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);


  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("Selected file:", file);
      
    }
  };

  
  const handleBrowseClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-grow flex-col space-y-4 p-4 h-full dark:bg-[#1e1e1e]">
      {/* Section for Upload Media */}
      <div>
        <h1 className="text-xl font-bold">Upload Media</h1>
        <span className="text-sm">Supported Formats: .jpg, .png, .vlc</span>
        <div className="mt-2">
          <Button
            className="bg-transparent w-[210px] text-black dark:text-white rounded-[30px] flex items-center justify-center gap-2 border border-black dark:border-white"
            onClick={handleBrowseClick} 
          >
            Browse
            <UploadIcon width={20} height={20} />
          </Button>
        </div>
       
        <input
          type="file"
          ref={fileInputRef}
          className="hidden"
          accept="image/*, .vlc" 
          onChange={handleFileChange}
        />
      </div>


      <div>
        <h1 className="text-base font-bold ">3D Render Model</h1>
        <div className="flex flex-col space-y-4 p-4 bg-[#FAFBFC] dark:bg-[#333333] rounded-[16px] h-[250px] mt-2">
          
        </div>
      </div>

    
      <div className="flex text-start mt-auto gap-4">
        <Button
          onClick={onBack}
          className="bg-transparent w-[125px] h-[40px] text-black dark:text-white rounded-[40px] flex items-center justify-center gap-2 border border-black dark:border-white"
        >
          Back
        </Button>
        <Button
          className="bg-[#4F8AFF] w-[125px] h-[40px] text-white rounded-[40px] flex items-center justify-center gap-2"
        >
          Proceed
        </Button>
      </div>
    </div>
  );
};

export default RenderModelForm;
