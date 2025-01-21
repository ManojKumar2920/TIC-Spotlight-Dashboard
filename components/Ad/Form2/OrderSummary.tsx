import { ClockIcon, RupeeICon } from "@/components/ReusableComponents/Icon";
import Image from "next/image";
import React, { useRef, useEffect, useState } from "react";
import Button from "@/components/ReusableComponents/Button";
import { Download as UploadIcon } from "lucide-react";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from "next/navigation";
import { uploadToR2 } from "@/lib/r2";

type OrderSummaryFormProps = {
    onBack: () => void;
    campaignDetails: any;
};
const OrderSummary: React.FC<OrderSummaryFormProps> = ({
    onBack,
    campaignDetails,
}) => {
    console.log("Campaign Details:", campaignDetails);
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [imageUrl, setImageUrl] = useState<string | null>(null);
    const [calculatedDetails, setCalculatedDetails] = useState<any>({});
    const [totalHours, setTotalHours] = useState<number | string>("N/A");
    const [totalAmount, setTotalAmount] = useState<number>(0);
    const [cgst, setCGST] = useState<number>(0);
    const [sgst, setSGST] = useState<number>(0);
    const [kgst, setKGST] = useState<number>(0);
    const [gst, setGST] = useState<number>(0);
    const router = useRouter();

    useEffect(() => {
        if (campaignDetails) {
            calculateTotalHoursAndAmount(campaignDetails);
        }
    }, [campaignDetails]);

    const calculateTotalHoursAndAmount = (details: any) => {
        // const start = new Date(details.startDate);
        // const end = new Date(details.endDate);
    
        // Calculate total days
        // const totalDays = Math.ceil(
        //     (end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
        // );
    
        // Define hours per day based on timeSlot
        // const timeSlotHoursMap: { [key: string]: number } = {
        //     "24/7": 24,
        //     "7AM - 11PM": 16,
        //     "1PM - 11PM": 10,
        //     "7AM - 1PM": 6,
        // };
    
        // // Calculate total hours
        // const totalHours = totalDays * hoursPerDay;
        // // Calculate total amount
        // const ratePerHour = 360;
        // const totalAmount = totalHours * ratePerHour;
        const totalAmount = parseFloat(campaignDetails.totalBudget);
        const ratePerHour = 360;
        const totalHours = totalAmount / ratePerHour;
        const totalHoursRounded = totalHours.toFixed(2);
    
        // Calculate tax breakdown
        const cgst = totalAmount * 0.09;
        const sgst = totalAmount * 0.09;
        const kgst = totalAmount * 0.0;
        const gst = totalAmount * 0.18;
    
        setCalculatedDetails({
          ...details,
          //   totalDays,
          totalHours,
          totalAmount,
        });
    
        setTotalHours(totalHoursRounded || "N/A");
        setTotalAmount(totalAmount);
        setCGST(cgst);
        setSGST(sgst);
        setKGST(kgst);
        setGST(gst);
      };
    
      const taxDetails = [
        { label: "Total Amount", value: `₹${totalAmount}` },
        { label: "CGST (9%)", value: `₹${cgst.toFixed(2)}` },
        { label: "SGST (9%)", value: `₹${sgst.toFixed(2)}` },
        { label: "KGST (0%)", value: `₹${kgst.toFixed(2)}` },
        { label: "Total GST (18%)", value: `₹${gst.toFixed(2)}` },
      ];
    
      const grandTotal = totalAmount + gst;
    
      const Hours = [
        { value: totalHours, label: "No.of hours", image: ClockIcon },
        { value: "360 /-", label: "Rate / hour", image: RupeeICon },
      ];
    
      const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => { 
        if (event.target.files) { 
            const file = event.target.files[0]; 
            if (!file) return; try { 
                const arrayBuffer = await file.arrayBuffer(); 
                const buffer = Buffer.from(arrayBuffer); 
                const mimeType = file.type; 
                const key = `${Date.now()}_${file.name}`; 
                const uploadedFileUrl = await uploadToR2(key, buffer, mimeType); 
                setImageUrl(uploadedFileUrl); 
                console.log('File uploaded successfully:', uploadedFileUrl); 
            } catch (error) { 
                console.error('Error uploading file:', error); } } }; 
    
    
      const handleBrowseClick = () => {
        fileInputRef.current?.click();
      };
    
      const handleSubmit = async () => {
        const campaignData = {
          ...calculatedDetails,
          totalAmount,
          cgst,
          sgst,
          kgst,
          gst,
          grandTotal,
          imageUrl,
        };
    
        console.log("Campaign Data to be saved:", campaignData);
    
        try {
          // Sending the campaign data to the backend using axios POST request
          const response = await axios.post(`/api/campaign`, campaignData);
    
          if (response.status === 201) {
            toast.success("Campaign saved successfully!");
            router.push("/dashboard");
          } else {
            toast.error("Failed to save campaign. Please try again."); // Error message with Toastify
          }
        } catch (error) {
          console.error("Error saving campaign:", error);
          toast.error("Failed to save campaign. Please try again."); // Error message with Toastify
        }
      };

    return (
        <div>
            <div className="flex flex-col lg:flex-row md:flex-row gap-4 p-3 mt-3 flex-grow ">
                <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white shadow-md ">
                    <div className="w-full p-4 dark:bg-[#1e1e1e]">
                    <ToastContainer />
                        <div className="flex flex-grow flex-col space-y-4 p-4 h-full dark:bg-[#1e1e1e]">
                            {/* Section for Upload Media */}
                            <div>
                                <h1 className="text-xl font-bold">Upload Media</h1>
                                <span className="text-sm">
                                    Supported Formats: .jpg, .png, .vlc
                                </span>
                                <div className="mt-2">
                                    <Button
                                        className="bg-transparent w-[210px] text-black dark:text-white rounded-[30px] flex items-center justify-center gap-2 border border-black dark:border-white"
                                        onClick={handleBrowseClick}
                                    >
                                        Browse
                                        <UploadIcon width={20} height={20} />
                                    </Button>
                                </div>

                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    className="hidden"
                                    accept="image/*, .vlc"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div>
                                <h1 className="text-base font-bold ">3D Render Model</h1>
                                <div className="flex flex-col space-y-4 p-4 bg-[#FAFBFC] dark:bg-[#333333] rounded-[16px] h-[250px] mt-2"></div>
                            </div>

                            <div className="flex text-start mt-auto gap-4">
                                <Button
                                    onClick={onBack}
                                    className="bg-transparent w-[125px] h-[40px] text-black dark:text-white rounded-[40px] flex items-center justify-center gap-2 border border-black dark:border-white"
                                >
                                    Back
                                </Button>
                                <Button
                                    onClick={handleSubmit}
                                    className="bg-[#4F8AFF] w-[125px] h-[40px] text-white rounded-[40px] flex items-center justify-center gap-2"
                                >
                                    Proceed
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex-1 flex items-stretch justify-center rounded-[12px] bg-white  shadow-md ">
                    <div className="w-full p-4 dark:bg-[#1e1e1e]  space-y-10">
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
                                            <span className="text-xl block font-medium">
                                                {hour.value}
                                            </span>

                                            <span className="text-base">{hour.label}</span>
                                        </div>
                                        <div className="absolute bottom-2 right-2">
                                            <Image
                                                src={hour.image}
                                                alt={hour.label}
                                                width={24}
                                                height={24}
                                            />
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
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSummary;
