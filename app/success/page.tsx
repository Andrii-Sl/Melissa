import Footer from "../../components/Footer";
import styles from "./success.module.css";

export default function SuccessPage() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>
            <div className={styles.icon}>
              ✓
            </div>

            <div className={styles.label}>
              ЗАЯВКА ПРИНЯТА
            </div>

            <h1>
              Спасибо за обращение
            </h1>

            <p>
              Менеджер свяжется с вами
              в ближайшее время после
              обработки запроса.
            </p>

            <a
              href="/dashboard"
              className={styles.mainBtn}
            >
              Личный кабинет
            </a>

            <a
              href="https://wa.me/77000000000"
              target="_blank"
              className={styles.waBtn}
            >
              WhatsApp менеджера
            </a>

            <a
              href="/"
              className={styles.backLink}
            >
              Вернуться на главную
            </a>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}