import mongoose, { Schema } from "mongoose";
import { ICampaigns } from "@/interfaces/campaigns";

const campaignsSchema = new Schema<ICampaigns>(
  {
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    campaignName: {
      type: String,
      required: [true, "Campaign name is required"],
    },
    startDate: {
      type: Date,
      required: [true, "Start date is required"],
    },
    endDate: {
      type: Date,
      required: [true, "End date is required"],
    },
    totalBudget: {
      type: Number,
      required: [true, "Total budget is required"],
    },
    dailyBudget: {
      type: Number,
      required: [true, "Daily budget is required"],
    },
    details: {
      type: String,
      required: [true, "Details are required"],
      maxlength: [500, "Details must not exceed 500 characters"],
    },
    location: {
      type: String,
      required: [true, "Location is required"],
    },
    frequency: {
      type: Number,
      required: [true, "Frequency is required"],
    },
    timeSlot: {
      type: String,
      required: [true, "Time slot is required"],
    },
    iconUrl: {
      type: String,
      required: false,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    industry: {
      type: String,
      required: [true, "Industry is required"],
    },
    status: {
      type: String,
      required: false,
    },
    rate: {
      type: Number,
      required: false,
    },
    totalPlays: {
      type: Number,
      required: false,
    },
    dailyPlays: {
      type: Number,
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

const Campaigns =
  mongoose.models.Campaigns ||
  mongoose.model<ICampaigns>("Campaigns", campaignsSchema);

export default Campaigns;
