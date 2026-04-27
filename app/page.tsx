"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");

  return (
    <main className="container">

      {/* HEADER */}
      <header className="header">
        <div className="logoBlock">
          <Image src="/logo.png" alt="logo" width={160} height={40} />
          <span className="subtitle">
            ПОДБОР И ДОСТАВКА ЗАПЧАСТЕЙ ИЗ ЕВРОПЫ
          </span>
        </div>

        <nav className="menu">
          <a>О компании</a>
          <a>Как это работает</a>
          <a>Гарантия</a>
          <a>Доставка</a>
          <a>Контакты</a>
        </nav>

        <div className="right">
          <span>WhatsApp</span>
          <span>Telegram</span>
          <span className="email">slynko.andrey@gmail.com</span>

          <a href="/login" className="cabinet">
            Личный кабинет
          </a>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">

        {/* LEFT */}
        <div className="left">

          <p className="label">
            ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ
          </p>

          <h1>
            Подбор автозапчастей<br />из Европы
          </h1>

          <p className="desc">
            Оригинальные и качественные аналоги для европейских автомобилей.
            Быстро, надежно, с гарантией.
          </p>

          <input
            placeholder="Введите VIN или номер детали"
            value={vin}
            onChange={(e) => setVin(e.target.value)}
          />

          <input
            placeholder="Опишите ваш запрос (необязательно)"
            value={comment}
            onChange={(e) => setComment(e.target.value)}
          />

          <button>
            ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
          </button>

          <p className="safe">
            🔒 Ваши данные в безопасности и не передаются третьим лицам
          </p>

        </div>

        {/* RIGHT IMAGE */}
        <div className="rightImage">
          <Image
            src="/audi.jpg"
            alt="car"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

      </section>

      {/* HOW */}
      <section className="how">

        <h2>Как это работает</h2>

        <div className="steps">

          {[
            ["Ваш запрос", "Вы отправляете VIN или номер детали и описание."],
            ["Подбор и проверка", "Мы подбираем запчасти в Европе и проверяем наличие."],
            ["Предложение", "Вы получаете предложение с ценой и сроками."],
            ["Оплата", "Вы оплачиваете заказ удобным способом."],
            ["Поставка", "Мы выкупаем и доставляем запчасти."],
            ["Вы получаете", "Вы получаете заказ с гарантией."]
          ].map((item, i) => (
            <div key={i} className="step">
              <div className="circle">{i + 1}</div>
              <h4>{item[0]}</h4>
              <p>{item[1]}</p>
            </div>
          ))}

        </div>

      </section>

    </main>
  );
          }
