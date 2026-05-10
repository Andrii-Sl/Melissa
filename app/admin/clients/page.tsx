"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminClientsPage() {

  const [clients, setClients] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadClients();

    const channel =
      supabase
        .channel("live-admin-clients")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"profiles",
          },
          () => {
            loadClients();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  async function loadClients() {

    const {
      data,
    } =
      await supabase
        .from("profiles")
        .select("*")
        .order(
          "id",
          {
            ascending:false,
          }
        );

    setClients(data || []);

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
            Клиенты
          </h1>

          <p className={styles.subtitle}>
            База клиентов AutoParts EU
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* CLIENTS */}

      <section className={styles.section}>

        {clients.length === 0 && (

          <div className={styles.requestCard}>

            <p>
              Клиентов пока нет
            </p>

          </div>
        )}

        {clients.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.full_name || "Клиент"}
              </strong>

              <span className={styles.badgeBlue}>
                CLIENT
              </span>

            </div>

            <p>
              {item.phone || "Нет телефона"}
            </p>

            <small>
              {item.country || ""} {item.city || ""}
            </small>

          </div>
        ))}

      </section>

    </main>
  );
}