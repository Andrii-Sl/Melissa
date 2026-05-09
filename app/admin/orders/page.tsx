"use client";

import Link from "next/link";
import styles from "../admin.module.css";

export default function AdminOffersPage() {

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Предложения
          </h1>

          <p className={styles.subtitle}>
            Все предложения поставщиков
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              BMW Original
            </strong>

            <span className={styles.badgeBlue}>
              €120
            </span>

          </div>

          <p>
            Масляный фильтр
          </p>

          <small>
            Доставка: 2-4 дня
          </small>

        </div>

        <div className={styles.requestCard}>

          <div className={styles.requestTop}>

            <strong>
              Bosch
            </strong>

            <span className={styles.badgeBlue}>
              €85
            </span>

          </div>

          <p>
            Тормозные колодки
          </p>

          <small>
            В наличии
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
          className={`${styles.navItem} ${styles.active}`}
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