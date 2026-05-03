"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "./login.module.css";

export default function LoginPage() {
  const [mode, setMode] =
    useState<"login" | "register">(
      "login"
    );

  const [phone, setPhone] =
    useState("");

  const [name, setName] =
    useState("");

  const [surname, setSurname] =
    useState("");

  function handleSubmit() {
    if (phone === "1424") {
      window.location.href =
        "/dashboard";
      return;
    }

    if (mode === "login") {
      alert(
        "OTP вход позже подключим"
      );
      return;
    }

    alert(
      "Регистрация сохранена"
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

        <div className={styles.card}>

          <div className={styles.label}>
            {mode === "login"
              ? "ВХОД"
              : "РЕГИСТРАЦИЯ"}
          </div>

          <h1 className={styles.title}>
            {mode === "login"
              ? "Личный кабинет"
              : "Создать аккаунт"}
          </h1>

          {mode ===
            "register" && (
            <>
              <input
                className={styles.input}
                placeholder="Имя"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
              />

              <input
                className={styles.input}
                placeholder="Фамилия"
                value={surname}
                onChange={(e) =>
                  setSurname(
                    e.target.value
                  )
                }
              />
            </>
          )}

          <input
            className={styles.input}
            placeholder="Телефон"
            value={phone}
            onChange={(e) =>
              setPhone(
                e.target.value
              )
            }
          />

          <button
            className={styles.button}
            onClick={
              handleSubmit
            }
          >
            {mode === "login"
              ? "ВОЙТИ"
              : "РЕГИСТРАЦИЯ"}
          </button>

          <button
            className={styles.linkBtn}
            onClick={() =>
              setMode(
                mode ===
                  "login"
                  ? "register"
                  : "login"
              )
            }
          >
            {mode === "login"
              ? "Регистрация"
              : "Уже есть аккаунт? Вход"}
          </button>

        </div>

      </section>

    </main>
  );
}