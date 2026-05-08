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

  const [notifyOpen, setNotifyOpen] =
    useState(false);

  function showNotify(
    text:string
  ) {

    setNotify(text);

    setTimeout(() => {
      setNotify("");
    }, 3000);
  }

  useEffect(() => {

    const offers =
      supabase
        .channel(
          "offers-live"
        )
        .on(
          "postgres_changes",
          {
            event:"INSERT",
            schema:"public",
            table:"offers",
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
            event:"UPDATE",
            schema:"public",
            table:"requests",
          },
          () => {

            showNotify(
              "Статус заявки обновлён"
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

      {/* PUSH */}

      {notify && (

        <div className={styles.notify}>
          {notify}
        </div>
      )}

      {/* OVERLAY */}

      {(menuOpen || notifyOpen) && (

        <div
          className={styles.menuOverlay}
          onClick={() => {

            setMenuOpen(false);
            setNotifyOpen(false);
          }}
        />
      )}

      {/* NOTIFICATIONS */}

      {notifyOpen && (

        <aside className={styles.sideMenu}>

          <div className={styles.menuTop}>

            <h2 className={styles.menuTitle}>
              Уведомления
            </h2>

            <button
              className={styles.closeBtn}
              onClick={() =>
                setNotifyOpen(false)
              }
            >
              ✕
            </button>

          </div>

          <div className={styles.menuLinks}>

            <div className={styles.notifyCard}>
              💶 Новое предложение
            </div>

            <div className={styles.notifyCard}>
              📄 Заявка обработана
            </div>

            <div className={styles.notifyCard}>
              📦 Заказ отправлен
            </div>

          </div>

        </aside>
      )}

      {/* BURGER */}

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

            <button
              className={styles.logoutBtn}
              onClick={async () => {

                await supabase.auth.signOut();

                window.location.href =
                  "/";
              }}
            >
              🚪 Выйти
            </button>

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
                setNotifyOpen(true)
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

      {/* BOTTOM NAV */}

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