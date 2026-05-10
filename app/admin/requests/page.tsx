"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminRequestsPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadRequests();

    const channel =
      supabase
        .channel("live-admin-requests")
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
      supabase.removeChannel(channel);
    };

  }, []);

  async function loadRequests() {

    const {
      data,
    } =
      await supabase
        .from("requests")
        .select("*")
        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setRequests(data || []);

    setLoading(false);
  }

  if (loading)
    return (
      <div className={styles.loading}>
        Загрузка...
      </div>
    );

  return (

    <main className={styles.page}>

      {/* HEADER */}

      <header className={styles.header}>

        <div>

          <h1 className={styles.title}>
            Заявки
          </h1>

          <p className={styles.subtitle}>
            Все запросы клиентов
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* REQUESTS */}

      <section className={styles.section}>

        {requests.length === 0 && (

          <div className={styles.requestCard}>

            <p>
              Заявок пока нет
            </p>

          </div>
        )}

        {requests.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.car || "Автомобиль"}
              </strong>

              <span className={styles.badge}>
                {item.status || "NEW"}
              </span>

            </div>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <small>
              VIN: {item.vin || "—"}
            </small>

          </div>
        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/admin"
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
          href="/admin/requests"
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
          href="/admin/offers"
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
          href="/admin/orders"
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