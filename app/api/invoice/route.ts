import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Campaigns from "@/models/campaigns.model";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;

export async function GET(req: NextRequest) {
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
      // Verify the refresh token
      const decoded = jwt.verify(refreshToken.value, REFRESH_TOKEN_SECRET) as {
        userId: string;
        email: string;
      };

      // Get campaigns for the user by their userId
      const userId = decoded.userId;

      // Find campaigns associated with the userId
      const campaigns = await Campaigns.find({ userId });

      if (!campaigns.length) {
        return NextResponse.json(
          { message: "No campaigns found" },
          { status: 404 }
        );
      }

      // Return the found campaigns
      return NextResponse.json(
        {
          message: "Campaigns fetched successfully",
          campaigns,
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
