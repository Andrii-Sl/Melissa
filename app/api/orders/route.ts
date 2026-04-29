export const runtime = "nodejs";

export async function GET() {
  return Response.json([
    {
      id: 1,
      name: "Фара",
      car: "Audi A6",
      status: "pending"
    }
  ]);
}
