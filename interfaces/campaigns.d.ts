import { Document } from "mongoose";

export interface ICampaigns extends Document {
  userId: Schema.Types.ObjectId;
  campaignName: string;
  startDate: Date;
  endDate: Date;
  totalBudget: number;
  dailyBudget: number;
  details: string;
  location: string;
  frequency: number;
  timeSlot: string;
  imageUrl: string;
  createdAt: Date;

  //Please Check
  industry: string;
  status: string;
  rate: number;
  totalPlays: number;
  dailyPlays: number;
}
