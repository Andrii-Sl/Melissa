"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [user, setUser] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      /* 🔥 TEST LOGIN */

      const fakeAuth =
        localStorage.getItem(
          "fakeAuth"
        );

      if (fakeAuth === "true") {

        setUser({
          phone:
            "MASTER",
        });

        setProfile({
          full_name:
            "Владелец",
          phone:
            "MASTER ACCESS",
        });

        const {
          data: r,
        } =
          await supabase
            .from("requests")
            .select("*")
            .order("id", {
              ascending:
                false,
            });

        setOrders(r || []);

        setLoading(false);

        return;
      }

      /* 🔥 MASTER ACCESS */

      const urlParams =
        new URLSearchParams(
          window.location.search
        );

      const master =
        urlParams.get(
          "master"
        );

      if (
        master ===
        "1424"
      ) {

        setUser({
          phone:
            "MASTER",
        });

        setProfile({
          full_name:
            "Владелец",
          phone:
            "MASTER ACCESS",
        });

        const {
          data: r,
        } =
          await supabase
            .from("requests")
            .select("*")
            .order("id", {
              ascending:
                false,
            });

        setOrders(r || []);

        setLoading(false);

        return;
      }

      /* 🔥 NORMAL LOGIN */

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      console.log(
        "SESSION:",
        session
      );

      if (!session) {

        window.location.href =
          "/login";

        return;
      }

      const currentUser =
        session.user;

      setUser(currentUser);

      /* PROFILE */

      const {
        data: p,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .maybeSingle();

      setProfile(p);

      /* REQUESTS */

      const {
        data: r,
      } =
        await supabase
          .from("requests")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .order("id", {
            ascending:
              false,
          });

      setOrders(r || []);

      setLoading(false);

    } catch (e) {

      console.error(e);

      setLoading(false);
    }
  }

  /* LOGOUT */

  async function logout() {

    localStorage.removeItem(
      "fakeAuth"
    );

    await supabase.auth.signOut();

    window.location.href =
      "/";
  }

  /* STATUS */

  function getStatus(
    status: string
  ) {

    if (
      status ===
      "new"
    )
      return "🟡 Подбор";

    if (
      status ===
      "found"
    )
      return "🟢 Найдено";

    if (
      status ===
      "payment"
    )
      return "🔵 Ожидает оплаты";

    if (
      status ===
      "shipping"
    )
      return "🟣 В пути";

    if (
      status ===
      "done"
    )
      return "✅ Доставлено";

    return status;
  }

  /* LOADING */

  if (loading) {

    return (
      <main className={styles.page}>
        <section className={styles.wrap}>
          Загрузка...
        </section>
      </main>
    );
  }

  /* PAGE */

  return (
    <main className={styles.page}>

      <section className={styles.wrap}>

        {/* TOP */}

        <div className={styles.top}>

          <div>

            <div className={styles.label}>
              ЛИЧНЫЙ КАБИНЕТ
            </div>

            <h1 className={styles.title}>
              {profile?.full_name ||
                "Клиент"}
            </h1>

            <p className={styles.phone}>
              {profile?.phone ||
                user?.phone ||
                ""}
            </p>

          </div>

          <button
            onClick={logout}
            className={styles.logout}
          >
            Выйти
          </button>

        </div>

        {/* REQUESTS */}

        <div className={styles.list}>

          {orders.map(
            (item) => (

              <a
                key={item.id}
                href={`/dashboard/request/${item.id}`}
                className={styles.card}
              >

                <strong>
                  Заявка #
                  {item.id}
                </strong>

                <p>
                  {item.part_name ||
                    item.vin ||
                    "Запрос"}
                </p>

                <span>
                  {getStatus(
                    item.status
                  )}
                </span>

              </a>
            )
          )}

          {/* EMPTY */}

          {orders.length ===
            0 && (

            <div
              className={
                styles.empty
              }
            >
              У вас пока нет заявок
            </div>

          )}

        </div>

      </section>

    </main>
  );
}