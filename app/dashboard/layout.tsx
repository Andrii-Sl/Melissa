"use client";

import Link from "next/link";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div className={styles.headerTop}>

          <img
            src="/logo-final.png"
            alt="logo"
            className={styles.logo}
          />

          <div className={styles.icons}>

            <button className={styles.iconBtn}>
              🔔
            </button>

            <button className={styles.iconBtn}>
              ☰
            </button>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      {children}

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={
            `${styles.navItem} ${styles.navItemActive}`
          }
        >
          <div className={styles.navIcon}>
            🏠
          </div>

          <span>
            Главная
          </span>
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <div className={styles.navIcon}>
            📄
          </div>

          <span>
            Заявки
          </span>
        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >
          <div className={styles.navIcon}>
            💶
          </div>

          <span>
            Предложения
          </span>
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >
          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>
        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.navItem}
        >
          <div className={styles.navIcon}>
            👤
          </div>

          <span>
            Профиль
          </span>
        </Link>

      </nav>

    </main>
  );
}