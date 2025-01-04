"use client";

import React, { useState } from "react";
import { IconTwo } from "../../ReusableComponents/Icon";
import Image from "next/image";
import Select from "../../ReusableComponents/Select";
import { LocationData } from "@/Data/LocationData";
import { FrequencyData } from "@/Data/FrequencyData";
import Button from "@/components/ReusableComponents/Button";


const ParameterForm = ({ onNext }: { onNext: () => void }) => {
    const timeOptions = [
        { value: "24/7", label: "Day & night" },
        { value: "7AM-11PM", label: "Full day" },
        { value: "1PM-1PM", label: "Evening" },
        { value: "7AM-1PM", label: "Morning" },
    ];

    const [selectedTime, setSelectedTime] = useState<string | null>(null);
    const [Location, setLocation] = useState<{ label: string; value: string } | undefined>(undefined);
    const [Frequency, setFrequency] = useState<{ label: string; value: string } | undefined>(undefined);
    const [agreeLocation, setAgreeLocation] = useState(false);
    const [agreeFrequency, setAgreeFrequency] = useState(false);


    const handleLocationChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = LocationData.find((option) => option.value === event.target.value);
        setLocation(selectedOption);
    };

    const handleFrequencyChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedOption = FrequencyData.find((option) => option.value === event.target.value);
        setFrequency(selectedOption);
    };

    const handleLocationCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeLocation(event.target.checked);
    };

    const handleFrequencyCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setAgreeFrequency(event.target.checked);
    };

    const handleSelectTime = (value: string) => {
        setSelectedTime(value);
    };

    return (
        <div className="flex flex-grow flex-col space-y-7 p-5 dark:bg-[#1e1e1e] ">
            <div className="flex items-center space-x-2">
                <Image src={IconTwo} alt="icon" width={32} height={32} />
                <span>Parameters & Media</span>
            </div>

            <div>
                <Select
                    label="Select Location"
                    name="Location"
                    options={LocationData}
                    value={Location?.value}
                    onChange={handleLocationChange}
                    placeholder="Select"
                />
                <div className="flex items-center">
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

            <div>
                <Select
                    label="Select Day Frequency"
                    name="Frequency"
                    options={FrequencyData}
                    value={Frequency?.value}
                    onChange={handleFrequencyChange}
                    placeholder="Select Frequency" />
                <div className="mt-4 flex items-center">
                    <input
                        type="checkbox"
                        id="agreeFrequency"
                        name="agreeFrequency"
                        checked={agreeFrequency}
                        onChange={handleFrequencyCheckboxChange}
                        className="h-4 w-4 text-black border-gray-300 rounded accent-black"
                    />
                    <label
                        htmlFor="agreeFrequency"
                        className="ml-2 block text-sm font-medium leading-5 text-black dark:text-white"
                        style={{ fontSize: "12px", fontWeight: "500" }}
                    >
                        Everyday
                    </label>
                </div>

            </div>

            <div className="flex flex-grow flex-col space-y-1">
                <label className="block text-sm font-medium text-[#151414] dark:text-white ">Select Time</label>
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
                    {timeOptions.map((option) => (
                        <div
                            key={option.value}
                            className={`flex flex-col items-center border p-4 rounded-md shadow-md cursor-pointer ${selectedTime === option.value ? "bg-grey-100 border-black" : "bg-[#FAFBFC] border-[#E2E2E2] dark:bg-[#333333] dark:border-[#1e1e1e]"} ${selectedTime === option.value ? "border-black" : ""
                                }`}
                            onClick={() => handleSelectTime(option.value)}
                        >
                            <span className="font-medium text-[12px] leading-[19px]">{option.value}</span>
                            <span className="text-[12px]  leading-[19px] text-[#000000] dark:text-white">{option.label}</span>

                        </div>
                    ))}
                </div>
            </div>

            <Button onClick={onNext} className="bg-[#4F8AFF] rounded-[55px] w-[150px] text-center text-white">
                Next
            </Button>
        </div>
    );
};

export default ParameterForm;
