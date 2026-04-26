let orders: any[] = [];

export async function GET() {
  return Response.json(orders);
}

export async function POST(req: Request) {
  const body = await req.json();

  const newOrder = {
    id: Date.now().toString(),
    vin: body.vin,
    status: "В обработке"
  };

  orders.push(newOrder);

  return Response.json({ ok: true });
}
