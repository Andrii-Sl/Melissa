import styles from "./page.module.css";

export default function HomePage() {
  return (
    <main className={styles.page}>
      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.container}>
          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <div className={styles.rightSide}>
            <button className={styles.burger}>
              ☰
            </button>

            <a href="/login" className={styles.loginBtn}>
              Кабинет
            </a>
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

            <input
              type="text"
              placeholder="VIN или номер детали"
            />

            <input
              type="text"
              placeholder="Телефон / WhatsApp"
            />

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