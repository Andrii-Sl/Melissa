"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Footer from "../../../../components/Footer";
import styles from "./request.module.css";

export default function RequestPage() {
  const params = useParams();
  const id = params.id;

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
        .eq("id", id)
        .single();

    if (data) {
      setItem(data);
    }
  }

  if (!item) {
    return <div>Загрузка...</div>;
  }

  const steps = [
    "Новая",
    "В работе",
    "Цена готова",
    "Оплачено",
    "Отправлено"
  ];

  const currentStep =
    steps.indexOf(item.status);

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ЗАЯВКА #{item.id}
          </div>

          <h1>Статус заказа</h1>

          <div className={styles.card}>
            <p>
              Деталь:
              {" "}
              {item.part_name ||
                "-"}
            </p>

            <p>
              VIN:
              {" "}
              {item.vin || "-"}
            </p>

            <p>
              Цена:
              {" "}
              {item.price
                ? item.price +
                  " €"
                : "ожидается"}
            </p>

            <p>
              Комментарий:
              {" "}
              {item.manager_comment ||
                "-"}
            </p>

            <div className={styles.tracker}>
              {steps.map(
                (
                  step,
                  index
                ) => (
                  <div
                    key={step}
                    className={
                      index <=
                      currentStep
                        ? styles.active
                        : styles.step
                    }
                  >
                    {step}
                  </div>
                )
              )}
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}