"use client";

import React, { useState } from "react";
import Link from "next/link";
import { CompanyLogo } from "../Icon";
import Image from "next/image";

import { usePathname } from "next/navigation";
import ThemeSwitch from "@/components/ReusableComponents/ThemeSwitch";
import { HiMenu } from "react-icons/hi";
import { NavContents } from "./NavContent";
import { toast } from "react-toastify";
import router from "next/router";

export const Sidebar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const handleSignout = async () => {
    try {
      const loadingToast = toast.loading("Logging out...");
      await fetch("/api/signout", { method: "POST" });
      toast.dismiss(loadingToast);
      toast.success("Logged out successfully!");
      router.push("/signin");
    } catch (err) {
      toast.dismiss();
      toast.error("Error logging out. Please try again.");
      console.error("Error logging out:", err);
    }
  };

  return (
    <div
      className={`w-64 bg-[#171515] text-white flex flex-col text-sm font-medium h-screen flex-shrink-0 ${
        isOpen ? "block" : "hidden md:block"
      }`}
    >
      <div className="flex items-center justify-between h-20 px-4">
        <Link href={"/"}>
          <Image src={CompanyLogo} alt="Logo" width={169} height={41} />
        </Link>

        <button
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-white"
        >
          <HiMenu className="text-2xl" />
        </button>
      </div>

      <nav className="flex-grow">
        <ul className="flex flex-col items-left pt-5">
          {NavContents.map((item) => (
            <Link href={item.href} key={item.key}>
              <li
                className={`mb-2 flex items-center hover:bg-[#4C88ED33] rounded pl-10 h-11
                                ${
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
                <span className="flex items-center">{item.text}</span>
              </li>
            </Link>
          ))}
          <div className="pl-10 mt-2">
            <ThemeSwitch />
          </div>
        </ul>
      </nav>
    </div>
  );
};
