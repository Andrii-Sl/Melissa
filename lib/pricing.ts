export function calculatePrice(base: number) {
  const margin = 1.35; // 35% маржа
  const logistics = 25;
  return Math.round(base * margin + logistics);
}
