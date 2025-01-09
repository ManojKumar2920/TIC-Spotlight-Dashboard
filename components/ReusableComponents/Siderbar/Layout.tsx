"use client";

import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import MobileNav from "./MobileNav";


interface SidebarLayoutProps {
    children: ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
    return (
        <div className="flex h-screen">
            <Sidebar />

            <main className="flex-grow bg-[#FAFBFC] dark:bg-[#181818] flex flex-col overflow-y-auto">
                <MobileNav />
                <div className="p-3">
                    {children}
                </div>
            </main>
        </div>
    );
};

export default SidebarLayout;
