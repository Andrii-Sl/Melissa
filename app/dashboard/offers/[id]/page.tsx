"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../dashboard.module.css";

export default function OfferDetailsPage() {

  const params = useParams();

  const [offer, setOffer] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadOffer();
  }, []);

  async function loadOffer() {

    const {
      data,
    } =
      await supabase
        .from("offers")
        .select("*")
        .eq("id", params.id)
        .single();

    setOffer(data);

    setLoading(false);
  }

  async function payOffer() {

    await supabase
      .from("offers")
      .update({
        status: "paid",
      })
      .eq("id", offer.id);

    await supabase
      .from("orders")
      .insert([
        {
          offer_id: offer.id,
          phone: offer.phone,
          status: "processing",
        },
      ]);

    alert("Оплата успешна");
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
            {offer.brand}
          </strong>

          <div className={styles.price}>
            €{offer.price}
          </div>

          <p>
            Доставка:
            {" "}
            {offer.delivery}
          </p>

          <div className={styles.badge}>
            {offer.availability}
          </div>

          <button
            className={styles.offerBtn}
            onClick={payOffer}
          >
            Оплатить
          </button>

        </div>

      </section>

    </main>
  );
}