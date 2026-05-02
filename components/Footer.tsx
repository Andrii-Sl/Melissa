import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>

        <div className={styles.top}>

          <div>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logo}
            />

            <p className={styles.text}>
              Поставка автозапчастей из Европы.
              Оригинальные детали и качественные аналоги.
            </p>
          </div>

          <div className={styles.col}>
            <h4>Навигация</h4>
            <a href="/">Главная</a>
            <a href="/about">О компании</a>
            <a href="/how-it-works">
              Как работает сервис
            </a>
            <a href="/schedule">
              Расписание поставок
            </a>
            <a href="/contacts">
              Контакты
            </a>
          </div>

          <div className={styles.col}>
            <h4>Контакты</h4>
            <a href="tel:+490000000000">
              +49 000 000 0000
            </a>
            <a href="mailto:info@autoparts-eu.com">
              info@autoparts-eu.com
            </a>
            <span>Пн–Пт: 09:00–18:00</span>
          </div>

        </div>

        <div className={styles.bottom}>
          © 2026 AutoParts EU. All rights reserved.
        </div>

      </div>
    </footer>
  );
}