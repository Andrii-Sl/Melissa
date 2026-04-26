export async function GET() {
  return Response.json([
    {
      id: "1",
      vin: "WAUZZZ",
      message: "Тормозные колодки",
      status: "Готово",
      purchase: 80,
      delivery: 10
    }
  ]);
}
