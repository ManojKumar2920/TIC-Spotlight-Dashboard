import { Sidebar } from "lucide-react";
import React from "react";
import SidebarLayout from "../ReusableComponents/SidebarLayout";
import { NotificationIcon, ProfileIcon2 } from "../ReusableComponents/Icon";
import Image from "next/image";

const DashboardTopNav = () => {
  return (
      <div className="flex items-center justify-between h-[48px] bg-transparent text-black px-4">
        <div className="text-2xl font-bold leading-[48px]">
          Welcome to Dashboard
        </div>

        <div className="flex items-center space-x-5">
          <div className="w-5 h-5">
            <Image src={NotificationIcon} alt="Notification" />
          </div>
          <div className="w-6 h-6">
            <Image src={ProfileIcon2} alt="Profile" />
          </div>
        </div>
      </div>
  );
};

export default DashboardTopNav;
