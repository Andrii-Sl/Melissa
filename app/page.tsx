import Link from "next/link";
import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <img
          src="/logo-final.png"
          alt="logo"
          className={styles.logo}
        />

        <Link
          href="/login"
          className={styles.cabinet}
        >
          Кабинет
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.overlay}>

          <p className={styles.top}>
            ОРИГИНАЛЬНЫЕ ЗАПЧАСТИ ИЗ ЕВРОПЫ
          </p>

          <h1 className={styles.title}>
            Подбор запчастей
            <br />
            по VIN-коду
          </h1>

          <p className={styles.desc}>
            Audi, BMW, Mercedes-Benz,
            Volkswagen, Porsche и другие.
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
            payments
          </div>

        </div>

      </section>

    </main>
  );
}