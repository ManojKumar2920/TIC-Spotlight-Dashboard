import { IUser } from '@/interfaces/user';
import mongoose, { Document, Schema } from 'mongoose';


const userSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: [true, "First name is required"],
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
        // required: [true, "Password is required"],
        minlength: 8,
      },
    phoneNumber: {
      type: String,
      required: false, 
    },
    companyName: {
      type: String,
      required: false,
      default: ""
    },
    gstn: {
      type: String,
      required: false,
      default: ""
    },
    companyAddress: {
      type: String,
      required: false,
      default: ""
    },
    billingAddress: {
      type: String,
      required: false,
      default: ""
    },
    role: {
      type: String,
      enum: ["user", "admin", "moderator"], 
      default: "user",
    },
    companyLogo:{
      type: String,
      default: ""
    },

    isVerified: { 
      type: Boolean, 
      default: false 
    },
  },
  {
    timestamps: true, 
  }
);

const User = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export default User;
