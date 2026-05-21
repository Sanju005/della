import { NextResponse } from "next/server";

import { sendVerificationEmail } from "@/lib/email-verification";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { email?: string };
    const email = body.email?.trim() ?? "";

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    await sendVerificationEmail(email);

    return NextResponse.json({ ok: true });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to send verification email.",
      },
      { status: 500 },
    );
  }
}
