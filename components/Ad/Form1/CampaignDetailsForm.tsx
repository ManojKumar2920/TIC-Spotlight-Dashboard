"use client";
import React, { useState } from "react";
import { IconOne } from "../../ReusableComponents/Icon";
import Image from "next/image";
import { format } from "date-fns"
import { CalendarIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"


const CampaignDetailsForm = () => {
    const [startDate, setStartDate] = useState<Date | undefined>(undefined);
    const [endDate, setEndDate] = useState<Date | undefined>(undefined);
    return (
        <div className="flex flex-grow flex-col space-y-6 p-5">
            <div className="flex items-center space-x-2">
                <Image src={IconOne} alt="icon" />
                <span>Campaign Details</span>
            </div>

            <div>
                <label className="block text-sm font-medium text-[#151414] mb-2 ">
                    Ad Name
                </label>
                <input
                    type="text"
                    id="AdName"
                    name="Ad "
                    placeholder="Type here "
                    className="block w-full px-4 py-2 rounded-[25px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none"
                />
            </div>
            <div className="flex flex-row space-x-10">
                {/* Start Date */}
                <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>
                                <Button
                                    variant="outline"
                                    className="w-[200px] flex justify-between items-center text-left font-normal bg-[#FAFBFC] rounded-[25px] border-none"
                                >
                                    {startDate ? format(startDate, "PPP") : <span className="placeholder-gray-500">DD/MM/YYYY</span>}
                                    <CalendarIcon className="ml-2 h-4 w-4 text-[#292D32]" />
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-[auto] p-1" align="start">
                            <Calendar
                                mode="single"
                                selected={startDate}
                                onSelect={setStartDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                {/* End Date */}
                <div className="flex flex-col space-y-2">
                    <label className="block text-sm font-medium text-gray-700 mb-1">End Date</label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <div>
                                <Button
                                    variant="outline"
                                    className="w-[200px] flex justify-between items-center text-left font-normal bg-[#FAFBFC] rounded-[25px] border-none"
                                >
                                    {endDate ? format(endDate, "PPP") : <span className="placeholder-[#ADB0B2]">DD/MM/YYYY</span>}
                                    <CalendarIcon className="ml-2 h-4 w-4 text-[#292D32]" />
                                </Button>
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={endDate}
                                onSelect={setEndDate}
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>


            <div>
                <label className="block text-sm font-medium text-[#151414] mb-2">
                    Total Budget
                </label>
                <input
                    type="text"
                    id="TotalBudget"
                    name="TotalBudget"
                    placeholder="Enter your budget in Rs."
                    className="block w-full px-4 py-2 rounded-[25px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none"
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#151414] mb-2">
                    Tell us about your Ad
                </label>
                <textarea
                    id="AboutAd"
                    rows={6}
                    name="AboutAd"
                    placeholder="Enter your budget in Rs."
                    className="block w-full px-4 py-2 rounded-[25px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none"
                />
            </div>
        </div>
    );
};

export default CampaignDetailsForm;
