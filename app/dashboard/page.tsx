"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

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

  async function getClientPhone() {

    try {

      const cookiePhone =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(
              "client_phone="
            )
          )
          ?.split("=")[1];

      if (cookiePhone)
        return cookiePhone;

      const {
        data:{ session },
      } =
        await supabase.auth.getSession();

      return (
        session?.user?.phone || ""
      );

    } catch {

      return "";
    }
  }

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setLoading(false);

        return;
      }

      /* PROFILE */

      const {
        data:profileData,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            phone
          )
          .maybeSingle();

      setProfile(profileData);

      /* REQUESTS */

      const {
        count:reqCount,
      } =
        await supabase
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
            phone
          )
          .neq(
            "status",
            "DONE"
          );

      setRequestsCount(
        reqCount || 0
      );

      /* OFFERS */

      const {
        count:offCount,
      } =
        await supabase
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
            phone
          )
          .eq(
            "payment_status",
            "PENDING"
          );

      setOffersCount(
        offCount || 0
      );

      /* ORDERS */

      const {
        count:ordCount,
      } =
        await supabase
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
            phone
          )
          .neq(
            "status",
            "DELIVERED"
          );

      setOrdersCount(
        ordCount || 0
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

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

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

          <div className={styles.boxTop}>

            <h2 className={styles.sectionTitle}>
              Быстрые действия
            </h2>

          </div>

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