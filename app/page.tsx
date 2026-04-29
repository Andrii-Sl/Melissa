"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");

  return (
    <main>

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" alt="logo" />
          <span>EU PARTS</span>
        </div>

        <nav>
          <a>О компании</a>
          <a>Как это работает</a>
          <a>Доставка</a>
          <a>Гарантия</a>
          <a>Контакты</a>
        </nav>

        <a href="/login" className="cabinet">Кабинет</a>
      </header>

      {/* HERO */}
      <section className="hero">

        <div className="bg">
          <img src="/audi.jpg" />
        </div>

        <div className="overlay"></div>

        <div className="content">

          <div className="left">
            <p className="label">ПОДБОР ПО VIN</p>

            <h1>
              Подбор автозапчастей<br />из Европы
            </h1>

            <p className="desc">
              Оригинальные и качественные аналоги
            </p>

            <input
              placeholder="Введите VIN"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />

            <input
              placeholder="Комментарий"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button>ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ</button>
          </div>

        </div>

      </section>

    </main>
  );
                                    }
