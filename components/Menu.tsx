"use client";

import { useEffect, useRef, useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // закрытие по клику вне
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (
        open &&
        menuRef.current &&
        !menuRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClick);
    return () =>
      document.removeEventListener("mousedown", handleClick);
  }, [open]);

  return (
    <div className={styles.wrap}>
      {/* BURGER */}
      <button
        className={styles.burger}
        onClick={() => setOpen((v) => !v)}
        aria-label="Menu"
      >
        ☰
      </button>

      {/* MENU */}
      {open && (
        <div className={styles.menu} ref={menuRef}>
          <button
            className={styles.close}
            onClick={() => setOpen(false)}
            aria-label="Close"
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
    </div>
  );
}