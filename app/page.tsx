import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <button className={styles.burger}>
          ☰
        </button>

        <div className={styles.logoWrap}>
          <img
            src="/logo-final.png"
            alt="logo"
            className={styles.logo}
          />
        </div>

        <Link
          href="/login"
          className={styles.cabinet}
        >
          Кабинет
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.overlay}>

          <p className={styles.small}>
            ОРИГИНАЛЬНЫЕ
            ЗАПЧАСТИ ИЗ ЕВРОПЫ
          </p>

          <h1 className={styles.title}>
            Подбор запчастей
            <br />
            по VIN-коду
          </h1>

          <p className={styles.desc}>
            Audi, BMW,
            Mercedes-Benz,
            Volkswagen,
            Porsche и другие.
          </p>

          <form
            action="/passport"
            className={styles.form}
          >
            <input
              name="vin"
              placeholder="Введите VIN код"
              className={styles.input}
            />

            <input
              name="phone"
              placeholder="+77001234567"
              className={styles.input}
            />

            <button
              className={styles.button}
            >
              Получить предложение
            </button>
          </form>

          <div className={styles.payments}>
            <img src="/visa.png" />
            <img src="/mc.png" />
            <img src="/paypal.png" />
          </div>

        </div>

      </section>

      <section className={styles.bottom}>

        <div className={styles.box}>
          <h3>Гарантия</h3>
          <p>
            Только проверенные
            поставщики ЕС
          </p>
        </div>

        <div className={styles.box}>
          <h3>Доставка</h3>
          <p>
            Авиа / Авто /
            Экспресс
          </p>
        </div>

        <div className={styles.box}>
          <h3>Поддержка</h3>
          <p>
            WhatsApp 24/7
          </p>
        </div>

      </section>

    </main>
  );
}