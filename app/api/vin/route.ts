export async function POST(req: Request) {
  const { vin } = await req.json();

  const res = await fetch(
    `https://vpic.nhtsa.dot.gov/api/vehicles/DecodeVinValues/${vin}?format=json`
  );

  const data = await res.json();
  const car = data.Results[0];

  return Response.json({
    make: car.Make,
    model: car.Model,
    year: car.ModelYear
  });
}
