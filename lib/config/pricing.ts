import raw from "../../config/pricing.plans.json";

export type Plan = {
  name: string;
  price: number | null;
  platforms: string[];
  posts_per_day?: number;
  ai_captions_per_month?: number;
  queue_limit?: number;
  presets?: number;
  seats?: number;
  features?: string[];
  exports?: string[];
  custom?: boolean;
  media?: string;
};

export type PricingConfig = {
  currency: string;
  plans: Plan[];
};

// Minimal runtime validation to avoid undefined reads at runtime
function isPricingConfig(x: any): x is PricingConfig {
  return x && typeof x.currency === "string" && Array.isArray(x.plans);
}

const config: PricingConfig = ((): PricingConfig => {
  const c = raw as unknown;
  if (!isPricingConfig(c)) {
    throw new Error("Invalid pricing.plans.json shape");
  }
  return c;
})();

export function getPricing(): PricingConfig {
  return config;
}

export function getPlanByName(name: string): Plan | null {
  return config.plans.find(p => p.name.toLowerCase() === name.toLowerCase()) ?? null;
}

export function listPlatformsByPlan(name: string): string[] {
  return getPlanByName(name)?.platforms ?? [];
}