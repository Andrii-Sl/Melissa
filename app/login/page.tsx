"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function handleAuth() {
    if (!email || !password) {
      alert("Введите данные");
      return;
    }

    if (mode === "login") {
      const { error } =
        await supabase.auth.signInWithPassword({
          email,
          password
        });

      if (error) {
        alert(error.message);
        return;
      }

      router.push("/dashboard");
    }

    if (mode === "register") {
      const { error } =
        await supabase.auth.signUp({
          email,
          password
        });

      if (error) {
        alert(error.message);
        return;
      }

      alert("Регистрация успешна");
      router.push("/dashboard");
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a href="/" className={styles.backBtn}>
            На главную
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>

            <div className={styles.titleMini}>
              {mode === "login"
                ? "ВХОД"
                : "РЕГИСТРАЦИЯ"}
            </div>

            <h1>
              {mode === "login"
                ? "Личный кабинет"
                : "Создать аккаунт"}
            </h1>

            <p>
              Управляйте заявками и заказами
              в одном месте.
            </p>

            <input
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
            />

            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) =>
                setPassword(e.target.value)
              }
            />

            <button
              className={styles.loginBtn}
              onClick={handleAuth}
            >
              {mode === "login"
                ? "ВОЙТИ"
                : "ЗАРЕГИСТРИРОВАТЬСЯ"}
            </button>

            <div className={styles.links}>
              {mode === "login" ? (
                <button
                  onClick={() =>
                    setMode("register")
                  }
                >
                  Регистрация
                </button>
              ) : (
                <button
                  onClick={() =>
                    setMode("login")
                  }
                >
                  Уже есть аккаунт?
                </button>
              )}
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}