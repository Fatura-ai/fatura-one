import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Legacy Postara cron endpoint — disabled safely
export async function GET() {
  return NextResponse.json({ ok: true, disabled: true }, { status: 200 });
}

export async function POST() {
  return NextResponse.json({ ok: true, disabled: true }, { status: 200 });
}
