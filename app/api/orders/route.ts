let orders: any[] = [];

export async function POST(req: Request) {
  const data = await req.json();

  orders.push({
    ...data,
    id: Date.now()
  });

  return Response.json({ success: true });
}

export async function GET() {
  return Response.json(orders);
}
