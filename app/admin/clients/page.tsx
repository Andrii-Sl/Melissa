"use client";

import Link from "next/link";
import styles from "../admin.module.css";

export default function AdminClientsPage() {

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Клиенты
          </h1>

          <p className={styles.subtitle}>
            База клиентов AutoParts EU
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* CLIENTS */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              Andrii Slynko
            </strong>

            <span className={styles.badgeBlue}>
              VIP
            </span>

          </div>

          <p>
            +48 519 000 000
          </p>

          <small>
            Slovenia, Ljubljana
          </small>

        </div>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              John Smith
            </strong>

            <span className={styles.badge}>
              NEW
            </span>

          </div>

          <p>
            +49 152 123 45 67
          </p>

          <small>
            Germany, Berlin
          </small>

        </div>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/admin"
          className={styles.navItem}
        >

          <span>
            🏠
          </span>

          <p>
            Главная
          </p>

        </Link>

        <Link
          href="/admin/requests"
          className={styles.navItem}
        >

          <span>
            📄
          </span>

          <p>
            Заявки
          </p>

        </Link>

        <Link
          href="/admin/offers"
          className={styles.navItem}
        >

          <span>
            💶
          </span>

          <p>
            Предложения
          </p>

        </Link>

        <Link
          href="/admin/orders"
          className={styles.navItem}
        >

          <span>
            📦
          </span>

          <p>
            Заказы
          </p>

        </Link>

      </nav>

    </main>
  );
}