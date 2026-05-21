import { NextResponse } from "next/server";

import { confirmVerificationEmail } from "@/lib/email-verification";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const email = searchParams.get("email")?.trim() ?? "";
  const token = searchParams.get("token")?.trim() ?? "";

  if (!email || !token) {
    return new NextResponse(
      `
      <html>
        <body style="font-family: sans-serif; padding: 24px;">
          <h1>Email verification failed</h1>
          <p>Missing email or token.</p>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }

  try {
    await confirmVerificationEmail({ email, token });

    return new NextResponse(
      `
      <html>
        <body style="font-family: sans-serif; padding: 24px;">
          <h1>Email verified</h1>
          <p>Your email has been verified successfully. You can return to the DELLA provider app and continue registration.</p>
        </body>
      </html>
      `,
      {
        status: 200,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  } catch (error) {
    return new NextResponse(
      `
      <html>
        <body style="font-family: sans-serif; padding: 24px;">
          <h1>Email verification failed</h1>
          <p>${error instanceof Error ? error.message : "The verification link is invalid."}</p>
        </body>
      </html>
      `,
      {
        status: 400,
        headers: { "Content-Type": "text/html; charset=utf-8" },
      },
    );
  }
}
