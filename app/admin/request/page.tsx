"use client";

import Link from "next/link";
import styles from "../admin.module.css";

export default function AdminRequestsPage() {

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Заявки
          </h1>

          <p className={styles.subtitle}>
            Все запросы клиентов
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              BMW G30
            </strong>

            <span className={styles.badge}>
              NEW
            </span>

          </div>

          <p>
            Масляный фильтр
          </p>

          <small>
            VIN: WBA5R510...
          </small>

        </div>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              Audi A6 C8
            </strong>

            <span className={styles.badgeBlue}>
              OFFER
            </span>

          </div>

          <p>
            Тормозные колодки
          </p>

          <small>
            VIN: WAUZZZF20...
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
          className={`${styles.navItem} ${styles.active}`}
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