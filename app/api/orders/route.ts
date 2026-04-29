export async function GET() {
  return Response.json([
    {
      id: 1,
      name: "Фара",
      car: "Audi A6",
      vin: "WAUZZZ...",
      price: 320,
      status: "pending"
    }
  ]);
}
