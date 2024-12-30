import React from 'react'
import Image from 'next/image'
import { LeftIcon } from '../../ReusableComponents/Icon'

const CampaignTopNav = () => {
  return (
    <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
            <div className="text-lg font-medium">Create a New Ad</div>

            <div className="flex items-center space-x-5">
                <div className="w-5 h-5">
                    <LeftIcon />
                </div>
            </div>
        </div>
  )
}

export default CampaignTopNav
