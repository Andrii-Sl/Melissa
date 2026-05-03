"use client";

export const dynamic =
  "force-dynamic";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const params =
    useSearchParams();

  const requestId =
    params.get("request");

  const [phone, setPhone] =
    useState("");

  const [name, setName] =
    useState("");

  const [code, setCode] =
    useState("");

  const [step, setStep] =
    useState<"auth" | "verify">(
      "auth"
    );

  const [mode, setMode] =
    useState<"login" | "register">(
      "login"
    );

  async function sendOtp() {
    if (!phone) return;

    await supabase.auth.signInWithOtp({
      phone,
    });

    setStep("verify");
  }

  async function verifyOtp() {
    const { data, error } =
      await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms",
      });

    if (!error && data.user) {
      const userId =
        data.user.id;

      if (
        mode ===
        "register"
      ) {
        await supabase
          .from("profiles")
          .upsert({
            user_id: userId,
            phone,
            full_name: name,
          });
      }

      if (requestId) {
        await supabase
          .from("requests")
          .update({
            user_id: userId,
          })
          .eq(
            "id",
            requestId
          );
      }

      window.location.href =
        "/dashboard";
    }
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
              : "Регистрация"}
          </h1>

          {step === "auth" ? (
            <>
              {mode ===
                "register" && (
                <input
                  className={styles.input}
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target
                        .value
                    )
                  }
                />
              )}

              <input
                className={styles.input}
                placeholder="+77001234567"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target
                      .value
                  )
                }
              />

              <button
                className={styles.button}
                onClick={sendOtp}
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
            </>
          ) : (
            <>
              <input
                className={styles.input}
                placeholder="Код из SMS"
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target
                      .value
                  )
                }
              />

              <button
                className={styles.button}
                onClick={
                  verifyOtp
                }
              >
                Подтвердить
              </button>
            </>
          )}

        </div>
      </section>
    </main>
  );
}