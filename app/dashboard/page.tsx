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

  /* LAST DATA */

  const [latestRequests, setLatestRequests] =
    useState<any[]>([]);

  const [latestOffers, setLatestOffers] =
    useState<any[]>([]);

  const [latestOrders, setLatestOrders] =
    useState<any[]>([]);

  /* GARAGE */

  const [garage, setGarage] =
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

  /* LOAD */

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      let phone =
        getClientPhone();

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
      } =
        await supabase
          .from("profiles")
          .select(
            "id, full_name, phone"
          )
          .eq("phone", phone)
          .maybeSingle();

      setProfile(profileData);

      /* REQUESTS COUNT */

      const {
        count:requestsTotal,
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
          .eq(
            "status",
            "NEW"
          );

      /* OFFERS COUNT */

      const {
        count:offersTotal,
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
            "status",
            "ACTIVE"
          );

      /* ORDERS COUNT */

      const {
        count:ordersTotal,
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

      setRequestsCount(
        requestsTotal || 0
      );

      setOffersCount(
        offersTotal || 0
      );

      setOrdersCount(
        ordersTotal || 0
      );

      /* LAST REQUEST */

      const {
        data:latestRequestsData,
      } =
        await supabase
          .from("requests")
          .select(
            "id, vin, part_name, status"
          )
          .eq(
            "client_phone",
            phone
          )
          .eq(
            "status",
            "NEW"
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(1);

      setLatestRequests(
        latestRequestsData || []
      );

      /* LAST OFFER */

      const {
        data:latestOffersData,
      } =
        await supabase
          .from("offers")
          .select(
            "id, brand, price, delivery_days"
          )
          .eq(
            "client_phone",
            phone
          )
          .eq(
            "status",
            "ACTIVE"
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(1);

      setLatestOffers(
        latestOffersData || []
      );

      /* LAST ORDER */

      const {
        data:latestOrdersData,
      } =
        await supabase
          .from("orders")
          .select(
            "id, part_name, status"
          )
          .eq(
            "client_phone",
            phone
          )
          .neq(
            "status",
            "DELIVERED"
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(1);

      setLatestOrders(
        latestOrdersData || []
      );

      /* GARAGE */

      const {
        data:garageData,
      } =
        await supabase
          .from("garage")
          .select(
            "id, car_name, vin"
          )
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      setGarage(
        garageData || []
      );

    } catch (error) {

      console.error(
        "DASHBOARD ERROR:",
        error
      );

    } finally {

      setLoading(false);
    }
  }

  /* SELECT CAR */

  function selectGarageCar(
    item:any
  ) {

    setCar(
      item.car_name || ""
    );

    setVin(
      item.vin || ""
    );
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

      setRequestsCount(
        (prev) => prev + 1
      );

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
            profile?.full_name ||
            "Клиент"
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

          {garage.length === 0 && (

            <div className={styles.card}>

              <strong>
                Нет автомобилей
              </strong>

            </div>

          )}

          {garage.map((item) => (

            <Link
              key={item.id}
              href="/dashboard/garage"
              className={styles.car}
            >

              <strong>
                {item.car_name || "Автомобиль"}
              </strong>

              <span>
                {item.vin || "—"}
              </span>

            </Link>

          ))}

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

          <select
            className={styles.input}
            value={car}
            onChange={(e) => {

              const selected =
                garage.find(
                  (item) =>
                    item.car_name ===
                    e.target.value
                );

              if (selected) {

                selectGarageCar(
                  selected
                );
              }
            }}
          >

            <option value="">
              Выберите автомобиль
            </option>

            {garage.map((item) => (

              <option
                key={item.id}
                value={item.car_name}
              >
                {item.car_name}
              </option>

            ))}

          </select>

          <input
            className={styles.input}
            placeholder="VIN"
            value={vin}
            readOnly
          />

          <input
            className={styles.input}
            placeholder="Название детали"
            value={partName}
            onChange={(e) =>
              setPartName(
                e.target.value
              )
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

      {/* LAST REQUEST */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Последняя заявка
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

      {/* LAST OFFER */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Последнее предложение
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

      {/* LAST ORDER */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Последний заказ
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