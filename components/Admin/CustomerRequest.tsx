"use client";

import React, { useEffect, useState } from "react";
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
import { Checkbox } from "@/components/ui/checkbox";
import { CgSortAz as SortIcon } from "react-icons/cg";
import { fetchUserCampaignsForAdmin, updateCampaignStatus } from "../Api/Api";

interface User {
  name: string;
  companyName: string;
}

interface CustomerRequestData {
  _id: string;
  campaignName: string;
  companyName: string;
  customerName: string;
  orderDate: string;
  adName: string;
  adRunDates: string;
  orderTotal: number;
  status: string;
  userId: User;
  totalBudget: number;
  startDate: Date;
  endDate: Date;
  grandTotal: number;
}

const CustomerRequest: React.FC = () => {
  const [date, setDate] = useState<Date | undefined>();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [selectAll, setSelectAll] = useState(false);
  const [paginatedData, setPaginatedData] = useState<CustomerRequestData[]>([]);
  const [campaigns, setCampaigns] = useState([]);
  const totalItems = campaigns.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const [loading, setLoading] = useState(true);
  const [selectedCampaignIds, setSelectedCampaignIds] = useState<string[]>([]);
  const [showBulkActions, setShowBulkActions] = useState(false);

  const handleRowSelection = (campaignId: string) => {
    setSelectedCampaignIds((prevSelected) => {
      const updatedSelectedIds = prevSelected.includes(campaignId)
        ? prevSelected.filter((id) => id !== campaignId)
        : [...prevSelected, campaignId];
      return updatedSelectedIds;
    });
  };

  const handleSelectAll = () => {
    const allCampaignIds = paginatedData.map((campaign) => campaign._id);
    const updatedSelectedIds = selectAll ? [] : allCampaignIds;

    setSelectedCampaignIds(updatedSelectedIds);
    setSelectAll(!selectAll);
  };

  const handleStatusChange = async (status: string) => { 
    try { 
      const data = await updateCampaignStatus(selectedCampaignIds, status); 
      setShowBulkActions(false); } 
      catch (error) { 
        console.error("Error updating status:", error); 
      } 
    }; 

  useEffect(() => {
    const getCampaigns = async () => {
      try {
        const fetchedCampaigns = await fetchUserCampaignsForAdmin();
        setCampaigns(fetchedCampaigns);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getCampaigns();
  }, []);

  const handlePageChange = (newPage: number) => {
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const handleItemsPerPageChange = (
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  useEffect(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    setPaginatedData(campaigns.slice(startIndex, endIndex));
  }, [campaigns, currentPage, itemsPerPage]);


  return (
    <div className="bg-white dark:bg-[#131313] dark:text-white shadow rounded-lg space-y-4">
      <div className="flex flex-row justify-between items-center  mb-4 p-3 relative">
        <h1 className="text-sm font-medium text-[#53545C] dark:text-white">
          Customer Request
        </h1>

        <div className="relative">
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-xl  lg:hidden"
          >
            {isMenuOpen ? <HiX /> : <HiMenu />}
          </button>

          <div
            className={`${isMenuOpen ? "block" : "hidden"
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

              <Button
                className="bg-transparent text-[#53545C] dark:text-white dark:bg-[#333333] rounded-[4px] flex items-center justify-center gap-2 border border-[#53545C] hover:bg-white h-[29px] relative" // Added relative
                onClick={() => setShowBulkActions(!showBulkActions)}
              >
                <span className="text-xs">Bulk Action</span>
                <DownArrowIcon width={15} height={15} />
              </Button>
              {showBulkActions && (
                <div className="absolute bottom-0 right-0 bg-white dark:bg-[#333333] border border-[#53545C] rounded-[4px] mt-2 p-2 shadow-md">
                  <ul>
                    <li
                      className="text-xs py-1 px-2 cursor-pointer hover:bg-[#eaeaea] dark:hover:bg-[#444444]"
                      onClick={() => handleStatusChange("Active")}
                    >
                      Active
                    </li>
                    <li
                      className="text-xs py-1 px-2 cursor-pointer hover:bg-[#eaeaea] dark:hover:bg-[#444444]"
                      onClick={() => handleStatusChange("Rejected")}
                    >
                      Rejected
                    </li>
                    <li
                      className="text-xs py-1 px-2 cursor-pointer hover:bg-[#eaeaea] dark:hover:bg-[#444444]"
                      onClick={() => handleStatusChange("Approved")}
                    >
                      Approved
                    </li>
                  </ul>
                </div>
              )}

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
                      checked={selectedCampaignIds.includes(request._id)}
                      onCheckedChange={() => handleRowSelection(request._id)}
                    />
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    {request.userId ? request.userId.companyName : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    {request.userId ? request.userId.name : "N/A"}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    {new Date(request.startDate).toLocaleDateString()} to{" "}
                    {new Date(request.endDate).toLocaleDateString()}{" "}
                    {/* Format end date */} {/* Format start date */}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    {request.campaignName}
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    undefined
                  </td>

                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    ₹{request.grandTotal}
                  </td>
                  <td className="px-4 py-2 text-sm text-gray-700 dark:text-white">
                    <span
                      className={`${request.status === 'Rejected'
                          ? 'bg-red-200 text-red-600'
                          : request.status === 'Pending'
                            ? 'bg-gray-200 text-gray-700' 
                            : request.status === 'Active'
                              ? 'bg-green-200 text-green-600' 
                              : request.status === 'Approved'
                                ? 'bg-blue-200 text-blue-600' 
                                : 'bg-transparent text-black' 
                        } px-3 py-1 rounded-full`}
                    >
                      {request.status}
                    </span>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
      </div>
      {/* pagination */}
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
