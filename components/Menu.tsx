"use client";

import { useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);

  return (
    <>
      <button
        className={styles.burger}
        onClick={() => setOpen(true)}
        aria-label="Menu"
      >
        ☰
      </button>

      {open && (
        <>
          <div className={styles.overlay} onClick={close} />

          <div className={styles.popup}>
            <button className={styles.close} onClick={close}>
              ✕
            </button>

            <nav className={styles.nav}>
              <a href="/" onClick={close}>Главная</a>
              <a href="/about" onClick={close}>О компании</a>
              <a href="/how-it-works" onClick={close}>Как работает</a>
              <a href="/schedule" onClick={close}>Поставки</a>
              <a href="/contacts" onClick={close}>Контакты</a>
            </nav>
          </div>
        </>
      )}
    </>
  );
}