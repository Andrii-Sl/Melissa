import { catalog } from "@/lib/catalog";
import { calculatePrice } from "@/lib/pricing";

export async function POST(req: Request) {
  const { vin } = await req.json();

  const results = catalog.map(item => ({
    ...item,
    price: calculatePrice(item.basePrice),
    vin
  }));

  return Response.json(results);
}
