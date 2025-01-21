import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import User from "@/models/User";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Get refresh token from cookies
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refreshToken");

    if (!refreshToken) {
      return NextResponse.json(
        { message: "Unauthorized: No refresh token found" },
        { status: 401 }
      );
    }

    try {
      // Verify refresh token
      const decoded = jwt.verify(refreshToken.value, REFRESH_TOKEN_SECRET) as {
        userId: string;
        email: string;
      };

      // Parse the request body for updated user data
      const body = await req.json();
      const { name, phoneNumber, companyName, gstn, billingAddress, companyAddress, companyLogo } = body;

      // Ensure at least one valid field is provided
      if (!name && !phoneNumber && !companyName && !gstn && !billingAddress && !companyAddress && !companyLogo) {
        return NextResponse.json(
          { message: "Bad Request: No valid fields provided to update" },
          { status: 400 }
        );
      }

      // Build the update object dynamically
      const updateFields: any = {};
      if (name) updateFields.name = name;
      if (phoneNumber) updateFields.phoneNumber = phoneNumber;
      if (companyName) updateFields.companyName = companyName;
      if (gstn) updateFields.gstn = gstn;
      if (billingAddress) updateFields.billingAddress = billingAddress;
      if (companyAddress) updateFields.companyAddress = companyAddress;
      if (companyLogo) updateFields.companyLogo = companyLogo

      // Find and update the user
      const updatedUser = await User.findOneAndUpdate(
        { email: decoded.email },
        { $set: updateFields },
        { new: true, runValidators: true } // Return the updated document and validate inputs
      ).select(
        "name email phoneNumber role companyName gstn billingAddress companyAddress createdAt updatedAt"
      );

      if (!updatedUser) {
        return NextResponse.json(
          { message: "Unauthorized: User not found" },
          { status: 401 }
        );
      }

      // Create response with updated user data
      return NextResponse.json(
        {
          message: "User updated successfully",
          user: {
            name: updatedUser.name,
            email: updatedUser.email,
            phoneNumber: updatedUser.phoneNumber,
            companyName: updatedUser.companyName,
            gstn: updatedUser.gstn,
            billingAddress: updatedUser.billingAddress,
            companyAddress: updatedUser.companyAddress,
            role: updatedUser.role,
            createdAt: updatedUser.createdAt,
            updatedAt: updatedUser.updatedAt,
          },
        },
        { status: 200 }
      );
    } catch (error) {
      // Handle invalid or expired refresh token
      if (error instanceof jwt.JsonWebTokenError) {
        // Clear the invalid refresh token
        (await cookies()).delete("refreshToken");

        return NextResponse.json(
          { message: "Unauthorized: Invalid refresh token" },
          { status: 401 }
        );
      }
      throw error;
    }
  } catch (error) {
    return NextResponse.json(
      {
        message: "Internal server error",
        error: error instanceof Error ? error.message : String(error),
      },
      { status: 500 }
    );
  }
}
