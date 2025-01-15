import mongoose, { Schema, Document } from "mongoose";
import { IUser } from "@/interfaces/users";


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      validate: {
        validator: (value: string) => {
          return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(value);
        },
        message: "Please enter a valid email address",
      },
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: [8, "Password must be at least 8 characters long"],
    },
    phoneNumber: {
      type: String,
      required: false,
    },
    companyName: {
      type: String,
      required: false,
    },
    gstn: {
      type: String,
      required: false,
    },
    companyAddress: {
      type: String,
      required: false,
    },
    billingAddress: {
      type: String,
      required: false,
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"],
      default: "user",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", userSchema);

export default User;
