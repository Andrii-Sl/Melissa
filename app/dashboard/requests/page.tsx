"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function RequestsPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadRequests();

    const channel =
      supabase
        .channel("client-requests")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"requests",
          },
          () => {
            loadRequests();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, []);

  async function loadRequests() {

    try {

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      let phone =
        session?.user?.phone;

      /* COOKIE AUTOLOGIN */

      if (!phone) {

        const phoneCookie =
          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "client_phone="
              )
            )
            ?.split("=")[1];

        if (phoneCookie)
          phone = phoneCookie;
      }

      /* TEST CLIENT */

      if (!phone) {

        const role =
          document.cookie.includes(
            "role=client"
          );

        if (role)
          phone =
            "+48519000000";
      }

      if (!phone) {

        setRequests([]);

        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("requests")
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if (error) {

        console.error(error);

        setRequests([]);

      } else {

        setRequests(data || []);
      }

    } catch (error) {

      console.error(error);

      setRequests([]);

    } finally {

      setLoading(false);
    }
  }

  async function deleteRequest(
    id:number
  ) {

    const confirmDelete =
      confirm(
        "Удалить заявку?"
      );

    if (!confirmDelete)
      return;

    try {

      const {
        error,
      } =
        await supabase
          .from("requests")
          .delete()
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка удаления"
        );

        return;
      }

      setRequests(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  if (loading)
    return (
      <div className={styles.loading}>
        Загрузка...
      </div>
    );

  return (

    <main className={styles.page}>

      {/* HERO */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Заявки
        </h1>

        <p className={styles.phone}>
          Всего:
          {" "}
          {requests.length}
        </p>

      </section>

      {/* REQUESTS */}

      <section className={styles.section}>

        {requests.length === 0 && (

          <div className={styles.card}>

            <strong>
              Пока нет заявок
            </strong>

          </div>
        )}

        {requests.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <div className={styles.sectionTop}>

              <strong>
                {item.part_name || "Деталь"}
              </strong>

              <button
                onClick={() =>
                  deleteRequest(
                    item.id
                  )
                }
                style={{
                  border:"none",
                  background:"none",
                  fontSize:"18px",
                  cursor:"pointer",
                }}
              >
                🗑️
              </button>

            </div>

            <p>
              VIN:
              {" "}
              {item.vin || "—"}
            </p>

            <p>
              Автомобиль:
              {" "}
              {item.car || "—"}
            </p>

            <div className={styles.badge}>
              {item.status || "NEW"}
            </div>

          </div>
        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            🏠
          </div>

          <span>
            Главная
          </span>

        </Link>

        <Link
          href="/dashboard/requests"
          className={`${styles.navItem} ${styles.navItemActive}`}
        >

          <div className={styles.navIcon}>
            📄
          </div>

          <span>
            Заявки
          </span>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            💶
          </div>

          <span>
            Предложения
          </span>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>

        </Link>

      </nav>

    </main>
  );
}