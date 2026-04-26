export type Tier = "retail" | "basic" | "pro";

export function calculatePrice({
  purchase,
  delivery,
  tier
}: {
  purchase: number;
  delivery: number;
  tier: Tier;
}) {
  const base = purchase + delivery;

  const margins = {
    retail: 1.6,
    basic: 1.3,
    pro: 1.15
  };

  return Math.round(base * margins[tier]);
}
