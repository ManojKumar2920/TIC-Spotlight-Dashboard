"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Layout from "@/components/ReusableComponents/Siderbar/Layout";
import DashboardTopNav from "@/components/Dashboard/DashboardTopNav";
import CreateAd from "@/components/Home/CreateAd";
import { fetchUserCampaigns } from "@/components/Api/Api";
import AdList from "@/components/Dashboard/AdList";
import Link from "next/link";
import Button from "@/components/ReusableComponents/Button";
import { AddIcon } from "@/components/ReusableComponents/Icon";

const Map = dynamic(() => import("../components/Home/Map"), { ssr: false });

const Page = () => {
  const [campaigns, setCampaigns] = useState([]);

  useEffect(() => {
    const fetchCampaignData = async () => {
      try {
        const response = await fetchUserCampaigns();
        setCampaigns(response);
      } catch (error) {

      }
    };

    fetchCampaignData();
  }, []);

  const hasCampaigns = campaigns.length > 0;

  return (
    <div>
      <Layout>
        <DashboardTopNav title="Welcome" />
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-7 px-3 mt-3 flex-grow h-screen">
          {!hasCampaigns && (
            <div className="flex-1 flex items-center justify-center rounded-[12px] bg-white dark:bg-[#1e1e1e] h-[250px] md:h-auto">
              <CreateAd />
            </div>

          )}
          {hasCampaigns && (
            <div className="flex-1 flex flex-col items-stretch rounded-[12px] bg-white dark:bg-[#1e1e1e] p-4">
              <AdList />
              <div className="flex justify-end items-end mt-auto">
                <Link href="/create-ad">
                  <Button className="bg-[#4F8AFF] hover:bg-[#367ace] w-[50px] h-[50px] text-white rounded-[23px] flex items-center justify-center gap-2 transition duration-300 ease-in-out">
                    <AddIcon className="w-6 h-6" />
                  </Button>
                </Link>
              </div>
            </div>
          )}


          <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white h-[400px] md:h-[200px]">
            <Map />
          </div>
        </div>
      </Layout>
    </div>
  );
};

export default Page;
