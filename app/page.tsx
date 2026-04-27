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
          <div className="logo-icon">🚗</div>
          <div>
            <div className="logo-text">EU PARTS</div>
            <div className="logo-sub">Поставка автозапчастей из Европы</div>
          </div>
        </div>

        <nav className="menu">
          <a href="#about">О нас</a>
          <a href="#how">Как это работает</a>
          <a href="#delivery">Доставка</a>
          <a href="#guarantee">Гарантия</a>
          <a href="#contact">Контакты</a>
        </nav>

        <div className="contacts">
          <a href="https://wa.me/77000000000">WhatsApp</a>
          <span>slynko.andrey@gmail.com</span>
        </div>
      </header>

      {/* HERO */}
      <section className="hero">

        <div className="overlay" />

        <div className="content">

          <h1>
            Подбор и поставка автозапчастей<br />
            <span>из Европы</span>
          </h1>

          <p>
            Точные детали по VIN. Прозрачная цена. Надёжная логистика.
          </p>

          {/* FORM */}
          <div className="glass">

            <input
              placeholder="Введите VIN или номер детали"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />

            <textarea
              placeholder="Опишите ваш запрос (необязательно)"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
            />

            <button>Получить предложение</button>

            <div className="steps">
              <span>Запрос</span>
              <span>→</span>
              <span>Предложение</span>
              <span>→</span>
              <span>Оплата</span>
              <span>→</span>
              <span>Доставка</span>
            </div>

          </div>

        </div>
      </section>

      {/* ABOUT */}
      <section id="about" className="section">
        <h2>О нас</h2>
        <p>Мы поставляем оригинальные и аналоговые автозапчасти напрямую из Европы.</p>
      </section>

      {/* HOW */}
      <section id="how" className="section dark">
        <h2>Как это работает</h2>
        <div className="grid">
          <div>Вы отправляете VIN</div>
          <div>Мы подбираем детали</div>
          <div>Согласовываем цену</div>
          <div>Доставляем</div>
        </div>
      </section>

      {/* DELIVERY */}
      <section id="delivery" className="section">
        <h2>Доставка</h2>
        <p>Поставка из Польши в Казахстан с полным таможенным оформлением.</p>
      </section>

      {/* GUARANTEE */}
      <section id="guarantee" className="section dark">
        <h2>Гарантия</h2>
        <p>Проверенные поставщики и контроль качества на всех этапах.</p>
      </section>

      {/* CONTACT */}
      <section id="contact" className="section">
        <h2>Контакты</h2>
        <p>WhatsApp: +7 700 000 00 00</p>
        <p>Email: slynko.andrey@gmail.com</p>
      </section>

      {/* STYLES */}
      <style jsx>{`

        main {
          font-family: -apple-system, sans-serif;
        }

        /* HEADER */
        .header {
          position: fixed;
          width: 100%;
          top: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 15px 30px;
          background: rgba(0,0,0,0.6);
          backdrop-filter: blur(10px);
          color: #fff;
          z-index: 100;
        }

        .logo {
          display: flex;
          gap: 10px;
          align-items: center;
        }

        .logo-text {
          font-weight: 600;
        }

        .logo-sub {
          font-size: 11px;
          opacity: 0.6;
        }

        .menu {
          display: flex;
          gap: 20px;
        }

        .menu a {
          color: #fff;
          text-decoration: none;
          font-size: 14px;
        }

        .contacts {
          display: flex;
          gap: 15px;
          font-size: 13px;
        }

        /* HERO */
        .hero {
          height: 100vh;
          background: url('/audi.jpg') center/cover no-repeat;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: rgba(0,0,0,0.7);
        }

        .content {
          position: relative;
          text-align: center;
          color: #fff;
          max-width: 600px;
          padding: 20px;
        }

        h1 {
          font-size: 34px;
        }

        h1 span {
          color: #b33a3a;
        }

        p {
          opacity: 0.7;
          margin-bottom: 20px;
        }

        /* FORM */
        .glass {
          backdrop-filter: blur(20px);
          background: rgba(255,255,255,0.05);
          padding: 20px;
          border-radius: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        input, textarea {
          padding: 12px;
          border-radius: 6px;
          border: none;
        }

        textarea {
          min-height: 80px;
        }

        button {
          background: #7a1f1f;
          color: #fff;
          border: none;
          padding: 12px;
          border-radius: 6px;
        }

        .steps {
          font-size: 12px;
          opacity: 0.7;
        }

        /* SECTIONS */
        .section {
          padding: 80px 20px;
          text-align: center;
        }

        .dark {
          background: #111;
          color: #fff;
        }

        .grid {
          display: grid;
          grid-template-columns: repeat(4,1fr);
          gap: 20px;
          margin-top: 30px;
        }

        .grid div {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 10px;
        }

        /* MOBILE */
        @media (max-width: 768px) {

          .menu {
            display: none;
          }

          .contacts {
            display: none;
          }

          h1 {
            font-size: 24px;
          }

          .grid {
            grid-template-columns: 1fr;
          }

        }

      `}</style>

    </main>
  );
}
<div style={{
  position: "absolute",
  top: 20,
  right: 20,
  zIndex: 10
}}>
  <a href="/login" style={{
    color: "#fff",
    border: "1px solid #fff",
    padding: "8px 12px"
  }}>
    Личный кабинет
  </a>
</div>
