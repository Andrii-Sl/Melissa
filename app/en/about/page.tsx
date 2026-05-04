"use client";

import styles from "../../page.module.css";

export default function EnAbout() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <h1>About Company</h1>

            <p>
              We supply original and aftermarket auto parts
              from Europe. Our service helps you find the
              right parts using VIN or part number.
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}