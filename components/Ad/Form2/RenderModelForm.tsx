import Button from '@/components/ReusableComponents/Button';
import { UploadIcon } from '@/components/ReusableComponents/Icon';
import React from 'react';
import Image from 'next/image';

const RenderModelForm = () => {
  return (
    <div className="flex flex-grow flex-col space-y-4 p-4 h-full">
      {/* Section for Upload Media */}
      <div>
        <h1 className="text-xl font-bold">Upload Media</h1>
        <span className="text-sm">Supported Formats: .jpg, .png, VLC</span>
        <div className="mt-2">
          <Button className="bg-transparent w-[210px] text-black rounded-[30px] flex items-center justify-center gap-2 border border-black hover:bg-white">
            Browse
            <Image src={UploadIcon} alt="Upload" width={24} height={24} />
          </Button>
        </div>
      </div>

      <div>
        <h1 className="text-xl font-bold">3D Render Model</h1>
        <div className="flex flex-col space-y-4 p-4 bg-[#FAFBFC] rounded-[16px] h-[250px] mt-2"></div>
      </div>

      <div className="flex text-start mt-auto gap-4">
        <Button className="bg-transparent w-[125px] h-[40px] text-black rounded-[40px] flex items-center justify-center gap-2 border border-black hover:bg-white">
          Back
        </Button>
        <Button className="bg-[#4F8AFF] w-[125px] h-[40px] text-white rounded-[40px] flex items-center justify-center gap-2">
          Proceed
        </Button>
      </div>

    </div>
  );
};

export default RenderModelForm;