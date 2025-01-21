"use client";

import React, { useEffect, useState } from "react";
import InvoiceCard from "./InvoiceCard";
import { format } from "date-fns";
import { fetchUserCampaigns } from "../Api/Api";
// Define the campaign interface
interface Campaign {
  campaignName: string;
  startDate: string;
  endDate: string;
  totalBudget: number;
  totalScreenTime: string;
  status: string;
  totalAmount: number;
  cgst: number;
  gst: number;
  sgst: number;
  kgst: number;
  grandTotal: number;
}

// Component for listing invoices
const InvoiceList = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const fetchCampaigns = async () => {
    try {
      setIsLoading(true);
      setErrorMessage(null);
      const campaigns = await fetchUserCampaigns();
      if (campaigns?.length > 0) {
        setCampaigns(campaigns);
      } else {
        setErrorMessage("No campaigns available.");
      }
    } catch (error) {
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred."
      );
    } finally {
      setIsLoading(false);
    }
  };
  useEffect(() => {
    fetchCampaigns();
  }, []);

  // Helper to format date ranges
  const formatDateRange = (startDate: string, endDate: string) => {
    const formattedStart = format(new Date(startDate), "MMM dd");
    const formattedEnd = format(new Date(endDate), "MMM dd yyyy");
    return `${formattedStart} to ${formattedEnd}`;
  };

  // Render function for content
  const renderContent = () => {
    if (isLoading) {
      return <p>Loading campaigns...</p>;
    }

    if (errorMessage) {
      return <p className="text-red-500">{errorMessage}</p>;
    }

    if (campaigns.length === 0) {
      return <p>No campaigns available.</p>;
    }

    return campaigns.map((campaign, index) => (
      <InvoiceCard
        key={index}
        title={campaign.campaignName}
        dateRange={formatDateRange(campaign.startDate, campaign.endDate)}
        totalScreenTime={campaign.totalScreenTime}
        totalBudget={campaign.totalBudget}
        status={campaign.status}
        totalAmount={campaign.totalAmount}
        grandTotal={campaign.grandTotal}
        cgst={campaign.cgst}
        sgst={campaign.sgst}
        gst={campaign.gst}
      />
    ));
  };

  return <div className="flex flex-wrap gap-4 p-4">{renderContent()}</div>;
};

export default InvoiceList;
