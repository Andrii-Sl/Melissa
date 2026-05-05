"use client";

import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  const close = () => setOpen(false);

  return (
    <>
      {/* BURGER */}
      <button
        className={styles.burger}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* OVERLAY */}
      <div
        className={`${styles.overlay} ${open ? styles.show : ""}`}
        onClick={close}
      />

      {/* POPUP */}
      <div
        className={`${styles.popup} ${open ? styles.open : ""}`}
        onClick={(e) => e.stopPropagation()}
      >
        <button className={styles.close} onClick={close}>
          ✕
        </button>

        <nav className={styles.nav}>
          <a href="/about" onClick={close}>О компании</a>
          <a href="/how-it-works" onClick={close}>Как работает</a>
          <a href="/schedule" onClick={close}>Поставки</a>
          <a href="/contacts" onClick={close}>Контакты</a>
        </nav>

        <div className={styles.lang}>
          <span className={styles.langTitle}>Language</span>

          <a href="/" onClick={close}>
            🇷🇺 Русский
          </a>

          <a href="/en" onClick={close}>
            🇬🇧 English
          </a>
        </div>
      </div>
    </>
  );
}