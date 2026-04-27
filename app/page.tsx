"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");
  const [result, setResult] = useState<any>(null);

  const checkVin = async () => {
    const res = await fetch("/api/vin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vin })
    });

    const data = await res.json();
    setResult(data);
  };

  return (
    <main style={{ color: "#fff" }}>

      {/* КНОПКА КАБИНЕТА */}
      <div style={{
        position: "absolute",
        top: 20,
        right: 20,
        zIndex: 20
      }}>
        <a href="/login" style={{
          color: "#fff",
          border: "1px solid #fff",
          padding: "8px 12px",
          textDecoration: "none"
        }}>
          Личный кабинет
        </a>
      </div>

      {/* HERO */}
      <section style={{
        height: "100vh",
        background: "url('/audi.jpg') center/cover no-repeat",
        display: "flex",
        justifyContent: "center",
        alignItems: "center"
      }}>

        <div style={{
          background: "rgba(0,0,0,0.7)",
          padding: "30px",
          borderRadius: "10px",
          textAlign: "center"
        }}>

          <h1>Подбор по VIN</h1>

          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="Введите VIN"
            style={{ padding: "10px", width: "250px" }}
          />

          <br /><br />

          <button onClick={checkVin}>
            Получить предложение
          </button>

          {result && (
            <div style={{ marginTop: 20 }}>
              {result.make} {result.model} ({result.year})
            </div>
          )}

        </div>

      </section>

    </main>
  );
        }
