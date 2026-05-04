"use client";

import styles from "../../page.module.css";

export default function EnContacts() {
  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <h1>Contacts</h1>

            <p>
              Phone / WhatsApp: +48 XXX XXX XXX  
              Email: info@autoparts-eu.com  
            </p>

          </div>
        </div>
      </section>
    </main>
  );
}