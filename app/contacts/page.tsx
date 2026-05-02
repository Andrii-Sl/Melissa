import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
import styles from "./contacts.module.css";

export default function ContactsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

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
              КОНТАКТЫ
            </div>

            <h1>
              Свяжитесь с нами
              <br />
              удобным способом
            </h1>

            <p>
              Консультации, подбор деталей,
              сопровождение заказа и поддержка.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>Телефон</h3>
              <p>+49 000 000 0000</p>
            </div>

            <div className={styles.card}>
              <h3>WhatsApp</h3>
              <p>+49 000 000 0000</p>
            </div>

            <div className={styles.card}>
              <h3>Telegram</h3>
              <p>@autopartseu</p>
            </div>

            <div className={styles.card}>
              <h3>E-mail</h3>
              <p>info@autoparts-eu.com</p>
            </div>

            <div className={styles.card}>
              <h3>Время работы</h3>
              <p>Пн–Пт: 09:00 – 18:00</p>
            </div>

            <div className={styles.card}>
              <h3>Регионы работы</h3>
              <p>ЕС / Украина / СНГ</p>
            </div>

          </div>

          <div className={styles.claim}>
            <div className={styles.claimLabel}>
              РЕКЛАМАЦИЯ / ГАРАНТИЯ
            </div>

            <h2>
              Обращение по гарантии
              или возврату
            </h2>

            <p>
              Для рассмотрения заявки
              отправьте номер заказа,
              фото детали и описание
              проблемы.
            </p>

            <div className={styles.claimMail}>
              claims@autoparts-eu.com
            </div>

            <div className={styles.note}>
              Срок подачи обращения —
              до 14 дней после получения.
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}