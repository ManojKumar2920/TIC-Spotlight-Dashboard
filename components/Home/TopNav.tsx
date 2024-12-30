import React from 'react'
import Image from 'next/image'
import { NotificationIcon, ProfileIcon, ProfileIcon2 } from '../ReusableComponents/Icon'

function TopNav() {
    return (
        <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
            <div className="text-lg font-medium">Welcome</div>

            <div className="flex items-center space-x-5">
                <div className="w-5 h-5">
                    <Image src={NotificationIcon} alt="Notification"  />
                </div>
                <div className="w-6 h-6">
                    <Image src={ProfileIcon2} alt="Profile" />
                </div>
            </div>
        </div>
    )
}

export default TopNav
