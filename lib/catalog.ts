export function searchByVIN(vin: string) {
  if (vin.includes("WVW")) {
    return {
      car: "Volkswagen Passat B8 2017",
      parts: [
        { name: "Фара", basePrice: 250 },
        { name: "Бампер", basePrice: 180 }
      ]
    };
  }

  if (vin.includes("WBA")) {
    return {
      car: "BMW X5 G05 2019",
      parts: [
        { name: "Тормозные диски", basePrice: 200 }
      ]
    };
  }

  if (vin.includes("WAU")) {
    return {
      car: "Audi A6 C7 2016",
      parts: [
        { name: "Турбина", basePrice: 650 }
      ]
    };
  }

  return null;
}
