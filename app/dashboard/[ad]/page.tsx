"use client";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { RadialChartComponent } from "@/components/Dashboard/RadialChart";
import Button from "@/components/ReusableComponents/Button";
import { Download as DownloadIcon } from "lucide-react";
import dynamic from "next/dynamic";
import Layout from '@/components/ReusableComponents/Siderbar/Layout'
import { useAdDetails } from "@/contexts/AdContext";
const Map = dynamic(() => import("@/components/Home/Map"), { ssr: false });


const AdDetails: React.FC = () => {
  const { selectedAd } = useAdDetails();
  if (!selectedAd) return <div>No Ad Selected</div>;

  return (
    <Layout>
      <div className="flex flex-col space-y-6">
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>Ad Details</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>

        <div className="flex flex-col md:flex-row gap-4 p-2">
          <div className="flex-1">
            <RadialChartComponent />
          </div>
          <div className="flex-1">
            <RadialChartComponent />
          </div>
          <div className="flex-1">
            <RadialChartComponent />
          </div>
        </div>

        <div className="flex flex-col gap-4 p-2 md:flex-row">
          <div className="flex-1 p-3 border rounded-lg bg-white shadow-md h-auto md:h-[336px] dark:bg-[#1e1e1e] dark:border-[#1e1e1e]"></div>

          <div className="flex-1 p-3 border sm:flex rounded-lg bg-white shadow-md flex flex-col justify-between dark:bg-[#1e1e1e] dark:border-[#1e1e1e]">
            <div className="flex flex-col space-y-2 items-start">
              <h2 className="text-base font-bold">Ad Details</h2>
              <p className="text-sm">AD Status: {selectedAd.status}</p>
              <p className="text-sm">Preferred timing: {selectedAd.time}</p>
              <p className="text-sm">
                Preferred Location: KK Nagar, T Nagar, Anna Nagar
              </p>
              <span className="bg-gray-200 dark:bg-[#2a2a2a] px-2 py-1 rounded-sm inline">
                Date: {selectedAd.date}
              </span>
            </div>

            <div className="flex flex-col sm:flex-row justify-between gap-4">
              <Button className="bg-transparent w-full sm:w-[210px] text-black dark:text-white rounded-[30px] flex items-center justify-center gap-2 border border-black dark:border-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a]">
                View Invoice
              </Button>

              <Button className="bg-transparent w-full sm:w-[210px] text-black dark:text-white rounded-[30px] flex items-center justify-center gap-2 border border-black dark:border-white hover:bg-gray-200 dark:hover:bg-[#2a2a2a]">
                Download Invoice
                <DownloadIcon className="text-black dark:text-white" />
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div className="flex flex-col border rounded-[14px] bg-white p-4 shadow-md h-[491px] dark:bg-[#1e1e1e] dark:border-[#1e1e1e]">
            Latitude and Longitude
            <Map />
          </div>

          <div className="flex flex-col border rounded-[14px] bg-white p-4 shadow-md h-[491px] dark:bg-[#1e1e1e] dark:border-[#1e1e1e]">
            Total Ad plays
            <Map />
          </div>
        </div>
      </div>


    </Layout>

  );
};

export default AdDetails;
