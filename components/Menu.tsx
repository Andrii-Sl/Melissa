"use client";

import { useEffect, useState } from "react";
import styles from "./menu.module.css";

export default function Menu() {
  const [open, setOpen] = useState(false);

  function closeMenu() {
    setOpen(false);
  }

  /* закрытие по ESC */
  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpen(false);
      }
    }

    window.addEventListener("keydown", handleKey);

    return () => {
      window.removeEventListener(
        "keydown",
        handleKey
      );
    };
  }, []);

  return (
    <>
      {/* BURGER */}
      <button
        className={styles.burger}
        onClick={() => setOpen(true)}
        aria-label="Open menu"
      >
        <span />
        <span />
        <span />
      </button>

      {open && (
        <>
          {/* OVERLAY */}
          <div
            className={styles.overlay}
            onClick={closeMenu}
          />

          {/* MENU */}
          <aside className={styles.popup}>

            {/* TOP */}
            <div className={styles.top}>
              
              <div className={styles.brandWrap}>
                <img
                  src="/logo-final.png"
                  alt="AutoParts EU"
                  className={styles.logo}
                />

                <div className={styles.brandText}>
                  AutoParts EU
                </div>
              </div>

              <button
                className={styles.close}
                onClick={closeMenu}
                aria-label="Close menu"
              >
                ✕
              </button>

            </div>

            {/* NAV */}
            <nav className={styles.nav}>

              <a
                href="/"
                onClick={closeMenu}
              >
                <span>Главная</span>
                <small>Home page</small>
              </a>

              <a
                href="/about"
                onClick={closeMenu}
              >
                <span>О компании</span>
                <small>About company</small>
              </a>

              <a
                href="/how-it-works"
                onClick={closeMenu}
              >
                <span>Как работает</span>
                <small>Process & delivery</small>
              </a>

              <a
                href="/schedule"
                onClick={closeMenu}
              >
                <span>Поставки</span>
                <small>Delivery schedule</small>
              </a>

              <a
                href="/contacts"
                onClick={closeMenu}
              >
                <span>Контакты</span>
                <small>Contacts & support</small>
              </a>

            </nav>

          </aside>
        </>
      )}
    </>
  );
}