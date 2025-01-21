import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";
import sendPasswordResetEmail from "@/utils/sentPasswordResetEmail";
import jwt from "jsonwebtoken";


export async function POST(req: NextRequest) {
  try {
    await connectDB();

    const { email } = await req.json();

    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "User with this email does not exist" },
        { status: 404 }
      );
    }
    const resetPasswordSecret = process.env.RESET_PASSWORD_SECRET as string
    const token = jwt.sign({ userId: user._id },resetPasswordSecret, { expiresIn: '1h' });

    await sendPasswordResetEmail(user.email, token);

    return NextResponse.json({ message: "Password reset email sent" }, { status: 200 });

  } catch (error) {
    return NextResponse.json(
        {
            message: "Internal server error",
            error: error instanceof Error ? error.message : "Unknown error",
          },
          { status: 500 }
    );
  }
}
