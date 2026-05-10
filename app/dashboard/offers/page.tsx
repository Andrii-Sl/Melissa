"use client";

import Link from "next/link";
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

    const channel =
      supabase
        .channel("client-offers")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"offers",
          },
          () => {
            loadOffers();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, []);

  async function loadOffers() {

    const {
      data,
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

    setOffers(data || []);

    setLoading(false);
  }

  async function acceptOffer(
    item:any
  ) {

    await supabase
      .from("orders")
      .insert([
        {
          offer_id:item.id,
          part_name:item.brand,
          status:"NEW",
        },
      ]);

    alert(
      "Заказ создан"
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

      {/* HERO */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Предложения
        </h1>

        <p className={styles.phone}>
          Всего:
          {" "}
          {offers.length}
        </p>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        {offers.length === 0 && (

          <div className={styles.card}>

            <strong>
              Пока нет предложений
            </strong>

          </div>
        )}

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand || "Предложение"}
            </strong>

            <div className={styles.price}>
              € {item.price || 0}
            </div>

            <p>
              Срок доставки:
              {" "}
              {item.delivery_days || 0}
              {" "}
              дн.
            </p>

            <div className={styles.badge}>
              В наличии
            </div>

            <button
              className={styles.createBtn}
              onClick={() =>
                acceptOffer(item)
              }
            >
              Принять предложение
            </button>

          </div>
        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            🏠
          </div>

          <span>
            Главная
          </span>

        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            📄
          </div>

          <span>
            Заявки
          </span>

        </Link>

        <Link
          href="/dashboard/offers"
          className={`${styles.navItem} ${styles.navItemActive}`}
        >

          <div className={styles.navIcon}>
            💶
          </div>

          <span>
            Предложения
          </span>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>

        </Link>

      </nav>

    </main>
  );
}