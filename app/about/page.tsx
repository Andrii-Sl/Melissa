import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <button className={styles.burger}>
            ☰
          </button>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a
            href="/dashboard"
            className={styles.loginBtn}
          >
            Кабинет
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>
              О КОМПАНИИ
            </div>

            <h1>
              Надёжные поставки
              <br />
              автозапчастей
              <br />
              из Европы
            </h1>

            <p>
              Мы подбираем оригинальные детали и
              качественные аналоги для европейских
              автомобилей с прямыми поставками от
              проверенных партнёров.
            </p>
          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>Что мы делаем</h3>
              <p>
                Подбор деталей по VIN, OEM номеру
                или запросу клиента.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Почему нам доверяют</h3>
              <p>
                Проверенные поставщики,
                прозрачные сроки и поддержка
                клиента на каждом этапе.
              </p>
            </div>

            <div className={styles.card}>
              <h3>География поставок</h3>
              <p>
                Германия, Польша, Литва,
                Нидерланды и другие страны ЕС.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Наша цель</h3>
              <p>
                Сделать заказ автозапчастей
                простым, быстрым и выгодным.
              </p>
            </div>

          </div>

        </div>
      </section>
    </main>
  );
}