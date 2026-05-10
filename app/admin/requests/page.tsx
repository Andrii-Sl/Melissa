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
  }, []);

  async function loadRequests() {

    const {
      data,
    } =
      await supabase
        .from("requests")
        .select("*")
        .order("id", {
          ascending:false,
        });

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
          <span>🏠</span>
          <p>Главная</p>
        </Link>

        <Link
          href="/admin/requests"
          className={`${styles.navItem} ${styles.active}`}
        >
          <span>📄</span>
          <p>Заявки</p>
        </Link>

        <Link
          href="/admin/offers"
          className={styles.navItem}
        >
          <span>💶</span>
          <p>Предложения</p>
        </Link>

        <Link
          href="/admin/orders"
          className={styles.navItem}
        >
          <span>📦</span>
          <p>Заказы</p>
        </Link>

      </nav>

    </main>
  );
}
