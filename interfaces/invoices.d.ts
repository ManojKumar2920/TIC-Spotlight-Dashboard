import { Document } from "mongoose";

export interface IInvoice extends Document {
  campaignId: Schema.Types.ObjectId;
  userId: Schema.Types.ObjectId;
  totalHours: number;
  ratePerHour: number;
  status: string;
  date: Date;
  totalAmount: number;
  totalBudget: number;
  cgst: string;
  gst: string;
  sgst: string;
  grandTotal: number;
}
