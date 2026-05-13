"use client";

import Link from "next/link";
import {
  useEffect,
  useState,
} from "react";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [loading, setLoading] =
    useState(true);

  const [profile, setProfile] =
    useState<any>(null);

  const [requestsCount, setRequestsCount] =
    useState(0);

  const [offersCount, setOffersCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  /* INIT */

  useEffect(() => {

    init();

  }, []);

  /* GET PHONE */

  async function getClientPhone() {

    try {

      /* LOCAL STORAGE */

      const localPhone =
        localStorage.getItem(
          "client_phone"
        );

      if (
        localPhone &&
        localPhone !== "undefined" &&
        localPhone !== "null"
      ) {

        return localPhone.trim();
      }

      /* COOKIE */

      const cookiePhone =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(
              "client_phone="
            )
          )
          ?.split("=")[1];

      if (
        cookiePhone &&
        cookiePhone !== "undefined" &&
        cookiePhone !== "null"
      ) {

        return decodeURIComponent(
          cookiePhone
        ).trim();
      }

      /* SESSION */

      const {
        data:{ session },
      } =
        await supabase.auth.getSession();

      if (
        session?.user?.phone
      ) {

        return session.user.phone.trim();
      }

      return "";

    } catch (error) {

      console.error(
        "PHONE ERROR:",
        error
      );

      return "";
    }
  }

  /* INIT LOAD */

  async function init() {

    try {

      setLoading(true);

      const phone =
        await getClientPhone();

      console.log(
        "CLIENT PHONE:",
        phone
      );

      if (!phone) {

        setLoading(false);

        return;
      }

      await loadData(phone);

    } catch (error) {

      console.error(
        "INIT ERROR:",
        error
      );

      setLoading(false);
    }
  }

  /* LOAD DATA */

  async function loadData(
    phone:string
  ) {

    try {

      const cleanPhone =
        phone.trim();

      const [
        profileResult,
        requestsResult,
        offersResult,
        ordersResult,
      ] = await Promise.all([

        /* PROFILE */

        supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            cleanPhone
          )
          .maybeSingle(),

        /* REQUESTS */

        supabase
          .from("requests")
          .select(
            "id",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            cleanPhone
          )
          .neq(
            "status",
            "DONE"
          ),

        /* OFFERS */

        supabase
          .from("offers")
          .select(
            "id",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            cleanPhone
          )
          .eq(
            "payment_status",
            "PENDING"
          ),

        /* ORDERS */

        supabase
          .from("orders")
          .select(
            "id",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            cleanPhone
          )
          .neq(
            "status",
            "DELIVERED"
          ),

      ]);

      console.log(
        "PROFILE DATA:",
        profileResult.data
      );

      console.log(
        "REQUESTS:",
        requestsResult.count
      );

      console.log(
        "OFFERS:",
        offersResult.count
      );

      console.log(
        "ORDERS:",
        ordersResult.count
      );

      /* PROFILE */

      setProfile(
        profileResult.data || null
      );

      /* COUNTS */

      setRequestsCount(
        requestsResult.count || 0
      );

      setOffersCount(
        offersResult.count || 0
      );

      setOrdersCount(
        ordersResult.count || 0
      );

      /* NOTIFICATIONS */

      setNotifications([
        {
          id:1,
          text:
            "Появились новые предложения",
          time:
            "10 минут назад",
        },
        {
          id:2,
          text:
            "Заказ обновлён",
          time:
            "1 час назад",
        },
      ]);

    } catch (error) {

      console.error(
        "LOAD ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  /* LOADING */

  if (loading)
    return (

      <main className={styles.page}>

        <div className={styles.skeletonHero} />

        <div className={styles.skeletonGrid}>

          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />
          <div className={styles.skeletonCard} />

        </div>

        <div className={styles.skeletonBox} />
        <div className={styles.skeletonBox} />

      </main>
    );

  return (

    <main className={styles.page}>

      {/* TOP BAR */}

      <header className={styles.topBar}>

        <div className={styles.topBarLeft}>

          <img
            src="/logo.png"
            alt="logo"
            className={styles.topLogo}
          />

          <div>

            <h2 className={styles.topTitle}>
              Lynko
            </h2>

            <p className={styles.topSubtitle}>
              Клиентская панель
            </p>

          </div>

        </div>

        <button
          className={styles.burgerButton}
        >
          ☰
        </button>

      </header>

      {/* HERO */}

      <section className={styles.dashboardHero}>

        <div>

          <p className={styles.dashboardSubtitle}>
            Кабинет клиента
          </p>

          <h1 className={styles.dashboardTitle}>

            {
              profile?.first_name ||
              profile?.name ||
              ""
            }

            {" "}

            {
              profile?.last_name ||
              profile?.surname ||
              ""
            }

            {
              !profile?.first_name &&
              !profile?.name &&
              !profile?.last_name &&
              !profile?.surname &&
              "Клиент"
            }

          </h1>

        </div>

      </section>

      {/* GRID */}

      <section className={styles.dashboardGrid}>

        <Link
          href="/dashboard/requests"
          className={styles.dashboardCard}
        >

          <h3>
            Запросы
          </h3>

          <strong>
            {requestsCount}
          </strong>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.dashboardCard}
        >

          <h3>
            Предложения
          </h3>

          <strong>
            {offersCount}
          </strong>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.dashboardCard}
        >

          <h3>
            Заказы
          </h3>

          <strong>
            {ordersCount}
          </strong>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardCard}
        >

          <h3>
            Профиль
          </h3>

          <strong>
            →
          </strong>

        </Link>

      </section>

      {/* QUICK ACTIONS */}

      <section className={styles.section}>

        <div className={styles.dashboardBox}>

          <h2 className={styles.sectionTitle}>
            Быстрые действия
          </h2>

          <div className={styles.quickActions}>

            <Link
              href="/dashboard/requests/new"
              className={styles.quickButton}
            >
              Новый запрос
            </Link>

            <Link
              href="/dashboard/orders"
              className={styles.quickButton}
            >
              Мои заказы
            </Link>

            <Link
              href="/dashboard/offers"
              className={styles.quickButton}
            >
              Предложения
            </Link>

          </div>

        </div>

      </section>

      {/* NOTIFICATIONS */}

      <section className={styles.section}>

        <div className={styles.dashboardBox}>

          <h2 className={styles.sectionTitle}>
            Уведомления
          </h2>

          <div className={styles.notificationsList}>

            {notifications.map((item) => (

              <div
                key={item.id}
                className={styles.notificationItem}
              >

                <div
                  className={
                    styles.notificationDot
                  }
                />

                <div
                  className={
                    styles.notificationContent
                  }
                >

                  <strong>
                    {item.text}
                  </strong>

                  <p>
                    {item.time}
                  </p>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      <BottomNav active="home" />

    </main>
  );
}