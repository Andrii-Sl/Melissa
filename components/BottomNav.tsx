"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/dashboard/dashboard.module.css";

export default function BottomNav() {

  const pathname =
    usePathname();

  return (

    <nav className={styles.bottomNav}>

      <Link
        href="/dashboard"
        className={`${styles.navItem} ${
          pathname === "/dashboard"
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
          pathname.includes("/requests")
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
          pathname.includes("/offers")
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
          pathname.includes("/orders")
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
          pathname.includes("/profile")
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