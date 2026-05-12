"use client";

import Link from "next/link";

import styles from "@/app/dashboard/dashboard.module.css";

type Props = {
  active?:
    | "home"
    | "requests"
    | "offers"
    | "orders"
    | "profile";
};

export default function BottomNav({
  active = "home",
}:Props) {

  return (

    <nav className={styles.bottomNav}>

      <Link
        href="/dashboard"
        className={`${styles.navItem} ${
          active === "home"
            ? styles.navActive
            : ""
        }`}
      >
        <span>🏠</span>
        Главная
      </Link>

      <Link
        href="/dashboard/requests"
        className={`${styles.navItem} ${
          active === "requests"
            ? styles.navActive
            : ""
        }`}
      >
        <span>📄</span>
        Запросы
      </Link>

      <Link
        href="/dashboard/offers"
        className={`${styles.navItem} ${
          active === "offers"
            ? styles.navActive
            : ""
        }`}
      >
        <span>💶</span>
        Предложения
      </Link>

      <Link
        href="/dashboard/orders"
        className={`${styles.navItem} ${
          active === "orders"
            ? styles.navActive
            : ""
        }`}
      >
        <span>📦</span>
        Заказы
      </Link>

      <Link
        href="/dashboard/profile"
        className={`${styles.navItem} ${
          active === "profile"
            ? styles.navActive
            : ""
        }`}
      >
        <span>👤</span>
        Профиль
      </Link>

    </nav>
  );
}