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
        aria-label="Open menu"
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {/* OVERLAY */}
      {open && <div className={styles.overlay} onClick={close} />}

      {/* POPUP */}
      {open && (
        <div className={styles.popup}>
          <button
            className={styles.close}
            aria-label="Close menu"
            onClick={close}
          >
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
            <div className={styles.langRow}>
              <a href="/" onClick={close}>RU</a>
              <a href="/en" onClick={close}>EN</a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}