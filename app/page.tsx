"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");

  return (
    <main>

      {/* HEADER */}
      <header className="header">
        <div className="logo">EU PARTS</div>

        <a href="/login" className="cabinet-btn">
          Личный кабинет
        </a>
      </header>

      {/* HERO */}
      <section className="hero">

        {/* overlay */}
        <div className="overlay" />

        {/* content */}
        <div className="content">

          <h1>
            Поставка автозапчастей<br />
            <span>из Европы</span>
          </h1>

          <p>
            Подбор по VIN или номеру детали с прозрачной ценой и сроками
          </p>

          {/* VIN BLOCK */}
          <div className="glass">

            <div className="vin-row">
              <input
                placeholder="Введите VIN или номер детали"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />

              <button>Получить предложение</button>
            </div>

            {/* steps */}
            <div className="steps">
              <div>Запрос</div>
              <span>→</span>
              <div>Предложение</div>
              <span>→</span>
              <div>Оплата</div>
              <span>→</span>
              <div>Доставка</div>
            </div>

          </div>

        </div>
      </section>

      {/* HOW */}
      <section className="how">
        <h2>Как это работает</h2>

        <div className="how-grid">
          <div>Вы отправляете VIN</div>
          <div>Мы подбираем варианты</div>
          <div>Фиксируем цену</div>
          <div>Доставляем в Казахстан</div>
        </div>
      </section>

      {/* STYLES */}
      <style jsx>{`

        main {
          font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        }

        /* HEADER */
        .header {
          position: absolute;
          top: 0;
          width: 100%;
          padding: 20px 30px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          color: #fff;
          z-index: 10;
        }

        .logo {
          font-weight: 600;
          letter-spacing: 2px;
        }

        .cabinet-btn {
          border: 1px solid rgba(255,255,255,0.6);
          padding: 8px 14px;
          border-radius: 6px;
          text-decoration: none;
          color: #fff;
          backdrop-filter: blur(10px);
        }

        /* HERO */
        .hero {
          height: 100vh;
          background: url('/audi.jpg') center/cover no-repeat;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        .overlay {
          position: absolute;
          width: 100%;
          height: 100%;
          background: linear-gradient(
            to bottom,
            rgba(0,0,0,0.7),
            rgba(0,0,0,0.9)
          );
        }

        .content {
          position: relative;
          text-align: center;
          color: #fff;
          max-width: 700px;
          padding: 20px;
        }

        h1 {
          font-size: 40px;
          margin-bottom: 15px;
        }

        h1 span {
          color: #b33a3a;
        }

        p {
          opacity: 0.75;
          margin
