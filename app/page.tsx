"use client";

import { useState } from "react";

export default function Page() {
  const [vin, setVin] = useState("");
  const [comment, setComment] = useState("");
  const [results, setResults] = useState<any[]>([]);

  const search = async () => {
    const res = await fetch("/api/search", {
      method: "POST",
      body: JSON.stringify({ vin }),
    });

    const data = await res.json();
    setResults(data);
  };

  const pay = async (item: any) => {
    const res = await fetch("/api/checkout", {
      method: "POST",
      body: JSON.stringify({ price: item.price }),
    });

    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <main>

      {/* HEADER */}
      <header className="header">
        <div className="logo">
          <img src="/logo.png" />
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

        {/* LEFT */}
        <div className="left">

          <p className="label">ПОДБОР ПО VIN ИЛИ НОМЕРУ</p>

          <h1>
            Подбор автозапчастей<br />из Европы
          </h1>

          <p className="desc">
            Оригинальные и проверенные запчасти
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

          <button onClick={search}>
            ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
          </button>

        </div>

        {/* RIGHT IMAGE */}
        <div className="right">
          <img src="/audi.jpg" />
        </div>

      </section>

      {/* RESULTS */}
      <section className="results">
        {results.map((r) => (
          <div key={r.id} className="card">
            <b>{r.name}</b>
            <p>{r.brand}</p>
            <p>€{r.price}</p>

            <button onClick={() => pay(r)}>
              Купить
            </button>
          </div>
        ))}
      </section>

      {/* FOOTER */}
      <footer className="payments">
        <img src="/visa.png" />
        <img src="/mastercard.png" />
        <img src="/paypal.png" />
      </footer>

    </main>
  );
      }
