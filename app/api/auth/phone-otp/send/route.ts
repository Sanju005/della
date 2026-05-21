import { NextResponse } from "next/server";

import { sendPhoneOtp } from "@/lib/twilio";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { phoneNumber?: string };
    const phoneNumber = body.phoneNumber?.trim() ?? "";

    if (!phoneNumber) {
      return NextResponse.json(
        { error: "Phone number is required." },
        { status: 400 },
      );
    }

    const verification = await sendPhoneOtp(phoneNumber);

    return NextResponse.json({
      ok: true,
      status: verification.status,
      channel: verification.channel,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to send phone OTP.",
      },
      { status: 500 },
    );
  }
}
