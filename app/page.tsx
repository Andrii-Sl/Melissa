"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");

  return (
    <main style={{ fontFamily: "Arial, sans-serif" }}>

      {/* HEADER */}
      <header style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "20px 40px",
        borderBottom: "1px solid #eee"
      }}>

        {/* LOGO */}
        <div>
          <div style={{ fontWeight: "700", fontSize: "20px" }}>
            AutoParts EU
          </div>
          <div style={{ fontSize: "12px", color: "#777" }}>
            Подбор и доставка запчастей из Европы
          </div>
        </div>

        {/* MENU */}
        <nav style={{
          display: "flex",
          gap: "25px",
          fontSize: "14px",
          color: "#333"
        }}>
          <a>О компании</a>
          <a>Как это работает</a>
          <a>Гарантия</a>
          <a>Доставка</a>
          <a>Контакты</a>
        </nav>

        {/* RIGHT SIDE */}
        <div style={{
          display: "flex",
          alignItems: "center",
          gap: "15px"
        }}>
          <span>WhatsApp</span>
          <span>Telegram</span>
          <span style={{ fontSize: "13px" }}>
            slynko.andrey@gmail.com
          </span>

          <a href="/login" style={{
            border: "1px solid #8B0000",
            padding: "8px 14px",
            borderRadius: "6px",
            textDecoration: "none",
            color: "#000"
          }}>
            Личный кабинет
          </a>
        </div>
      </header>

      {/* HERO */}
      <section style={{
        display: "flex",
        padding: "60px 40px",
        alignItems: "center",
        justifyContent: "space-between"
      }}>

        {/* LEFT */}
        <div style={{ maxWidth: "500px" }}>

          <div style={{ fontSize: "12px", color: "#777" }}>
            ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ
          </div>

          <h1 style={{
            fontSize: "40px",
            margin: "15px 0"
          }}>
            Подбор автозапчастей<br />из Европы
          </h1>

          <p style={{ color: "#555", marginBottom: "25px" }}>
            Оригинальные и качественные аналоги для европейских автомобилей.
            Быстро, надежно, с гарантией.
          </p>

          {/* INPUT VIN */}
          <input
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            placeholder="Введите VIN или номер детали"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "10px",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
          />

          {/* COMMENT */}
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Опишите ваш запрос (необязательно)"
            style={{
              width: "100%",
              padding: "14px",
              marginBottom: "15px",
              borderRadius: "6px",
              border: "1px solid #ddd"
            }}
          />

          {/* BUTTON */}
          <button style={{
            width: "100%",
            padding: "14px",
            background: "#8B0000",
            color: "#fff",
            border: "none",
            borderRadius: "6px",
            fontWeight: "600"
          }}>
            ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
          </button>

          <p style={{
            fontSize: "12px",
            marginTop: "10px",
            color: "#777"
          }}>
            🔒 Ваши данные в безопасности и не передаются третьим лицам
          </p>

        </div>

        {/* RIGHT IMAGE BLOCK */}
        <div style={{
          width: "600px",
          height: "350px",
          background: "#ddd",
          borderRadius: "10px"
        }}>
          {/* сюда вставишь фото */}
        </div>

      </section>

      {/* HOW IT WORKS */}
      <section style={{
        padding: "40px",
        background: "#f7f7f7",
        textAlign: "center"
      }}>

        <h2 style={{ marginBottom: "30px" }}>
          Как это работает
        </h2>

        <div style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "20px",
          flexWrap: "wrap"
        }}>

          {[
            "Ваш запрос",
            "Подбор и проверка",
            "Предложение",
            "Оплата",
            "Поставка",
            "Вы получаете"
          ].map((item, i) => (
            <div key={i} style={{ width: "150px" }}>
              <div style={{
                width: "30px",
                height: "30px",
                borderRadius: "50%",
                background: "#8B0000",
                color: "#fff",
                margin: "0 auto 10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center"
              }}>
                {i + 1}
              </div>

              <div style={{ fontWeight: "600" }}>
                {item}
              </div>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
        }
