"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [vin, setVin] = useState("");
  const [request, setRequest] = useState("");

  function sendLead() {
    if (!vin) {
      alert("Введите VIN или номер детали");
      return;
    }

    alert("Заявка отправлена");
    setVin("");
    setRequest("");
  }

  return (
    <>
      <main className="page">

        {/* HEADER */}
        <header className="header">
          <div className="container headerRow">

            <div className="brandWrap">
              <div className="brand">AutoParts EU</div>
              <div className="brandSub">
                ПОДБОР И ДОСТАВКА ЗАПЧАСТЕЙ ИЗ ЕВРОПЫ
              </div>
            </div>

            <nav className="nav">
              <a href="#">О КОМПАНИИ</a>
              <a href="#">КАК ЭТО РАБОТАЕТ</a>
              <a href="#">ГАРАНТИЯ</a>
              <a href="#">ДОСТАВКА</a>
              <a href="#">КОНТАКТЫ</a>
            </nav>

            <div className="rightMenu">
              <span>WhatsApp</span>
              <span>Telegram</span>
              <span>info@autoparts.eu</span>

              <Link href="/login" className="loginBtn">
                ЛИЧНЫЙ КАБИНЕТ
              </Link>
            </div>

          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="container heroGrid">

            {/* LEFT */}
            <div className="heroLeft">

              <div className="heroMini">
                ПОДБОР ПО VIN ИЛИ НОМЕРУ ДЕТАЛИ
              </div>

              <h1>
                Подбор автозапчастей
                <br />
                из Европы
              </h1>

              <p>
                Оригинальные и качественные аналоги
                для европейских автомобилей.
                Быстро, надежно, с гарантией.
              </p>

              <input
                placeholder="Введите VIN или номер детали"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />

              <input
                placeholder="Опишите ваш запрос (необязательно)"
                value={request}
                onChange={(e) => setRequest(e.target.value)}
              />

              <button onClick={sendLead}>
                ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
              </button>

              <div className="heroBtns">
                <a href="#">Написать в WhatsApp</a>
                <a href="#">Написать в Telegram</a>
              </div>

            </div>

            {/* RIGHT */}
            <div className="heroRight"></div>

          </div>
        </section>

        {/* HOW */}
        <section className="steps">
          <div className="container">

            <h2>КАК ЭТО РАБОТАЕТ</h2>

            <div className="stepsGrid">
              <div>1. Ваш запрос</div>
              <div>2. Подбор и проверка</div>
              <div>3. Предложение</div>
              <div>4. Оплата</div>
              <div>5. Доставка</div>
              <div>6. Вы получаете</div>
            </div>

          </div>
        </section>

        {/* FEATURES */}
        <section className="features">
          <div className="container featuresGrid">

            <div>
              <h3>Подбор по VIN</h3>
              <p>
                Точность подбора до 98% по каталогам производителей.
              </p>
            </div>

            <div>
              <h3>Поставки из Европы</h3>
              <p>
                Работаем с проверенными поставщиками.
              </p>
            </div>

            <div>
              <h3>Гарантия качества</h3>
              <p>
                Проверка деталей перед отправкой.
              </p>
            </div>

            <div>
              <h3>Регулярная доставка</h3>
              <p>
                Быстрая доставка в Казахстан.
              </p>
            </div>

          </div>
        </section>

      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        .page {
          font-family: Arial, Helvetica, sans-serif;
          color: #111;
          background: #fff;
          overflow-x: hidden;
        }

        .container {
          max-width: 1500px;
          margin: 0 auto;
          padding: 0 22px;
        }

        /* HEADER */

        .header {
          border-bottom: 1px solid #ececec;
          background: #fff;
        }

        .headerRow {
          min-height: 92px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .brand {
          font-size: 28px;
          font-weight: 700;
        }

        .brandSub {
          font-size: 11px;
          margin-top: 6px;
          color: #666;
        }

        .nav {
          display: flex;
          gap: 26px;
        }

        .nav a {
          text-decoration: none;
          color: #111;
          font-size: 13px;
        }

        .rightMenu {
          display: flex;
          align-items: center;
          gap: 18px;
          font-size: 14px;
        }

        .loginBtn {
          text-decoration: none;
          color: #111;
          border: 1px solid #c40000;
          padding: 14px 20px;
        }

        /* HERO */

        .heroGrid {
          display: grid;
          grid-template-columns: 560px 1fr;
          min-height: 640px;
        }

        .heroLeft {
          background: linear-gradient(135deg,#050505,#111);
          color: #fff;
          padding: 56px 46px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .heroMini {
          color: #d10000;
          font-size: 14px;
          margin-bottom: 22px;
        }

        .heroLeft h1 {
          font-size: 64px;
          line-height: 1.02;
          margin-bottom: 22px;
        }

        .heroLeft p {
          color: #c7c7c7;
          line-height: 1.6;
          margin-bottom: 26px;
          font-size: 18px;
        }

        .heroLeft input {
          height: 56px;
          margin-bottom: 14px;
          padding: 0 16px;
          border: 1px solid #2d2d2d;
          background: rgba(255,255,255,0.05);
          color: #fff;
          font-size: 16px;
        }

        .heroLeft button {
          height: 58px;
          border: none;
          background: #d50000;
          color: #fff;
          font-weight: 700;
          font-size: 18px;
          cursor: pointer;
          margin-top: 4px;
        }

        .heroBtns {
          display: flex;
          gap: 12px;
          margin-top: 16px;
        }

        .heroBtns a {
          flex: 1;
          text-align: center;
          padding: 14px;
          text-decoration: none;
          color: #fff;
          background: #1e1e1e;
          border: 1px solid #2e2e2e;
          font-size: 14px;
        }

        .heroRight {
          background: url('/audi.jpg') center/cover no-repeat;
        }

        /* STEPS */

        .steps {
          padding: 56px 0;
          text-align: center;
        }

        .steps h2 {
          font-size: 38px;
          margin-bottom: 34px;
        }

        .stepsGrid {
          display: grid;
          grid-template-columns: repeat(6,1fr);
          gap: 14px;
        }

        .stepsGrid div {
          border: 1px solid #ececec;
          padding: 24px 12px;
          font-size: 15px;
          min-height: 96px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        /* FEATURES */

        .features {
          padding-bottom: 60px;
        }

        .featuresGrid {
          background: linear-gradient(135deg,#040404,#111);
          color: #fff;
          display: grid;
          grid-template-columns: repeat(4,1fr);
        }

        .featuresGrid div {
          padding: 36px 26px;
          border-right: 1px solid rgba(255,255,255,0.08);
        }

        .featuresGrid div:last-child {
          border-right: none;
        }

        .featuresGrid h3 {
          color: #ff2020;
          margin-bottom: 14px;
          font-size: 24px;
        }

        .featuresGrid p {
          color: #c9c9c9;
          line-height: 1.6;
        }

        /* TABLET */

        @media (max-width: 1200px) {
          .nav {
            display: none;
          }

          .heroGrid {
            grid-template-columns: 1fr 1fr;
          }

          .heroLeft h1 {
            font-size: 52px;
          }
        }

        /* MOBILE */

        @media (max-width: 900px) {

          .headerRow {
            padding: 18px 0;
            flex-direction: column;
            align-items: flex-start;
            gap: 14px;
          }

          .rightMenu {
            flex-wrap: wrap;
            gap: 10px;
            font-size: 13px;
          }

          .heroGrid {
            grid-template-columns: 1fr;
          }

          .heroRight {
            height: 280px;
            order: 1;
          }

          .heroLeft {
            order: 2;
            padding: 28px 20px;
          }

          .heroLeft h1 {
            font-size: 42px;
          }

          .heroLeft p {
            font-size: 16px;
          }

          .heroBtns {
            flex-direction: column;
          }

          .steps {
            padding: 38px 0;
          }

          .steps h2 {
            font-size: 28px;
          }

          .stepsGrid {
            grid-template-columns: 1fr;
          }

          .featuresGrid {
            grid-template-columns: 1fr;
          }

          .featuresGrid div {
            border-right: none;
            border-bottom: 1px solid rgba(255,255,255,0.08);
          }
        }
      `}</style>
    </>
  );
}