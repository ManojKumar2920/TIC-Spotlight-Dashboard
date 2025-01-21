import { NextRequest, NextResponse } from "next/server";
import { cookies } from "next/headers";
import jwt from "jsonwebtoken";
import connectDB from "@/lib/db";
import Campaigns from "@/models/campaigns.model";

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;

export async function POST(req: NextRequest) {
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

      // Extract the data from the request body
      const body = await req.json();

      // Create a new campaign document
      const newCampaign = new Campaigns({
        userId: decoded.userId,
        adType: body.adType,
        campaignName: body.campaignName,
        startDate: body.startDate,
        endDate: body.endDate,
        totalBudget: body.totalBudget,
        totalCars: body.totalCars,
        details: body.details,
        location: body.location,
        frequency: body.frequency,
        timeSlot: body.timeSlot,
        imageUrl: body.imageUrl,
        totalHours: body.totalHours,
        ratePerHour: body.ratePerHour,
        status: body.status,
        date: body.date,
        totalAmount: body.totalAmount,
        cgst: body.cgst,
        kgst: body.kgst,
        gst: body.gst,
        sgst: body.sgst,
        grandTotal: body.grandTotal,
      });

      // Save the campaign to the database
      await newCampaign.save();

      // Return a successful response with campaign data
      return NextResponse.json(
        {
          message: "Campaign created successfully",
          campaign: newCampaign,
        },
        { status: 201 }
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
