"use client";

import CreateAd from '@/components/Home/CreateAd'
import TopNav from '@/components/Home/TopNav'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import dynamic from 'next/dynamic';
import React from 'react'
import Map from "../components/Map/Map";

// const Map = dynamic(() => import('../components/Map/Map'),
//  { loading: () =>
//      <p>Loading...</p>, 
//      ssr: false,
//      });
     
const page = () => {
    return (
        <div>
            <SidebarLayout>
                <TopNav text="Welcome" />
                <div className="flex gap-x-4 pl-3 pr-3 mt-3 flex-grow h-screen">
                    <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white dark:bg-[1e1e1e] ">
                        <CreateAd />
                    </div>
                    <div className="flex-1 flex items-stretch justify-center rounded bg-white  ">
                    <Map />
                    </div>
                </div>
            </SidebarLayout>

        </div>
    )
}

export default page
