"use client";

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
        .channel("admin-orders")
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

  async function updateStatus(
    id:number,
    status:string
  ) {

    await supabase
      .from("orders")
      .update({
        status,
      })
      .eq("id", id);

    loadOrders();
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
            Панель администратора
          </p>

        </div>

      </header>

      {/* ORDERS */}

      <section className={styles.section}>

        {orders.length === 0 && (

          <div className={styles.requestCard}>

            <strong>
              Пока нет заказов
            </strong>

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

              <span className={styles.badgeBlue}>
                {item.status || "NEW"}
              </span>

            </div>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <small>
              Offer ID:
              {" "}
              {item.offer_id || "—"}
            </small>

            <div
              style={{
                display:"flex",
                gap:"10px",
                marginTop:"16px",
                flexWrap:"wrap",
              }}
            >

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "PROCESS"
                  )
                }
              >
                PROCESS
              </button>

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "SHIPPED"
                  )
                }
              >
                SHIPPED
              </button>

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "DELIVERED"
                  )
                }
              >
                DELIVERED
              </button>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
}