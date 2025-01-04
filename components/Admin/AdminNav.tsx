import { BlueCarIcon, DashboardProfile, MonitorIcon, } from '@/components/ReusableComponents/Icon';
import React from 'react';
import Image from 'next/image';

const AdminNav = () => {
  const navContents = [
    { name: 'Total Requests', value: '5,432', image:DashboardProfile,  growth: '16%' },
    { name: 'Total Cab Runs', value: '1,893', image: BlueCarIcon, growth: '-1%' },
    { name: 'Total Active', value: '189', image: MonitorIcon,  },
  ];

  return (
    <div className="flex items-center p-4 bg-white dark:bg-[#1e1e1e] shadow rounded-lg h-[185px]">
      {navContents.map((content, index) => (
        <div
          key={index}
          className={`flex items-center px-4 flex-1 ${index !== navContents.length - 1 ? 'border-r border-gray-300' : ''}`}
        >
          <div className="w-[102px] h-[102px] flex justify-center text-center items-center custom-gradient bg-opacity-10 rounded-full shadow-md">
            <div className="relative w-[50px] h-[50px]">
              <Image src={content.image} alt={`${content.value} icon`} layout="fill" objectFit="contain" />
            </div>
          </div>
          <div className="flex flex-col ml-4">
            <h3 className="text-base text-[#ACACAC]">{content.name}</h3>
            <p className="text-[#333333] dark:text-white text-2xl font-medium">{content.value}</p>
            {content.growth && (
              <span
                className={`text-sm ${
                  content.growth.startsWith('-') ? 'text-red-500' : 'text-green-500'
                }`}
              >
                {content.growth.startsWith('-') ? content.growth : `+${content.growth}`}<span className=' text-black dark:text-white ml-1'>this month</span>
              </span>
            )}
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminNav;
