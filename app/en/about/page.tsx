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
              ABOUT COMPANY
            </div>

            <h1>
              Reliable supply
              <br />
              of auto parts
              <br />
              from Europe
            </h1>

            <p>
              We source original parts and high-quality
              aftermarket components for European vehicles,
              working directly with trusted suppliers.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>
          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>What we do</h3>
              <p>
                Selection of parts by VIN, OEM number,
                or customer request.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Why choose us</h3>
              <p>
                Trusted suppliers, transparent timelines,
                and support at every stage.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Delivery coverage</h3>
              <p>
                Delivery across Kazakhstan with forwarding
                via transport services.
              </p>
            </div>

            <div className={styles.card}>
              <h3>Our goal</h3>
              <p>
                Make ordering auto parts simple,
                fast and profitable.
              </p>
            </div>

          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}