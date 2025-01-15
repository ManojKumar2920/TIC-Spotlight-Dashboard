"use client";

import React, { useState, } from "react";
import { Clock, Location } from "../ReusableComponents/Icon";
import Image from "next/image";
import { HiMenu } from "react-icons/hi";
import { slugify } from "@/app/utils/slugify";
import { useAdDetails } from "@/contexts/AdContext";
import { useRouter } from "next/navigation";

type Ad = {
  name: string;
  adruns: number;
  status: string;
  date: string;
  time: string;
  totalhours: string;
};



const AdList: React.FC = ({ }) => {
  const { setSelectedAd } = useAdDetails();
  const router = useRouter();

  const adStatus = [
    { name: "All" },
    { name: "Active" },
    { name: "Completed" },
    { name: "Waiting" },
  ];

  const adList: Ad[] = [
    {
      name: "Ad for New Product Launch",
      adruns: 5,
      status: "Active",
      date: "20 Jan to 25 Jan 2025",
      time: "Morning 9AM - 6PM",
      totalhours: "30 hrs",
    },
    {
      name: "Seasonal Discount Sale",
      adruns: 3,
      status: "Waiting",
      date: "1 Feb to 10 Feb 2025",
      time: "Afternoon 12PM - 9PM",
      totalhours: "18 hrs",
    },
    {
      name: "Flash Sale - Limited Time Offer",
      adruns: 0,
      status: "Completed",
      date: "5 Dec to 7 Dec 2024",
      time: "Evening 6PM - 11PM",
      totalhours: "25 hrs",
    },
    {
      name: "Holiday Special Campaign",
      adruns: 10,
      status: "Active",
      date: "1 Jan to 15 Jan 2025",
      time: "All Day",
      totalhours: "150 hrs",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>("All");
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const filteredAdList =
    selectedStatus === "All"
      ? adList
      : adList.filter((ad) => ad.status === selectedStatus);

  const handleAdClick = (ad: Ad) => {
    setSelectedAd(ad);
    router.push(`/dashboard/${slugify(ad.name)}`);
  };

  return (
    <div className="flex flex-col gap-4 dark:bg-[#1e1e1e] bg-white rounded-lg">
      <div className="flex flex-row items-center gap-4 p-2 text-center justify-between">
        <h1 className="text-lg font-medium">Ad List</h1>
        <div className="hidden md:flex space-x-4">
          {adStatus.map((status, index) => (
            <div
              key={index}
              className={`bg-[#F1F5F9] dark:bg-[#2a2a2a] px-4 py-2 rounded-lg cursor-pointer 
              ${selectedStatus === status.name
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
              ${selectedStatus === status.name
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
      {/* Adlist */}
      <div className="p-2 flex flex-row gap-4 flex-wrap">
        {filteredAdList.map((ad, index) => (

          <div
            key={index}
            className="bg-white rounded-lg flex flex-col w-[259px] h-[294px] cursor-pointer border border-gray dark:border-[#1e1e1e] dark:bg-[#1e1e1e] overflow-hidden"
            onClick={() => handleAdClick(ad)}
          >
            <div className="flex-1 bg-gray-200 flex items-end justify-start rounded-lg p-4 dark:bg-[#333333] dark:border-[#1e1e1e] dark:text-black">
              <div className="rounded flex items-center">
                <Image
                  className="bg-white dark:bg-gray-400 rounded-lg flex w-[20px] h-[20px] p-[2px] mr-[10px]"
                  src={Location}
                  alt="Location Icon"
                />
                <span className="bg-white dark:bg-gray-400 text-sm rounded flex items-center">
                  <Image src={Clock} alt="Clock Icon" className="mr-1" />
                  {ad.time}
                </span>
              </div>
            </div>

            <div className="flex-1 bg-white dark:bg-[#2a2a2a] dark:border-[#1e1e1e] p-4">
              <h2 className="text-sm font-medium">{ad.name}</h2>
              <p className="text-sm font-medium">{"Ad runs: " + ad.adruns}</p>
              <p className="text-sm font-medium">
                {"Total Hours: " + ad.totalhours}
              </p>
            </div>

            <div className="flex justify-between items-center text-center dark:bg-[#2a2a2a] dark:border-[#1e1e1e] p-2">
              <p className="text-xs">{ad.date}</p>
              <div
                className={`flex rounded-lg p-1 text-sm dark:text-black ${ad.status === "Active"
                  ? "bg-green-100"
                  : ad.status === "Waiting"
                    ? "bg-blue-100"
                    : "bg-gray-100"
                  }`}
              >
                <p>{ad.status}</p>
              </div>
            </div>
          </div>

        ))}
      </div>
    </div>
  );
};

export default AdList;
