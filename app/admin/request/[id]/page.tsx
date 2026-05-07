"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../admin.module.css";

export default function AdminRequestPage() {

  const params = useParams();

  const [request, setRequest] =
    useState<any>(null);

  const [brand, setBrand] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [availability, setAvailability] =
    useState("В наличии");

  const [delivery, setDelivery] =
    useState("7 дней");

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
  }

  async function createOffer() {

    if (!request)
      return;

    await supabase
      .from("offers")
      .insert([
        {
          request_id:
            request.id,

          phone:
            request.phone,

          brand,

          price,

          availability,

          delivery,
        },
      ]);

    await supabase
      .from("requests")
      .update({
        status: "found",
      })
      .eq("id", request.id);

    alert("Предложение создано");
  }

  if (!request)
    return (
      <main className={styles.loading}>
        Загрузка...
      </main>
    );

  return (
    <main className={styles.page}>

      <section className={styles.single}>

        <div className={styles.card}>

          <strong>
            {request.part_name}
          </strong>

          <p>
            {request.phone}
          </p>

          <span>
            {request.vin}
          </span>

        </div>

        <div className={styles.form}>

          <input
            className={styles.input}
            placeholder="Бренд"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Цена"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Наличие"
            value={availability}
            onChange={(e) =>
              setAvailability(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Доставка"
            value={delivery}
            onChange={(e) =>
              setDelivery(
                e.target.value
              )
            }
          />

          <button
            className={styles.button}
            onClick={createOffer}
          >
            Создать предложение
          </button>

        </div>

      </section>

    </main>
  );
}