"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* NEW REQUEST */

  const [vin, setVin] =
    useState("");

  const [car, setCar] =
    useState("");

  const [partName, setPartName] =
    useState("");

  /* COUNTS */

  const [requestsCount, setRequestsCount] =
    useState(0);

  const [offersCount, setOffersCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  /* LAST REQUESTS */

  const [latestRequests, setLatestRequests] =
    useState<any[]>([]);

  /* LAST OFFERS */

  const [latestOffers, setLatestOffers] =
    useState<any[]>([]);

  /* LAST ORDERS */

  const [latestOrders, setLatestOrders] =
    useState<any[]>([]);

  /* GET CLIENT PHONE */

  function getClientPhone() {

    const cookiePhone =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(
            "client_phone="
          )
        )
        ?.split("=")[1];

    return cookiePhone || "";
  }

  useEffect(() => {

    loadProfile();

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
            loadProfile();
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
            loadProfile();
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
            loadProfile();
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

  async function loadProfile() {

    try {

      let phone =
        getClientPhone();

      /* REAL SUPABASE SESSION */

      if (!phone) {

        const {
          data:{
            session,
          },
        } =
          await supabase.auth.getSession();

        phone =
          session?.user?.phone || "";
      }

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
          .eq("phone", phone)
          .maybeSingle();

      if (profileError) {
        console.error(profileError);
      }

      setProfile(profileData);

      /* COUNTS */

      const {
        count:requestsTotal,
      } =
        await supabase
          .from("requests")
          .select(
            "*",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            phone
          );

      const {
        count:offersTotal,
      } =
        await supabase
          .from("offers")
          .select(
            "*",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            phone
          );

      const {
        count:ordersTotal,
      } =
        await supabase
          .from("orders")
          .select(
            "*",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            phone
          );

      setRequestsCount(
        requestsTotal || 0
      );

      setOffersCount(
        offersTotal || 0
      );

      setOrdersCount(
        ordersTotal || 0
      );

      /* LAST REQUESTS */

      const {
        data:latestRequestsData,
      } =
        await supabase
          .from("requests")
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(3);

      setLatestRequests(
        latestRequestsData || []
      );

      /* LAST OFFERS */

      const {
        data:latestOffersData,
      } =
        await supabase
          .from("offers")
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(3);

      setLatestOffers(
        latestOffersData || []
      );

      /* LAST ORDERS */

      const {
        data:latestOrdersData,
      } =
        await supabase
          .from("orders")
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(3);

      setLatestOrders(
        latestOrdersData || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  /* CREATE REQUEST */

  async function createRequest() {

    if (!vin || !partName) {

      alert(
        "Заполните обязательные поля"
      );

      return;
    }

    try {

      const phone =
        getClientPhone();

      if (!phone) {

        alert(
          "Требуется авторизация"
        );

        return;
      }

      const {
        error,
      } =
        await supabase
          .from("requests")
          .insert([
            {
              vin,
              car,
              part_name:partName,
              status:"NEW",
              client_phone:phone,
            },
          ]);

      if (error) {

        console.error(error);

        alert(
          "Ошибка создания заявки"
        );

        return;
      }

      setVin("");
      setCar("");
      setPartName("");

      await loadProfile();

      alert(
        "Заявка создана"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
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
          {
            profile?.full_name
              ? profile.full_name
              : "Клиент"
          }
        </h1>

        <p className={styles.phone}>
          {profile?.phone || ""}
        </p>

      </section>

      {/* GARAGE */}

      <section className={styles.garage}>

        <div className={styles.sectionTop}>

          <h2 className={styles.blockTitle}>
            Мои автомобили
          </h2>

          <Link
            href="/dashboard/garage"
            className={styles.more}
          >
            Все
          </Link>

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
            {requestsCount}
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
            {offersCount}
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
            {ordersCount}
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
              👤
            </div>
          </div>

          <div className={styles.statValue}>
            {profile?.full_name ? "✓" : "—"}
          </div>

          <div className={styles.statLabel}>
            Профиль
          </div>

        </Link>

      </section>

      {/* NEW REQUEST */}

      <section className={styles.requestBox}>

        <h2 className={styles.blockTitle}>
          Новая заявка
        </h2>

        <div className={styles.form}>

          <input
            className={styles.input}
            placeholder="VIN"
            value={vin}
            onChange={(e) =>
              setVin(e.target.value)
            }
          />

          <input
            className={styles.input}
            placeholder="Автомобиль"
            value={car}
            onChange={(e) =>
              setCar(e.target.value)
            }
          />

          <input
            className={styles.input}
            placeholder="Название детали"
            value={partName}
            onChange={(e) =>
              setPartName(e.target.value)
            }
          />

          <button
            className={styles.createBtn}
            onClick={createRequest}
          >
            + Создать заявку
          </button>

        </div>

      </section>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заявки
          </h2>

          <Link
            href="/dashboard/requests"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        {latestRequests.length === 0 && (

          <div className={styles.card}>
            <strong>
              Пока нет заявок
            </strong>
          </div>

        )}

        {latestRequests.map((item) => (

          <Link
            key={item.id}
            href="/dashboard/requests"
            className={styles.card}
          >

            <strong>
              {item.part_name || "Деталь"}
            </strong>

            <p>
              VIN: {item.vin || "—"}
            </p>

            <div className={styles.badge}>
              {item.status || "NEW"}
            </div>

          </Link>

        ))}

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Предложения
          </h2>

          <Link
            href="/dashboard/offers"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        {latestOffers.length === 0 && (

          <div className={styles.card}>

            <strong>
              Пока нет предложений
            </strong>

          </div>

        )}

        {latestOffers.map((item) => (

          <Link
            key={item.id}
            href="/dashboard/offers"
            className={styles.card}
          >

            <strong>
              {item.brand || "Предложение"}
            </strong>

            <div className={styles.price}>
              € {item.price || 0}
            </div>

            <div className={styles.badge}>
              {item.delivery_days || 0} дн.
            </div>

          </Link>

        ))}

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заказы
          </h2>

          <Link
            href="/dashboard/orders"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        {latestOrders.length === 0 && (

          <div className={styles.card}>

            <strong>
              Пока нет заказов
            </strong>

          </div>

        )}

        {latestOrders.map((item) => (

          <Link
            key={item.id}
            href="/dashboard/orders"
            className={styles.card}
          >

            <strong>
              Заказ #{item.id}
            </strong>

            <p>
              {item.part_name || "Деталь"}
            </p>

            <div className={styles.badge}>
              {item.status || "NEW"}
            </div>

          </Link>

        ))}

      </section>

      {/* PROFILE */}

      <section className={styles.profile}>

        <div className={styles.sectionTop}>

          <h2>
            Профиль
          </h2>

          <Link
            href="/dashboard/profile"
            className={styles.more}
          >
            Открыть
          </Link>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.profileCard}
        >

          <div className={styles.profileItem}>

            <strong>
              Имя
            </strong>

            <p>
              {profile?.full_name || "Клиент"}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Телефон
            </strong>

            <p>
              {profile?.phone || ""}
            </p>

          </div>

        </Link>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
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

        <Link
          href="/dashboard/garage"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            🚗
          </div>

          <span>
            Гараж
          </span>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            👤
          </div>

          <span>
            Профиль
          </span>

        </Link>

      </nav>

    </main>
  );
}