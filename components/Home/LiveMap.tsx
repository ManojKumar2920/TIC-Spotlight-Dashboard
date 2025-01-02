import React from 'react'
import { CarIcon, AddIcon } from '../ReusableComponents/Icon'
import Button from '../ReusableComponents/Button'
import Link from 'next/link'
import Image from 'next/image'
import dynamic from 'next/dynamic';

// const DynamicMap = dynamic(() => import('@/components/Map/Map'), { ssr: false }); 

function LiveMap() {
  return (
    <div className="flex flex-col items-center justify-center space-y-1">
            {/* <DynamicMap /> */}
        </div>
  )
}

export default LiveMap
