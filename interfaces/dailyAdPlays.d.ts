import mongoose from "mongoose";

export interface IDailyAdPlays extends Document {
  campaignId: Schema.Types.ObjectId;
  name: string;
  date: Date;
  playCount: number;
  totalTime: number;
  createdAt: Date;
}
