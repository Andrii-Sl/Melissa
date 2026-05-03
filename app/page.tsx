"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  const [vin, setVin] =
    useState("");

  const [phone, setPhone] =
    useState("");

  function handleSubmit(
    e: React.FormEvent
  ) {
    e.preventDefault();

    if (!vin || !phone) {
      alert(
        "Введите VIN и телефон"
      );
      return;
    }

    window.location.href =
      `/passport?vin=${encodeURIComponent(
        vin
      )}&phone=${encodeURIComponent(
        phone
      )}`;
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <Link
          href="/"
          className={styles.logoWrap}
        >
          <img
            src="/logo-final.png"
            alt="AutoParts EU"
            className={styles.logo}
          />

          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/login"
          className={styles.loginBtn}
        >
          Кабинет
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.content}>

          <div className={styles.label}>
            ОРИГИНАЛЬНЫЕ ЗАПЧАСТИ ИЗ ЕС
          </div>

          <h1 className={styles.title}>
            Запчасти для Audi,
            BMW, Mercedes,
            Volkswagen
          </h1>

          <p className={styles.text}>
            Подбор по VIN,
            доставка в Казахстан,
            реальные сроки.
          </p>

          <form
            onSubmit={
              handleSubmit
            }
            className={styles.form}
          >

            <input
              className={styles.input}
              placeholder="Введите VIN код"
              value={vin}
              onChange={(e) =>
                setVin(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              placeholder="+77001234567"
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
            />

            <button
              type="submit"
              className={styles.button}
            >
              Получить предложение
            </button>

          </form>

        </div>

      </section>

    </main>
  );
}