"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HEADER */}
      <div style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100%",
        display: "flex",
        justifyContent: "space-between",
        padding: "20px 40px",
        color: "#fff",
        zIndex: 10
      }}>
        <div style={{ fontWeight: "bold", letterSpacing: "2px" }}>
          EU PARTS
        </div>

        <a href="/login" style={{
          border: "1px solid #fff",
          padding: "8px 14px",
          borderRadius: "6px",
          textDecoration: "none",
          color: "#fff"
        }}>
          Личный кабинет
        </a>
      </div>

      {/* HERO */}
      <section style={{
        height: "100vh",
        backgroundImage: "url('/audi.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        position: "relative",
        display: "flex",
        alignItems: "center",
        justifyContent: "center"
      }}>

        {/* затемнение */}
        <div style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          background: "rgba(0,0,0,0.65)"
        }} />

        {/* контент */}
        <div style={{
          position: "relative",
          color: "#fff",
          textAlign: "center",
          maxWidth: "600px"
        }}>

          <h1 style={{
            fontSize: "36px",
            marginBottom: "10px"
          }}>
            Поставка автозапчастей из Европы
          </h1>

          <p style={{
            opacity: 0.7,
            marginBottom: "30px"
          }}>
            Подбор по VIN или номеру детали
          </p>

          {/* VIN */}
          <div style={{
            display: "flex",
            gap: "10px",
            justifyContent: "center"
          }}>
            <input
              value={vin}
              onChange={(e) => setVin(e.target.value)}
              placeholder="Введите VIN"
              style={{
                padding: "14px",
                width: "260px",
                borderRadius: "6px",
                border: "none"
              }}
            />

            <button style={{
              background: "#7a1f1f",
              color: "#fff",
              border: "none",
              padding: "14px 20px",
              borderRadius: "6px",
              cursor: "pointer"
            }}>
              Получить предложение
            </button>
          </div>

          {/* шаги */}
          <div style={{
            marginTop: "40px",
            display: "flex",
            justifyContent: "center",
            gap: "20px",
            fontSize: "14px",
            opacity: 0.8
          }}>
            <span>Запрос</span>
            <span>→</span>
            <span>Предложение</span>
            <span>→</span>
            <span>Оплата</span>
            <span>→</span>
            <span>Доставка</span>
          </div>

        </div>
      </section>

      {/* НИЖЕ МОЖНО ДОБАВИТЬ БЛОКИ */}
      <section style={{
        padding: "80px 20px",
        textAlign: "center"
      }}>
        <h2>Как это работает</h2>
        <p style={{ opacity: 0.6 }}>
          Простой и прозрачный процесс от запроса до поставки
        </p>
      </section>

    </main>
  );
            }
