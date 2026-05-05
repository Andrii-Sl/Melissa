import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "./how.module.css";

export default function HowPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

          <a href="/" className={styles.logoWrap}>
            <img src="/logo-final.png" className={styles.logoImg} />
          </a>

          <a href="/dashboard" className={styles.loginBtn}>
            Кабинет
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>КАК ЭТО РАБОТАЕТ</div>

            <h1>Простой процесс заказа</h1>

            <p>От запроса до доставки.</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}