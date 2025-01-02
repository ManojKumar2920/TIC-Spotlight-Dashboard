import CreateAd from '@/components/Home/CreateAd'
import LiveMap from '@/components/Home/LiveMap'
import TopNav from '@/components/Home/TopNav'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import React from 'react'

const page = () => {


    return (
        <div>
            <SidebarLayout>
                <TopNav text="Welcome" />
                <div className="flex gap-x-4 pl-3 pr-3 mt-3 flex-grow h-screen">
                    <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white">
                        <CreateAd />
                    </div>
                    <div className="flex-1 flex items-stretch justify-center rounded bg-white ">
                        <LiveMap />
                    </div>
                </div>
            </SidebarLayout>

        </div>
    )
}

export default page
