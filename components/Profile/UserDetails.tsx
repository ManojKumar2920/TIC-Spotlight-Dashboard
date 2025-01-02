"use client";
import React, { useState } from 'react'
import { companyProfileIcon, profileAddIcon } from '../ReusableComponents/Icon'
import Image from 'next/image'
import LabelInput from '../ReusableComponents/LabelInput'
import Button from '../ReusableComponents/Button'

const UserDetails = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        companyName: "",
        gstn: "",
        companyAddress: "",
        billingAddress: ""
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prevFormData => ({
            ...prevFormData,
            [name]: value
        }));
    };

    return (
        <div className='flex flex-col items-start p-8 space-y-8'>
            <h2 className="text-3xl font-semibold mb-6">Profile Management</h2>

            <div className='flex flex-wrap gap-8 justify-between w-full'>
                <div className="flex flex-col items-start w-[273px] h-[228px] rounded-lg  bg-white  p-5">
                    <span className="text-lg font-medium text-gray-700 mb-3">Company Logo</span>
                    <div className="relative w-[130px] h-[130px] mb-3">
                        <div className="border bg-[#D9D9D9] flex justify-center items-center w-[130px] h-[130px] ">
                            <Image src={companyProfileIcon} alt="Company Logo" className="object-cover" />
                        </div>

                        <Image
                            src={profileAddIcon}
                            alt="Add Icon"
                            className="absolute bottom-0 right-0 w-8 h-8 cursor-pointer"
                        />
                    </div>
                    <span className="text-sm text-gray-500">Add your company logo</span>
                </div>


                <div className="flex flex-wrap gap-6 w-full sm:w-[calc(100%-320px)] justify-between rounded-lg  bg-white  p-5">
                    <LabelInput
                        labelText="Name"
                        htmlFor="name"
                        type="text"
                        value={formData.name}
                        name="name"
                        onChange={handleChange}
                        placeholder="John Doe"

                    />
                    <LabelInput
                        labelText="Email ID"
                        htmlFor="email"
                        type="email"
                        value={formData.email}
                        name="email"
                        onChange={handleChange}
                        placeholder="example@gmail.com"

                    />
                    <LabelInput
                        labelText="Phone Number"
                        htmlFor="phone"
                        type="text"
                        value={formData.phone}
                        name="phone"
                        onChange={handleChange}
                        placeholder="123-456-7890"

                    />
                    <LabelInput
                        labelText="Company Name"
                        htmlFor="companyName"
                        type="text"
                        value={formData.companyName}
                        name="companyName"
                        onChange={handleChange}
                        placeholder="Company Name"

                    />
                    <LabelInput
                        labelText="GSTN"
                        htmlFor="gstn"
                        type="text"
                        value={formData.gstn}
                        name="gstn"
                        onChange={handleChange}
                        placeholder="GSTN"

                    />
                </div>
            </div>

            {/* Address Section */}
            <div className='flex flex-col space-y-5 w-full bg-white rounded-lg  p-5'>
                <LabelInput
                    labelText="Company Address"
                    htmlFor="companyAddress"
                    type="text"
                    value={formData.companyAddress}
                    name="companyAddress"
                    onChange={handleChange}
                    placeholder="Company address"

                />
                <LabelInput
                    labelText="Billing Address"
                    htmlFor="billingAddress"
                    type="text"
                    value={formData.billingAddress}
                    name="billingAddress"
                    onChange={handleChange}
                    placeholder="Billing address"

                />

                <div className='mt-6'>
                    <Button className="bg-blue-600 rounded-full w-[180px] py-2 text-center text-white text-lg">
                        Update Profile
                    </Button>
                </div>
            </div>


        </div>
    )
}

export default UserDetails;
