import { Document } from "mongoose";

export interface ILocationData extends Document {
  campaignId: Schema.Types.ObjectId;
  latitude: number;
  longitude: number;
  time: Date;
  name: string;
  timeAdded: Date;
}
