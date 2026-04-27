export async function POST(req: Request) {
  const { vin } = await req.json();

  if (!vin) {
    return Response.json({ error: "VIN required" }, { status: 400 });
  }

  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
  );

  const data = await res.json();

  const info = data?.Results?.[0];

  return Response.json({
    vin,
    make: info.Make,
    model: info.Model,
    year: info.ModelYear,
    engine: info.DisplacementL
  });
  }
