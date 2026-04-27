"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");

  return (
    <main className="container">

      <header className="header">
        <div className="logoBlock">
          <Image src="/logo.png" alt="logo" width={160} height={40} />
          <span className="subtitle">
            ПОДБОР И ДОСТАВКА ЗАПЧАСТЕЙ ИЗ ЕВРОПЫ
          </span>
        </div>

        <nav className="menu">
          <a href="#">О компании</a>
          <a href="#">Как это работает</a>
          <a href="#">Гарантия</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>

        <div className="right">
          <span>WhatsApp</span>
          <span>Telegram</span>
          <span className="email">slynko.andrey@gmail.com</span>

          <a href="/dashboard" className="cabinet">
            Личный кабинет
          </a>
        </div>
      </header>

      <section className="hero">

        <div className="left">
          <p className="label">ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ</p>

          <h1>
            Подбор автозапчастей<br />из Европы
          </h1>

          <p className="desc">
            Оригинальные и качественные аналоги для европейских автомобилей.
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

        <div className="rightImage">
          <Image
            src="/audi.jpg"
            alt="car"
            fill
            style={{ objectFit: "cover" }}
          />
        </div>

      </section>

    </main>
  );
        }
