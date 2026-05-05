"use client";

import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        className={styles.burger}
        onClick={() => setOpen(true)}
      >
        ☰
      </button>

      {open && (
        <>
          <div
            className={styles.overlay}
            onClick={() => setOpen(false)}
          />

          <aside className={styles.menu}>
            <button
              className={styles.close}
              onClick={() => setOpen(false)}
            >
              ✕
            </button>

            <a href="/">Главная</a>
            <a href="/about">О компании</a>
            <a href="/how-it-works">
              Как работает сервис
            </a>
            <a href="/schedule">
              Расписание поставок
            </a>
            <a href="/contacts">
              Контакты
            </a>
          </aside>
        </>
      )}
    </>
  );
}