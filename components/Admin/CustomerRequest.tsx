"use client";

import React, { useState } from "react";
import Button from "../ReusableComponents/Button";
import { format } from "date-fns";
import { CalendarIcon } from "lucide-react";
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
} from "../ReusableComponents/Icon";
import { HiMenu, HiX } from "react-icons/hi";
import { customerRequests } from "@/Data/CustomerData";
import { Checkbox } from "@/components/ui/checkbox";
import { CgSortAz as SortIcon } from "react-icons/cg";
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
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="bg-white dark:bg-[#131313] dark:text-white shadow rounded-lg space-y-4">
  <div className="flex flex-row justify-between items-center mb-4 p-4 relative">
    <h1 className="text-sm font-medium text-[#53545C] dark:text-white">
      Customer Request
    </h1>

    <div className="relative">
      <button
        onClick={() => setIsMenuOpen(!isMenuOpen)}
        className="text-2xl text-white lg:hidden"
      >
        {isMenuOpen ? <HiX /> : <HiMenu />}
      </button>

      <div
        className={`${
          isMenuOpen ? "block" : "hidden"
        } absolute top-full right-0 mt-2 shadow-lg rounded-lg p-4 space-y-4 bg-white dark:bg-[#131313] lg:block lg:static lg:mt-0 lg:shadow-none lg:rounded-none`}
      >
        <div className="flex flex-col lg:flex-row lg:justify-end lg:items-center lg:space-x-2 space-y-2 lg:space-y-0">
          {/* Search Input */}
          <div className="flex items-center border border-[#CFD3D4] dark:bg-[#333333] rounded-[4px] overflow-hidden h-[29px] w-full lg:w-[200px]">
            <span className="px-3">
              <SearchIcon className="w-4 h-4" />
            </span>
            <input
              type="text"
              placeholder="Search"
              className="flex-1 p-1 outline-none h-full text-xs dark:bg-[#333333]"
            />
          </div>

          {/* Filter Button */}
          <Button className="bg-transparent text-[#53545C] dark:text-white dark:bg-[#333333] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <FilterIcon className="w-4 h-4" />
            <span className="sm:inline text-xs">Filter</span>
          </Button>

          {/* Date Picker */}
          <Popover>
            <PopoverTrigger asChild>
              <DatePicker
                variant="outline"
                className={cn(
                  "inline-flex items-center  font-normal border dark:text-white dark:bg-[#333333] border-[#53545C] h-[29px] rounded-[4px]",
                  !date && "text-muted-foreground bg-transparent"
                )}
              >
                <CalendarIcon className="ml-2 text-[#53545C] dark:text-white w-4 h-4" />
                {date ? (
                  <span className="ml-2">{format(date, "MMM d")}</span>
                ) : (
                  <span className="text-[#53545C] dark:text-white text-xs">
                    Date
                  </span>
                )}
              </DatePicker>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="end">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                initialFocus
              />
            </PopoverContent>
          </Popover>

          <Button className="bg-transparent text-[#53545C] dark:text-white dark:bg-[#333333] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <SendIcon width={16} height={16} />
            <span className="sm:inline text-xs">Share</span>
          </Button>

          
          <Button className="bg-transparent text-[#53545C] dark:text-white dark:bg-[#333333] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px]">
            <span className="text-xs">Bulk Action</span>
            <DownArrowIcon width={16} height={16} />
          </Button>
        </div>
      </div>
    </div>
    </div>
      <div className="overflow-x-auto">
        <table className="min-w-full table-auto rounded-lg">
          <thead className="border-t border-b border-gray-300 h-13">
            <tr className="text-left">
              <th className="px-4 py-2">
                <Checkbox
                  id="selectAll"
                  className="border-gray-300 dark:text-white align-middle"
                  checked={selectAll}
                  onCheckedChange={handleSelectAll}
                />
              </th>
              {[
                "Company Name",
                "Customer Name",
                "Order Date",
                "Ad Name",
                "Ad Run Dates",
                "Order Total",
                "Status",
              ].map((header, index) => (
                <th
                  key={index}
                  className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-white"
                >
                  <div className="flex items-center">
                    <span>{header}</span>
                    <SortIcon className="w-6 h-6 ml-2" />
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map(
              (request: CustomerRequestData, index: number) => (
                <tr key={index}>
                  <td className="px-4 py-2">
                    <Checkbox
                      className="border-gray-300 align-middle"
                      checked={selectedRows.includes(
                        `row-${(currentPage - 1) * itemsPerPage + index}`
                      )}
                      onCheckedChange={() =>
                        handleRowSelection(
                          `row-${(currentPage - 1) * itemsPerPage + index}`
                        )
                      }
                    />
                  </td>
                  {Object.entries(request).map(([key, value]) => (
                    <td
                      key={key}
                      className="px-4 py-2 text-sm text-gray-700 dark:text-white"
                    >
                      {key === "orderTotal" ? `₹${value.toFixed(2)}` : value}
                    </td>
                  ))}
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>

      <div className="flex justify-between items-center mt-4 px-4 py-2 border-t border-[#CFD3D4] ">
        <div className="flex items-center space-x-2">
          <select
            id="items-per-page"
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="border border-[#CFD3D4] dark:bg-[#333333] dark:text-white rounded-[4px] text-xs p-1"
          >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={20}>20</option>
          </select>
          <label
            htmlFor="items-per-page"
            className="text-xs text-[#53545C] dark:text-white "
          >
            Items per page
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <select
            id="page-select"
            value={currentPage}
            onChange={(e) => handlePageChange(Number(e.target.value))}
            className="border border-[#CFD3D4] dark:bg-[#333333] dark:text-white rounded-[4px] text-xs p-1"
          >
            {Array.from({ length: totalPages }, (_, index) => (
              <option key={index + 1} value={index + 1}>
                {index + 1}
              </option>
            ))}
          </select>
          <span className="text-xs text-[#53545C] dark:text-white ">
            of {totalPages}
          </span>
          <label
            htmlFor="page-select"
            className="text-xs dark:text-white  text-[#53545C]"
          >
            Pages
          </label>
        </div>
      </div>
    </div>
  );
};

export default CustomerRequest;
