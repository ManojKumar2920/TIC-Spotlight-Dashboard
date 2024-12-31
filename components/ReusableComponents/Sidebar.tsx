"use client";

import React from "react";
import Link from "next/link";
import logo from "@/public/SidebarIcons/company_logo.png";
import Image from "next/image";

import {
    HomeIcon,
    InvoiceIcon,
    ProfileIcon,
    SettingsIcon,
    LogoutIcon,
    DarkModeIcon,
    DashboardIcon
} from "@/components/ReusableComponents/Icon";
import { usePathname } from "next/navigation";

export const Sidebar: React.FC = () => {
    const pathname = usePathname(); 

    const contents = [
        { href: "/", icon: <HomeIcon />, text: "Home", key: "home" },
        { href: "/dashboard", icon: <DashboardIcon />, text: "Dashboard", key: "dashboard" },
        { href: "/invoice", icon: < InvoiceIcon />, text: "Invoice", key: "invoice" },
        { href: "/profile", icon: < ProfileIcon />, text: "Profile", key: "profile" },
        { href: "/darkmode", icon: <DarkModeIcon />, text: "Darkmode", key: "darkmode" },
        { href: "/logout", icon: <LogoutIcon />, text: "Logout", key: "logout" },
    ];


    return(
        <div className='w-64 h-screen bg-[#171515] text-white flex flex-col text-sm'>
        <div className='flex items-center justify-center h-20'>
            <Image src={logo} alt='Logo' width={169} height={41} />
        </div>

        <nav className='flex-grow'>
            <ul className='flex flex-col items-left pt-5'>
                {contents.map(item => (
                    <Link href={item.href} key={item.key}>
                        <li
                            className={`mb-2 flex items-center hover:bg-[#4C88ED33] rounded pl-10 h-11 
                                ${pathname === item.href ? 'bg-[#4C88ED33]' : ''}`}
                        >
                            <div className={`mr-3 md-1 ${pathname === item.href ? 'text-[#4C89E9]' : 'text-white'} w-4 h-4`}>
                                {item.icon}
                            </div>
                            <span className="flex items-center">{item.text}</span>
                        </li>
                    </Link>
                ))}
            </ul>
        </nav>
    </div>
    )


}