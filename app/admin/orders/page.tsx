"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";
import Footer from "../../../components/Footer";
import styles from "./orders.module.css";

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {
    loadOrders();
  }, []);

  async function loadOrders() {
    const { data, error } =
      await supabase
        .from("requests")
        .select("*")
        .order("id", {
          ascending: false
        });

    if (!error && data) {
      setOrders(data);
    }
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a
            href="/admin/dashboard"
            className={styles.backBtn}
          >
            ← Dashboard
          </a>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ADMIN CRM
          </div>

          <h1>Все заявки</h1>

          <div className={styles.list}>
            {orders.map((item) => (
              <a
                key={item.id}
                href={`/admin/request/${item.id}`}
                className={styles.card}
              >
                <div className={styles.top}>
                  <strong>
                    #{item.id}
                  </strong>

                  <span>
                    {item.status}
                  </span>
                </div>

                <p>
                  {item.client_name || "Без имени"}
                </p>

                <p>
                  {item.phone || "-"}
                </p>

                <p>
                  {item.part_name || item.vin || "-"}
                </p>
              </a>
            ))}

            {orders.length === 0 && (
              <div className={styles.card}>
                Пока нет заявок
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}