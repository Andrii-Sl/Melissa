import Menu from "../../components/Menu";
import Footer from "../../components/Footer";
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

          <a
            href="/dashboard"
            className={styles.loginBtn}
          >
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
              Order deliveries
              <br />
              from Europe
            </h1>

            <p>
              Current logistics process,
              delivery flow and timing
              across Kazakhstan.
            </p>

          </div>
        </div>
      </section>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.card}>
            <h2>Kazakhstan — all cities</h2>

            <p>
              Delivery is made to a customs warehouse
              in Almaty, then shipped via courier
              to any address in the country.
            </p>
          </div>

          <div className={styles.card}>
            <h2>Delivery timeline</h2>

            <div className={styles.timeline}>

              <div className={styles.step}>
                <span>1</span>

                <div>
                  <strong>
                    Thursday – Thursday
                  </strong>

                  <p>
                    Order pool is open
                    for the current shipment cycle.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <span>2</span>

                <div>
                  <strong>
                    Thursday
                  </strong>

                  <p>
                    Paid orders are processed,
                    prepared, and shipped
                    to Kazakhstan.
                  </p>
                </div>
              </div>

              <div className={styles.step}>
                <span>3</span>

                <div>
                  <strong>
                    Wednesday (next week)
                  </strong>

                  <p>
                    After customs clearance,
                    orders are delivered by courier
                    across Kazakhstan.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <div className={styles.card}>
            <h2>Delivery time</h2>

            <p>
              Average delivery time —
              <strong> 7 days </strong>
              from dispatch
              from the warehouse in Poland.
            </p>

            <p>
              Items not available in stock
              are processed individually.
            </p>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}