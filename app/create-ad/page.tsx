import CampaignDetailsForm from '@/components/Ad/Form1/CampaignDetailsForm'
import CampaignTopNav from '@/components/Ad/Form1/CampaignTopNav'
import ParameterForm from '@/components/Ad/Form1/ParameterForm'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import React from 'react'

const page = () => {
    return (
        <div>
            <SidebarLayout>
                <CampaignTopNav />
                <div className="flex gap-x-4 pl-3 pr-3 mt-3 flex-grow h-screen">
                    <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white overflow-hidden">
                        <div className="w-full">
                            <CampaignDetailsForm />
                        </div>
                    </div>
                    <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white overflow-hidden">
                        <div className="w-full">
                            <ParameterForm />
                        </div>
                    </div>
                </div>
            </SidebarLayout>

        </div>
    )
}

export default page
