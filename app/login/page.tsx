"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [value, setValue] =
    useState("");

  function handleLogin() {
    if (value === "1424") {
      window.location.href =
        "/dashboard";
      return;
    }

    alert(
      "Неверный код или включите OTP вход"
    );
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
            alt="logo"
            className={styles.logo}
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

        <div className={styles.card}>

          <div className={styles.label}>
            ВХОД
          </div>

          <h1 className={styles.title}>
            Личный кабинет
          </h1>

          <p className={styles.text}>
            Введите телефон
            или мастер код
          </p>

          <input
            className={styles.input}
            placeholder="Телефон или код"
            value={value}
            onChange={(e) =>
              setValue(
                e.target.value
              )
            }
          />

          <button
            className={styles.button}
            onClick={
              handleLogin
            }
          >
            ВОЙТИ
          </button>

        </div>

      </section>

    </main>
  );
}