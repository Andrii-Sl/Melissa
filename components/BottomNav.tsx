"use client";

import Link from "next/link";

import styles from "./BottomNav.module.css";

export default function BottomNav({
  active,
}:{
  active:string;
}) {

  return (

    <nav className={styles.bottomNav}>

      <Link
        href="/dashboard"
        className={`${styles.navItem} ${
          active === "home"
            ? styles.navItemActive
            : ""
        }`}
      >

        <div className={styles.navIcon}>
          🏠
        </div>

        <div className={styles.navText}>
          Главная
        </div>

      </Link>

      <Link
        href="/dashboard/requests"
        className={`${styles.navItem} ${
          active === "requests"
            ? styles.navItemActive
            : ""
        }`}
      >

        <div className={styles.navIcon}>
          📄
        </div>

        <div className={styles.navText}>
          Запросы
        </div>

      </Link>

      <Link
        href="/dashboard/offers"
        className={`${styles.navItem} ${
          active === "offers"
            ? styles.navItemActive
            : ""
        }`}
      >

        <div className={styles.navIcon}>
          💶
        </div>

        <div className={styles.navText}>
          Предложения
        </div>

      </Link>

      <Link
        href="/dashboard/orders"
        className={`${styles.navItem} ${
          active === "orders"
            ? styles.navItemActive
            : ""
        }`}
      >

        <div className={styles.navIcon}>
          📦
        </div>

        <div className={styles.navText}>
          Заказы
        </div>

      </Link>

      <Link
        href="/dashboard/profile"
        className={`${styles.navItem} ${
          active === "profile"
            ? styles.navItemActive
            : ""
        }`}
      >

        <div className={styles.navIcon}>
          👤
        </div>

        <div className={styles.navText}>
          Профиль
        </div>

      </Link>

    </nav>
  );
}