"use client";

import AdDetails from "@/components/Dashboard/AdDetails/AdDetails";
import AdList from "@/components/Dashboard/AdList";
import { BarChartComponent } from "@/components/Dashboard/ChartData";
import DashboardNav from "@/components/Dashboard/DashboardNav";
import DashboardTopNav from "@/components/Dashboard/DashboardTopNav";
import { PieChartComponent } from "@/components/Dashboard/PieChart";
import { RadialChartComponent } from "@/components/Dashboard/RadialChart";
import SidebarLayout from "@/components/ReusableComponents/Siderbar/Layout";
import dynamic from "next/dynamic";
import React, { useState } from "react";
const Map = dynamic(() => import('../../components/Home/Map'), { ssr: false });


type Ad = {
  name: string;
  adruns: number;
  status: string;
  date: string;
  time: string;
  totalhours: string;
};

const Page: React.FC = () => {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  // const handleAdClick = (ad: Ad) => {
  //   setSelectedAd(ad);
  // };

  return (
    <div>
      <SidebarLayout>
        <div className="flex flex-col gap-x-4 p-3 space-y-1 flex-grow min-h-screen">
          {selectedAd ? (
            <AdDetails ad={selectedAd} />
          ) : (
            <>
              <div>
                <DashboardTopNav title="Welcome to Dashboard" />
              </div>

              <div>
                <DashboardNav />
              </div>

              <div className="flex flex-col lg:flex-row gap-4 p-3">
                <div className="flex-initial w-full lg:w-2/3">
                  <BarChartComponent />
                </div>

                <div className="flex-initial w-full lg:w-1/3">
                  <PieChartComponent />
                </div>
              </div>

              <div className="flex flex-col lg:flex-row gap-4 p-3">
                <div className="flex-initial w-full lg:w-1/3">
                  <RadialChartComponent />
                </div>

                <div className="flex-initial w-full lg:w-2/3 border rounded-[14px] bg-white  dark:bg-[#1e1e1e] dark:border-[#1e1e1e] p-4 shadow-md">
                  <AdList />
                </div>
              </div>

              <div className="flex flex-col border rounded-[14px] bg-white dark:bg-[#1e1e1e] dark:border-[#1e1e1e] p-4 shadow-md h-[491px]">
                Latitude and Longitude
                <Map />

              </div>

              <div className="flex flex-col border rounded-[14px] bg-white  dark:bg-[#1e1e1e] dark:border-[#1e1e1e] p-4 shadow-md h-[491px]">
                Total Ad plays
                <Map />

              </div>
            </>
          )}
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Page;
