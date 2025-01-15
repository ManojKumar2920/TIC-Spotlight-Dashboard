import mongoose, { Schema } from "mongoose";
import { ILocationData } from "@/interfaces/locationData";

const locationDataSchema = new mongoose.Schema<ILocationData>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "campaigns",
      required: true,
    },
    latitude: {
      type: Number,
      required: true,
    },
    longitude: {
      type: Number,
      required: true,
    },
    time: {
      type: Date,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    timeAdded: {
      type: Date,
    },
  },
  {
    timestamps: true,
  }
);

const LocationData =
  mongoose.models.LocationData ||
  mongoose.model<ILocationData>("LocationData", locationDataSchema);

export default LocationData;
