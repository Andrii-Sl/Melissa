"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [user, setUser] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [offers, setOffers] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      let phone =
        session?.user?.phone;

      /* TEST CLIENT */

      if (!phone) {

        const role =
          document.cookie.includes(
            "role=client"
          );

        if (role)
          phone =
            "+48519000000";
      }

      if (!phone) {

        window.location.href =
          "/login";

        return;
      }

      setUser({
        phone,
      });

      const [
        profileRes,
        requestsRes,
        offersRes,
        ordersRes,
      ] = await Promise.all([

        supabase
          .from("profiles")
          .select("*")
          .eq("phone", phone)
          .maybeSingle(),

        supabase
          .from("requests")
          .select("*")
          .eq("phone", phone)
          .order("id", {
            ascending:false,
          }),

        supabase
          .from("offers")
          .select("*")
          .eq("phone", phone)
          .order("id", {
            ascending:false,
          }),

        supabase
          .from("orders")
          .select("*")
          .eq("phone", phone)
          .order("id", {
            ascending:false,
          }),

      ]);

      setProfile(
        profileRes.data
      );

      setRequests(
        requestsRes.data || []
      );

      setOffers(
        offersRes.data || []
      );

      setOrders(
        ordersRes.data || []
      );

      setLoading(false);

    } catch (e) {

      console.error(e);

      setLoading(false);
    }
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
          Здравствуйте,
          <br />
          {profile?.full_name ||
            "Клиент"}
        </h1>

        <p className={styles.phone}>
          {profile?.phone ||
            user?.phone}
        </p>

      </section>

      {/* GARAGE */}

      <section className={styles.garage}>

        <div className={styles.sectionTop}>

          <h2 className={styles.blockTitle}>
            Мои автомобили
          </h2>

          <span className={styles.more}>
            Все
          </span>

        </div>

        <div className={styles.cars}>

          <Link
            href="/dashboard/garage"
            className={styles.car}
          >
            <strong>
              Audi A6 C8
            </strong>

            <span>
              WAUZZZF20...
            </span>
          </Link>

          <Link
            href="/dashboard/garage"
            className={styles.car}
          >
            <strong>
              BMW G30
            </strong>

            <span>
              WBA5R510...
            </span>
          </Link>

        </div>

      </section>

      {/* STATS */}

      <section className={styles.stats}>

        <Link
          href="/dashboard/requests"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.red}`}
            >
              📄
            </div>

          </div>

          <div className={styles.statValue}>
            {requests.length}
          </div>

          <div className={styles.statLabel}>
            Заявки
          </div>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.blue}`}
            >
              💶
            </div>

          </div>

          <div className={styles.statValue}>
            {offers.length}
          </div>

          <div className={styles.statLabel}>
            Предложения
          </div>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.purple}`}
            >
              📦
            </div>

          </div>

          <div className={styles.statValue}>
            {orders.length}
          </div>

          <div className={styles.statLabel}>
            Заказы
          </div>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.green}`}
            >
              ✅
            </div>

          </div>

          <div className={styles.statValue}>
            12
          </div>

          <div className={styles.statLabel}>
            Выполнено
          </div>

        </Link>

      </section>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заявки
          </h2>

          <span className={styles.more}>
            Все
          </span>

        </div>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Предложения
          </h2>

          <span className={styles.more}>
            Все
          </span>

        </div>

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заказы
          </h2>

          <span className={styles.more}>
            Все
          </span>

        </div>

      </section>

      {/* PROFILE */}

      <section className={styles.profile}>

        <div className={styles.sectionTop}>

          <h2 className={styles.blockTitle}>
            Профиль
          </h2>

          <span className={styles.more}>
            Открыть
          </span>

        </div>

        <div className={styles.profileCard}>

          <div className={styles.profileItem}>

            <strong>
              Имя
            </strong>

            <p>
              {profile?.full_name}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Телефон
            </strong>

            <p>
              {profile?.phone}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Адрес доставки
            </strong>

            <p>
              Slovenia, Ljubljana
            </p>

          </div>

        </div>

      </section>

      {/* PAYMENTS */}

      <section className={styles.paymentBannerSection}>

        <img
          src="/payments-banner.png"
          alt="payments"
          className={styles.paymentBanner}
        />

      </section>

    </main>
  );
}