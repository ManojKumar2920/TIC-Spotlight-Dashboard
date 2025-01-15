import React, { createContext, useState, useContext } from "react";

type Ad = {
  name: string;
  adruns: number;
  status: string;
  date: string;
  time: string;
  totalhours: string;
};

type AdContextType = {
  selectedAd: Ad | null;
  setSelectedAd: React.Dispatch<React.SetStateAction<Ad | null>>;
};

const AdContext = createContext<AdContextType | undefined>(undefined);

export const AdProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [selectedAd, setSelectedAd] = useState<Ad | null>(null);

  return (
    <AdContext.Provider value={{ selectedAd, setSelectedAd }}>
      {children}
    </AdContext.Provider>
  );
};

export const useAdDetails = (): AdContextType => {
  const context = useContext(AdContext);
  if (!context) {
    throw new Error("AdDetails must be used within an AdProvider");
  }
  return context;
};
