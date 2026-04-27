"use client";

import { useState } from "react";

export default function Cabinet() {
  const [vin, setVin] = useState("");
  const [car, setCar] = useState<any>(null);
  const [parts, setParts] = useState<any[]>([]);

  const decodeVin = async () => {
    const res = await fetch("/api/vin", {
      method: "POST",
      body: JSON.stringify({ vin })
    });

    const data = await res.json();
    setCar(data);

    const partsRes = await fetch("/api/parts", {
      method: "POST",
      body: JSON.stringify({ car: data })
    });

    const partsData = await partsRes.json();
    setParts(partsData);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>Личный кабинет</h1>

      <input
        placeholder="Введите VIN"
        onChange={(e) => setVin(e.target.value)}
      />

      <button onClick={decodeVin}>Подобрать</button>

      {car && (
        <div>
          <h3>{car.make} {car.model} ({car.year})</h3>
        </div>
      )}

      {parts.map((p, i) => (
        <div key={i} style={{
          border: "1px solid #ccc",
          padding: 10,
          marginTop: 10
        }}>
          {p.name} — {p.price}
        </div>
      ))}
    </div>
  );
                                }
