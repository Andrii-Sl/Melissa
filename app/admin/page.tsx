"use client";

import styles from "./admin.module.css";

export default function AdminPage() {

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Admin Dashboard
          </h1>

          <p className={styles.subtitle}>
            AutoParts EU
          </p>

        </div>

        <button className={styles.profileBtn}>
          👤
        </button>

      </header>

      {/* STATS */}

      <section className={styles.stats}>

        <div className={styles.card}>
          <span className={styles.cardIcon}>
            📄
          </span>

          <strong>
            24
          </strong>

          <p>
            Новые заявки
          </p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcon}>
            💶
          </span>

          <strong>
            18
          </strong>

          <p>
            Предложения
          </p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcon}>
            📦
          </span>

          <strong>
            12
          </strong>

          <p>
            Заказы
          </p>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcon}>
            ✅
          </span>

          <strong>
            143
          </strong>

          <p>
            Выполнено
          </p>
        </div>

      </section>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Последние заявки
          </h2>

          <button className={styles.viewAll}>
            Все
          </button>

        </div>

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

      {/* FLOAT BUTTON */}

      <button className={styles.fab}>
        +
      </button>

    </main>
  );
}