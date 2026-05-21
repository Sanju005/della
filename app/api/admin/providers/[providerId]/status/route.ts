import { NextResponse } from "next/server";

import {
  ADMIN_PROVIDER_ACTIONS,
  updateProviderApprovalStatus,
  type AdminProviderAction,
} from "@/lib/provider-approval";

export async function POST(
  request: Request,
  context: { params: Promise<{ providerId: string }> },
) {
  try {
    const { providerId } = await context.params;
    const body = (await request.json()) as {
      action?: string;
      note?: string;
    };

    const action = body.action?.trim() as AdminProviderAction | undefined;

    if (!providerId) {
      return NextResponse.json(
        { error: "Provider id is required." },
        { status: 400 },
      );
    }

    if (!action || !ADMIN_PROVIDER_ACTIONS.includes(action)) {
      return NextResponse.json(
        { error: "A valid admin provider action is required." },
        { status: 400 },
      );
    }

    const result = await updateProviderApprovalStatus({
      providerId,
      action,
      note: body.note ?? "",
    });

    return NextResponse.json({ ok: true, ...result });
  } catch (error) {
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Failed to update provider status.",
      },
      { status: 500 },
    );
  }
}
