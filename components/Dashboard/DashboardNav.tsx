import React from 'react';
import { VioletRupee, YellowClock, GreenGraph } from '@/components/ReusableComponents/Icon';
import Image from 'next/image';

const DashboardNav = () => {
  const navItems = [
    {
      label: 'Total Budget',
      value: '40,689',
      image: VioletRupee,
      bgColor: 'bg-[#8280FF]', 
    },
    {
      label: 'Total Hours',
      value: '0 hours',
      image: YellowClock,
      bgColor: 'bg-[#FEC53D]', 
    },
    {
      label: 'Total Ad Plays',
      value: '0',
      image: GreenGraph,
      bgColor: 'bg-[#4AD991]', 
    },
  ];

  return (
    <div className="flex flex-row space-x-5 p-5">
      {navItems.map((item, index) => (
        <div
          key={index}
          className="w-full h-[107px] flex justify-between items-center gap-0 rounded-[14px] bg-white dark:bg-[#1e1e1e] p-4 shadow-md"
        >
          <div className="flex flex-col">
            <div className="text-sm text-gray-600 mb-1 dark:text-white">{item.label}</div>
            <div className="text-xl font-bold text-gray-800 dark:text-white">{item.value}</div>
          </div>
          <div className={`w-[60px] h-[60px] flex justify-center items-center ${item.bgColor} bg-opacity-10 rounded-[23px] shadow-md`}>
            <div className="relative w-8 h-8">
              <Image src={item.image} alt={`${item.label} icon`} layout="fill" objectFit="contain" />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardNav;
