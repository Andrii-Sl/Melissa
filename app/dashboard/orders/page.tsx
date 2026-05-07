"use client";

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
  }, []);

  async function loadOrders() {

    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    let phone =
      session?.user?.phone;

    if (!phone) {

      const role =
        document.cookie.includes(
          "role=client"
        );

      if (role)
        phone = "+48519000000";
    }

    const {
      data,
    } =
      await supabase
        .from("orders")
        .select("*")
        .eq("phone", phone)
        .order("id", {
          ascending: false,
        });

    setOrders(data || []);

    setLoading(false);
  }

  if (loading)
    return <div className={styles.loading}>Загрузка...</div>;

  return (
    <main className={styles.page}>

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Заказы</h2>
        </div>

        {orders.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              Заказ #{item.id}
            </strong>

            <p>
              {item.tracking || "Трек номер появится позже"}
            </p>

            <div className={styles.badge}>
              {item.status || "В пути"}
            </div>

            <div className={styles.steps}>

              <div className={styles.step}>
                <div className={styles.dot}></div>
                <span>Оплата</span>
              </div>

              <div className={styles.step}>
                <div className={styles.dot}></div>
                <span>Отправка</span>
              </div>

              <div className={styles.step}>
                <div className={styles.dot}></div>
                <span>Доставка</span>
              </div>

            </div>

          </div>
        ))}

      </section>

    </main>
  );
}
