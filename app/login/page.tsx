import Link from "next/link";
import styles from "./login.module.css";

export const dynamic =
  "force-dynamic";

type Props = {
  searchParams: {
    request?: string;
  };
};

export default function LoginPage({
  searchParams,
}: Props) {
  const requestId =
    searchParams.request || "";

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <Link
          href="/"
          className={styles.logoWrap}
        >
          <img
            src="/logo-final.png"
            className={styles.logo}
            alt="logo"
          />

          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/"
          className={styles.homeBtn}
        >
          На главную
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.card}>

          <div className={styles.label}>
            ВХОД
          </div>

          <h1 className={styles.title}>
            Личный кабинет
          </h1>

          <p className={styles.text}>
            request id:
            {requestId}
          </p>

          <input
            className={styles.input}
            placeholder="+77001234567"
          />

          <button
            className={styles.button}
          >
            ВОЙТИ
          </button>

        </div>

      </section>

    </main>
  );
}