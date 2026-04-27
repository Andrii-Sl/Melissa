"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");
  const [car, setCar] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);

    const res = await fetch("/api/vin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ vin, comment })
    });

    const data = await res.json();
    setCar(data);
    setLoading(false);

    // отправка заявки
    await fetch("/api/order", {
      method: "POST",
      body: JSON.stringify({ vin, comment, car: data })
    });
  };

  return (
    <main>

      {/* HEADER */}
      <header className="header">
        <div>
          <b>AutoParts EU</b>
          <div className="sub">Подбор и доставка запчастей</div>
        </div>

        <nav>
          <a>О компании</a>
          <a>Как это работает</a>
          <a>Доставка</a>
          <a>Контакты</a>
        </nav>

        <a href="/login" className="btn-outline">
          Личный кабинет
        </a>
      </header>

      {/* HERO */}
      <section className="hero">

        {/* LEFT */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hero-left"
        >
          <p className="label">ПОДБОР ПО VIN</p>

          <h1>Подбор автозапчастей из Европы</h1>

          <p className="desc">
            Оригинальные и качественные аналоги. Быстро и с гарантией.
          </p>

          <input
            placeholder="Введите VIN или номер детали"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />

          <input
            placeholder="Опишите запрос (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button onClick={handleSubmit}>
            {loading ? "Загрузка..." : "Получить предложение"}
          </button>

          {car && (
            <div className="result">
              {car.make} {car.model} ({car.year})
            </div>
          )}
        </motion.div>

        {/* RIGHT */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          className="hero-img"
        />

      </section>

      {/* HOW */}
      <section className="how">
        {["Запрос", "Подбор", "Предложение", "Оплата", "Доставка"].map((x, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.05 }}
            className="step"
          >
            <div className="circle">{i + 1}</div>
            <p>{x}</p>
          </motion.div>
        ))}
      </section>

    </main>
  );
        }
