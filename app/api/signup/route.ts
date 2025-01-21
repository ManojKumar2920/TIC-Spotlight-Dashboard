import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import OTP from "@/models/Otp";
import { sendEmailOtp } from "@/utils/sendEmailOtp";
import { generateOtp } from "@/utils/generateOtp";
import { sendWelcomeMail } from "@/utils/sendWelcomeMail";
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

const validateEnvVariables = () => {
  if (!ACCESS_TOKEN_SECRET || !REFRESH_TOKEN_SECRET) {
    throw new Error("Missing required environment variables.");
  }
};

export async function POST(req: NextRequest) {
  try {
    validateEnvVariables();

    await connectDB();

    const { name, email, phoneNumber, emailOtp, password, companyName, companyAddress, gstn, billingAddress, companyLogo } = await req.json();

    if (!emailOtp) {
      if (!name || !email || !phoneNumber || !password) {
        return NextResponse.json(
          { message: "Missing required fields" },
          { status: 422 }
        );
      }

      const existingUser = await User.findOne({ email });
      if (existingUser) {
        return NextResponse.json(
          { message: "User already exists" },
          { status: 400 }
        );
      }

      await OTP.deleteMany({ email });

      const otp = generateOtp();

      const expiryDate = new Date(Date.now() + 5 * 60 * 1000); // 5 minutes expiry
      const newOTP = new OTP({
        email,
        otp,
        expiresAt: expiryDate,
      });
      await newOTP.save();

      // Send OTP via email
      await sendEmailOtp(email, otp);

      return NextResponse.json(
        {
          message: "OTP sent successfully",
          otpSent: true,
        },
        { status: 200 }
      );
    }

    if (emailOtp) {
      const storedOtp = await OTP.findOne({
        email,
        otp: emailOtp,
      });

      if (!storedOtp) {
        return NextResponse.json(
          { message: "Invalid or expired OTP" },
          { status: 400 }
        );
      }

      if (storedOtp.expiresAt < new Date()) {
        // Remove expired OTP
        await OTP.deleteOne({ email, otp: emailOtp });
        return NextResponse.json(
          { message: "OTP has expired" },
          { status: 400 }
        );
      }

      // Hash the password before saving it
      const hashedPassword = await bcrypt.hash(password, 10);

      const newUser = new User({
        name,
        email,
        phoneNumber,
        password: hashedPassword,
        isVerified:true,
        companyName,
        gstn,
        companyAddress,
        billingAddress,
        companyLogo
      });

      await newUser.save();

      // Generate access and refresh tokens
      const accessToken = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
        },
        ACCESS_TOKEN_SECRET,
        { expiresIn: "15m" }
      );

      const refreshToken = jwt.sign(
        {
          userId: newUser._id,
          email: newUser.email,
        },
        REFRESH_TOKEN_SECRET,
        { expiresIn: "30d" }
      );

      // Create response with user data and access token
      const response = NextResponse.json(
        {
          message: "User created successfully",
          user: {
            name: newUser.name,
            email: newUser.email,
            role: newUser.role,
            companyName: newUser.companyName,
            gstn: newUser.gstn,
            companyAddress: newUser.companyAddress,
            billingAddress:newUser.billingAddress,
            companyLogo:newUser.companyLogo
          },
          accessToken,
        },
        { status: 201 }
      );

      // Set refresh token in HTTP-only cookie
      const cookieStore = await cookies();
      cookieStore.set({
        name: "refreshToken",
        value: refreshToken,
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 30 * 24 * 60 * 60, // 30 days
        sameSite: "lax",
        priority: "high",
      });

      // Remove the used OTP
      await OTP.deleteOne({ email, otp: emailOtp });

      // Send welcome email
      await sendWelcomeMail(email, name);

      return response;
    }
  } catch (error) {
    console.error("Signup error:", error);
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    );
  }
}
