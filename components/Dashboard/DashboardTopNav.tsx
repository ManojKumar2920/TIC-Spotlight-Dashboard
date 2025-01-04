"use client";
import React from "react";
import { NotificationIcon, ProfileIcon2 } from "../ReusableComponents/Icon";
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



const DashboardTopNav = ({title}:{title: string}) => {
  const [date, setDate] = React.useState<Date>();
  const today = format(new Date(), "MMM d");

  return (
    <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
      <div className="text-2xl font-bold leading-[48px]">
      {title}
      </div>

      <div className="flex items-center space-x-5">
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={cn(
                "w-full justify-start text-left font-normal border-none",
                !date &&
                  "text-muted-foreground bg-[#FFFFFF] h-[44px] rounded-[20px]"
              )}
            >
              {date ? (
                format(date, "MMM d")
              ) : (
                <span className="text-[#000000]">{today}</span>
              )}
              <CalendarIcon className="ml-auto" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date || undefined}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <div className="flex items-center space-x-5">
          <div className="w-5 h-5">
            <Image src={NotificationIcon} alt="Notification" />
          </div>
          <div className="w-6 h-6">
            <Image src={ProfileIcon2} alt="Profile" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardTopNav;
