"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const pathname =
    usePathname();

  const [notify, setNotify] =
    useState("");

  const [menuOpen, setMenuOpen] =
    useState(false);

  useEffect(() => {

    const offers =
      supabase
        .channel(
          "offers-live"
        )
        .on(
          "postgres_changes",
          {
            event: "INSERT",
            schema: "public",
            table: "offers",
          },
          () => {

            showNotify(
              "Новое предложение"
            );
          }
        )
        .subscribe();

    const requests =
      supabase
        .channel(
          "requests-live"
        )
        .on(
          "postgres_changes",
          {
            event: "UPDATE",
            schema: "public",
            table: "requests",
          },
          () => {

            showNotify(
              "Статус обновлён"
            );
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        offers
      );

      supabase.removeChannel(
        requests
      );
    };

  }, []);

  function showNotify(
    text:string
  ) {

    setNotify(text);

    setTimeout(() => {
      setNotify("");
    }, 3000);
  }

  function active(path:string) {

    if (
      pathname === path ||
      pathname.startsWith(path + "/")
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

      {/* NOTIFY */}

      {notify && (

        <div className={styles.notify}>
          {notify}
        </div>
      )}

      {/* BURGER OVERLAY */}

      {menuOpen && (

        <div
          className={styles.menuOverlay}
          onClick={() =>
            setMenuOpen(false)
          }
        />
      )}

      {/* SIDE MENU */}

      {menuOpen && (

        <aside className={styles.sideMenu}>

          <div className={styles.menuTop}>

            <h2 className={styles.menuTitle}>
              Меню
            </h2>

            <button
              className={styles.closeBtn}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              ✕
            </button>

          </div>

          <div className={styles.menuLinks}>

            <Link
              href="/dashboard"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              🏠 Главная
            </Link>

            <Link
              href="/dashboard/requests"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              📄 Заявки
            </Link>

            <Link
              href="/dashboard/offers"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              💶 Предложения
            </Link>

            <Link
              href="/dashboard/orders"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              📦 Заказы
            </Link>

            <Link
              href="/dashboard/garage"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              🚘 Гараж
            </Link>

            <Link
              href="/dashboard/profile"
              className={styles.menuLink}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              👤 Профиль
            </Link>

          </div>

        </aside>
      )}

      {/* HEADER */}

      <header className={styles.header}>

        <div className={styles.headerTop}>

          <div className={styles.headerLeft}>

            <img
              src="/logo-final.png"
              alt="logo"
              className={styles.logo}
            />

          </div>

          <div className={styles.icons}>

            <button
              className={styles.iconBtn}
              onClick={() =>
                showNotify(
                  "Новых уведомлений нет"
                )
              }
            >
              🔔
            </button>

            <button
              className={styles.iconBtn}
              onClick={() =>
                setMenuOpen(true)
              }
            >
              ☰
            </button>

          </div>

        </div>

      </header>

      {/* CONTENT */}

      {children}

      {/* NAVIGATION */}

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