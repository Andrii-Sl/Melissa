"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminOffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [requestId, setRequestId] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [delivery, setDelivery] =
    useState("");

  useEffect(() => {

    loadData();

    const channel =
      supabase
        .channel("admin-offers")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"offers",
          },
          () => {
            loadData();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };

  }, []);

  async function loadData() {

    const {
      data:offersData,
    } =
      await supabase
        .from("offers")
        .select("*")
        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    const {
      data:requestsData,
    } =
      await supabase
        .from("requests")
        .select("*")
        .order(
          "created_at",
          {
            ascending:false,
          }
        );

    setOffers(
      offersData || []
    );

    setRequests(
      requestsData || []
    );

    setLoading(false);
  }

  async function createOffer() {

    if (
      !requestId ||
      !brand ||
      !price
    )
      return;

    const selectedRequest =
      requests.find(
        (item) =>
          item.id.toString() ===
          requestId
      );

    await supabase
      .from("offers")
      .insert([
        {
          request_id:requestId,

          brand,

          price,

          delivery_days:delivery,

          client_phone:
            selectedRequest?.client_phone || "",
        },
      ]);

    setBrand("");
    setPrice("");
    setDelivery("");
    setRequestId("");

    alert(
      "Предложение создано"
    );
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
            Предложения
          </h1>

          <p className={styles.subtitle}>
            Панель администратора
          </p>

        </div>

      </header>

      {/* CREATE OFFER */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <h2>
            Создать предложение
          </h2>

          <select
            value={requestId}
            onChange={(e) =>
              setRequestId(
                e.target.value
              )
            }
            className={styles.input}
          >

            <option value="">
              Выберите заявку
            </option>

            {requests.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                #{item.id}
                {" — "}
                {item.part_name}
              </option>
            ))}

          </select>

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
            placeholder="Доставка (дни)"
            value={delivery}
            onChange={(e) =>
              setDelivery(
                e.target.value
              )
            }
          />

          <button
            className={styles.createBtn}
            onClick={createOffer}
          >
            + Создать предложение
          </button>

        </div>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Все предложения
          </h2>

        </div>

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.brand}
              </strong>

              <span className={styles.badgeBlue}>
                € {item.price}
              </span>

            </div>

            <p>
              Доставка:
              {" "}
              {item.delivery_days}
              {" "}
              дн.
            </p>

            <small>
              Request ID:
              {" "}
              {item.request_id}
            </small>

          </div>
        ))}

      </section>

    </main>
  );
}