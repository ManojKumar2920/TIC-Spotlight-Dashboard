"use client";
import React, { useState, useEffect } from "react";
import { NotificationIcon, ProfileIcon2 } from "../ReusableComponents/Icon";
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
import axios from "axios";
import cookies from "next/headers";

const DashboardTopNav = ({ title }: { title: string }) => {
  const [date, setDate] = React.useState<Date>();
  const today = format(new Date(), "MMM d");
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const refreshToken = cookies.get("refreshToken");
  useEffect(() => {
    const checkTokenVerification = async () => {
      const response = await axios("/api/users", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${refreshToken}`
        },
      });

      const data = await response.data();
      if (data.message === "Unauthorized: Invalid refresh token") {
        setIsVerified(false);
      } else {
        setIsVerified(true);
      }
    };

    checkTokenVerification();
  }, []);

  return { isVerified };
};


  return (
    <div className="flex items-center justify-between h-[48px] bg-transparent text-black dark:text-white px-4">
      <div className="font-bold leading-[26px] text-2xl  md:leading-[48px]">
        {title}
      </div>

      <div className="flex items-center space-x-5">
        <div className="hidden">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant={"outline"}
                className={cn(
                  "w-full justify-start text-left font-normal border-none",
                  !date &&
                  "text-muted-foreground bg-[#FFFFFF] dark:bg-[#1e1e1e] h-[44px] rounded-[20px]"
                )}
              >
                {date ? (
                  format(date, "MMM d")
                ) : (
                  <span className="text-[#000000] dark:text-white ">{today}</span>
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
        </div>


        <div className="flex items-center space-x-5">
          {/* Conditionally render based on refreshToken */}
          {!IsVerified ? (
            <Button variant="outline" className="h-[44px] px-6">
              Sign In
            </Button>
          ) : (
            <>
              <div>
                <ProfileIcon2 className="w-6 h-6" />
              </div>
              <div>
                <NotificationIcon className="w-5 h-5" />
              </div>
            </>
          )}
        </div>

      </div>
    </div>

  );
};

export default DashboardTopNav;
