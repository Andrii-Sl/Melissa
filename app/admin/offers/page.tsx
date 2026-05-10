"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminOffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOffers();

    const channel =
      supabase
        .channel("live-admin-offers")
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
      supabase.removeChannel(channel);
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
            Все предложения поставщиков
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* OFFERS */}

      <section className={styles.section}>

        {offers.length === 0 && (

          <div className={styles.requestCard}>

            <p>
              Предложений пока нет
            </p>

          </div>
        )}

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.brand || "Предложение"}
              </strong>

              <span className={styles.badgeBlue}>
                € {item.price || 0}
              </span>

            </div>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <small>
              Срок: {item.delivery_days || 0} дн.
            </small>

          </div>
        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/admin"
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
          href="/admin/requests"
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
          href="/admin/offers"
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
          href="/admin/orders"
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