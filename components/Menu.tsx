"use client";

import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

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
      {open && (
        <div
          className={styles.overlay}
          onClick={() => setOpen(false)}
        />
      )}

      {/* MENU */}
      {open && (
        <div className={styles.popup}>
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
          >
            ✕
          </button>

          <nav className={styles.nav}>
            <a href="/about" onClick={() => setOpen(false)}>О компании</a>
            <a href="/how-it-works" onClick={() => setOpen(false)}>Как работает</a>
            <a href="/schedule" onClick={() => setOpen(false)}>Поставки</a>
            <a href="/contacts" onClick={() => setOpen(false)}>Контакты</a>
          </nav>
        </div>
      )}
    </>
  );
}