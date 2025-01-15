import { Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phoneNumber: string;
  companyName: string;
  gstn: string;
  companyAddress: string;
  billingAddress: string;
  role: string;
  createdAt: Date;
  updatedAt: Date;
}
