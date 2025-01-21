"use client";

import React, { useState, useEffect } from 'react';
import { VioletRupee, YellowClock, GreenGraph } from '@/components/ReusableComponents/Icon';
import Image from 'next/image';

interface Campaign {
  totalBudget: number;
  totalHours: string;
}

const DashboardNav = () => {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);


  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);

      const response = await fetch("/api/user-campaigns", { method: "GET" });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Failed to fetch campaigns.");
      }

      if (data.campaigns?.length > 0) {
        setCampaigns(data.campaigns);
      } else {
        setErrorMessage("No campaigns available.");
      }
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : "An unexpected error occurred.");
    } finally {
      setIsLoading(false);
    }
  };

  // Calculate the total budget and total hours
  const getTotalBudget = () => {
    return campaigns.reduce((sum, campaign) => {
      // Check if 'totalBudget' exists and is a valid number, if not skip it
      if (typeof campaign.totalBudget === 'number' && !isNaN(campaign.totalBudget)) {
        return sum + campaign.totalBudget;
      }
      return sum; // Skip this campaign if 'totalBudget' doesn't exist or is invalid
    }, 0);
  };
  const getTotalHours = () => {
    return campaigns.reduce((sum, campaign) => sum + parseFloat(campaign.totalHours), 0).toFixed(2);
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Update navItems with the calculated total values
  const updatedNavItems = [
    {
      label: 'Total Budget',
      value: getTotalBudget(),
      image: VioletRupee,
      bgColor: 'bg-[#8280FF]',
    },
    {
      label: 'Total Hours',
      value: getTotalHours(),
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
    <div className="flex flex-col lg:flex-row lg:space-x-5 space-y-5 lg:space-y-0 p-5 justify-center items-center">
      {updatedNavItems.map((item, index) => (
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
              <Image src={item.image} alt={`${item.label} icon`} fill />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DashboardNav;
