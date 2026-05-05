import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "../../about/about.module.css";

export default function EnAboutPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

          <a href="/en" className={styles.logoWrap}>
            <img src="/logo-final.png" className={styles.logoImg} />
          </a>

          <a href="/dashboard" className={styles.loginBtn}>
            Account
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>
            <div className={styles.label}>ABOUT</div>

            <h1>Auto parts from Europe</h1>

            <p>Reliable supply and support</p>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}