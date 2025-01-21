import DashboardTopNav from '@/components/Dashboard/DashboardTopNav'
import InvoiceList from '@/components/Invoice/InvoiceList'
import SidebarLayout from '@/components/ReusableComponents/Siderbar/Layout'
import React from 'react'

const page = () => {

  return (
    <div>
        <SidebarLayout>
          <div className='space-y-4 '>
          <DashboardTopNav title="Invoice" />
  
            <InvoiceList />
          </div>
          
    </SidebarLayout>
      
    </div>
  )
}

export default page


