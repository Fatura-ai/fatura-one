import { kv } from "@vercel/kv";
import type { PlanName } from "./planTypes";

export interface PlanRecord {
  /**
   * Primary identifier used for lookup.
   * For now we use email, later we can switch to Stripe customer id if needed.
   */
  email: string;
  planName: PlanName;
  active: boolean;
  /**
   * ISO timestamp of the last update to this record.
   */
  updatedAt: string;
  /**
   * Optional source for debugging where this record came from.
   * "stripe" => Stripe webhook, "manual" => manual/dev override.
   */
  source?: "stripe" | "manual" | "dev";
}

const PLAN_KEY_PREFIX = "postara:plan:user:";

function planKey(email: string): string {
  const normalized = email.trim().toLowerCase();
  return `${PLAN_KEY_PREFIX}${normalized}`;
}

/**
 * Save or update a plan record for a given email.
 * This does not enforce any business rules, it only persists the data.
 */
export async function savePlanRecord(record: PlanRecord): Promise<void> {
  const now = new Date().toISOString();

  const toStore: PlanRecord = {
    ...record,
    active: record.active,
    updatedAt: now,
  };

  await kv.set(planKey(record.email), toStore);
}

/**
 * Look up a plan record by email.
 * Returns null if nothing is stored or if the stored shape is invalid.
 */
export async function getPlanRecordByEmail(
  email: string
): Promise<PlanRecord | null> {
  if (!email) return null;

  try {
    const stored = await kv.get<PlanRecord>(planKey(email));
    if (!stored) return null;

    if (
      typeof stored.email !== "string" ||
      typeof stored.planName !== "string"
    ) {
      return null;
    }

    return stored;
  } catch (err) {
    console.error("KV get PlanRecord failed:", err);
    return null;
  }
}