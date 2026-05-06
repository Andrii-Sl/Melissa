"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {

  const [phone, setPhone] =
    useState("");

  const [mode, setMode] =
    useState<
      "login" | "register"
    >("login");

  const [name, setName] =
    useState("");

  const [surname, setSurname] =
    useState("");

  /* SMS */

  const [code, setCode] =
    useState("");

  const [showCode, setShowCode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [smsError, setSmsError] =
    useState("");

  /* SEND */

  async function submit() {

    setLoading(true);

    setSmsError("");

    /* 🔥 TEST LOGIN */

    if (phone === "1424") {

      localStorage.setItem(
        "fakeAuth",
        "true"
      );

      window.location.href =
        "/dashboard";

      return;
    }

    try {

      const cleanPhone =
        phone.trim();

      const {
        error,
      } =
        await supabase.auth.signInWithOtp({
          phone:
            cleanPhone,
        });

      setLoading(false);

      /* ERROR */

      if (error) {

        setSmsError(
          error.message
        );

        return;
      }

      /* SHOW CODE */

      setShowCode(true);

    } catch (e) {

      console.error(e);

      setLoading(false);

      setSmsError(
        "Ошибка отправки SMS"
      );
    }
  }

  /* VERIFY */

  async function verifyCode() {

    try {

      const {
        data,
        error,
      } =
        await supabase.auth.verifyOtp({
          phone:
            phone.trim(),

          token:
            code,

          type:
            "sms",
        });

      console.log(
        "VERIFY:",
        data
      );

      console.log(
        "VERIFY ERROR:",
        error
      );

      if (error) {

        alert(
          error.message
        );

        return;
      }

      /* 🔥 SESSION */

      const {
        data: sessionData,
      } =
        await supabase.auth.getSession();

      console.log(
        "SESSION:",
        sessionData
      );

      /* LOGIN */

      window.location.href =
        "/dashboard";

    } catch (e) {

      console.error(e);

      alert(
        "Ошибка проверки кода"
      );
    }
  }

  return (
    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div className={styles.headerInner}>

          <img
            src="/logo-final.png"
            className={styles.logo}
            alt="logo"
          />

          <Link
            href="/"
            className={styles.homeBtn}
          >
            На главную
          </Link>

        </div>

      </header>

      {/* HERO */}

      <section className={styles.hero}>

        <div className={styles.overlay}>

          <div className={styles.card}>

            {/* LABEL */}

            <div className={styles.label}>
              {mode === "login"
                ? "ВХОД"
                : "РЕГИСТРАЦИЯ"}
            </div>

            {/* TITLE */}

            <h1 className={styles.title}>
              {mode === "login"
                ? "Личный кабинет"
                : "Регистрация"}
            </h1>

            {/* REGISTER */}

            {mode ===
              "register" && (
              <>

                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={name}
                    onChange={(e) =>
                      setName(
                        e.target.value
                      )
                    }
                  />
                  <label>
                    Имя
                  </label>
                </div>

                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={surname}
                    onChange={(e) =>
                      setSurname(
                        e.target.value
                      )
                    }
                  />
                  <label>
                    Фамилия
                  </label>
                </div>

              </>
            )}

            {/* PHONE */}

            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                placeholder=" "
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />
              <label>
                Телефон
              </label>
            </div>

            {/* BUTTON */}

            <button
              className={styles.button}
              onClick={submit}
            >
              {loading
                ? "ОТПРАВКА..."
                : "ВОЙТИ"}
            </button>

            {/* ERROR */}

            {smsError && (
              <div
                style={{
                  color: "#d10000",
                  marginTop: "12px",
                  fontSize: "14px",
                  lineHeight: "1.4",
                }}
              >
                {smsError}
              </div>
            )}

            {/* SMS CODE */}

            {showCode && (
              <>

                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={code}
                    onChange={(e) =>
                      setCode(
                        e.target.value
                      )
                    }
                  />
                  <label>
                    Код из SMS
                  </label>
                </div>

                <button
                  className={styles.button}
                  onClick={verifyCode}
                >
                  ПОДТВЕРДИТЬ КОД
                </button>

              </>
            )}

            {/* SWITCH */}

            <button
              className={styles.linkBtn}
              onClick={() =>
                setMode(
                  mode === "login"
                    ? "register"
                    : "login"
                )
              }
            >
              {mode === "login"
                ? "Регистрация"
                : "Назад ко входу"}
            </button>

          </div>

        </div>

      </section>

    </main>
  );
}