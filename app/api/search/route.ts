import { searchByVIN } from "@/lib/catalog";
import { calculatePrice } from "@/lib/pricing";

export async function POST(req: Request) {
  const { vin } = await req.json();

  const result = searchByVIN(vin);

  if (!result) {
    return Response.json({ error: "Не найдено" }, { status: 404 });
  }

  const parts = result.parts.map((p) => ({
    ...p,
    price: calculatePrice(p.basePrice)
  }));

  return Response.json({
    car: result.car,
    parts
  });
}
