import React, { createContext, useState, useContext } from "react";

type Ad = {
  _id: string;
  userId: string;
  adType: string;
  campaignName: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  totalCars: number;
  details: string;
  location: string;
  frequency: string;
  timeSlot: string;
  imageUrl: string;
  totalHours: number;
  ratePerHour: number;
  status: string;
  totalAmount: number;
  cgst: number;
  kgst: number;
  gst: number;
  sgst: number;
  grandTotal: number;
  createdAt: Date;
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
