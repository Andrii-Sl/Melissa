"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* REQUEST */

  const [vin, setVin] =
    useState("");

  const [car, setCar] =
    useState("");

  const [partName, setPartName] =
    useState("");

  const [quantity, setQuantity] =
    useState("1");

  /* COUNTERS */

  const [requestsCount, setRequestsCount] =
    useState(0);

  const [offersCount, setOffersCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  /* TOTALS */

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

  const [notifications, setNotifications] =
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

      setRequestsCount(
        reqActive || 0
      );

      setOffersCount(
        offActive || 0
      );

      setOrdersCount(
        ordActive || 0
      );

      setRequestsTotal(
        reqTotal || 0
      );

      setOffersTotal(
        offTotal || 0
      );

      setOrdersTotal(
        ordTotal || 0
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

      /* NOTIFICATIONS */

      const notificationsData =
        [
          {
            id:1,
            text:
              "Ваш запрос получил новые предложения",
            time:
              "10 мин назад",
          },
          {
            id:2,
            text:
              "Заказ обновлен",
            time:
              "1 час назад",
          },
        ];

      setNotifications(
        notificationsData
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
              part_name:
                partName,
              status:"NEW",
              client_phone:
                phone,
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

      loadData();

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

      <section className={styles.dashboardHero}>

        <div>

          <p className={styles.dashboardSubtitle}>
            Кабинет клиента
          </p>

          <h1 className={styles.dashboardTitle}>
            Здравствуйте,
            {" "}
            {
              profile?.first_name ||
              "Клиент"
            }
          </h1>

          <p className={styles.dashboardPhone}>
            {
              profile?.phone ||
              "Телефон не указан"
            }
          </p>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardProfile}
        >
          👤
        </Link>

      </section>

      {/* GRID */}

      <section className={styles.dashboardGrid}>

        <Link
          href="/dashboard/requests"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardHead}>

            <span className={styles.dashboardEmoji}>
              📄
            </span>

            <h3>
              Запросы
            </h3>

          </div>

          <div className={styles.dashboardNumbers}>

            <strong>
              {requestsCount}
            </strong>

            <span>
              {requestsTotal}
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardHead}>

            <span className={styles.dashboardEmoji}>
              💶
            </span>

            <h3>
              Предложения
            </h3>

          </div>

          <div className={styles.dashboardNumbers}>

            <strong>
              {offersCount}
            </strong>

            <span>
              {offersTotal}
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardHead}>

            <span className={styles.dashboardEmoji}>
              📦
            </span>

            <h3>
              Заказы
            </h3>

          </div>

          <div className={styles.dashboardNumbers}>

            <strong>
              {ordersCount}
            </strong>

            <span>
              {ordersTotal}
            </span>

          </div>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardCard}
        >

          <div className={styles.dashboardCardHead}>

            <span className={styles.dashboardEmoji}>
              👤
            </span>

            <h3>
              Профиль
            </h3>

          </div>

          <div className={styles.dashboardNumbers}>

            <strong>
              1
            </strong>

            <span>
              1
            </span>

          </div>

        </Link>

      </section>

      {/* REQUEST FORM */}

      <section className={styles.section}>

        <div className={styles.dashboardBox}>

          <h2 className={styles.sectionTitle}>
            Новый запрос
          </h2>

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

          <input
            className={styles.dashboardInput}
            placeholder="VIN code"
            value={vin}
            readOnly
          />

          <input
            className={styles.dashboardInput}
            placeholder="Наименование запчасти"
            value={partName}
            onChange={(e) =>
              setPartName(
                e.target.value
              )
            }
          />

          <input
            className={styles.dashboardInput}
            placeholder="Количество"
            value={quantity}
            onChange={(e) =>
              setQuantity(
                e.target.value
              )
            }
          />

          <button
            className={styles.dashboardButton}
            onClick={createRequest}
          >
            Отправить запрос
          </button>

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
                  className={styles.notificationLeft}
                >

                  <div
                    className={styles.notificationDot}
                  />

                  <div>

                    <strong>
                      {item.text}
                    </strong>

                    <p>
                      {item.time}
                    </p>

                  </div>

                </div>

                <span>
                  ›
                </span>

              </div>

            ))}

          </div>

        </div>

      </section>

      <BottomNav />

    </main>
  );
}