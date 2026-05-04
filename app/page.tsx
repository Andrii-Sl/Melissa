"use client";

import { useEffect, useState, useRef } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cabinetLink, setCabinetLink] = useState("/login");

  const pathname = usePathname();

  const startX = useRef(0);
  const currentX = useRef(0);

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    setCabinetLink(session ? "/dashboard" : "/login");
  }

  /* 🔥 блокируем скролл */
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  /* 🔥 свайп */
  function handleTouchStart(e: any) {
    startX.current = e.touches[0].clientX;
  }

  function handleTouchMove(e: any) {
    currentX.current = e.touches[0].clientX;
  }

  function handleTouchEnd() {
    if (startX.current - currentX.current > 70) {
      setMenuOpen(false);
    }
  }

  return (
    <main className={styles.page}>
      {/* HEADER */}
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

          <a href={cabinetLink} className={styles.loginBtn}>
            Кабинет
          </a>

        </div>
      </header>

      {/* OVERLAY */}
      <div
        className={`${styles.overlayMenu} ${
          menuOpen ? styles.overlayShow : ""
        }`}
        onClick={() => setMenuOpen(false)}
      />

      {/* MENU */}
      <aside
        className={`${styles.menu} ${
          menuOpen ? styles.menuOpen : ""
        }`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <button
          className={styles.closeBtn}
          onClick={() => setMenuOpen(false)}
        >
          ✕
        </button>

        <a href="/about" className={pathname === "/about" ? styles.active : ""}>
          О компании
        </a>

        <a href="/how-it-works" className={pathname === "/how-it-works" ? styles.active : ""}>
          Как работает сервис
        </a>

        <a href="/schedule" className={pathname === "/schedule" ? styles.active : ""}>
          Расписание поставок
        </a>

        <a href="/contacts" className={pathname === "/contacts" ? styles.active : ""}>
          Контакты
        </a>

        <div className={styles.langTitle}>Язык</div>

        <a href="/" className={styles.langMenu}>
          🇷🇺 Русский
        </a>

        <a href="/en" className={styles.langMenu}>
          🇬🇧 English
        </a>

      </aside>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>
            {/* контент без изменений */}
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}