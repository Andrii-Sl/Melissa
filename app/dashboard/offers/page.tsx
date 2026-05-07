"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOffers();
  }, []);

  async function loadOffers() {

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
        .from("offers")
        .select("*")
        .eq("phone", phone)
        .order("id", {
          ascending: false,
        });

    setOffers(data || []);

    setLoading(false);
  }

  if (loading)
    return <div className={styles.loading}>Загрузка...</div>;

  return (
    <main className={styles.page}>

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Предложения</h2>
        </div>

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand || "Предложение"}
            </strong>

            <div className={styles.price}>
              €{item.price || 0}
            </div>

            <div className={styles.badge}>
              {item.availability || "Под заказ"}
            </div>

            <button className={styles.offerBtn}>
              Оплатить
            </button>

          </div>
        ))}

      </section>

    </main>
  );
}
