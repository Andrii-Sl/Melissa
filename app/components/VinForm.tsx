"use client";

import { useState } from "react";

export default function VinForm() {
  const [vin, setVin] = useState("");

  const send = async () => {
    await fetch("/api/orders", {
      method: "POST",
      body: JSON.stringify({ vin })
    });

    alert("Запрос отправлен");
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <input
        placeholder="Введите VIN или номер детали"
        value={vin}
        onChange={(e) => setVin(e.target.value)}
        style={{ padding: "10px", width: "250px" }}
      />

      <br />

      <button onClick={send} style={{
        marginTop: "10px",
        padding: "10px 20px",
        background: "#7a1f1f",
        color: "#fff",
        border: "none"
      }}>
        Получить предложение
      </button>
    </div>
  );
    }
