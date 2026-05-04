"use client";

import styles from "../../page.module.css";

export default function EnSchedule() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <h1>Delivery Schedule</h1>

            <p>
              Deliveries are made weekly from European suppliers.
              Exact timing depends on product availability.
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}