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

  /* 🔥 SMS */

  const [code, setCode] =
    useState("");

  const [showCode, setShowCode] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [smsError, setSmsError] =
    useState("");

  /* SEND SMS */

  async function submit() {

    setLoading(true);

    setSmsError("");

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

      if (error) {

        setSmsError(
          error.message
        );

        return;
      }

      /* 🔥 показать поле кода */

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

      if (error) {

        alert(
          error.message
        );

        return;
      }

      /* 🔥 LOGIN SUCCESS */

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