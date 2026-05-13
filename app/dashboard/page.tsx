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

  const [creating, setCreating] =
    useState(false);

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

  /* GARAGE */

  const [garageCars, setGarageCars] =
    useState<any[]>([]);

  /* REQUEST FORM */

  const [car, setCar] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [partName, setPartName] =
    useState("");

  const [quantity, setQuantity] =
    useState("1");

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
        garageResult,
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

        /* GARAGE */

        supabase
          .from("garage")
          .select("*")
          .eq(
            "client_phone",
            cleanPhone
          ),

      ]);

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

      /* GARAGE */

      setGarageCars(
        garageResult.data || []
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

  /* SELECT CAR */

  function handleSelectCar(
    value:string
  ) {

    setCar(value);

    const selectedCar =
      garageCars.find(
        (item) =>
          (
            item.car ||
            item.name ||
            ""
          ) === value
      );

    if (selectedCar) {

      setVin(
        selectedCar.vin || ""
      );
    }
  }

  /* CREATE REQUEST */

  async function createRequest(
    e:any
  ) {

    e.preventDefault();

    if (
      !car ||
      !vin ||
      !partName ||
      !quantity
    ) {

      alert(
        "Заполните все поля"
      );

      return;
    }

    try {

      setCreating(true);

      const phone =
        await getClientPhone();

      if (!phone) {

        alert(
          "Ошибка авторизации"
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
              car,
              vin,
              part_name:
                partName,
              quantity:
                Number(quantity),
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

      /* CLEAR FORM */

      setCar("");
      setVin("");
      setPartName("");
      setQuantity("1");

      /* RELOAD */

      await loadData(phone);

      alert(
        "Запрос успешно создан"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );

    } finally {

      setCreating(false);
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

      {/* NEW REQUEST */}

      <section className={styles.section}>

        <div className={styles.dashboardBox}>

          <h2 className={styles.sectionTitle}>
            Новый запрос
          </h2>

          <form
            className={styles.requestForm}
            onSubmit={createRequest}
          >

            {/* CAR */}

            <div className={styles.formGroup}>

              <label className={styles.formLabel}>
                Автомобиль
              </label>

              <select
                className={styles.formInput}
                value={car}
                onChange={(e) =>
                  handleSelectCar(
                    e.target.value
                  )
                }
              >

                <option value="">
                  Выберите из гаража
                </option>

                {garageCars.map((item) => (

                  <option
                    key={item.id}
                    value={
                      item.car ||
                      item.name
                    }
                  >

                    {
                      item.car ||
                      item.name
                    }

                  </option>

                ))}

              </select>

            </div>

            {/* VIN */}

            <div className={styles.formGroup}>

              <label className={styles.formLabel}>
                VIN код
              </label>

              <input
                type="text"
                placeholder="VIN код"
                className={styles.formInput}
                value={vin}
                readOnly
              />

            </div>

            {/* PART */}

            <div className={styles.formGroup}>

              <label className={styles.formLabel}>
                Наименование запчасти
              </label>

              <input
                type="text"
                placeholder="Например: Передний бампер"
                className={styles.formInput}
                value={partName}
                onChange={(e) =>
                  setPartName(
                    e.target.value
                  )
                }
              />

            </div>

            {/* QUANTITY */}

            <div className={styles.formGroup}>

              <label className={styles.formLabel}>
                Количество
              </label>

              <input
                type="number"
                placeholder="1"
                className={styles.formInput}
                value={quantity}
                onChange={(e) =>
                  setQuantity(
                    e.target.value
                  )
                }
              />

            </div>

            {/* BUTTON */}

            <button
              type="submit"
              className={styles.submitButton}
            >

              {
                creating
                  ? "Создание..."
                  : "Сделать запрос"
              }

            </button>

          </form>

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