"use Client";

import React, { useState } from "react";
import Image from "next/image";
import { CompanyLogo} from "../Icon";
import { HiMenu, HiX } from "react-icons/hi";
import { NavContents } from "./NavContent";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ThemeSwitch from "../ThemeSwitch";
import { signout } from "@/components/Api/Api";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const MobileNav: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();


    const handleSignout = async () => {
      try {
        const loadingToast = toast.loading("Logging out...");
        const success = await signout();
        toast.dismiss(loadingToast);
        if (success) {
          toast.success("Logged out successfully!");
          router.push("/auth/signin");
        } else {
          toast.error("Error logging out. Please try again.");
        }
      } catch (err) {
        toast.dismiss();
        toast.error("Error logging out. Please try again.");
        console.error("Error logging out:", err);
      }
    };

  return (
    <div className="md:hidden">
      <div className="flex items-center justify-between h-20 px-4 bg-[#171515] text-white">
        <Link href={"/"}>
          <Image src={CompanyLogo} alt="Logo" width={148} height={61} />
        </Link>

        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="text-white text-2xl"
        >
          {isSidebarOpen ? <HiX /> : <HiMenu />}
        </button>
      </div>
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm text-white z-50 flex flex-col">
          <div className="relative bg-[#171515] p-4 w-3/4 max-w-xs h-full">
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="absolute top-4 right-4 text-white text-2xl"
            >
              <HiX />
            </button>

            <div className="mb-8">
              <Image src={CompanyLogo} alt="Logo" width={140} height={41} />
            </div>

            <ul className="space-y-4">
            {NavContents.map((item) => (
            <li
              key={item.key}
              className={`mb-2 flex items-center hover:bg-[#4C88ED33] rounded pl-10 h-11 ${
                pathname === item.href ? "bg-[#4C88ED33]" : ""
              }`}
            >
              <div
                className={`mr-3 md-1 ${
                  pathname === item.href ? "text-[#4C89E9]" : "text-white"
                }`}
              >
                {item.icon}
              </div>
              {item.text === "Logout" ? (
                <button onClick={handleSignout} className="flex items-center">
                  {item.text}
                </button>
              ) : (
                <Link href={item.href}>
                  <span className="flex items-center">{item.text}</span>
                </Link>
              )}
            </li>
          ))}
            </ul>
            <div className="pl-10 mt-4">
              <ThemeSwitch />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MobileNav;
