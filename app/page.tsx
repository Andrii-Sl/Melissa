"use client";

import { useState } from "react";
import Link from "next/link";
import { addLead } from "@/data/leads";

export default function HomePage() {
  const [vin, setVin] = useState("");
  const [part, setPart] = useState("");
  const [phone, setPhone] = useState("");

  function sendLead() {
    if (!vin || !part || !phone) {
      alert("Заполните все поля");
      return;
    }

    addLead({
      vin,
      part,
      phone,
      status: "Новая"
    });

    alert("Заявка отправлена!");

    setVin("");
    setPart("");
    setPhone("");
  }

  return (
    <main
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#ffffff",
        color: "#111111"
      }}
    >
      {/* HEADER */}
      <header
        style={{
          height: "80px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 40px",
          borderBottom: "1px solid #e5e5e5"
        }}
      >
        <div style={{ fontSize: "26px", fontWeight: "700" }}>
          AutoParts EU
        </div>

        <nav style={{ display: "flex", gap: "28px" }}>
          <a href="#">Как это работает</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>

        <Link
          href="/login"
          style={{
            textDecoration: "none",
            color: "#111",
            border: "1px solid #111",
            padding: "12px 18px"
          }}
        >
          Личный кабинет
        </Link>
      </header>

      {/* HERO */}
      <section
        style={{
          minHeight: "calc(100vh - 80px)",
          display: "grid",
          gridTemplateColumns: "1fr 1fr"
        }}
      >
        {/* LEFT */}
        <div
          style={{
            background: "#111111",
            color: "#ffffff",
            padding: "70px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center"
          }}
        >
          <h1
            style={{
              fontSize: "56px",
              lineHeight: "1.1",
              marginBottom: "18px"
            }}
          >
            Подбор автозапчастей из Европы
          </h1>

          <p
            style={{
              color: "#bbbbbb",
              marginBottom: "26px",
              fontSize: "18px"
            }}
          >
            Быстро. Надёжно. Доставка в Казахстан.
          </p>

          <input
            placeholder="Введите VIN номер"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
            style={{
              height: "52px",
              padding: "0 14px",
              marginBottom: "12px",
              border: "none"
            }}
          />

          <input
            placeholder="Какая деталь нужна?"
            value={part}
            onChange={(e) => setPart(e.target.value)}
            style={{
              height: "52px",
              padding: "0 14px",
              marginBottom: "12px",
              border: "none"
            }}
          />

          <input
            placeholder="Телефон"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            style={{
              height: "52px",
              padding: "0 14px",
              marginBottom: "16px",
              border: "none"
            }}
          />

          <button
            onClick={sendLead}
            style={{
              height: "54px",
              background: "#ffffff",
              color: "#111111",
              border: "none",
              cursor: "pointer",
              fontWeight: "700"
            }}
          >
            ОТПРАВИТЬ ЗАЯВКУ
          </button>

          <div
            style={{
              marginTop: "18px",
              color: "#cccccc"
            }}
          >
            WhatsApp · Telegram
          </div>
        </div>

        {/* RIGHT */}
        <div
          style={{
            backgroundImage: "url('/audi.jpg')",
            backgroundSize: "cover",
            backgroundPosition: "center"
          }}
        />
      </section>
    </main>
  );
}
