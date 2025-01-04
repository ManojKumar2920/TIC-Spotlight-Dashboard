import React from 'react'
import Image from 'next/image'
import { NotificationIcon, ProfileIcon2 } from '../ReusableComponents/Icon'

interface TopNavProps {
    text: string; 
}

const TopNav: React.FC<TopNavProps> = ({ text }) => {
    return (
        <div className="flex items-center justify-between h-[48px] bg-transparent text-black dark:text-white px-4">
            <div className="text-2xl font-bold leading-[48px]">{text}</div>

            <div className="flex items-center space-x-5">
                <div>
                    <NotificationIcon className='w-6 h-6'/>
                </div>
                <div>
                    <ProfileIcon2 className='w-6 h-6' />
                </div>
            </div>
        </div>
    )
}

export default TopNav
