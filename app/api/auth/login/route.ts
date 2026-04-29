import { verifyLogin } from "@/lib/auth";

export async function POST(req: Request) {
  const { value } = await req.json();

  const user = verifyLogin(value);

  if (!user) {
    return Response.json({ error: "Ошибка входа" }, { status: 401 });
  }

  return Response.json(user);
}
