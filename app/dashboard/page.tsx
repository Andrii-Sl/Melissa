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

  /* PHONE */

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
        data:{
          session,
        },
      } =
        await supabase.auth.getSession();

      return (
        session?.user?.phone || ""
      );

    } catch (error) {

      console.error(error);

      return "";
    }
  }

  /* LOAD */

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

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

      /* COUNTS */

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
          );

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
            "payment_status",
            "PENDING"
          );

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
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .eq(
            "payment_status",
            "PENDING"
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
          );

      setGarage(
        garageData || []
      );

    } catch (error) {

      console.error(error);

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
        await getClientPhone();

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

      alert(
        "Заявка создана"
      );

      loadProfile();

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

      {/* HEADER */}

      <header className={styles.header}>

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              Кабинет клиента
            </p>

            <h1 className={styles.mainTitle}>
              {
                profile?.full_name ||
                "Клиент"
              }
            </h1>

          </div>

          <Link
            href="/dashboard/profile"
            className={styles.avatar}
          >
            👤
          </Link>

        </div>

      </header>

      {/* STATS */}

      <section className={styles.statsGrid}>

        <Link
          href="/dashboard/requests"
          className={styles.statCard}
        >

          <div className={styles.statIcon}>
            📄
          </div>

          <div className={styles.statInfo}>

            <strong>
              {requestsCount}
            </strong>

            <span>
              Заявки
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.statCard}
        >

          <div className={styles.statIcon}>
            💶
          </div>

          <div className={styles.statInfo}>

            <strong>
              {offersCount}
            </strong>

            <span>
              Предложения
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.statCard}
        >

          <div className={styles.statIcon}>
            📦
          </div>

          <div className={styles.statInfo}>

            <strong>
              {ordersCount}
            </strong>

            <span>
              Заказы
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.statCard}
        >

          <div className={styles.statIcon}>
            🚗
          </div>

          <div className={styles.statInfo}>

            <strong>
              {garage.length}
            </strong>

            <span>
              Автомобили
            </span>

          </div>

        </Link>

      </section>

      {/* NEW REQUEST */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Новая заявка
          </h2>

        </div>

        <div className={styles.formCard}>

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
            className={styles.primaryButton}
            onClick={createRequest}
          >
            Создать заявку
          </button>

        </div>

      </section>

      {/* LAST OFFER */}

      {latestOffers.length > 0 && (

        <section className={styles.section}>

          <div className={styles.sectionHead}>

            <h2>
              Последнее предложение
            </h2>

            <Link
              href="/dashboard/offers"
              className={styles.linkBtn}
            >
              Все
            </Link>

          </div>

          {latestOffers.map((item) => (

            <Link
              key={item.id}
              href="/dashboard/offers"
              className={styles.productCard}
            >

              <div className={styles.productInfo}>

                <strong>
                  {
                    item.brand ||
                    "Товар"
                  }
                </strong>

                <p>
                  Доставка:
                  {" "}
                  {
                    item.delivery_days || 0
                  }
                  {" "}
                  дн.
                </p>

                <div className={styles.price}>
                  €
                  {" "}
                  {item.price || 0}
                </div>

              </div>

            </Link>

          ))}

        </section>

      )}

      {/* LAST ORDER */}

      {latestOrders.length > 0 && (

        <section className={styles.section}>

          <div className={styles.sectionHead}>

            <h2>
              Последний заказ
            </h2>

            <Link
              href="/dashboard/orders"
              className={styles.linkBtn}
            >
              Все
            </Link>

          </div>

          {latestOrders.map((item) => (

            <Link
              key={item.id}
              href="/dashboard/orders"
              className={styles.orderCard}
            >

              <div>

                <strong>
                  {
                    item.part_name ||
                    "Заказ"
                  }
                </strong>

                <p>
                  Заказ #
                  {item.id}
                </p>

              </div>

              <div className={styles.statusBadge}>
                {
                  item.status ||
                  "NEW"
                }
              </div>

            </Link>

          ))}

        </section>

      )}

      {/* PROFILE BLOCK */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Профиль
          </h2>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.profileCard}
        >

          <div className={styles.profileRow}>

            <span>
              Телефон
            </span>

            <strong>
              {
                profile?.phone ||
                "—"
              }
            </strong>

          </div>

          <div className={styles.profileRow}>

            <span>
              Автомобили
            </span>

            <strong>
              {garage.length}
            </strong>

          </div>

          <div className={styles.profileRow}>

            <span>
              Email
            </span>

            <strong>
              {
                profile?.email ||
                "—"
              }
            </strong>

          </div>

        </Link>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={`${styles.navItem} ${styles.navActive}`}
        >
          <span>
            🏠
          </span>
          Главная
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <span>
            📄
          </span>
          Заявки
        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >
          <span>
            💶
          </span>
          Предложения
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >
          <span>
            📦
          </span>
          Заказы
        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.navItem}
        >
          <span>
            👤
          </span>
          Профиль
        </Link>

      </nav>

    </main>
  );
}