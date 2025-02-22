import React from 'react';
import { LeftIcon } from '../../ReusableComponents/Icon';
import Link from 'next/link';

const CampaignTopNav = () => {
  return (
    <div className="flex items-center justify-between h-[48px] bg-transparent text-black dark:text-white px-4">
            <div className="font-bold leading-[26px] text-2xl md:font-bold  md:leading-[48px]">Create a New Ad</div>

            <div className="flex items-center space-x-5">
              <Link href={'/'}>
              <div className="w-5 h-5">
                    <LeftIcon />
                </div>
              </Link>

            </div>
        </div>
  )
}

export default CampaignTopNav
