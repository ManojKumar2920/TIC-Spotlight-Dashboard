"use client";
import React, { useState, useEffect } from "react";
import { IconOne } from "../../ReusableComponents/Icon";
import Image from "next/image";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import LabelInput from "@/components/ReusableComponents/LabelInput";
import { IconTwo } from "../../ReusableComponents/Icon";
import Select from "../../ReusableComponents/Select";
import { LocationData } from "@/Data/LocationData";

interface CampaignDetailsFormProps {
    onSubmit: (campaignDetails: any) => void;
    goToNextStep: (step: 'orderSummary') => void;
    campaignDetails: any;
}
const CampaignDetailsForm1: React.FC<CampaignDetailsFormProps> = ({ onSubmit, goToNextStep, campaignDetails }) => {
    const timeOptions = [
        { value: "24/7", label: "Day & night" },
        { value: "7AM - 11PM", label: "Full day" },
        { value: "1PM - 11PM", label: "Evening" },
        { value: "7AM - 1PM", label: "Morning" },
    ]; const [campaignName, setCampaignName] = useState<string>(campaignDetails?.campaignName || "");
    const [adType, setAdType] = useState<string>(campaignDetails?.adType || "dynamic");
    const [totalBudget, setTotalBudget] = useState<string>(String(campaignDetails?.totalBudget || ""));
    const [totalCars, setTotalCars] = useState<string>(String(campaignDetails?.totalCars || ""));
    const [details, setDetails] = useState<string>(campaignDetails?.details || "");
    const [startDate, setStartDate] = useState<Date | undefined>(campaignDetails?.startDate);
    const [endDate, setEndDate] = useState<Date | undefined>(campaignDetails?.endDate);
    const [timeSlot, setTimeSlot] = useState<string | null>(campaignDetails?.timeSlot || null);
    const [location, setLocation] = useState<{ label: string; value: string } | undefined>(campaignDetails?.location);
    const [agreeLocation, setAgreeLocation] = useState(false);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});


    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = LocationData.find((option) => option.value === event.target.value);
        setLocation(selectedOption);
    };

    const handleLocationCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeLocation(!agreeLocation);
        if (!agreeLocation) {
            // Set location to Mumbai when checkbox is checked
            const mumbaiOption = LocationData.find((option) => option.value === "Mumbai");
            setLocation(mumbaiOption);
        } else {
 
            setLocation(undefined);
        }
    };


    const handleSelectTime = (value: string) => {
        setTimeSlot(value);
    };


    const validateForm = () => {
        const newErrors: { [key: string]: string } = {};

        // Campaign Name validation
        if (!campaignName.trim()) {
            newErrors.campaignName = "Campaign name is required.";
        }

        // Ad Type validation
        if (!adType) {
            newErrors.adType = "Please select an ad type.";
        }

        // Total Budget or Total Cars validation
        if (adType === "dynamic" && Number(totalBudget) <= 0) { newErrors.totalBudget = "Please enter a valid total budget."; }
        if (adType === "static" && Number(totalCars) <= 0) { newErrors.totalCars = "Please enter a valid number of cars."; }


        // Details validation
        if (!details.trim()) {
            newErrors.details = "Please provide details about your ad.";
        }

        // Start Date validation
        if (!startDate) {
            newErrors.startDate = "Start date is required.";
        }

        // End Date validation
        if (startDate && endDate) {
            if (new Date(endDate) < new Date(startDate)) {
                newErrors.endDate = "End date cannot be before start date.";
            }
        }

        if (!location) {
            newErrors.location = "Please select a location.";
        }
        if (!timeSlot) {
            newErrors.timeSlot = "Please select a time slot.";
        }


        setErrors(newErrors);
        console.log(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = () => {
        if (validateForm()) {
            const campaignDetails = {
                campaignName,
                adType,
                ...(adType === "dynamic" ? { totalBudget } : {}),
                ...(adType === "static" ? { totalCars } : {}),
                details,
                startDate,
                endDate,
                location: location?.value,
                timeSlot,
            };
            onSubmit(campaignDetails);
            goToNextStep("orderSummary");
        }
    };

    return (
        <div>
            <div className="flex flex-col lg:flex-row md:flex-row gap-4 p-3 mt-3 flex-grow min-h-[810px]">

                <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white shadow-md p-5">
                    <div className="w-full p-4 dark:bg-[#1e1e1e] space-y-10">
                        <div className="flex items-center space-x-2">
                            <Image src={IconOne} alt="icon" width={30} height={30} />
                            <span>Campaign Details</span>
                        </div>

                        <div className="space-y-10">

                            {/* Campaign Name */}
                            <div>
                                <LabelInput
                                    labelText="Ad Name"
                                    htmlFor="campaignName"
                                    name="campaignName"
                                    type="text"
                                    value={campaignName}
                                    placeholder="Type here"
                                    onChange={(e) => setCampaignName(e.target.value)}

                                />
                                {errors.campaignName && (
                                    <div className="text-red-500 text-xs mt-1">{errors.campaignName}</div>
                                )}
                            </div>

                            {/* Ad Type */}
                            <div>
                                <Select
                                    name="adType"
                                    label="Ad Type"
                                    value={adType}
                                    onChange={(e) => setAdType(e.target.value)}

                                    placeholder="Select"
                                    options={[
                                        { value: "dynamic", label: "Dynamic" },
                                        { value: "static", label: "Static" },
                                    ]}

                                />
                                {errors.adType && (
                                    <div className="text-red-500 text-xs mt-1">{errors.adType}</div>
                                )}
                            </div>

                            {/* Start Date and End Date */}
                            <div className="flex space-x-4">
                                <div className="flex-1">
                                    <label className="block text-sm font-medium dark:text-white mb-2">
                                        Start Date
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal border-none",
                                                    !startDate ?
                                                        "text-muted-foreground bg-[#FAFBFC] dark:bg-[#333333] h-[44px] rounded-[20px]" :
                                                        "bg-[#FAFBFC] h-[44px] rounded-[20px]"
                                                )}
                                            >
                                                {startDate ? format(startDate, "MMM d, yyyy") : (
                                                    <span className="text-[#ADB0B2]">Start date</span>
                                                )}
                                                <CalendarIcon className="ml-auto" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={startDate}
                                                onSelect={setStartDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>

                                    {errors.startDate && (
                                        <div className="text-red-500 text-xs mt-1">{errors.startDate}</div>
                                    )}
                                </div>

                                {/* End Date */}
                                <div className="flex-1">
                                    <label className="block text-sm font-medium dark:text-white mb-2">
                                        End Date
                                    </label>
                                    <Popover>
                                        <PopoverTrigger asChild>
                                            <Button
                                                variant={"outline"}
                                                className={cn(
                                                    "w-full justify-start text-left font-normal border-none",
                                                    !endDate ? "text-muted-foreground bg-[#FAFBFC] dark:bg-[#333333] h-[44px] rounded-[20px]" :
                                                        "bg-[#FAFBFC] h-[44px] rounded-[20px]"
                                                )}
                                            >
                                                {endDate ? format(endDate, "MMM d, yyyy") : (
                                                    <span className="text-[#ADB0B2]">End date</span>
                                                )}
                                                <CalendarIcon className="ml-auto" />
                                            </Button>
                                        </PopoverTrigger>
                                        <PopoverContent className="w-auto p-0" align="start">
                                            <Calendar
                                                mode="single"
                                                selected={endDate}
                                                onSelect={setEndDate}
                                                initialFocus
                                            />
                                        </PopoverContent>
                                    </Popover>
                                    {errors.endDate && (
                                        <div className="text-red-500 text-xs mt-1">{errors.endDate}</div>
                                    )}
                                </div>
                            </div>

                            {/* Conditional input for totalCars or totalBudget */}
                            <div>
                                <LabelInput
                                    labelText={adType === "static" ? "Total Cars" : "Total Budget"}
                                    htmlFor={adType === "static" ? "totalCars" : "totalBudget"}
                                    name={adType === "static" ? "totalCars" : "totalBudget"}
                                    type="number"
                                    value={adType === "static" ? totalCars : totalBudget}
                                    placeholder={adType === "static" ? "Enter the total number of cars" : "Enter your budget in Rs."}
                                    onChange={(e) => {
                                        const { name, value } = e.target;
                                        if (name === "totalCars") {
                                            setTotalCars(value);  // Set string value
                                        } else if (name === "totalBudget") {
                                            setTotalBudget(value);  // Set string value
                                        }
                                    }}
                                />

                                {errors.totalBudget && (
                                    <div className="text-red-500 text-xs mt-1">{errors.totalBudget}</div>
                                )}
                                {errors.totalCars && (
                                    <div className="text-red-500 text-xs mt-1">{errors.totalCars}</div>
                                )}
                            </div>

                            {/* Ad Details */}
                            <div>
                                <label className="block text-sm font-medium text-[#151414] dark:text-white mb-2">
                                    Tell us about your Ad
                                </label>
                                <textarea
                                    id="details"
                                    name="details"
                                    rows={6}
                                    value={details}
                                    placeholder="Tell us about your Ad"
                                    onChange={(e) => setDetails(e.target.value)}

                                    className="block w-full px-4 py-2 rounded-[20px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none dark:bg-[#333333]"
                                />
                                {errors.details && (
                                    <div className="text-red-500 text-xs mt-4">{errors.details}</div>
                                )}
                            </div>

                        </div>

                    </div>
                </div>

                <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white  shadow-md p-5">
                    <div className="w-full p-4 dark:bg-[#1e1e1e] space-y-10">
                        <div className="flex items-center space-x-2">
                            <Image src={IconTwo} alt="icon" width={32} height={32} />
                            <span>Parameters & Media</span>
                        </div>
                        <div className="space-y-10">
                            <div>
                                <Select
                                    label="Select Location"
                                    name="Location"
                                    options={LocationData}
                                    value={location?.value}
                                    onChange={handleLocationChange}
                                    placeholder="Select"
                                />
                                {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
                                <div className="flex items-center mt-4">
                                    <input
                                        type="checkbox"
                                        id="agreeLocation"
                                        name="agreeLocation"
                                        checked={agreeLocation}
                                        onChange={handleLocationCheckboxChange}
                                        className="h-4 w-4 text-black border-gray-300 rounded accent-black"
                                    />
                                    <label
                                        htmlFor="agreeLocation"
                                        className="ml-2 text-sm text-black dark:text-white"
                                        style={{ fontSize: "12px", fontWeight: "500" }}
                                    >
                                        Enter City ( Mumbai )
                                    </label>

                                </div>
                            </div>



                            <div className="flex flex-grow flex-col space-y-1">
                                <label className="block text-sm font-medium text-[#151414] dark:text-white">Select Time</label>
                                <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                                    {timeOptions.map((option) => (
                                        <div
                                            key={option.value}
                                            className={`flex flex-col items-center border p-4 rounded-md shadow-md cursor-pointer ${timeSlot === option.value ? "bg-grey-100 border-black" : "bg-[#FAFBFC] border-[#E2E2E2] dark:bg-[#333333] dark:border-[#1e1e1e]"} ${errors.timeSlot && !timeSlot ? "border-red-500" : ""}`}
                                            onClick={() => handleSelectTime(option.value)}
                                        >
                                            <span className="font-medium text-[12px] leading-[19px]">{option.value}</span>
                                            <span className="text-[12px] leading-[19px] text-[#000000] dark:text-white">{option.label}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>

                        <button onClick={handleSubmit} className="bg-[#4F8AFF] hover:bg-[#67A2FF] mt-auto rounded-[55px] w-[150px] text-center text-white ounded-[25px] px-6 py-2  dark:bg-[#333333] text-sm leading-[19px] focus:outline-none">
                            Next
                        </button>
                    </div>

                </div>
            </div>

        </div>
    )
}

export default CampaignDetailsForm1
