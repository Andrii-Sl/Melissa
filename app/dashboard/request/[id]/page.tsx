"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./request.module.css";

export default function RequestPage({
  params,
}: {
  params: { id: string };
}) {
  const [item, setItem] =
    useState<any>(null);

  useEffect(() => {
    loadRequest();
  }, []);

  async function loadRequest() {
    const { data } =
      await supabase
        .from("requests")
        .select("*")
        .eq("id", params.id)
        .single();

    setItem(data);
  }

  if (!item) {
    return (
      <main className={styles.page}>
        <div className={styles.wrap}>
          Загрузка...
        </div>
      </main>
    );
  }

  const steps = [
    "Новая",
    "В работе",
    "Цена готова",
    "Оплачено",
    "Отправлено",
  ];

  return (
    <main className={styles.page}>
      <section className={styles.wrap}>

        <a
          href="/dashboard"
          className={styles.back}
        >
          ← Назад в кабинет
        </a>

        <div className={styles.label}>
          ЗАЯВКА
        </div>

        <h1 className={styles.title}>
          #{item.id}
        </h1>

        <div className={styles.card}>

          <p>
            <strong>
              Деталь:
            </strong>{" "}
            {item.part_name ||
              "—"}
          </p>

          <p>
            <strong>
              VIN:
            </strong>{" "}
            {item.vin || "—"}
          </p>

          <p>
            <strong>
              Цена:
            </strong>{" "}
            {item.price
              ? item.price + " €"
              : "ожидается"}
          </p>

          <p>
            <strong>
              Комментарий:
            </strong>{" "}
            {item.manager_comment ||
              "Нет комментария"}
          </p>

        </div>

        <div className={styles.steps}>
          {steps.map((step) => (
            <div
              key={step}
              className={
                item.status ===
                  step
                  ? styles.active
                  : styles.step
              }
            >
              {step}
            </div>
          ))}
        </div>

      </section>
    </main>
  );
}