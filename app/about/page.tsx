import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "./about.module.css";

export default function AboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

          <a href="/" className={styles.logoWrap}>
            <img src="/logo-final.png" alt="AutoParts EU" className={styles.logoImg} />
          </a>

          <a href="/dashboard" className={styles.loginBtn}>
            Кабинет
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>О КОМПАНИИ</div>

            <h1>
              Надёжные поставки
              <br />
              автозапчастей
              <br />
              из Европы
            </h1>

            <p>
              Мы подбираем оригинальные детали
              и качественные аналоги.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}