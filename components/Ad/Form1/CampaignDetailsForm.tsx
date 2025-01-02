"use client";
import React, { useState } from "react";
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

const CampaignDetailsForm = () => {
    const [formValues, setFormValues] = useState({
        adName: "",
        totalBudget: "",
        aboutAd: "",
        startDate: "",
        endDate: "",
    });
    const [date, setDate] = React.useState<Date>();

    const handleInputChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
    ) => {
        const { name, value } = e.target;
        setFormValues({ ...formValues, [name]: value });
    };

    return (
        <div className="flex flex-grow flex-col space-y-6 p-5">
            <div className="flex items-center space-x-2">
                <Image src={IconOne} alt="icon" width={30} height={30} />
                <span>Campaign Details</span>
            </div>

            <div>
                <LabelInput
                    labelText="Ad Name"
                    htmlFor="adName"
                    name="adName"
                    type="text"
                    value={formValues.adName}
                    placeholder="Type here"
                    onChange={handleInputChange}
                />
            </div>
            <div className="flex flex-row space-x-4">
                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Start Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border-none",
                                    !date &&
                                    "text-muted-foreground bg-[#FAFBFC] h-[44px] rounded-[20px]"
                                )}
                            >
                                {date ? format(date, "PPP") : (
                                    <span className="text-[#ADB0B2]">Start date</span>
                                )}
                                <CalendarIcon className="ml-auto" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>

                <div className="flex-1">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        End Date
                    </label>
                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "w-full justify-start text-left font-normal border-none",
                                    !date &&
                                    "text-muted-foreground bg-[#FAFBFC] h-[44px] rounded-[20px]"
                                )}
                            >
                                {date ? format(date, "PPP") : (
                                    <span className="text-[#ADB0B2]">End date</span>
                                )}
                                <CalendarIcon className="ml-auto" />
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="start">
                            <Calendar
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>


            <div>
                <LabelInput
                    labelText="Total Budget"
                    htmlFor="totalBudget"
                    name="totalBudget"
                    type="text"
                    value={formValues.totalBudget}
                    placeholder="Enter your budget in Rs."
                    onChange={handleInputChange}
                />
            </div>

            <div>
                <label className="block text-sm font-medium text-[#151414] mb-2">
                    Tell us about your Ad
                </label>
                <textarea
                    id="aboutAd"
                    name="aboutAd"
                    rows={6}
                    value={formValues.aboutAd}
                    placeholder="Tell us about your Ad"
                    onChange={handleInputChange}
                    className="block w-full px-4 py-2 rounded-[20px] bg-[#FAFBFC] text-sm shadow-sm focus:outline-none"
                />
            </div>
        </div>
    );
};

export default CampaignDetailsForm;
