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

  const [quantity, setQuantity] =
    useState("1");

  /* COUNTS */

  const [requestsCount, setRequestsCount] =
    useState(0);

  const [offersCount, setOffersCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  /* TOTAL */

  const [requestsTotal, setRequestsTotal] =
    useState(0);

  const [offersTotal, setOffersTotal] =
    useState(0);

  const [ordersTotal, setOrdersTotal] =
    useState(0);

  /* GARAGE */

  const [garage, setGarage] =
    useState<any[]>([]);

  /* NOTIFICATIONS */

  const [notifications] =
    useState([
      {
        id:1,
        text:"Ваш запрос получил новые предложения",
        time:"10 мин. назад",
      },
      {
        id:2,
        text:"Заказ доставлен",
        time:"1 ч. назад",
      },
    ]);

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
        data:{ session },
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

      /* REQUESTS */

      const {
        count:reqActive,
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

      const {
        count:reqTotal,
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

      /* OFFERS */

      const {
        count:offActive,
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
        count:offTotal,
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
          );

      /* ORDERS */

      const {
        count:ordActive,
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

      const {
        count:ordTotal,
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
          );

      setRequestsCount(reqActive || 0);
      setOffersCount(offActive || 0);
      setOrdersCount(ordActive || 0);

      setRequestsTotal(reqTotal || 0);
      setOffersTotal(offTotal || 0);
      setOrdersTotal(ordTotal || 0);

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

    if (
      !vin ||
      !partName ||
      !quantity
    ) {

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
              quantity,
              part_name:partName,
              status:"NEW",
              client_phone:phone,
            },
          ]);

      if (error) {

        console.error(error);

        alert(
          "Ошибка создания запроса"
        );

        return;
      }

      setVin("");
      setCar("");
      setPartName("");
      setQuantity("1");

      alert(
        "Запрос отправлен"
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

      <section className={styles.dashboardHero}>

        <h1 className={styles.dashboardHello}>
          Здравствуйте,
          {" "}
          {
            profile?.first_name ||
            "Клиент"
          }
        </h1>

        <p className={styles.dashboardPhone}>
          📞
          {" "}
          {
            profile?.phone ||
            "Телефон не указан"
          }
        </p>

      </section>

      {/* STATS */}

      <section className={styles.dashboardGrid}>

        <Link
          href="/dashboard/requests"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardTop}>

            <div className={styles.dashboardIcon}>
              📄
            </div>

            <h3>
              Запросы
            </h3>

          </div>

          <div className={styles.dashboardCounter}>

            <strong>
              {requestsCount}
            </strong>

            <span>
              /
              {" "}
              {requestsTotal}
            </span>

          </div>

          <p>
            активные / всего
          </p>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardTop}>

            <div className={styles.dashboardIcon}>
              💶
            </div>

            <h3>
              Предложения
            </h3>

          </div>

          <div className={styles.dashboardCounter}>

            <strong>
              {offersCount}
            </strong>

            <span>
              /
              {" "}
              {offersTotal}
            </span>

          </div>

          <p>
            активные / всего
          </p>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardTop}>

            <div className={styles.dashboardIcon}>
              📦
            </div>

            <h3>
              Заказы
            </h3>

          </div>

          <div className={styles.dashboardCounter}>

            <strong>
              {ordersCount}
            </strong>

            <span>
              /
              {" "}
              {ordersTotal}
            </span>

          </div>

          <p>
            активные / всего
          </p>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardTop}>

            <div className={styles.dashboardIcon}>
              👤
            </div>

            <h3>
              Профиль
            </h3>

          </div>

          <div className={styles.dashboardCounter}>

            <strong>
              1
            </strong>

            <span>
              / 1
            </span>

          </div>

          <p>
            активные / всего
          </p>

        </Link>

      </section>

      {/* NEW REQUEST */}

      <section className={styles.section}>

        <div className={styles.dashboardForm}>

          <h2 className={styles.dashboardSectionTitle}>
            Новый запрос
          </h2>

          <label className={styles.dashboardLabel}>
            Выберите автомобиль
          </label>

          <select
            className={styles.dashboardInput}
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

          <label className={styles.dashboardLabel}>
            VIN code
          </label>

          <input
            className={styles.dashboardInput}
            placeholder="Введите VIN code"
            value={vin}
            readOnly
          />

          <label className={styles.dashboardLabel}>
            Наименование запчасти
          </label>

          <input
            className={styles.dashboardInput}
            placeholder="Введите наименование запчасти"
            value={partName}
            onChange={(e) =>
              setPartName(
                e.target.value
              )
            }
          />

          <label className={styles.dashboardLabel}>
            Количество
          </label>

          <input
            className={styles.dashboardInput}
            placeholder="Введите количество"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />

          <button
            className={styles.dashboardSubmit}
            onClick={createRequest}
          >
            ＋ Отправить запрос
          </button>

        </div>

      </section>

      {/* NOTIFICATIONS */}

      <section className={styles.section}>

        <div className={styles.notificationsCard}>

          <h2 className={styles.dashboardSectionTitle}>
            Уведомления
          </h2>

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

                <span>
                  {item.time}
                </span>

              </div>

              <div
                className={
                  styles.notificationArrow
                }
              >
                ›
              </div>

            </div>

          ))}

        </div>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={`${styles.navItem} ${styles.navActive}`}
        >
          <span>🏠</span>
          Главная
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <span>📄</span>
          Запросы
        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >
          <span>💶</span>
          Предложения
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >
          <span>📦</span>
          Заказы
        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.navItem}
        >
          <span>👤</span>
          Профиль
        </Link>

      </nav>

    </main>
  );
}