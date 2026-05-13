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

  const [
    animatedRequests,
    setAnimatedRequests,
  ] = useState(0);

  const [
    animatedOffers,
    setAnimatedOffers,
  ] = useState(0);

  const [
    animatedOrders,
    setAnimatedOrders,
  ] = useState(0);

  const [notifications, setNotifications] =
    useState<any[]>([]);

  /* PHONE */

  async function getClientPhone() {

    try {

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
        cookiePhone !== "undefined"
      ) {

        return decodeURIComponent(
          cookiePhone
        );
      }

      /* SUPABASE SESSION */

      const {
        data:{ session },
      } =
        await supabase.auth.getSession();

      if (
        session?.user?.phone
      ) {

        return session.user.phone;
      }

      /* LOCAL STORAGE */

      const localPhone =
        localStorage.getItem(
          "client_phone"
        );

      if (
        localPhone &&
        localPhone !== "undefined"
      ) {

        return localPhone;
      }

      return "";

    } catch (error) {

      console.error(error);

      return "";
    }
  }

  /* LOAD */

  useEffect(() => {

    loadData();

    const requestsChannel =
      supabase
        .channel("dashboard-requests")
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

    const offersChannel =
      supabase
        .channel("dashboard-offers")
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

    const ordersChannel =
      supabase
        .channel("dashboard-orders")
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

  /* COUNTER ANIMATION */

  useEffect(() => {

    animateValue(
      animatedRequests,
      requestsCount,
      setAnimatedRequests
    );

  }, [requestsCount]);

  useEffect(() => {

    animateValue(
      animatedOffers,
      offersCount,
      setAnimatedOffers
    );

  }, [offersCount]);

  useEffect(() => {

    animateValue(
      animatedOrders,
      ordersCount,
      setAnimatedOrders
    );

  }, [ordersCount]);

  function animateValue(
    start:number,
    end:number,
    setter:any
  ) {

    const duration = 300;

    const startTime =
      performance.now();

    function update(
      currentTime:number
    ) {

      const elapsed =
        currentTime - startTime;

      const progress =
        Math.min(
          elapsed / duration,
          1
        );

      const value =
        Math.floor(
          start +
          (end - start) *
          progress
        );

      setter(value);

      if (progress < 1) {

        requestAnimationFrame(
          update
        );
      }
    }

    requestAnimationFrame(
      update
    );
  }

  /* LOAD DATA */

  async function loadData() {

    try {

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

      /* PROFILE */

      const {
        data:profileData,
        error:profileError,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            phone
          )
          .maybeSingle();

      if (profileError) {

        console.error(
          "PROFILE ERROR:",
          profileError
        );
      }

      setProfile(profileData);

      /* REQUESTS */

      const {
        count:reqCount,
        error:reqError,
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

      if (reqError) {

        console.error(
          "REQUESTS ERROR:",
          reqError
        );
      }

      setRequestsCount(
        reqCount || 0
      );

      /* OFFERS */

      const {
        count:offCount,
        error:offError,
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

      if (offError) {

        console.error(
          "OFFERS ERROR:",
          offError
        );
      }

      setOffersCount(
        offCount || 0
      );

      /* ORDERS */

      const {
        count:ordCount,
        error:ordError,
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

      if (ordError) {

        console.error(
          "ORDERS ERROR:",
          ordError
        );
      }

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

      console.error(
        "LOAD DATA ERROR:",
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
            {animatedRequests}
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
            {animatedOffers}
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
            {animatedOrders}
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