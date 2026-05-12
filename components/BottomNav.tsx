"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "@/app/dashboard/dashboard.module.css";

export default function BottomNav() {

  const pathname = usePathname();

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
        <span className={styles.navIcon}>
          🏠
        </span>

        <span>
          Главная
        </span>
      </Link>

      <Link
        href="/dashboard/requests"
        className={`${styles.navItem} ${
          pathname.includes("/dashboard/requests")
            ? styles.navActive
            : ""
        }`}
      >
        <span className={styles.navIcon}>
          📄
        </span>

        <span>
          Заявки
        </span>
      </Link>

      <Link
        href="/dashboard/offers"
        className={`${styles.navItem} ${
          pathname.includes("/dashboard/offers")
            ? styles.navActive
            : ""
        }`}
      >
        <span className={styles.navIcon}>
          💶
        </span>

        <span>
          Предложения
        </span>
      </Link>

      <Link
        href="/dashboard/orders"
        className={`${styles.navItem} ${
          pathname.includes("/dashboard/orders")
            ? styles.navActive
            : ""
        }`}
      >
        <span className={styles.navIcon}>
          📦
        </span>

        <span>
          Заказы
        </span>
      </Link>

      <Link
        href="/dashboard/profile"
        className={`${styles.navItem} ${
          pathname.includes("/dashboard/profile")
            ? styles.navActive
            : ""
        }`}
      >
        <span className={styles.navIcon}>
          👤
        </span>

        <span>
          Профиль
        </span>
      </Link>

    </nav>
  );
}