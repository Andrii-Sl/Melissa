import Menu from "@/components/Menu";
import Footer from "@/components/Footer";
import styles from "../../schedule/schedule.module.css";

export default function EnSchedulePage() {
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
              DELIVERY SCHEDULE
            </div>

            <h1>
              Delivery from Europe
            </h1>

            <p>
              Logistics and delivery process.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.card}>
            <h2>Kazakhstan</h2>
            <p>
              Delivery via Almaty warehouse,
              then courier across the country.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Timeline</h2>

            <div className={styles.timeline}>
              <div className={styles.step}>
                <span>1</span>
                <div>
                  <strong>Thursday</strong>
                  <p>Orders collected</p>
                </div>
              </div>

              <div className={styles.step}>
                <span>2</span>
                <div>
                  <strong>Shipment</strong>
                  <p>Orders dispatched</p>
                </div>
              </div>

              <div className={styles.step}>
                <span>3</span>
                <div>
                  <strong>Next week</strong>
                  <p>Delivery</p>
                </div>
              </div>
            </div>

          </div>

          <div className={styles.card}>
            <h2>Delivery time</h2>
            <p>Average: 7 days</p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}