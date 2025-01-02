import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { HalfCircleChart } from "./TotalBudgetChart";
import { RadialChartComponent } from "../RadialChart";
import Button from "@/components/ReusableComponents/Button";
import { UploadIcon } from "@/components/ReusableComponents/Icon";
import Image from "next/image";

type Ad = {
  name: string;
  adruns: number;
  status: string;
  date: string;
  time: string;
  totalhours: string;
};

type AdDetailsProps = {
  ad: Ad;
};

const AdDetails: React.FC<AdDetailsProps> = ({ ad }) => {
  return (
    <div className="flex flex-col space-y-7">
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

      <div className="flex flex-row gap-4 p-3 ">
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

      <div className="flex flex-col md:flex-row gap-4">
        <div className="flex-1 p-4 border rounded-lg bg-white shadow-md h-[336px]"></div>

        <div className="flex-1 p-4 border rounded-lg bg-white shadow-md h-[336px] flex flex-col justify-between">
          <div className="flex flex-col space-y-2 items-start">
            <h2 className="text-base font-bold">Ad Details</h2>
            <p className="text-sm">AD Status: {ad.status}</p>
            <p className="text-sm">Preferred timing: {ad.time}</p>
            <p className="text-sm">
              Preferred Location: KK Nagar, T Nagar, Anna Nagar
            </p>
            <span className="bg-gray-200 px-2 py-1 rounded-sm inline">
              {" "}
              Date: {ad.date}{" "}
            </span>
          </div>

          <div className="flex flex-row justify-between gap-4">
            <Button className="bg-transparent w-[210px] text-black rounded-[30px] flex items-center justify-center gap-2 border border-black hover:bg-white">
              View Invoice
            </Button>

            <Button className="bg-transparent w-[210px] text-black rounded-[30px] flex items-center justify-center gap-2 border border-black hover:bg-white">
              Download invoice
              <Image src={UploadIcon} alt="Upload" width={24} height={24} />
            </Button>
          </div>
        </div>
      </div>

      <div className="flex flex-row border rounded-[14px] bg-white p-4 shadow-md h-[491px]">
        Latitude and Longitude
      </div>

      <div className="flex flex-row border rounded-[14px] bg-white p-4 shadow-md h-[491px]">
        Total Ad plays
      </div>
    </div>
  );
};

export default AdDetails;
