import type { PlanStatus } from "./planTypes";
import type { DefaultSession } from "next-auth";

export async function getPlanStatusForUser(user: DefaultSession["user"] | null | undefined): Promise<PlanStatus> {
  const email = (user as any)?.email as string | undefined;

  if (!email) {
    return {
      hasPlan: false,
      planName: undefined,
      details: "No user email available for plan lookup.",
    };
  }

  // Existing implementation should be elsewhere (Stripe/DB). Keep deterministic safe fallback:
  return {
    hasPlan: false,
    planName: undefined,
    details: "Plan lookup not implemented in this function.",
  };
}
