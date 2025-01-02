"use client";

import React, { ReactNode } from "react";
import { Sidebar } from "./Sidebar";  

interface SidebarLayoutProps {
  children: ReactNode;
}

const SidebarLayout: React.FC<SidebarLayoutProps> = ({ children }) => {
  return (
    <div className="flex h-screen">
    
      <Sidebar />
      
      <main className="flex-grow p-3 bg-[#FAFBFC] flex flex-col overflow-y-auto">
        {children} 
      </main>
    </div>
  );
};

export default SidebarLayout;
