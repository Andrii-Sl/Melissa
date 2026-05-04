import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "../../contacts/contacts.module.css";

export default function EnContactsPage() {
  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <Menu />

          <a href="/en" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a href="/dashboard" className={styles.loginBtn}>
            Account
          </a>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroInner}>

            <div className={styles.label}>
              CONTACTS
            </div>

            <h1>
              Contact us
            </h1>

            <p>
              We are ready to help you.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>Phone</h3>
              <p>+49 000 000 0000</p>
            </div>

            <div className={styles.card}>
              <h3>Email</h3>
              <p>info@autoparts-eu.com</p>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}