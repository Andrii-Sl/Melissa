"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  function active(path:string) {

    if (
      pathname.startsWith(path)
    ) {

      return `
        ${styles.navItem}
        ${styles.navItemActive}
      `;
    }

    return styles.navItem;
  }

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

      {/* NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={active(
            "/dashboard"
          )}
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
          className={active(
            "/dashboard/requests"
          )}
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
          className={active(
            "/dashboard/offers"
          )}
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
          className={active(
            "/dashboard/orders"
          )}
        >
          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>
        </Link>

        <Link
          href="/dashboard/garage"
          className={active(
            "/dashboard/garage"
          )}
        >
          <div className={styles.navIcon}>
            🚘
          </div>

          <span>
            Гараж
          </span>
        </Link>

        <Link
          href="/dashboard/profile"
          className={active(
            "/dashboard/profile"
          )}
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