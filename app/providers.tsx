'use client'
import { AdProvider } from "@/contexts/AdContext";
import { ThemeProvider } from "next-themes";

export function Providers({children}: {children: React.ReactNode}){
    return(
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <AdProvider>
                {children}
            </AdProvider>
        </ThemeProvider>
    )
}