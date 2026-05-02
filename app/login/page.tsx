import styles from "./login.module.css";
import Link from "next/link";

export default function LoginPage() {
  return (
    <main className={styles.page}>

      {/* HEADER */}
      <header className={styles.header}>
        <div className={styles.container}>

          <Link href="/" className={styles.logoWrap}>
            <img
              src="/logo.svg"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </Link>

          <Link href="/" className={styles.backBtn}>
            На главную
          </Link>

        </div>
      </header>

      {/* BODY */}
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>

            <div className={styles.titleMini}>
              ДОБРО ПОЖАЛОВАТЬ
            </div>

            <h1>
              Вход в личный кабинет
            </h1>

            <p>
              Управляйте заявками, заказами
              и статусами в одном месте.
            </p>

            <input
              type="email"
              placeholder="E-mail"
            />

            <input
              type="password"
              placeholder="Пароль"
            />

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