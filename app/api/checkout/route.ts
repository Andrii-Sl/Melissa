export async function POST(req: Request) {
  const { price } = await req.json();

  return Response.json({
    url: "https://example.com/payment"
  });
}
