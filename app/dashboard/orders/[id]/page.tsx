"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../dashboard.module.css";

export default function OrderDetailsPage() {

  const params = useParams();

  const [order, setOrder] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOrder();
  }, []);

  async function loadOrder() {

    const {
      data,
    } =
      await supabase
        .from("orders")
        .select("*")
        .eq("id", params.id)
        .single();

    setOrder(data);

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

      <section className={styles.section}>

        <div className={styles.card}>

          <strong>
            Заказ #{order.id}
          </strong>

          <p>
            Трек:
            {" "}
            {order.tracking ||
              "Будет добавлен"}
          </p>

          <div className={styles.badge}>
            {order.status}
          </div>

          <div className={styles.steps}>

            <div className={styles.step}>
              <div className={styles.dot}></div>
              <span>
                Оплата
              </span>
            </div>

            <div className={styles.step}>
              <div className={styles.dot}></div>
              <span>
                Отправка
              </span>
            </div>

            <div className={styles.step}>
              <div className={styles.dot}></div>
              <span>
                Доставка
              </span>
            </div>

          </div>

        </div>

      </section>

    </main>
  );
}