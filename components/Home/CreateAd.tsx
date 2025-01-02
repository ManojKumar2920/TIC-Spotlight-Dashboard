import React from 'react'
import { CarIcon, AddIcon } from '../ReusableComponents/Icon'
import Button from '../ReusableComponents/Button'
import Link from 'next/link'
import Image from 'next/image'

function CreateAd() {
    return (
        <div className="flex flex-col items-center justify-center gap-[16px]">
            <div className='flex flex-col items-center gap-[12px]'>
                <Image src={CarIcon} alt="Logo" />
                <div className='flex flex-col items-center gap-[2px]'>
                    <h2 className="text-base font-bold">No ads Created yet.</h2>
                    <span className="text-[#686666] text-center">
                        It seems like you haven't set up any advertisements.
                    </span>
                </div>


            </div>

            <Link href="/create-ad">
                <Button className="bg-[#4F8AFF] w-[200px] h-[44px] text-white rounded-[23px] flex items-center justify-center gap-2">
                    Create Ad <AddIcon className="w-6 h-6" />
                </Button>
            </Link>
        </div>
    )
}

export default CreateAd
