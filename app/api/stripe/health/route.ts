// app/api/stripe/health/route.ts
import Stripe from "stripe";

export const runtime = "nodejs";        // Stripe SDK requires Node.js runtime
export const dynamic = "force-dynamic"; // always run on server

type Health = {
  ok: boolean;
  live: boolean;
  error?: string;
};

export async function GET(): Promise<Response> {
  const keyRaw = process.env.STRIPE_SECRET_KEY;

  if (!keyRaw || keyRaw.length === 0) {
    return Response.json({ ok: false, live: false, error: "STRIPE_SECRET_KEY missing" }, { status: 200 });
  }

  const trimmed = keyRaw.trim();
  if (trimmed !== keyRaw) {
    return Response.json({ ok: false, live: false, error: "STRIPE_SECRET_KEY has leading/trailing whitespace" }, { status: 200 });
  }

  const live = trimmed.startsWith("sk_live_");

  try {
    // Omit apiVersion to use package default and avoid TS literal type mismatch
    const stripe = new Stripe(trimmed);

    // Lightweight read-only call that works in test and live
    await stripe.balance.retrieve();

    return Response.json({ ok: true, live }, { status: 200 });
  } catch (err: unknown) {
    const msg =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Stripe connectivity error";
    return Response.json({ ok: false, live, error: msg }, { status: 200 });
  }
}
