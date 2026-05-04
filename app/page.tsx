"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import styles from "./page.module.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    console.log("PAGE LOADED");
  }, []);

  /* 🔥 TEST SUPABASE */

  async function testSupabase() {
    const { data, error } = await supabase
      .from("profiles")
      .select("*")
      .limit(1);

    console.log("DATA:", data);
    console.log("ERROR:", error);
  }

  return (
    <>
      {/* 🔴 ВСЕГДА ВИДНАЯ КНОПКА */}
      <button
        onClick={testSupabase}
        style={{
          position: "fixed",
          top: 20,
          left: 20,
          zIndex: 9999,
          background: "red",
          color: "white",
          padding: "12px 16px",
          fontSize: 16,
          border: "none",
          cursor: "pointer"
        }}
      >
        TEST SUPABASE
      </button>

      <main className={styles.page}>
        <header className={styles.header}>
          <div className={styles.container}>

            <button
              className={styles.burger}
              onClick={() => setMenuOpen(true)}
            >
              ☰
            </button>

            <a href="/" className={styles.logoWrap}>
              <img
                src="/logo-final.png"
                alt="AutoParts EU"
                className={styles.logoImg}
              />
            </a>

            <a href="/login" className={styles.loginBtn}>
              Кабинет
            </a>

          </div>
        </header>

        <section className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.heroBox}>

              <h1 style={{ color: "white" }}>
                TEST PAGE
              </h1>

            </div>
          </div>
        </section>
      </main>
    </>
  );
}