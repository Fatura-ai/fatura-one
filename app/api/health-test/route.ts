export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET() {
  return Response.json({ ok: true, time: new Date().toISOString() }, { status: 200 });
}