import { NextResponse } from "next/server";
import { getAuth } from "@clerk/nextjs/server";
import { NextRequest } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(request: NextRequest) {
  try {
    const { userId } = getAuth(request);
    
    if (!userId) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();
    const { fullName, email, phone, address } = body;

    // Connect to MongoDB
    await connectDB();

    // Find the user in the database
    const dbUser = await User.findOne({ clerkId: userId });

    if (!dbUser) {
      return NextResponse.json({ error: "User not found" }, { status: 404 });
    }

    // Update user with application data
    dbUser.phone = phone;
    dbUser.address = address;
    await dbUser.save();

    return NextResponse.json({ message: "Application submitted successfully" });
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { error: "Error submitting application" },
      { status: 500 }
    );
  }
} 