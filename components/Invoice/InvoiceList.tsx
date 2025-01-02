import React from "react";
import InvoiceCard from "./InvoiceCard";

const InvoiceList = () => {
  const invoices = [
    {
      title: "AD 1 - Invoice",
      dateRange: "12 Dec to 14 Dec 2024",
      totalBudget: 2200,
      totalScreenTime: '3/hrs',
      status: "Approved",
      totalAmount: 2000,
      cgst: 10,
      gst: 20,
      sgst: 3,
      grandTotal: 2034,
    },
    {
      title: "AD 2 - Invoice",
      dateRange: "15 Dec to 18 Dec 2024",
      totalBudget: 3000,
      totalScreenTime: '5/hrs',
      status: "Approved",
      totalAmount: 2500,
      cgst: 15,
      gst: 25,
      sgst: 5,
      grandTotal: 2545,
    },
    {
        title: "AD 3 - Invoice",
        dateRange: "15 Dec to 18 Dec 2024",
        totalBudget: 3000,
        totalScreenTime: '5/hrs',
        status: "Approved",
        totalAmount: 2500,
        cgst: 15,
        gst: 25,
        sgst: 5,
        grandTotal: 2545,
      },
      {
        title: "AD 4 - Invoice",
        dateRange: "15 Dec to 18 Dec 2024",
        totalBudget: 3000,
        totalScreenTime: '5/hrs',
        status: "Approved",
        totalAmount: 2500,
        cgst: 15,
        gst: 25,
        sgst: 5,
        grandTotal: 2545,
      },
  ];

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {invoices.map((invoice, index) => (
        <InvoiceCard
          key={index}
          title={invoice.title}
          dateRange={invoice.dateRange}
          totalScreenTime={invoice.totalScreenTime}
          totalBudget={invoice.totalBudget}
          status={invoice.status}
          totalAmount={invoice.totalAmount}
          cgst={invoice.cgst}
          gst={invoice.gst}
          sgst={invoice.sgst}
          grandTotal={invoice.grandTotal}
        />
      ))}
    </div>
  );
};

export default InvoiceList;
