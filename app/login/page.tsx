"use client";

import { useState } from "react";

import Link from "next/link";

import { supabase }
from "@/lib/supabase";

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

    const normalizedPhone =
      phone.trim();

    /* LOCAL STORAGE */

    localStorage.setItem(
      "client_phone",
      normalizedPhone
    );

    /* COOKIE */

    document.cookie =
      `client_phone=${normalizedPhone}; path=/; max-age=31536000; SameSite=Lax`;

    document.cookie =
      "role=client; path=/; max-age=31536000; SameSite=Lax";
  }

  /* CREATE OR UPDATE PROFILE */

  async function createProfileIfNeeded(
    cleanPhone:string
  ) {

    try {

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

      const fullName =
        (
          name +
          " " +
          surname
        ).trim();

      /* CREATE */

      if (!existing) {

        await supabase
          .from("profiles")
          .insert([
            {
              full_name:
                fullName ||
                "Клиент",

              phone:
                cleanPhone,
            },
          ]);

        return;
      }

      /* UPDATE EMPTY NAME */

      if (
        fullName &&
        !existing.full_name
      ) {

        await supabase
          .from("profiles")
          .update({
            full_name:
              fullName,
          })
          .eq(
            "phone",
            cleanPhone
          );
      }

    } catch (error) {

      console.error(error);
    }
  }

  /* SUBMIT */

  async function submit() {

    try {

      setLoading(true);

      setSmsError("");

      const cleanPhone =
        phone.trim();

      if (!cleanPhone) {

        setSmsError(
          "Введите телефон"
        );

        setLoading(false);

        return;
      }

      /* ADMIN LOGIN */

      if (
        cleanPhone ===
        "14051978"
      ) {

        localStorage.setItem(
          "role",
          "admin"
        );

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

      /*
        TEST LOGIN
        Any +phone works
      */

      if (
        cleanPhone.startsWith("+")
      ) {

        await createProfileIfNeeded(
          cleanPhone
        );

        saveClientPhone(
          cleanPhone
        );

        window.location.href =
          "/dashboard";

        return;
      }

      /* REAL SMS LOGIN */

      const {
        error,
      } =
        await supabase.auth.signInWithOtp({
          phone:
            cleanPhone,
        });

      if (error) {

        setSmsError(
          error.message
        );

        setLoading(false);

        return;
      }

      setShowCode(true);

    } catch (error) {

      console.error(error);

      setSmsError(
        "Ошибка входа"
      );

    } finally {

      setLoading(false);
    }
  }

  /* VERIFY SMS */

  async function verifyCode() {

    try {

      setLoading(true);

      const cleanPhone =
        phone.trim();

      const {
        error,
      } =
        await supabase.auth.verifyOtp({
          phone:
            cleanPhone,

          token:
            code,

          type:
            "sms",
        });

      if (error) {

        alert(
          error.message
        );

        setLoading(false);

        return;
      }

      /* CREATE PROFILE */

      await createProfileIfNeeded(
        cleanPhone
      );

      /* SAVE PHONE */

      saveClientPhone(
        cleanPhone
      );

      /* LOGIN */

      window.location.href =
        "/dashboard";

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка проверки кода"
      );

      setLoading(false);

    } finally {

      setLoading(false);
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

              {
                mode === "login"
                  ? "ВХОД"
                  : "РЕГИСТРАЦИЯ"
              }

            </div>

            {/* TITLE */}

            <h1 className={styles.title}>

              {
                mode === "login"
                  ? "Личный кабинет"
                  : "Регистрация"
              }

            </h1>

            {/* REGISTER */}

            {
              mode === "register" && (
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
              )
            }

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
              disabled={loading}
            >

              {
                loading
                  ? "ОТПРАВКА..."
                  : mode === "login"
                  ? "ВОЙТИ"
                  : "ЗАРЕГИСТРИРОВАТЬСЯ"
              }

            </button>

            {/* ERROR */}

            {
              smsError && (

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
              )
            }

            {/* SMS CODE */}

            {
              showCode && (
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
                    disabled={loading}
                  >
                    ПОДТВЕРДИТЬ КОД
                  </button>

                </>
              )
            }

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

              {
                mode === "login"
                  ? "Регистрация"
                  : "Назад ко входу"
              }

            </button>

          </div>

        </div>

      </section>

    </main>
  );
}