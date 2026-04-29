"use client";

import { useState } from "react";
import Image from "next/image";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");

  return (
    <main className="page">

      {/* HEADER */}
      <header className="header">
        <div className="logoBlock">
          <Image src="/logo.png" alt="logo" width={140} height={40} />
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
        <div className="heroLeft">

          <p className="label">
            ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ
          </p>

          <h1>
            Подбор автозапчастей <br /> из Европы
          </h1>

          <p className="desc">
            Оригинальные и качественные аналоги для европейских автомобилей.
            Быстро, надежно, с гарантией.
          </p>

          <input
