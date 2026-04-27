export function calculatePrice(basePrice: number, type = "retail") {
  let margin = 1.3;

  if (type === "b2b") margin = 1.15;

  return Math.round(basePrice * margin);
}
