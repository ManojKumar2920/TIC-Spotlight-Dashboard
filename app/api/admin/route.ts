import { NextRequest, NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Campaigns from "@/models/campaigns.model";

export async function GET(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    // Fetch campaigns and populate user details
    const campaigns = await Campaigns.find()
      .populate("userId", "name email companyName")
      .exec();

    if (!campaigns.length) {
      return NextResponse.json(
        { message: "No campaigns found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Campaigns and user details fetched successfully",
        campaigns,
      },
      { status: 200 }
    );
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



export async function PUT(req: NextRequest) {
  try {
    // Connect to the database
    await connectDB();

    const { campaignIds, status } = await req.json(); // Assuming campaignIds is an array

    // Validate campaignIds and status
    if (!Array.isArray(campaignIds) || campaignIds.length === 0) {
      return NextResponse.json(
        { message: "Invalid campaign IDs" },
        { status: 400 }
      );
    }

    // If there is only one campaignId, update just that campaign
    if (campaignIds.length === 1) {
      const updatedCampaign = await Campaigns.findByIdAndUpdate(
        campaignIds[0], // Use the first ID
        { status },
        { new: true }
      );

      if (!updatedCampaign) {
        return NextResponse.json(
          { message: "Campaign not found" },
          { status: 404 }
        );
      }

      return NextResponse.json(
        {
          message: "Campaign status updated successfully",
          updatedCampaign,
        },
        { status: 200 }
      );
    }

    // If there are multiple campaignIds, update all of them
    const updatedCampaigns = await Campaigns.updateMany(
      { _id: { $in: campaignIds } }, // Find campaigns by the given IDs
      { status }, // Update status
      { new: true }
    );

    if (!updatedCampaigns.matchedCount) {
      return NextResponse.json(
        { message: "No campaigns found with the given IDs" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: `${updatedCampaigns.modifiedCount} campaigns updated successfully`,
        updatedCampaigns,
      },
      { status: 200 }
    );
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
