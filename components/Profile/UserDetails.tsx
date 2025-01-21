"use client";

import React, { useState, useEffect } from "react";
import { companyProfileIcon, profileAddIcon } from "../ReusableComponents/Icon";
import Image from "next/image";
import LabelInput from "../ReusableComponents/LabelInput";
import Button from "../ReusableComponents/Button";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; // Import the toast styles
import { useRef } from "react";
import { fetchUserProfile, updateProfile } from "../Api/Api";

const UserDetails = () => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  // State to store form data and the user details fetched
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    companyName: "",
    gstn: "",
    companyAddress: "",
    billingAddress: "",
  });

  const [loading, setLoading] = useState(false);

  // Fetch user profile data
  useEffect(() => {
    const getUserProfile = async () => {
      try {
        const userData = await fetchUserProfile();
        setFormData({
          name: userData.name || "",
          email: userData.email || "",
          phoneNumber: userData.phoneNumber || "",
          companyName: userData.companyName || "",
          gstn: userData.gstn || "",
          companyAddress: userData.companyAddress || "",
          billingAddress: userData.billingAddress || "",
        });
      } catch (error) {
        console.error("Error fetching user profile:", error);
      }
    };
    getUserProfile();
  }, []);

  // Update user profile
  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      const result = await updateProfile({
        phoneNumber: formData.phoneNumber,
        companyName: formData.companyName,
        gstn: formData.gstn,
        companyAddress: formData.companyAddress,
        billingAddress: formData.billingAddress,
      });
      if (result.success) {
        toast.success(result.message);
      } else {
        toast.error(result.message);
      }
    } catch (error: any) {
      toast.error("An unexpected error occurred. Please try again.");
      console.error("Error updating profile:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleIconClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log("File selected:", file);
    }
  };

  return (
    <div className="flex flex-col items-start p-8 space-y-8 w-full">
      <h2 className="text-3xl font-semibold mb-6">Profile Management</h2>

      <div className="flex flex-col sm:flex-row gap-6 justify-between w-full">
        {/* Company Logo Section */}
        <div className="flex flex-col items-start w-full sm:w-[273px] h-auto sm:h-[228px] rounded-lg bg-white dark:bg-[#1e1e1e] p-5">
          <span className="text-lg font-medium text-gray-700 mb-3 dark:text-white">
            Company Logo
          </span>
          <div className="relative w-[130px] h-[130px] mb-3">
            <div className="border bg-[#D9D9D9] flex justify-center items-center w-[130px] h-[130px]">
              <Image
                src={companyProfileIcon}
                alt="Company Logo"
                className="object-cover"
              />
            </div>
            <Image
              src={profileAddIcon}
              alt="Add Icon"
              onClick={handleIconClick}
              className="absolute bottom-[-1] right-[-1] w-8 h-8 cursor-pointer"
            />
          </div>
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            accept="image/*"
            onChange={handleFileChange}
          />
          <span className="text-sm text-gray-500 dark:text-white">
            Add your company logo
          </span>
        </div>

        {/* Form Section for User Details */}
        <div className="flex flex-col lg:flex-wrap gap-6 w-full sm:w-[calc(100%-273px)] lg:flex-row rounded-lg bg-white dark:bg-[#1e1e1e] p-5">
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
            value={formData.phoneNumber}
            name="phoneNumber"
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
      <div className="flex flex-col flex-wrap space-y-5 w-full bg-white dark:bg-[#1e1e1e] rounded-lg p-5">
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

        <div className="mt-6">
          <Button
            onClick={handleUpdateProfile}
            className="bg-[#4C8AE8] hover:bg-[#3a7fd5] rounded-full w-[180px] py-2 text-base text-center text-white transition duration-300 ease-in-out"
          >
            {loading ? "Updating..." : "Update Profile"}
          </Button>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
};

export default UserDetails;
