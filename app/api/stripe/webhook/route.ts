import Stripe from "stripe";
import { prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function mapSubStatus(s: string): "ACTIVE" | "PAST_DUE" | "CANCELED" | "NONE" {
  if (s === "active" || s === "trialing") return "ACTIVE";
  if (s === "past_due" || s === "unpaid") return "PAST_DUE";
  if (s === "canceled" || s === "incomplete_expired") return "CANCELED";
  return "NONE";
}

export async function POST(req: Request): Promise<Response> {
  const keyRaw = process.env.STRIPE_SECRET_KEY;
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!keyRaw || keyRaw.trim().length === 0) {
    return Response.json({ ok: false, error: "STRIPE_SECRET_KEY missing" }, { status: 500 });
  }
  if (!webhookSecret || webhookSecret.trim().length === 0) {
    return Response.json({ ok: false, error: "STRIPE_WEBHOOK_SECRET missing" }, { status: 500 });
  }

  const stripe = new Stripe(keyRaw.trim());

  const sig = req.headers.get("stripe-signature");
  if (!sig) return Response.json({ ok: false, error: "MISSING_STRIPE_SIGNATURE" }, { status: 400 });

  const rawBody = await req.text();

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, sig, webhookSecret.trim());
  } catch {
    return Response.json({ ok: false, error: "INVALID_SIGNATURE" }, { status: 400 });
  }

  try {
    // eslint-disable-next-line no-console
    console.log("[stripe:webhook] type=", event.type);

    if (event.type === "checkout.session.completed") {
      const s = event.data.object as Stripe.Checkout.Session;

      const email =
        (typeof s.customer_email === "string" && s.customer_email) ||
        (typeof s.customer_details?.email === "string" && s.customer_details.email) ||
        null;

      const customerId = typeof s.customer === "string" ? s.customer : null;
      const subscriptionId = typeof s.subscription === "string" ? s.subscription : null;

      if (email) {
        await prisma.user.updateMany({
          where: { email: email.toLowerCase().trim() },
          data: {
            stripeCustomerId: customerId ?? undefined,
            stripeSubscriptionId: subscriptionId ?? undefined,
            plan: "AUTHORITY",
            subscriptionStatus: "ACTIVE",
          },
        });
      }

      return Response.json({ ok: true }, { status: 200 });
    }

    if (
      event.type === "customer.subscription.created" ||
      event.type === "customer.subscription.updated" ||
      event.type === "customer.subscription.deleted"
    ) {
      const sub = event.data.object as Stripe.Subscription;

      const subscriptionId = sub.id;
      const customerId = typeof sub.customer === "string" ? sub.customer : null;

      const status = mapSubStatus(sub.status);

      // Stripe typings vary by version; read safely.
      const anySub = sub as any;
      const cpe = anySub?.current_period_end;
      const currentPeriodEnd =
        typeof cpe === "number" ? new Date(cpe * 1000) : null;

      if (subscriptionId) {
        await prisma.user.updateMany({
          where: { stripeSubscriptionId: subscriptionId },
          data: {
            stripeCustomerId: customerId ?? undefined,
            subscriptionStatus: status,
            currentPeriodEnd: currentPeriodEnd ?? undefined,
            plan: status === "ACTIVE" ? "AUTHORITY" : undefined,
          },
        });
      }

      return Response.json({ ok: true }, { status: 200 });
    }

    return Response.json({ ok: true }, { status: 200 });
  } catch (e: any) {
    // Always 200 to prevent Stripe retries storm during development.
    // eslint-disable-next-line no-console
    console.error("[stripe:webhook] handler error:", e?.message ?? e);
    return Response.json({ ok: true }, { status: 200 });
  }
}
