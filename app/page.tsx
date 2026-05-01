"use client";

import { useState } from "react";
import Link from "next/link";

export default function HomePage() {
  const [vin, setVin] = useState("");
  const [part, setPart] = useState("");
  const [phone, setPhone] = useState("");

  function sendLead() {
    if (!vin || !part || !phone) {
      alert("Заполните все поля");
      return;
    }

    alert("Заявка отправлена!");

    setVin("");
    setPart("");
    setPhone("");
  }

  return (
    <>
      <main className="page">

        {/* HEADER */}
        <header className="header">
          <div className="container headerRow">

            <div className="logo">
              AutoParts EU
            </div>

            <nav className="nav">
              <a href="#">Как это работает</a>
              <a href="#">Доставка</a>
              <a href="#">Контакты</a>
            </nav>

            <Link href="/login" className="loginBtn">
              Личный кабинет
            </Link>

          </div>
        </header>

        {/* HERO */}
        <section className="hero">
          <div className="container heroGrid">

            {/* LEFT */}
            <div className="heroContent">

              <div className="miniText">
                ПОДБОР ПО VIN И НОМЕРУ ДЕТАЛИ
              </div>

              <h1>
                Подбор автозапчастей
                <br />
                из Европы
              </h1>

              <p>
                Оригинальные и качественные аналоги.
                Быстро. Надёжно. Доставка в Казахстан.
              </p>

              <input
                placeholder="Введите VIN номер"
                value={vin}
                onChange={(e) => setVin(e.target.value)}
              />

              <input
                placeholder="Какая деталь нужна?"
                value={part}
                onChange={(e) => setPart(e.target.value)}
              />

              <input
                placeholder="Телефон"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />

              <button onClick={sendLead}>
                ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
              </button>

              <div className="socials">
                WhatsApp · Telegram
              </div>

            </div>

            {/* RIGHT */}
            <div className="heroImage"></div>

          </div>
        </section>

        {/* HOW */}
        <section className="how">
          <div className="container">

            <h2>Как это работает</h2>

            <div className="howGrid">
              <div>1. Оставляете заявку</div>
              <div>2. Мы ищем запчасть</div>
              <div>3. Согласовываем цену</div>
              <div>4. Отправляем</div>
            </div>

          </div>
        </section>

        {/* FOOTER */}
        <footer className="footer">
          <div className="container">
            © 2026 AutoParts EU
          </div>
        </footer>

      </main>

      <style jsx>{`
        * {
          box-sizing: border-box;
          margin: 0;
          padding: 0;
        }

        body {
          margin: 0;
        }

        .page {
          font-family: Arial, Helvetica, sans-serif;
          background: #ffffff;
          color: #111111;
          overflow-x: hidden;
        }

        .container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding-left: 24px;
          padding-right: 24px;
        }

        /* HEADER */

        .header {
          border-bottom: 1px solid #e5e5e5;
          background: #ffffff;
        }

        .headerRow {
          height: 78px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
        }

        .logo {
          font-size: 30px;
          font-weight: 700;
          white-space: nowrap;
        }

        .nav {
          display: flex;
          gap: 28px;
          flex: 1;
          justify-content: center;
        }

        .nav a {
          text-decoration: none;
          color: #111;
          font-size: 15px;
        }

        .loginBtn {
          text-decoration: none;
          color: #111;
          border: 1px solid #111;
          padding: 12px 18px;
          white-space: nowrap;
        }

        /* HERO */

        .hero {
          background: #ffffff;
        }

        .heroGrid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 78px);
        }

        .heroContent {
          background: #050505;
          color: #ffffff;
          padding: 72px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .miniText {
          color: #8f8f8f;
          font-size: 13px;
          margin-bottom: 18px;
        }

        .heroContent h1 {
          font-size: 58px;
          line-height: 1.06;
          margin-bottom: 18px;
        }

        .heroContent p {
          color: #bdbdbd;
          font-size: 18px;
          line-height: 1.5;
          margin-bottom: 24px;
        }

        .heroContent input {
          height: 54px;
          border: none;
          margin-bottom: 12px;
          padding: 0 14px;
          font-size: 16px;
          outline: none;
        }

        .heroContent button {
          height: 56px;
          border: none;
          background: #ffffff;
          color: #111111;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
        }

        .socials {
          margin-top: 18px;
          color: #bdbdbd;
        }

        .heroImage {
          background: url('/audi.jpg') center center / cover no-repeat;
          min-height: 640px;
        }

        /* HOW */

        .how {
          padding: 72px 0;
          background: #ffffff;
        }

        .how h2 {
          font-size: 34px;
          margin-bottom: 28px;
        }

        .howGrid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .howGrid div {
          border: 1px solid #e5e5e5;
          padding: 24px;
          min-height: 110px;
          display: flex;
          align-items: center;
        }

        /* FOOTER */

        .footer {
          border-top: 1px solid #e5e5e5;
          padding: 28px 0;
        }

        /* TABLET */

        @media (max-width: 1100px) {
          .heroContent {
            padding: 48px;
          }

          .heroContent h1 {
            font-size: 46px;
          }

          .nav {
            gap: 18px;
          }
        }

        /* MOBILE */

        @media (max-width: 900px) {

          .headerRow {
            height: auto;
            padding-top: 14px;
            padding-bottom: 14px;
            flex-wrap: wrap;
          }

          .logo {
            font-size: 24px;
            width: 100%;
          }

          .nav {
            order: 3;
            width: 100%;
            justify-content: space-between;
            gap: 10px;
            margin-top: 10px;
          }

          .nav a {
            font-size: 13px;
          }

          .loginBtn {
            padding: 10px 12px;
            font-size: 14px;
          }

          .heroGrid {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .heroImage {
            order: 1;
            height: 280px;
            min-height: auto;
          }

          .heroContent {
            order: 2;
            padding: 28px 20px;
          }

          .heroContent h1 {
            font-size: 40px;
            line-height: 1.1;
          }

          .heroContent p {
            font-size: 16px;
          }

          .heroContent input,
          .heroContent button {
            height: 52px;
          }

          .how {
            padding: 42px 0;
          }

          .how h2 {
            font-size: 28px;
          }

          .howGrid {
            grid-template-columns: 1fr;
          }

          .howGrid div {
            min-height: auto;
          }
        }
      `}</style>
    </>
  );
}