import AdminNav from '@/components/Admin/AdminNav';
import CustomerRequest from '@/components/Admin/CustomerRequest';
import DashboardTopNav from '@/components/Dashboard/DashboardTopNav';
import { CarIcon, MonitorIcon, Profile2Icon } from '@/components/ReusableComponents/Icon';
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout';
import React from 'react';

const Page = () => {


  return (
    <div>
      <SidebarLayout>
        <div className='flex flex-col gap-x-4 p-3 space-y-7 '>
          <DashboardTopNav title='Welcome Admin' />
        </div>
        <div>
          <AdminNav />
        </div>
        <div className='flex flex-col gap-x-4 p-3 space-y-7 '>
          <CustomerRequest />
        </div>
      </SidebarLayout>
    </div>
  );
};

export default Page;
