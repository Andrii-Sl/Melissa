export async function POST(req: Request) {
  const { car } = await req.json();

  // пока MOCK (заменим на TecDoc)
  return Response.json([
    { name: "Тормозные колодки", price: "120€" },
    { name: "Фильтр масляный", price: "25€" },
    { name: "Амортизатор", price: "210€" }
  ]);
}
