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
    /* BUILD SAFE MASTER ACCESS */
    const urlParams =
      new URLSearchParams(
        window.location.search
      );

    const master =
      urlParams.get(
        "master"
      );

    /* MASTER MODE */
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
          .from(
            "requests"
          )
          .select("*")
          .order("id", {
            ascending:
              false,
          });

      setOrders(r || []);
      setLoading(false);
      return;
    }

    /* NORMAL USER MODE */
    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    if (!session) {
      window.location.href =
        "/login";
      return;
    }

    const currentUser =
      session.user;

    setUser(currentUser);

    const {
      data: p,
    } =
      await supabase
        .from(
          "profiles"
        )
        .select("*")
        .eq(
          "user_id",
          currentUser.id
        )
        .maybeSingle();

    setProfile(p);

    const {
      data: r,
    } =
      await supabase
        .from(
          "requests"
        )
        .select("*")
        .eq(
          "user_id",
          currentUser.id
        )
        .order("id", {
          ascending:
            false,
        });

    setOrders(r || []);
    setLoading(false);
  }

  async function logout() {
    await supabase.auth.signOut();

    window.location.href =
      "/";
  }

  if (loading) {
    return (
      <main className={styles.page}>
        <section className={styles.wrap}>
          Загрузка...
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>
      <section className={styles.wrap}>

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
                  {item.status}
                </span>
              </a>
            )
          )}

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