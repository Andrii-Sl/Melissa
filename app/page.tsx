"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cabinetLink, setCabinetLink] =
    useState("/login");

  const pathname = usePathname();

  const startX = useRef(0);
  const currentX = useRef(0);
  const isDragging = useRef(false);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } =
      await supabase.auth.getSession();

    if (session) {
      setCabinetLink("/dashboard");
    } else {
      setCabinetLink("/login");
    }
  }

  /* 🔥 блок скролла */
  useEffect(() => {
    document.body.style.overflow =
      menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  /* 🔥 свайп */
  function onTouchStart(e: any) {
    startX.current = e.touches[0].clientX;
    isDragging.current = true;
  }

  function onTouchMove(e: any) {
    if (!isDragging.current) return;
    currentX.current =
      e.touches[0].clientX;
  }

  function onTouchEnd() {
    const diff =
      startX.current - currentX.current;

    if (diff > 80) {
      setMenuOpen(false);
    }

    isDragging.current = false;
  }

  return (
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
              className={styles.logoImg}
              alt="logo"
            />
          </a>

          <a
            href={cabinetLink}
            className={styles.loginBtn}
          >
            Кабинет
          </a>

        </div>
      </header>

      {/* overlay */}
      <div
        className={`${styles.overlayMenu} ${
          menuOpen ? styles.overlayShow : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* menu */}
      <aside
        className={`${styles.menu} ${
          menuOpen ? styles.menuOpen : ""
        }`}
        onTouchStart={onTouchStart}
        onTouchMove={onTouchMove}
        onTouchEnd={onTouchEnd}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <a
          href="/about"
          className={
            pathname === "/about"
              ? styles.active
              : ""
          }
        >
          О компании
        </a>

        <a
          href="/how-it-works"
          className={
            pathname === "/how-it-works"
              ? styles.active
              : ""
          }
        >
          Как работает сервис
        </a>

        <a
          href="/schedule"
          className={
            pathname === "/schedule"
              ? styles.active
              : ""
          }
        >
          Расписание поставок
        </a>

        <a
          href="/contacts"
          className={
            pathname === "/contacts"
              ? styles.active
              : ""
          }
        >
          Контакты
        </a>

        <div className={styles.langTitle}>
          Язык
        </div>

        <a
          href="/"
          className={styles.langMenu}
        >
          🇷🇺 Русский
        </a>

        <a
          href="/en"
          className={styles.langMenu}
        >
          🇬🇧 English
        </a>
      </aside>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}></div>
        </div>
      </section>

      <Footer />
    </main>
  );
}