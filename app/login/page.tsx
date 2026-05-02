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

      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>

            <div className={styles.titleMini}>
              ДОБРО ПОЖАЛОВАТЬ
            </div>

            <h1>Вход в личный кабинет</h1>

            <p>
              Управляйте заявками, заказами и статусами
              в одном месте.
            </p>

            <input type="email" placeholder="E-mail" />
            <input type="password" placeholder="Пароль" />

            <button className={styles.loginBtn}>
              ВОЙТИ
            </button>

            <div className={styles.links}>
              <a href="#">Регистрация</a>
              <a href="#">Забыли пароль?</a>
            </div>

          </div>

        </div>
      </section>

    </main>
  );
}