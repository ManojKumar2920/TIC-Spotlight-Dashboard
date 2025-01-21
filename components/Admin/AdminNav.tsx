"use client";

import { BlueCarIcon, DashboardProfile, MonitorIcon } from '@/components/ReusableComponents/Icon';
import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { fetchUserCampaignsForAdmin } from '../Api/Api';

const AdminNav = () => {
    const [campaigns, setCampaigns] = useState([]);
    const [totalCampaignsCount, setTotalCampaignsCount] = useState(0);
    const [totalActiveCampaignsCount, setTotalActiveCampaignsCount] = useState(0);
    const [totalCabRunsCount, setTotalCabRunsCount] = useState(0);
  
    useEffect(() => {
        const getCampaigns = async () => {
            try {
                const fetchedCampaigns = await fetchUserCampaignsForAdmin();
                setCampaigns(fetchedCampaigns);
                setTotalCampaignsCount(fetchedCampaigns.length);

                // Count total active campaigns
                const activeCampaigns = fetchedCampaigns.filter(
                    (campaign: { status: string; }) => campaign.status === 'Active'
                );
                setTotalActiveCampaignsCount(activeCampaigns.length);

                // Total Cab Runs (sum of totalCars in each campaign)
                const totalCabRuns = fetchedCampaigns.reduce((total: any, campaign: { totalCars: any; }) => {
                    
                    return total + (campaign.totalCars || 0); 
                }, 0);
                setTotalCabRunsCount(totalCabRuns);

            } catch (error) {
                console.error("Error fetching campaigns:", error);
            }
        };

        getCampaigns();
    }, []);
  

    const navContents = [
        { name: 'Total Requests', value: totalCampaignsCount, image: DashboardProfile, growth: '16%' },
        { name: 'Total Cab Runs', value: totalCabRunsCount, image: BlueCarIcon, growth: '-1%' },
        { name: 'Total Active', value: totalActiveCampaignsCount, image: MonitorIcon },
    ];

    return (
        <div className="flex flex-col lg:flex-row items-center p-4 bg-white dark:bg-[#1e1e1e] shadow rounded-lg h-auto lg:h-[185px] gap-6 lg:gap-0">
            {navContents.map((content, index) => (
                <div
                    key={index}
                    className={`flex flex-col lg:flex-row items-center justify-center flex-1 ${index !== navContents.length - 1 ? 'lg:border-r lg:border-gray-300' : ''} p-4 lg:p-0`}
                >
                    <div className="flex items-center justify-center w-[102px] h-[102px] text-center custom-gradient bg-opacity-10 rounded-full shadow-md">
                        <div className="relative w-[50px] h-[50px]">
                            <Image src={content.image} alt={`${content.value} icon`} fill />
                        </div>
                    </div>
                    <div className="flex flex-col lg:ml-4 items-center lg:items-start mt-4 lg:mt-0">
                        <h3 className="text-base text-[#ACACAC]">{content.name}</h3>
                        <p className="text-[#333333] dark:text-white text-2xl font-medium">{content.value}</p>
                        {content.growth && (
                            <span
                                className={`text-sm ${
                                    content.growth.startsWith('-') ? 'text-red-500' : 'text-green-500'
                                }`}
                            >
                                {content.growth.startsWith('-') ? content.growth : `+${content.growth}`}<span className='text-black dark:text-white ml-1'>this month</span>
                            </span>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default AdminNav;
