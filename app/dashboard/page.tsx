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

  const requests = [
    {
      id: 1045,
      part: "Audi A6 — тормозной диск",
      status: "Новый"
    },
    {
      id: 1046,
      part: "BMW X5 — масляный фильтр",
      status: "В обработке"
    },
    {
      id: 1047,
      part: "Mercedes E220 — амортизатор",
      status: "Ожидает цену"
    }
  ];

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

          <div className={styles.topRow}>
            <div>
              <h1>Мои заявки</h1>

              <p className={styles.text}>
                Нажмите на заявку для просмотра.
              </p>
            </div>

            <a
              href="/offer"
              className={styles.newBtn}
            >
              + Новый запрос
            </a>
          </div>

          <div className={styles.list}>
            {requests.map((item) => (
              <a
                key={item.id}
                href={`/dashboard/request/${item.id}`}
                className={styles.card}
              >
                <div className={styles.cardTop}>
                  <strong>
                    #{item.id}
                  </strong>

                  <span className={styles.badge}>
                    {item.status}
                  </span>
                </div>

                <div className={styles.part}>
                  {item.part}
                </div>
              </a>
            ))}
          </div>

        </div>
      </section>
    </main>
  );
}