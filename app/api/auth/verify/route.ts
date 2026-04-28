import { verifyCode } from "../../../../lib/auth";

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  const ok = verifyCode(phone, code);

  if (!ok) {
    return Response.json({ success: false }, { status: 401 });
  }

  return Response.json({ success: true });
}
