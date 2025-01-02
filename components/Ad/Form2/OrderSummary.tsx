import { ClockIcon, RupeeICon } from "@/components/ReusableComponents/Icon";
import React from "react";
import Image from "next/image";

const OrderSummary = () => {

  const Hours = [
    { value: "0 hrs", label: "No.of hours", image: ClockIcon },
    { value: "0 /-", label: "Rate / hour", image: RupeeICon },
  ];

  const taxDetails = [
    { label: "Total Amount", value: "00.00" },
    { label: "CGST", value: "00.00" },
    { label: "GST", value: "00.00" },
    { label: "SGST", value: "00.00" },
    { label: "KGST", value: "00.00" }

  ]

  const grandTotal = "00.00";

  return (
    <div className="flex flex-grow flex-col space-y-6 p-5 h-full">
      <h1 className="text-4xl font-bold">
        Order
        <br />
        Summary
      </h1>
      <div className="flex flex-wrap gap-10">
        {Hours.map((hour, index) => (
          <div
            key={index}
            className="flex flex-row justify-between w-[200px] h-[90px] border border-[#E9EAF8] p-2 relative rounded-[12px]"
          >
            <div className="text-left">
              <span className="text-xl block font-medium">{hour.value}</span>

              <span className="text-base">{hour.label}</span>
            </div>
            <div className="absolute bottom-2 right-2">
              <Image src={hour.image} alt={hour.label} width={24} height={24} />
            </div>
          </div>
        ))}
      </div>

      <div className="rounded-md p-4 mt-4 space-y-4">
        {taxDetails.map((detail, index) => (
          <div key={index} className="flex justify-between py-1">
            <span className="text-sm f">{detail.label}</span>
            <span className="text-sm">{detail.value}</span>
          </div>
        ))}
        <div className="flex justify-between font-bold border-t mt-6 pt-4">
          <span className="text-lg">Grand Total</span>
          <span className="text-lg">{grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;
