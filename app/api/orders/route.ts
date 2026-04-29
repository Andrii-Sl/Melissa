import { calculatePrice } from "@/lib/pricing";

export async function GET() {
  return Response.json([
    {
      id: 101234,
      name: "Передняя фара правая",
      car: "Volkswagen Passat B8 2017",
      vin: "WVWZZZ3CZHE123456",
      brand: "Hella",
      price: calculatePrice(250),
      status: "pending",
      days: "5-7 дней"
    },
    {
      id: 101210,
      name: "Тормозные диски передние",
      car: "BMW X5 G05 2019",
      vin: "WBAJU410X0G123456",
      brand: "Zimmermann",
      status: "processing"
    },
    {
      id: 101090,
      name: "Турбина",
      car: "Audi A6 C7 2016",
      vin: "WAUZZZ4G0GN123456",
      brand: "Garrett",
      price: calculatePrice(650),
      status: "done"
    }
  ]);
}
