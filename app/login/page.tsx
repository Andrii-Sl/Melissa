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

  /* SAVE CLIENT PHONE */

  function saveClientPhone(
    phone:string
  ) {

    document.cookie =
      `client_phone=${phone}; path=/; max-age=31536000; SameSite=Lax`;

    document.cookie =
      "role=client; path=/; max-age=31536000; SameSite=Lax";
  }

  /* SUBMIT */

  async function submit() {

    setLoading(true);

    setSmsError("");

    const cleanPhone =
      phone.trim();

    /* ADMIN LOGIN */

    if (
      cleanPhone ===
      "14051978"
    ) {

      document.cookie =
        "role=admin; path=/; max-age=31536000; SameSite=Lax";

      window.location.href =
        "/admin";

      return;
    }

    /* MASTER LOGIN */

    if (
      cleanPhone === "1424"
    ) {

      window.location.href =
        "/dashboard?master=1424";

      return;
    }

    /* TEST CLIENT LOGIN */

    if (
      cleanPhone.startsWith("+")
    ) {

      try {

        /* PROFILE */

        const {
          data:existing,
        } =
          await supabase
            .from("profiles")
            .select("*")
            .eq(
              "phone",
              cleanPhone
            )
            .maybeSingle();

        /* CREATE PROFILE */

        if (!existing) {

          await supabase
            .from("profiles")
            .insert([
              {
                full_name:
                  (
                    name +
                    " " +
                    surname
                  ).trim(),

                phone:
                  cleanPhone,
              },
            ]);
        }

        /* SAVE PHONE */

        saveClientPhone(
          cleanPhone
        );

        /* DASHBOARD */

        window.location.href =
          "/dashboard";

        return;

      } catch (e) {

        console.error(e);

        setSmsError(
          "Ошибка входа"
        );

        setLoading(false);

        return;
      }
    }

    /* REAL SMS LOGIN */

    try {

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

      setShowCode(true);

    } catch (e) {

      console.error(e);

      setLoading(false);

      setSmsError(
        "Ошибка отправки SMS"
      );
    }
  }

  /* VERIFY SMS */

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

      /* SAVE PHONE */

      saveClientPhone(
        phone.trim()
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
                : mode === "login"
                ? "ВОЙТИ"
                : "ЗАРЕГИСТРИРОВАТЬСЯ"}

            </button>

            {/* ERROR */}

            {smsError && (

              <div
                style={{
                  color:"#d10000",
                  marginTop:"12px",
                  fontSize:"14px",
                  lineHeight:"1.4",
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