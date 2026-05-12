"use client";

import styles from "@/app/dashboard/dashboard.module.css";

export default function TopBar() {

  return (

    <header className={styles.topBar}>

      <div className={styles.topBarLeft}>

        <div className={styles.topLogo}>
          L
        </div>

        <div>

          <h2 className={styles.topTitle}>
            Lynko
          </h2>

          <p className={styles.topSubtitle}>
            Клиентский кабинет
          </p>

        </div>

      </div>

      <button className={styles.burgerButton}>
        ☰
      </button>

    </header>
  );
}