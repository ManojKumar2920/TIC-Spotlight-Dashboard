"use client";

import CreateAd from "@/components/Home/CreateAd";
import TopNav from "@/components/Home/TopNav";
import Layout from "@/components/ReusableComponents/Siderbar/Layout";
import dynamic from "next/dynamic";
import React from "react";
const Map = dynamic(() => import("../components/Home/Map"), { ssr: false });

const page = () => {
  return (
    <div>
      <Layout>
        <TopNav text="Welcome" />
        <div className="flex flex-col md:flex-row gap-y-4 md:gap-x-7 px-3 mt-3 flex-grow h-screen">
          
          <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white dark:bg-[#1e1e1e] h-[250px] md:h-auto">
            <CreateAd />
          </div>
          
          <div className="flex-1 flex items-stretch justify-center rounded bg-white h-[250px] md:h-[200px]">
            <Map />
          </div>
        
        </div>
      </Layout>
    </div>
  );
};

export default page;
