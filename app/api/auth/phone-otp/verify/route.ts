import { NextResponse } from "next/server";

import { verifyPhoneOtp } from "@/lib/twilio";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      phoneNumber?: string;
      code?: string;
    };

    const phoneNumber = body.phoneNumber?.trim() ?? "";
    const code = body.code?.trim() ?? "";

    if (!phoneNumber || !code) {
      return NextResponse.json(
        { error: "Phone number and code are required." },
        { status: 400 },
      );
    }

    const verification = await verifyPhoneOtp(phoneNumber, code);

    return NextResponse.json({
      ok: verification.status === "approved",
      status: verification.status,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error ? error.message : "Failed to verify phone OTP.",
      },
      { status: 500 },
    );
  }
}
