"use client";

import React, { useState } from "react";
import Button from "../ReusableComponents/Button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button as DatePicker } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  DownArrowIcon,
  SendIcon,
  FilterIcon,
  SearchIcon,
  CheckBoxIcon,
} from "../ReusableComponents/Icon";
import { customerRequests } from "@/Data/CustomerData";
import { Checkbox } from "@/components/ui/checkbox"
interface CustomerRequestData {
  companyName: string;
  customerName: string;
  orderDate: string;
  adName: string;
  adRunDates: string;
  orderTotal: number;
  status: string;
}

const CustomerRequest: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectedRows, setSelectedRows] = useState<string[]>([]);
  const [selectAll, setSelectAll] = useState(false);

  const totalItems = customerRequests.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handleRowSelection = (rowId: string) => {
    setSelectedRows((prev) =>
      prev.includes(rowId)
        ? prev.filter((id) => id !== rowId)
        : [...prev, rowId]
    );
  };

  const handleSelectAll = () => {
    if (selectAll) {
      setSelectedRows([]);
    } else {
      const currentPageRowIds = customerRequests
        .slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage)
        .map((_, index) => `row-${index}`);
      setSelectedRows(currentPageRowIds);
    }
    setSelectAll(!selectAll);
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (
    event: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); 
  };

  const paginatedData = customerRequests.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="bg-white shadow rounded-lg space-y-4">
      <div className="flex flex-row justify-between items-center mb-4 p-4">
        <h1 className="text-sm font-medium text-[#53545C]">Customer Request</h1>

        <div className="flex items-center space-x-2">
          <div className="flex items-center border border-[#CFD3D4] rounded-[4px] overflow-hidden h-[29px] w-[200px]">
            <span className="px-3 bg-transparent">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-1 outline-none h-full text-xs"
            />
          </div>
          <Button className="bg-transparent text-[#53545C] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <FilterIcon className="w-4 h-4" />
            <span className="hidden sm:inline text-xs">Filter</span>
          </Button>
          <Popover>
            <PopoverTrigger asChild>
              <DatePicker
                variant="outline"
                className={cn(
                  "inline-flex items-center justify-start text-left font-normal border border-[#53545C] h-[29px] rounded-[4px]",
                  !date && "text-muted-foreground bg-transparent"
                )}
              >
                <CalendarIcon className="ml-2 text-[#53545C] w-4 h-4" />
                {date ? (
                  <span className="ml-2">{format(date, "MMM d")}</span>
                ) : (
                  <span className="text-[#53545C] text-xs">Date</span>
                )}
              </DatePicker>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <Button className="bg-transparent text-[#53545C] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <Image src={SendIcon} alt="Send icon" width={16} height={16} />
            <span className="hidden sm:inline text-xs">Share</span>
          </Button>
          <Button className="bg-transparent text-[#53545C] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <span className="text-xs">Bulk Action</span>
            <Image
              src={DownArrowIcon}
              alt="Down arrow icon"
              width={16}
              height={16}
            />
          </Button>
        </div>
      </div>

      <table className="min-w-full table-auto rounded-lg">
        <thead className=" border-t border-b border-[#CFD3D4] h-[52px]">
          <tr className="text-left">
          <th className="px-4 py-2">
  {/* <input
    type="checkbox"
    checked={selectAll}
    className="w-4 h-4 bg-transparent border-2 border-[#53545C] rounded-full checked:bg-[#53545C] checked:border-transparent focus:outline-none"
    onChange={handleSelectAll}
  /> */}
<Checkbox id="selectAll" className="border-[#CFD3D4] align-middle" checked={selectAll} onCheckedChange={handleSelectAll} />
</th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Company Name
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Customer Name
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Order Date
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Ad Name
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Ad Run Dates
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Order Total
            </th>
            <th className="px-4 py-2 text-sm font-medium text-[#53545C]">
              Status
            </th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((request: CustomerRequestData, index: number) => (
            <tr key={index}>
              <td className="px-4 py-2">
              <Checkbox className="border-[#CFD3D4] align-middle" checked={selectedRows.includes(`row-${(currentPage - 1) * itemsPerPage + index}`)} onCheckedChange={() => handleRowSelection(`row-${(currentPage - 1) * itemsPerPage + index}`)} />
                    </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.companyName}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.customerName}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.orderDate}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.adName}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.adRunDates}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                ₹{request.orderTotal.toFixed(2)}
              </td>
              <td className="px-4 py-2 text-sm text-[#53545C]">
                {request.status}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4 px-4 py-2 border-t border-[#CFD3D4]">
        <div className="flex items-center space-x-2">
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-[#CFD3D4] rounded-[4px] text-xs p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <label htmlFor="items-per-page" className="text-xs text-[#53545C]">
            Items per page
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <select
            id="page-select"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border border-[#CFD3D4] rounded-[4px] text-xs p-1"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <span className="text-xs text-[#53545C]">of {totalPages}</span>
          <label htmlFor="page-select" className="text-xs text-[#53545C]">
            Pages
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomerRequest;
