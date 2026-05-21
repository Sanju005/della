import { NextResponse } from "next/server";

import { getEmailVerificationStatus } from "@/lib/email-verification";

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

    const status = await getEmailVerificationStatus(email);

    return NextResponse.json({
      ok: true,
      status: status?.status ?? "pending",
      verifiedAt: status?.verified_at ?? null,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch email verification status.",
      },
      { status: 500 },
    );
  }
}
