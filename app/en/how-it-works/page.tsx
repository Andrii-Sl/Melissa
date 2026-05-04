"use client";

import styles from "../../page.module.css";

export default function EnHow() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <h1>How It Works</h1>

            <p>
              1. Enter VIN or part number  
              2. Send request  
              3. Get offer in your account  
              4. Confirm and receive delivery  
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}