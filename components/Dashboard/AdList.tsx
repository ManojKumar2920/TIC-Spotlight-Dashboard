import React, { useState, useEffect } from "react";
import { Clock, Location } from "../ReusableComponents/Icon";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import Link from "next/link";
import { slugify } from "@/app/utils/slugify";
import { useAdDetails } from "@/contexts/AdContext";
import { format } from "date-fns"; // Import date-fns for date formatting
import { fetchUserCampaigns } from "../Api/Api";

type Campaign = {
  _id: string;
  userId: string;
  adType: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  totalCars: number;
  details: string;
  location: string;
  frequency: string;
  timeSlot: string;
  imageUrl: string;
  totalHours: number;
  ratePerHour: number;
  status: string;
  totalAmount: number;
  cgst: number;
  kgst: number;
  gst: number;
  sgst: number;
  grandTotal: number;
  createdAt: Date;
};

const AdList: React.FC = () => {
  const { setSelectedAd } = useAdDetails();

  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => { const getCampaigns = async () => { 
    try { setErrorMessage(null); 
      const data = await fetchUserCampaigns(); 
      console.log(data); 
      if (data?.length > 0) { 
        setCampaigns(data);
       } else { 
        setErrorMessage("No campaigns available."); 
      } 
    } catch (error) 
    { setErrorMessage( 
      error instanceof Error ? error.message : "An unexpected error occurred." );
     } 
    }; 
    getCampaigns(); 
  }, []);

  
  const adStatus = [
    { name: "All" },
    { name: "Active" },
    { name: "Completed" },
    { name: "Pending" },
  ];
  const handleAdClick = (ad: Campaign) => {
    setSelectedAd(ad);
  };

  // Filter campaigns based on selected status
  const filteredCampaigns =
    selectedStatus === "All"
      ? campaigns
      : campaigns.filter((campaign) => campaign.status === selectedStatus);

  return (
    <div className="flex flex-col gap-4 dark:bg-[#1e1e1e] bg-white rounded-lg">
      <div className="flex flex-row items-center gap-4 p-2 text-center justify-between">
        <h1 className="text-lg font-medium">Ad List</h1>
        <div className="hidden md:flex space-x-4">
          {adStatus.map((status, index) => (
            <div
              key={index}
              className={`bg-[#F1F5F9] dark:bg-[#2a2a2a] px-4 py-2 rounded-lg cursor-pointer 
              ${
                selectedStatus === status.name
                  ? "bg-black text-white  dark:bg-neutral-700"
                  : ""
              }`}
              onClick={() => setSelectedStatus(status.name)}
            >
              {status.name}
            </div>
          ))}
        </div>
        <div className="md:hidden">
          <HiMenu
            className="text-2xl cursor-pointer"
            onClick={() => setMenuOpen(!menuOpen)}
          />
        </div>
      </div>

      {menuOpen && (
        <div className="flex flex-col md:hidden lg:hidden bg-[#F1F5F9] dark:bg-[#2a2a2a] rounded-lg p-2 space-y-2">
          {adStatus.map((status, index) => (
            <div
              key={index}
              className={`px-4 py-2 rounded-lg cursor-pointer 
              ${
                selectedStatus === status.name
                  ? "bg-black text-white  dark:bg-neutral-700"
                  : ""
              }`}
              onClick={() => {
                setSelectedStatus(status.name);
                setMenuOpen(false);
              }}
            >
              {status.name}
            </div>
          ))}
        </div>
      )}

      {/* Campaigns List */}
      <div className="p-2 flex flex-row gap-4 flex-wrap">
        {filteredCampaigns.map((campaign, index) => {
          // Format startDate and endDate
          const formattedStartDate = format(
            new Date(campaign.startDate),
            "MMM dd"
          );
          const formattedEndDate = format(
            new Date(campaign.endDate),
            "MMM dd yyyy"
          );

          return (
            <Link
              href={`/dashboard/${slugify(campaign.campaignName)}`}
              onClick={() => handleAdClick(campaign)}
              key={index}
              className="bg-white rounded-lg flex flex-col w-[259px] h-[294px] cursor-pointer border border-gray dark:border-[#1e1e1e] dark:bg-[#1e1e1e] overflow-hidden"
            >
              <div className="flex-1 bg-gray-200 flex items-end justify-start rounded-lg p-4 dark:bg-[#333333] dark:border-[#1e1e1e] dark:text-black">
                <div className="rounded flex items-center">
                  <Image
                    className="bg-white dark:bg-gray-400 rounded-lg flex w-[20px] h-[20px] p-[2px] mr-[10px]"
                    src={Location}
                    alt="Location Icon"
                  />
                  <span className="bg-white dark:bg-gray-400 text-sm rounded flex items-center px-2">
                    <Image src={Clock} alt="Clock Icon" className="mr-2"/>
                    {campaign.timeSlot}
                  </span>
                </div>
              </div>

              <div className="flex-1 bg-white dark:bg-[#2a2a2a] dark:border-[#1e1e1e] p-4 space-y-1">
                <h2 className="text-base font-medium">
                  {campaign.campaignName}
                </h2>
                {/* <p className="text-sm ">{"Ad runs: " + campaign.totalCars}</p> */}
                <p className="text-sm ">
                  {"Total Hours: " + campaign.totalHours || 0}
                </p>
              </div>

              <div className="flex justify-between items-center text-center dark:bg-[#2a2a2a] dark:border-[#1e1e1e] p-2">
                <div className="bg-gray-200 px-2 py-2 rounded-[16px] ">
                  <p className="text-xs">
                    {formattedStartDate} to {formattedEndDate}
                  </p>
                </div>

                <div
                  className={`flex rounded-[16px] px-2 py-1 text-sm dark:text-black ${
                    campaign.status === "Active"
                      ? "bg-green-100"
                      : campaign.status === "Pending"
                      ? "bg-blue-100"
                      : "bg-gray-100"
                  }`}
                >
                  <p>{campaign.status}</p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default AdList;
