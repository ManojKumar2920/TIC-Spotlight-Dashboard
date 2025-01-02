import TopNav from '@/components/Home/TopNav'
import InvoiceList from '@/components/Invoice/InvoiceList'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import React from 'react'

const page = () => {

  return (
    <div>
        <SidebarLayout>
          <div className='space-y-4'>
          <TopNav text="Invoice" />
  
            <InvoiceList />
          </div>
          
    </SidebarLayout>
      
    </div>
  )
}

export default page
