"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import Footer from "../components/Footer";
import styles from "./page.module.css";

export default function HomePage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cabinetLink, setCabinetLink] = useState("/login");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (session) {
      setCabinetLink("/dashboard");
    } else {
      setCabinetLink("/login");
    }
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
              alt="AutoParts EU"
              className={styles.logoImg}
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

      {menuOpen && (
        <>
          <div
            className={styles.overlayMenu}
            onClick={() => setMenuOpen(false)}
          />

          <aside className={styles.menu}>
            <button
              className={styles.closeBtn}
              onClick={() => setMenuOpen(false)}
            >
              ✕
            </button>

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

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <div className={styles.miniTitle}>
              ПОДБОР ПО VIN И НОМЕРУ ДЕТАЛИ
            </div>

            <h1>
              Автозапчасти
              <br />
              из Европы
            </h1>

            <p>
              Оригинальные детали и качественные
              аналоги для европейских автомобилей.
            </p>

            <div className={styles.trustRow}>
              <span>✔ Подбор по VIN</span>
              <span>✔ Поставщики Европы</span>
              <span>✔ Гарантия качества</span>
            </div>

            <input placeholder="VIN или номер детали" />

            <input placeholder="Телефон / WhatsApp" />

            <a
              href="/offer"
              className={styles.cta}
            >
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </a>

            <div className={styles.payments}>
              <span className={styles.payText}>
                Принимаем оплату:
              </span>

              <div className={styles.payIcons}>
                <img
                  src="/visa.png"
                  alt="Visa"
                />

                <img
                  src="/mastercard.png"
                  alt="MasterCard"
                />

                <img
                  src="/paypal.png"
                  alt="PayPal"
                />
              </div>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}