"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./admin.module.css";

export default function AdminPage() {

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
          ascending: false,
        });

    setRequests(data || []);

    setLoading(false);
  }

  if (loading)
    return (
      <main className={styles.loading}>
        Загрузка...
      </main>
    );

  return (
    <main className={styles.page}>

      <section className={styles.top}>

        <div>
          <div className={styles.label}>
            ADMIN PANEL
          </div>

          <h1 className={styles.title}>
            Заявки клиентов
          </h1>
        </div>

      </section>

      <section className={styles.grid}>

        {requests.map((item) => (

          <Link
            href={`/admin/request/${item.id}`}
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.part_name || "Запрос"}
            </strong>

            <p>
              {item.phone}
            </p>

            <span>
              {item.vin || "VIN отсутствует"}
            </span>

          </Link>
        ))}

      </section>

    </main>
  );
}