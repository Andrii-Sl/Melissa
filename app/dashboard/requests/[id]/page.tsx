"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../dashboard.module.css";

export default function RequestDetailsPage() {

  const params = useParams();

  const [request, setRequest] =
    useState<any>(null);

  const [offers, setOffers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadRequest();
  }, []);

  async function loadRequest() {

    const {
      data,
    } =
      await supabase
        .from("requests")
        .select("*")
        .eq("id", params.id)
        .single();

    setRequest(data);

    const {
      data: off,
    } =
      await supabase
        .from("offers")
        .select("*")
        .eq(
          "request_id",
          params.id
        );

    setOffers(off || []);

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
            {request.part_name}
          </strong>

          <p>
            VIN: {request.vin}
          </p>

          <div className={styles.badge}>
            {request.status}
          </div>

        </div>

      </section>

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>
            Предложения
          </h2>
        </div>

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand}
            </strong>

            <div className={styles.price}>
              €{item.price}
            </div>

            <p>
              {item.delivery}
            </p>

            <div className={styles.badge}>
              {item.availability}
            </div>

          </div>
        ))}

      </section>

    </main>
  );
}