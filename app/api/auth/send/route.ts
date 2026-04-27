let codes: any = {};

export async function POST(req: Request) {
  const { phone } = await req.json();

  // 🔑 мастер-вход
  if (phone === "140578") {
    return Response.json({ master: true });
  }

  const code = Math.floor(1000 + Math.random() * 9000);
  codes[phone] = code;

  console.log("SMS CODE:", code);

  return Response.json({ success: true });
}
