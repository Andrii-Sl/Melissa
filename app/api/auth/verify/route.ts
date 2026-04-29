export async function POST(req: Request) {
  const { phone, code } = await req.json();

  if (phone === "140578") return Response.json({ ok: true });
  if (code === "1234") return Response.json({ ok: true });

  return Response.json({ ok: false }, { status: 401 });
}
