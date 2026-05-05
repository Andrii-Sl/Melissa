import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "./schedule.module.css";

export default function SchedulePage() {
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
            <div className={styles.label}>РАСПИСАНИЕ</div>

            <h1>Поставки из Европы</h1>

            <p>Логистика и сроки доставки</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}