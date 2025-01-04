import React from "react";
import Image from "next/image";
import Button from "../ReusableComponents/Button";
import { Download } from 'lucide-react';
type InvoiceCardProps = {
  title: string;
  dateRange: string;
  totalScreenTime: string;
  totalBudget: number;
  status: string;
  totalAmount: number;
  cgst: number;
  gst: number;
  sgst: number;
  grandTotal: number;
};

const InvoiceCard: React.FC<InvoiceCardProps> = ({
  title,
  dateRange,
  totalScreenTime,
  totalBudget,
  status,
  totalAmount,
  cgst,
  gst,
  sgst,
  grandTotal,
}) => {
  const invoiceDetails = [
    { label: "Total Amount (₹)", value: totalAmount.toFixed(2) },
    { label: "CGST:", value: cgst.toFixed(2) },
    { label: "GST:", value: gst.toFixed(2) },
    { label: "SGST:", value: sgst.toFixed(2) },
  ];

  return (
    <div className="relative border border-bg-[#F2E9E9] h-[402px] p-6 rounded-lg bg-white dark:bg-[#1e1e1e] shadow-md w-[271px] max-w-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-base">{title}</h2>
        <Download  className="text-black dark:text-white"/>
      </div>

      <hr className="border-gray-300" />
      <div className="mt-4 space-y-3">
        <p className="text-xs text-[#000000] dark:text-white leading-19px font-medium">
          Date: {dateRange}
        </p>
        <p className="text-xs text-[#000000] dark:text-white leading-19px font-medium">
          Total Budget: {totalBudget}₹
        </p>
      </div>

      <div className="flex mt-3 justify-start">
        <p
          className={`text-sm leading-[20px] flex items-center justify-center w-[88px] h-[28px] p-[4px_12px] rounded-[12px] opacity-100 ${
            status === "Approved"
              ? "bg-approval-custom-green text-[#94E9B8]"
              : status === "Rejected"
              ? "bg-reject-custom-red text-white"
              : ""
          }`}
        >
          {status}
        </p>
      </div>

      <div className="mt-4 border-t pt-4 p-2">
        {invoiceDetails.map((detail, index) => (
          <div
            key={index}
            className="flex justify-between items-center space-y-2"
          >
            <span className="text-[10px]">{detail.label}</span>
            <span className="text-[10px]">₹{detail.value}</span>
          </div>
        ))}
      </div>

      <div className="flex border-t justify-between text-[10px] font-medium p-2">
        <span className="mt-1 ">Grand Total INR</span>
        <span className="mt-1 ">₹{grandTotal.toFixed(2)}</span>
      </div>

      <Button className="absolute bottom-6 right-6 flex justify-center items-center text-[#000000] text-xs border border-[#000000] w-[70px] h-[24px]">
        Pay
      </Button>
    </div>
  );
};

export default InvoiceCard;
