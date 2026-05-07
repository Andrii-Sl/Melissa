"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function RequestsPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadRequests();
  }, []);

  async function loadRequests() {

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
        .from("requests")
        .select("*")
        .eq("phone", phone)
        .order("id", {
          ascending: false,
        });

    setRequests(data || []);

    setLoading(false);
  }

  function getStatus(status:string) {

    if (status === "new")
      return "🟡 Новая";

    if (status === "search")
      return "🔵 В подборе";

    if (status === "found")
      return "🟢 Предложение готово";

    return status;
  }

  if (loading)
    return <div className={styles.loading}>Загрузка...</div>;

  return (
    <main className={styles.page}>

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Все заявки</h2>
        </div>

        {requests.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.part_name || "Запрос"}
            </strong>

            <p>
              VIN: {item.vin || "не указан"}
            </p>

            <div className={styles.badge}>
              {getStatus(item.status)}
            </div>

          </div>
        ))}

      </section>

    </main>
  );
}