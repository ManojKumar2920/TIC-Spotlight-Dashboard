import mongoose, { Schema, Document } from "mongoose";
import { IInvoice } from "@/interfaces/invoices";

const invoiceSchema = new Schema<IInvoice>(
  {
    campaignId: {
      type: Schema.Types.ObjectId,
      ref: "campaigns",
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    totalHours: {
      type: Number,
    },
    ratePerHour: {
      type: Number,
    },
    status: {
      type: String,
    },
    date: {
      type: Date,
    },
    totalAmount: {
      type: Number,
    },
    totalBudget: {
      type: Number,
    },
    cgst: {
      type: String,
    },
    gst: {
      type: String,
    },
    sgst: {
      type: String,
    },
    grandTotal: {
      type: Number,
    },
  },
  {
    timestamps: true,
  }
);

const Invoice =
  mongoose.models.Invoice || mongoose.model<IInvoice>("Invoice", invoiceSchema);

export default Invoice;
