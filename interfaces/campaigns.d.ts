import { Document } from "mongoose";

import { Schema, model, Document } from 'mongoose';

export interface ICampaigns extends Document {
  userId: Schema.Types.ObjectId;
  adType: 'static' | 'dynamic';
  campaignName: string;
  startDate: Date;
  endDate: Date;
  totalBudget?: number;
  totalCars?: number;
  details: string;
  location: string;
  frequency: string;
  timeSlot: string;
  imageUrl?: string;
  createdAt: Date;
  updatedAt: Date;
  totalHours: number;
  ratePerHour: number;
  status: string;
  date: Date;
  totalAmount: number;
  
  cgst: number;
  kgst: number;
  gst: number;
  sgst: number;
  grandTotal: number;
}
  
  // dailyBudget: number;
  // industry: string;
  // status: string;
  // rate: number;
  // totalPlays: number;
  // dailyPlays: number;

