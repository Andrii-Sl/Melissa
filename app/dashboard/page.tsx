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

    const garageChannel =
      supabase
        .channel("dashboard-garage")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"garage",
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

      supabase.removeChannel(
        garageChannel
      );
    };

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
          .select("*")
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
            "*",
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

      /* ACTIVE OFFERS COUNT */

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
          )
          .eq(
            "payment_status",
            "PENDING"
          );

      /* ORDERS WITHOUT DELIVERED */

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

  /* SELECT GARAGE CAR */

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

    </main>
  );
}