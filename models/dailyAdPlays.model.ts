import mongoose, { Schema } from "mongoose";
import { IDailyAdPlays } from "@/interfaces/dailyAdPlays";

const dailyAdPlaysSchema = new Schema<IDailyAdPlays>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "campaigns",
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    playCount: {
      type: Number,
      required: true,
    },
    totalTime: {
      type: Number,
      required: true,
    },
    createdAt: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DailyAdPlays =
  mongoose.models.DailyAdPlays ||
  mongoose.model<IDailyAdPlays>("DailyAdPlays", dailyAdPlaysSchema);

export default DailyAdPlays;
