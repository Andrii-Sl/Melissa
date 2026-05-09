"use client";

import Link from "next/link";
import styles from "../admin.module.css";

export default function AdminOrdersPage() {

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Заказы
          </h1>

          <p className={styles.subtitle}>
            Активные заказы клиентов
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              Order #1024
            </strong>

            <span className={styles.badge}>
              NEW
            </span>

          </div>

          <p>
            BMW Original Filter
          </p>

          <small>
            Tracking: EU4839201
          </small>

        </div>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              Order #1025
            </strong>

            <span className={styles.badgeBlue}>
              SENT
            </span>

          </div>

          <p>
            Bosch Brake Pads
          </p>

          <small>
            Tracking: EU4839202
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
          className={`${styles.navItem} ${styles.active}`}
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