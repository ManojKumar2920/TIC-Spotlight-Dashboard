import mongoose, { Schema } from "mongoose";
import { ICampaigns } from "@/interfaces/campaigns";

const campaignsSchema = new Schema<ICampaigns>(
  {
    userId: { type: Schema.Types.ObjectId, ref:"User" },
    adType: { type: String, enum: ["static", "dynamic"] },
    campaignName: {
      type: String,
    },
    startDate: {
      type: Date,
    },
    endDate: { type: Date },
    totalBudget: {
      type: Number,
      required: function (this: ICampaigns) {
        return this.adType === "dynamic";
      },
    },
    totalCars: {
      type: Number,
      required: function (this: ICampaigns) {
        return this.adType === "static";
      },
    },
    details: {
      type: String,
    },
    location: {
      type: String,
    },
    timeSlot: {
      type: String,
    },
    imageUrl: {
      type: String,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
      default: Date.now,
    },
    totalHours: {
      type: Number,
    },
    ratePerHour: {
      type: Number,
    },
    status: {
      type: String,
      enum: ["Active", "Pending", "Completed", "Approved"],
      default: "Pending",
    },
    // date: {
    //   type: Date,
    //   default:Date.now
    // },
    totalAmount: {
      type: Number,
    },
    cgst: {
      type: Number,
    },
    kgst: {
      type: Number,
    },
    gst: {
      type: Number,
    },
    sgst: {
      type: Number,
    },
    grandTotal: {
      type: Number,
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
