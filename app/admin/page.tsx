"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./admin.module.css";

export default function AdminPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [offers, setOffers] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [profiles, setProfiles] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadData();

    /* LIVE REQUESTS */

    const requestsChannel =
      supabase
        .channel("admin-requests")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"requests",
          },
          () => {
            loadData();
          }
        )
        .subscribe();

    /* LIVE OFFERS */

    const offersChannel =
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

    /* LIVE ORDERS */

    const ordersChannel =
      supabase
        .channel("admin-orders")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"orders",
          },
          () => {
            loadData();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        requestsChannel
      );

      supabase.removeChannel(
        offersChannel
      );

      supabase.removeChannel(
        ordersChannel
      );
    };

  }, []);

  async function loadData() {

    const {
      data:req,
    } =
      await supabase
        .from("requests")
        .select("*");

    const {
      data:off,
    } =
      await supabase
        .from("offers")
        .select("*");

    const {
      data:ord,
    } =
      await supabase
        .from("orders")
        .select("*");

    const {
      data:prof,
    } =
      await supabase
        .from("profiles")
        .select("*");

    setRequests(req || []);
    setOffers(off || []);
    setOrders(ord || []);
    setProfiles(prof || []);

    setLoading(false);
  }

/* LOGOUT */

async function logout() {

  document.cookie =
    "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

  await supabase.auth.signOut();

  window.location.href =
    "/";
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
            Панель Управления
          </h1>

          <p className={styles.subtitle}>
            AutoParts EU
          </p>

        </div>

        <div className={styles.profileMenu}>

  <button
    className={styles.profileBtn}
    onClick={logout}
  >
    🚪
  </button>

</div>

      </header>

      {/* STATS */}

      <section className={styles.stats}>

        <Link
          href="/admin/requests"
          className={styles.card}
        >

          <span className={styles.cardIcon}>
            📄
          </span>

          <strong>
            {requests.length}
          </strong>

          <p>
            Заявки
          </p>

        </Link>

        <Link
          href="/admin/offers"
          className={styles.card}
        >

          <span className={styles.cardIcon}>
            💶
          </span>

          <strong>
            {offers.length}
          </strong>

          <p>
            Предложения
          </p>

        </Link>

        <Link
          href="/admin/orders"
          className={styles.card}
        >

          <span className={styles.cardIcon}>
            📦
          </span>

          <strong>
            {orders.length}
          </strong>

          <p>
            Заказы
          </p>

        </Link>

        <Link
          href="/admin/clients"
          className={styles.card}
        >

          <span className={styles.cardIcon}>
            👥
          </span>

          <strong>
            {profiles.length}
          </strong>

          <p>
            Клиенты
          </p>

        </Link>

      </section>

      {/* LAST REQUESTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Последние заявки
          </h2>

          <Link
            href="/admin/requests"
            className={styles.viewAll}
          >
            Все
          </Link>

        </div>

        {requests
          .slice(0,3)
          .map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.car || "Автомобиль"}
              </strong>

              <span className={styles.badge}>
                {item.status || "NEW"}
              </span>

            </div>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <small>
              VIN: {item.vin || "—"}
            </small>

          </div>
        ))}

      </section>

      {/* FLOAT BUTTON */}

      <button className={styles.fab}>
        +
      </button>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/admin"
          className={`${styles.navItem} ${styles.navItemActive}`}
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
          className={styles.navItem}
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