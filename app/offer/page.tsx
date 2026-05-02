import styles from "./offer.module.css";

export default function OfferPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <div className={styles.rightSide}>
            <button className={styles.burger}>☰</button>

            <a href="/" className={styles.homeBtn}>
              На главную
            </a>
          </div>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.card}>

            <div className={styles.photoWrap}>
              <img
                src="/part.jpg"
                alt="Деталь"
                className={styles.photo}
              />
            </div>

            <div className={styles.info}>

              <div className={styles.label}>
                НАЙДЕНА ДЕТАЛЬ
              </div>

              <h1>
                Тормозной диск передний
              </h1>

              <p><strong>Каталожный номер:</strong> 0986479A12</p>

              <p><strong>Альтернативные номера:</strong></p>

              <ul>
                <li>ATE 24.0125-0154.1</li>
                <li>TRW DF6789</li>
                <li>Zimmermann 100.1234.20</li>
              </ul>

              <p><strong>Подходит на модели:</strong></p>

              <ul>
                <li>Audi A6 C7</li>
                <li>Audi A7</li>
                <li>VW Passat B8</li>
              </ul>

              <a href="/login" className={styles.authBtn}>
                ПРОЙТИ АВТОРИЗАЦИЮ
              </a>

              <div className={styles.meta}>
                <div>Стоимость: —</div>
                <div>Наличие: —</div>
              </div>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}