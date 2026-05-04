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
      <aside
        className={`${styles.menu} ${
          open ? styles.open : ""
        }`}
      >
        <button
          className={styles.close}
          onClick={() => setOpen(false)}
        >
          ✕
        </button>

        {/* ОСНОВНОЕ МЕНЮ */}
        <a href="/about">О компании</a>
        <a href="/how-it-works">Как работает сервис</a>
        <a href="/schedule">Расписание поставок</a>
        <a href="/contacts">Контакты</a>

        {/* 🔥 ПЕРЕКЛЮЧАТЕЛЬ ЯЗЫКА */}
        <div className={styles.langBlock}>
          <a href="/">RU</a>
          <a href="/en">EN</a>
        </div>

      </aside>
    </>
  );
}