"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const [phone, setPhone] = useState("");
  const [name, setName] = useState("");
  const [code, setCode] = useState("");

  const [step, setStep] =
    useState<"auth" | "verify">("auth");

  const [mode, setMode] =
    useState<"login" | "register">(
      "login"
    );

  const [loading, setLoading] =
    useState(false);

  async function sendOtp() {
    if (!phone) {
      alert("Введите телефон");
      return;
    }

    setLoading(true);

    await supabase.auth.signInWithOtp({
      phone,
    });

    setStep("verify");
    setLoading(false);
  }

  async function verifyOtp() {
    setLoading(true);

    const { data, error } =
      await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms",
      });

    if (!error && data.user) {
      if (mode === "register") {
        await supabase
          .from("profiles")
          .upsert({
            user_id: data.user.id,
            phone,
            full_name: name,
          });
      }

      window.location.href =
        "/dashboard";
    } else {
      alert("Неверный код");
    }

    setLoading(false);
  }

  return (
    <main className={styles.page}>
      <div className={styles.overlay}>
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

          <p className={styles.text}>
            Управляйте заявками в одном месте.
          </p>

          {step === "auth" ? (
            <>
              {mode === "register" && (
                <input
                  className={
                    styles.input
                  }
                  placeholder="Ваше имя"
                  value={name}
                  onChange={(e) =>
                    setName(
                      e.target.value
                    )
                  }
                />
              )}

              <input
                className={
                  styles.input
                }
                placeholder="+77001234567"
                value={phone}
                onChange={(e) =>
                  setPhone(
                    e.target.value
                  )
                }
              />

              <button
                className={
                  styles.button
                }
                onClick={sendOtp}
              >
                {loading
                  ? "Отправка..."
                  : mode === "login"
                  ? "ВОЙТИ"
                  : "ЗАРЕГИСТРИРОВАТЬСЯ"}
              </button>

              <button
                className={
                  styles.linkBtn
                }
                onClick={() =>
                  setMode(
                    mode ===
                      "login"
                      ? "register"
                      : "login"
                  )
                }
              >
                {mode ===
                "login"
                  ? "Регистрация"
                  : "Уже есть аккаунт? Войти"}
              </button>
            </>
          ) : (
            <>
              <input
                className={
                  styles.input
                }
                placeholder="Код из SMS"
                value={code}
                onChange={(e) =>
                  setCode(
                    e.target.value
                  )
                }
              />

              <button
                className={
                  styles.button
                }
                onClick={
                  verifyOtp
                }
              >
                {loading
                  ? "Проверка..."
                  : "ПОДТВЕРДИТЬ"}
              </button>
            </>
          )}

          <Link
            href="/"
            className={styles.back}
          >
            ← На главную
          </Link>

        </div>
      </div>
    </main>
  );
}