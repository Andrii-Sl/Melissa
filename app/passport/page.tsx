"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./passport.module.css";

export default function PassportPage() {
  const [search, setSearch] =
    useState("");

  const vin = "WAUZZZ8K9DA123456";

  const car = {
    brand: "Audi",
    model: "A4 B8",
    year: "2013",
    engine: "2.0 TDI",
    fuel: "Diesel",
  };

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <Link
          href="/"
          className={styles.logoWrap}
        >
          <img
            src="/logo-final.png"
            className={styles.logo}
            alt="logo"
          />

          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/"
          className={styles.homeBtn}
        >
          На главную
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.grid}>

          <div className={styles.card}>

            <div className={styles.label}>
              ПАСПОРТ АВТОМОБИЛЯ
            </div>

            <h1 className={styles.title}>
              {car.brand} {car.model}
            </h1>

            <div className={styles.info}>
              <p><strong>VIN:</strong> {vin}</p>
              <p><strong>Год:</strong> {car.year}</p>
              <p><strong>Двигатель:</strong> {car.engine}</p>
              <p><strong>Топливо:</strong> {car.fuel}</p>
            </div>

          </div>

          <div className={styles.card}>

            <div className={styles.label}>
              ЗАПРОС ЗАПЧАСТИ
            </div>

            <h2 className={styles.sub}>
              Поиск через TecDoc
            </h2>

            <input
              className={styles.input}
              placeholder="Например: тормозные колодки"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <button
              className={styles.button}
            >
              ИСКАТЬ
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}