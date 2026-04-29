import { verifyCode } from "../../../../lib/auth";

export async function POST(req: Request) {
  const { phone, code } = await req.json();

  if (!verifyCode(phone, code)) {
    return Response.json({ success: false }, { status: 401 });
  }

  return Response.json({ success: true });
}
