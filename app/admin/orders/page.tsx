"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

    const channel =
      supabase
        .channel("live-admin-orders")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"orders",
          },
          () => {
            loadOrders();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  async function loadOrders() {

    const {
      data,
    } =
      await supabase
        .from("orders")
        .select("*")
        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setOrders(data || []);

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
            Заказы
          </h1>

          <p className={styles.subtitle}>
            Все заказы клиентов
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* ORDERS */}

      <section className={styles.section}>

        {orders.length === 0 && (

          <div className={styles.requestCard}>

            <p>
              Заказов пока нет
            </p>

          </div>
        )}

        {orders.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                Заказ #{item.id}
              </strong>

              <span className={styles.badge}>
                {item.status || "NEW"}
              </span>

            </div>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <small>
              Track: {item.track_number || "—"}
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
          className={styles.navItem}
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
          className={`${styles.navItem} ${styles.navItemActive}`}
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