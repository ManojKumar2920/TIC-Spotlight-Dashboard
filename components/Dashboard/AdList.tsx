"use client";
import React, { useState } from "react";
import { Clock, Location } from "../ReusableComponents/Icon";
import Image from "next/image";

type Ad = {
  name: string;
  adruns: number;
  status: string;
  date: string;
  time: string;
  totalhours: string;
};

type AdListProps = {
  onAdClick: (ad: Ad) => void;
};

const AdList: React.FC<AdListProps> = ({ onAdClick }) => {
  const adStatus = [
    { name: "All" },
    { name: "Active" },
    { name: "Completed" },
    { name: "Waiting" },
  ];

  const adList: Ad[] = [
    {
      name: "Ad 1",
      adruns: 0,
      status: "Waiting",
      date: "12 Dec to 14 Dec 2024",
      time: "Evening 1PM - 11PM",
      totalhours: "0 hrs",
    },
    {
      name: "Ad 2",
      adruns: 0,
      status: "Active",
      date: "12 Dec to 14 Dec 2024",
      time: "Evening 1PM - 11PM",
      totalhours: "0 hrs",
    },
  ];

  const [selectedStatus, setSelectedStatus] = useState<string>("All");

  const filteredAdList =
    selectedStatus === "All"
      ? adList
      : adList.filter((ad) => ad.status === selectedStatus);

  return (
    <div className="flex flex-col gap-4 dark:bg-[#1e1e1e] bg-white  rounded-lg">
      <div className="flex flex-row items-center gap-4 p-2 text-center justify-between">
        <h1 className="text-lg font-medium">Ad List</h1>
        <div className="flex space-x-4">
          {adStatus.map((status, index) => (
            <div
              key={index}
              className={`bg-[#F1F5F9] dark:bg-[#2a2a2a] px-4 py-2 rounded-lg cursor-pointer 
  ${selectedStatus === status.name ? "bg-black text-white  dark:bg-neutral-700 " : ""}
`}
onClick={() => setSelectedStatus(status.name)}
            >
              {status.name}
            </div>
          ))}
        </div>
      </div>
      <div className="p-2 flex flex-row gap-4 flex-wrap dar ">
        {filteredAdList.map((ad, index) => (
          <div
            key={index}
            className="bg-white dark:bg[#1e1e1e] rounded-lg flex flex-col w-[259px] h-[294px] cursor-pointer"
            onClick={() => onAdClick(ad)}
          >
            <div className="flex-1 bg-gray-200 flex items-end justify-start p-4 dark:bg-[#333333] dark:border-[#1e1e1e] dark:text-black">
  <div className="rounded flex items-center">
    <Image
      className="bg-white dark:bg-gray-400 rounded flex w-[20px] h-[20px] p-[2px] mr-[10px]"
      src={Location}
      alt="Location Icon"
    />
    <span className="bg-white dark:bg-gray-400  text-sm rounded flex items-center">
      <Image src={Clock} alt="Clock Icon" className="mr-1" />
      {ad.time}
    </span>
  </div>
</div>

            <div className="flex-1 bg-white dark:bg-[#2a2a2a] dark:border-[#1e1e1e] p-4">
              <h2 className="text-sm font-medium">{ad.name}</h2>
              <p className="text-cs font-medium">{ad.totalhours}</p>
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
