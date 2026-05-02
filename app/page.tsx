import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.container}>
          <Link href="/" className={styles.logoWrap}>
            <Image
              src="/logo.svg"
              alt="AutoParts EU"
              width={210}
              height={58}
              priority
            />
          </Link>

          <div className={styles.rightSide}>
            <button className={styles.burger}>☰</button>

            <Link href="/login" className={styles.loginBtn}>
              Кабинет
            </Link>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.heroBox}>

            <div className={styles.miniTitle}>
              ПОДБОР ПО VIN И НОМЕРУ ДЕТАЛИ
            </div>

            <h1>
              Автозапчасти
              <br />
              из Европы
            </h1>

            <p>
              Оригинальные детали и качественные аналоги
              для европейских автомобилей.
            </p>

            <div className={styles.trustRow}>
              <span>✔ Подбор по VIN</span>
              <span>✔ Поставщики Европы</span>
              <span>✔ Гарантия качества</span>
            </div>

            <input placeholder="VIN или номер детали" />

            <input placeholder="Телефон / WhatsApp" />

            <button className={styles.cta}>
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </button>

            <div className={styles.socials}>
              <a href="#">WhatsApp</a>
              <a href="#">Telegram</a>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}