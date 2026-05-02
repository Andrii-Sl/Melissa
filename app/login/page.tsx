import styles from "./login.module.css";

export default function LoginPage() {
  return (
    <main className={styles.page}>

      <header className={styles.header}>
        <div className={styles.container}>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <a href="/" className={styles.backBtn}>
            На главную
          </a>

        </div>
      </header>

    </main>
  );
}