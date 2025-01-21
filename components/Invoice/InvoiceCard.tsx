import React from "react";
import Button from "../ReusableComponents/Button";
import { Download as DownloadIcon } from "lucide-react";

type InvoiceCardProps = {
  title: string;
  dateRange: string;
  totalScreenTime: string; // Added prop for total screen time
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
    <div className="relative border border-bg-[#F2E9E9] h-[420px] p-6 rounded-lg bg-white dark:border-[#1e1e1e] dark:bg-[#1e1e1e] shadow-md w-[271px] max-w-md">
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-base">{title} - Invoice</h2>
        <DownloadIcon className="text-black dark:text-white" />
      </div>

      <hr className="border-gray-300" />
      <div className="mt-4 space-y-3">
        <p className="text-xs text-[#000000] dark:text-white leading-19px font-medium">
          Date: {dateRange}
        </p>
        <p className="text-xs text-[#000000] dark:text-white leading-19px font-medium">
          Total Budget: {totalBudget}₹
        </p>
        <p className="text-xs text-[#000000] dark:text-white leading-19px font-medium">
          Total Screen Time: {totalScreenTime}
        </p>
      </div>

      <div className="flex mt-3 justify-start">
      <span
                      className={`${status === 'Rejected'
                          ? 'bg-red-200 text-red-600'
                          : status === 'Pending'
                            ? 'bg-gray-200 text-gray-700' 
                            : status === 'Active'
                              ? 'bg-green-200 text-green-600' 
                              : status === 'Approved'
                                ? 'bg-blue-200 text-blue-600' 
                                : 'bg-transparent text-black' 
                        } px-3 py-1 rounded-full text-sm`}
                    >
                      {status}
                    </span>
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
        <span className="mt-1">Grand Total INR</span>
        <span className="mt-1">₹{grandTotal.toFixed(2)}</span>
      </div>

      <Button className="absolute bottom-6 right-6 flex justify-center items-center text-[#000000] dark:text-[#FFFFFF] text-xs border border-[#000000] dark:border-[#FFFFFF] w-[70px] h-[24px] bg-white dark:bg-[#333333]">
        Pay
      </Button>
    </div>
  );
};

export default InvoiceCard;
