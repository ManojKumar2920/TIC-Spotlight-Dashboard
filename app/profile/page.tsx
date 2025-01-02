import UserDetails from '@/components/Profile/UserDetails'
import SidebarLayout from '@/components/ReusableComponents/SidebarLayout'
import React from 'react'

const page = () => {


  return (
    <div>
        <SidebarLayout>
            <UserDetails />
        </SidebarLayout>
      
    </div>
  )
}

export default page
