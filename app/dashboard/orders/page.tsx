"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

    const channel =
      supabase
        .channel("client-orders")
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

      supabase.removeChannel(
        channel
      );
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

  function getStatusClass(
    status:string
  ) {

    if (status === "DELIVERED")
      return styles.badgeGreen;

    if (status === "SHIPPED")
      return styles.badgeBlue;

    return styles.badge;
  }

  function getStatusText(
    status:string
  ) {

    if (status === "DELIVERED")
      return "Доставлен";

    if (status === "SHIPPED")
      return "Отправлен";

    if (status === "PROCESS")
      return "В обработке";

    return "Новый";
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
          Заказы
        </h1>

        <p className={styles.phone}>
          Всего:
          {" "}
          {orders.length}
        </p>

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        {orders.length === 0 && (

          <div className={styles.card}>

            <strong>
              Пока нет заказов
            </strong>

          </div>
        )}

        {orders.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              Заказ #{item.id}
            </strong>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <p>
              Track:
              {" "}
              {item.track_number || "—"}
            </p>

            <div
              className={
                getStatusClass(
                  item.status
                )
              }
            >
              {
                getStatusText(
                  item.status
                )
              }
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