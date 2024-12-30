import CampaignDetailsForm from '@/components/Ad/Form1/CampaignDetailsForm'
import CampaignTopNav from '@/components/Ad/Form1/CampaignTopNav'
import ParameterForm from '@/components/Ad/Form1/ParameterForm'
import OrderSummary from '@/components/Ad/Form2/OrderSummary'
import OrderSummaryTopNav from '@/components/Ad/Form2/OrderSummaryTopNav'
import RenderModelForm from '@/components/Ad/Form2/RenderModelForm'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import React from 'react'

const page = () => {
  return (
    <div>
            <SidebarLayout>
                <OrderSummaryTopNav />
                <div className="flex gap-x-4 pl-3 pr-3 mt-3 flex-grow h-screen">
                    <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white">
                        <RenderModelForm />
                    </div>
                    <div className="flex-1 flex items-stretch justify-center rounded bg-white ">
                        <OrderSummary/>
                    </div>
                </div>
            </SidebarLayout>

        </div>
  )
}

export default page
