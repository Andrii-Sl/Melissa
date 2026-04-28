export const runtime = "nodejs";

function calculatePrice(basePrice: number) {
  return Math.round(basePrice * 1.3);
}

export async function GET() {
  return Response.json([
    {
      id: 101234,
      name: "Передняя фара правая",
      car: "Volkswagen Passat B8 2017",
      vin: "WVWZZZ3CZHE123456",
      brand: "Hella",
      article: "5G1941006AF",
      price: calculatePrice(250),
      status: "pending"
    },
    {
      id: 101210,
      name: "Тормозные диски передние",
      car: "BMW X5 G05 2019",
      vin: "WBAJU410X0G123456",
      brand: "Zimmermann",
      article: "150.3420.20",
      status: "processing"
    },
    {
      id: 101090,
      name: "Турбина",
      car: "Audi A6 C7 2016",
      vin: "WAUZZZ4G0GN123456",
      brand: "Garrett",
      article: "799671-5003S",
      price: calculatePrice(650),
      status: "done"
    }
  ]);
}
