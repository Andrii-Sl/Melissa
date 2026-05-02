"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session }
    } = await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    setEmail(session.user.email || "");
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

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

          <div className={styles.rightSide}>
            <span className={styles.userMail}>
              {email}
            </span>

            <button
              onClick={logout}
              className={styles.logoutBtn}
            >
              Выйти
            </button>
          </div>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ЛИЧНЫЙ КАБИНЕТ
          </div>

          <h1>Здравствуйте</h1>

          <p className={styles.text}>
            Здесь будут ваши заявки,
            статусы и история заказов.
          </p>

          <a href="/offer" className={styles.newBtn}>
            + Новый запрос
          </a>

        </div>
      </section>
    </main>
  );
}