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
    <main
      style={{
        fontFamily: "Arial, Helvetica, sans-serif",
        background: "#ffffff",
        color: "#111111"
      }}
    >
      {/* HEADER */}
      <header className="topHeader">
        <div className="logo">AutoParts EU</div>

        <nav className="desktopMenu">
          <a href="#">Как это работает</a>
          <a href="#">Доставка</a>
          <a href="#">Контакты</a>
        </nav>

        <Link href="/login" className="cabinetBtn">
          Личный кабинет
        </Link>
      </header>

      {/* HERO */}
      <section className="heroWrap">

        {/* IMAGE */}
        <div className="heroImage" />

        {/* CONTENT */}
        <div className="heroContent">

          <p className="heroMini">
            ПОДБОР ПО VIN И НОМЕРУ ДЕТАЛИ
          </p>

          <h1>
            Подбор автозапчастей
            <br />
            из Европы
          </h1>

          <p className="heroText">
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
      </section>

      {/* HOW */}
      <section className="howBlock">
        <h2>Как это работает</h2>

        <div className="howGrid">
          <div>1. Оставляете заявку</div>
          <div>2. Мы ищем запчасть</div>
          <div>3. Согласовываем цену</div>
          <div>4. Отправляем</div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="footer">
        © 2026 AutoParts EU
      </footer>

      <style jsx>{`
        * {
          box-sizing: border-box;
        }

        .topHeader {
          height: 78px;
          padding: 0 22px;
          display: flex;
          align-items: center;
          justify-content: space-between;
          border-bottom: 1px solid #e5e5e5;
          background: #fff;
        }

        .logo {
          font-size: 30px;
          font-weight: 700;
        }

        .desktopMenu {
          display: flex;
          gap: 28px;
        }

        .desktopMenu a {
          text-decoration: none;
          color: #111;
        }

        .cabinetBtn {
          text-decoration: none;
          color: #111;
          border: 1px solid #111;
          padding: 12px 18px;
        }

        .heroWrap {
          display: grid;
          grid-template-columns: 1fr 1fr;
          min-height: calc(100vh - 78px);
        }

        .heroImage {
          background: url('/audi.jpg') center/cover no-repeat;
        }

        .heroContent {
          background: #050505;
          color: #fff;
          padding: 70px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .heroMini {
          color: #999;
          font-size: 13px;
          margin-bottom: 18px;
        }

        .heroContent h1 {
          font-size: 58px;
          line-height: 1.08;
          margin-bottom: 18px;
        }

        .heroText {
          color: #bdbdbd;
          margin-bottom: 26px;
          line-height: 1.5;
        }

        .heroContent input {
          height: 54px;
          border: none;
          margin-bottom: 12px;
          padding: 0 14px;
          font-size: 16px;
        }

        .heroContent button {
          height: 56px;
          border: none;
          background: #ffffff;
          color: #111;
          font-weight: 700;
          cursor: pointer;
          margin-top: 4px;
        }

        .socials {
          margin-top: 16px;
          color: #bbb;
        }

        .howBlock {
          padding: 70px 40px;
        }

        .howBlock h2 {
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
        }

        .footer {
          padding: 30px 40px;
          border-top: 1px solid #e5e5e5;
        }

        /* MOBILE */

        @media (max-width: 900px) {
          .topHeader {
            padding: 0 16px;
            height: 70px;
          }

          .logo {
            font-size: 22px;
          }

          .desktopMenu {
            display: none;
          }

          .cabinetBtn {
            padding: 10px 12px;
            font-size: 14px;
          }

          .heroWrap {
            grid-template-columns: 1fr;
          }

          .heroImage {
            height: 280px;
            order: 1;
          }

          .heroContent {
            order: 2;
            padding: 26px;
          }

          .heroContent h1 {
            font-size: 42px;
            margin-bottom: 16px;
          }

          .heroText {
            font-size: 16px;
          }

          .howBlock {
            padding: 36px 18px;
          }

          .howBlock h2 {
            font-size: 28px;
          }

          .howGrid {
            grid-template-columns: 1fr;
          }

          .footer {
            padding: 24px 18px;
          }
        }
      `}</style>
    </main>
  );
}
