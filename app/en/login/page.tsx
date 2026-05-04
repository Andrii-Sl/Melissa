"use client";

import { useState } from "react";
import Link from "next/link";
import styles from "../../login/login.module.css";

export default function EnLoginPage() {

  const [phone, setPhone] = useState("");

  const [mode, setMode] = useState<
    "login" | "register"
  >("login");

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");

  function submit() {

    // 🔥 тестовый вход
    if (phone === "1424") {
      window.location.href = "/dashboard";
      return;
    }

    alert("Login");
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <img
          src="/logo-final.png"
          className={styles.logo}
          alt="logo"
        />

        <Link
          href="/en"
          className={styles.homeBtn}
        >
          Home
        </Link>

      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>

            <div className={styles.label}>
              {mode === "login"
                ? "LOGIN"
                : "REGISTER"}
            </div>

            <h1 className={styles.title}>
              {mode === "login"
                ? "Account"
                : "Create Account"}
            </h1>

            {mode === "register" && (
              <>
                <input
                  className={styles.input}
                  placeholder="First name"
                  value={name}
                  onChange={(e) =>
                    setName(e.target.value)
                  }
                />

                <input
                  className={styles.input}
                  placeholder="Last name"
                  value={surname}
                  onChange={(e) =>
                    setSurname(e.target.value)
                  }
                />
              </>
            )}

            <input
              className={styles.input}
              placeholder="Phone"
              value={phone}
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            <button
              className={styles.button}
              onClick={submit}
            >
              {mode === "login"
                ? "LOGIN"
                : "REGISTER"}
            </button>

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
                ? "Create account"
                : "Back to login"}
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}