"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [user, setUser] =
    useState<any>(null);

  const [profile, setProfile] =
    useState<any>(null);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [offers, setOffers] =
    useState<any[]>([]);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [vin, setVin] =
    useState("");

  const [part, setPart] =
    useState("");

  const [number, setNumber] =
    useState("");

  useEffect(() => {
    loadData();
  }, []);

  async function loadData() {

    try {

      /* MASTER */

      const urlParams =
        new URLSearchParams(
          window.location.search
        );

      const master =
        urlParams.get(
          "master"
        );

      if (
        master ===
        "1424"
      ) {

        setUser({
          phone:
            "MASTER",
        });

        setProfile({
          full_name:
            "Владелец",
          phone:
            "MASTER ACCESS",
        });

        const {
          data: req,
        } =
          await supabase
            .from("requests")
            .select("*")
            .order("id", {
              ascending:
                false,
            });

        setRequests(req || []);

        setLoading(false);

        return;
      }

      /* SESSION */

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      /* TEST CLIENT */

      if (!session) {

        const role =
          document.cookie.includes(
            "role=client"
          );

        if (role) {

          const phone =
            "+48519000000";

          setUser({
            phone,
          });

          const {
            data: p,
          } =
            await supabase
              .from("profiles")
              .select("*")
              .eq(
                "phone",
                phone
              )
              .maybeSingle();

          setProfile(p);

          /* REQUESTS */

          const {
            data: req,
          } =
            await supabase
              .from("requests")
              .select("*")
              .eq(
                "phone",
                phone
              )
              .order("id", {
                ascending:
                  false,
              });

          setRequests(req || []);

          /* OFFERS */

          const {
            data: off,
          } =
            await supabase
              .from("offers")
              .select("*")
              .eq(
                "phone",
                phone
              )
              .order("id", {
                ascending:
                  false,
              });

          setOffers(off || []);

          /* ORDERS */

          const {
            data: ord,
          } =
            await supabase
              .from("orders")
              .select("*")
              .eq(
                "phone",
                phone
              )
              .order("id", {
                ascending:
                  false,
              });

          setOrders(ord || []);

          setLoading(false);

          return;
        }

        window.location.href =
          "/login";

        return;
      }

      /* NORMAL USER */

      const currentUser =
        session.user;

      setUser(currentUser);

      const {
        data: p,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .maybeSingle();

      setProfile(p);

      /* REQUESTS */

      const {
        data: req,
      } =
        await supabase
          .from("requests")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .order("id", {
            ascending:
              false,
          });

      setRequests(req || []);

      /* OFFERS */

      const {
        data: off,
      } =
        await supabase
          .from("offers")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .order("id", {
            ascending:
              false,
          });

      setOffers(off || []);

      /* ORDERS */

      const {
        data: ord,
      } =
        await supabase
          .from("orders")
          .select("*")
          .eq(
            "phone",
            currentUser.phone
          )
          .order("id", {
            ascending:
              false,
          });

      setOrders(ord || []);

      setLoading(false);

    } catch (e) {

      console.error(e);

      setLoading(false);
    }
  }

  /* NEW REQUEST */

  async function createRequest() {

    if (!vin && !part)
      return;

    const phone =
      profile?.phone ||
      user?.phone;

    const {
      data,
    } =
      await supabase
        .from("requests")
        .insert([
          {
            vin,
            phone,
            part_name:
              part,
            part_number:
              number,
            status:
              "new",
          },
        ])
        .select()
        .single();

    if (data) {

      setRequests([
        data,
        ...requests,
      ]);

      setVin("");
      setPart("");
      setNumber("");
    }
  }

  /* STATUS */

  function requestStatus(
    status: string
  ) {

    if (status === "new")
      return "🟡 Новая";

    if (status === "search")
      return "🔵 В подборе";

    if (status === "found")
      return "🟢 Предложение готово";

    return status;
  }

  if (loading) {

    return (
      <main className={styles.page}>
        <div className={styles.loading}>
          Загрузка...
        </div>
      </main>
    );
  }

  return (
    <main className={styles.page}>

      {/* HERO */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Здравствуйте,
          <br />
          {profile?.full_name ||
            "Клиент"}
        </h1>

        <p className={styles.phone}>
          {profile?.phone ||
            user?.phone}
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
            {requests.length}
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
            {offers.length}
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
            {orders.length}
          </div>

          <div className={styles.statLabel}>
            Заказы
          </div>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.green}`}
            >
              ✅
            </div>

          </div>

          <div className={styles.statValue}>
            12
          </div>

          <div className={styles.statLabel}>
            Выполнено
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
              setVin(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Описание детали"
            value={part}
            onChange={(e) =>
              setPart(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Каталожный номер"
            value={number}
            onChange={(e) =>
              setNumber(
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

        {requests.map((item) => (

          <Link
            href={`/dashboard/requests/${item.id}`}
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.part_name ||
                "Запрос"}
            </strong>

            <p>
              {item.vin ||
                "VIN не указан"}
            </p>

            <div className={styles.badge}>
              {requestStatus(
                item.status
              )}
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

        {offers.map((item) => (

          <Link
            href={`/dashboard/offers/${item.id}`}
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand ||
                "Предложение"}
            </strong>

            <div className={styles.price}>
              €{item.price || 0}
            </div>

            <div className={styles.badge}>
              {item.availability ||
                "Под заказ"}
            </div>

            <button
              className={styles.offerBtn}
            >
              Оплатить
            </button>

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

        {orders.map((item) => (

          <Link
            href={`/dashboard/orders/${item.id}`}
            key={item.id}
            className={styles.card}
          >

            <strong>
              Заказ #{item.id}
            </strong>

            <p>
              {item.tracking ||
                "Трек номер появится позже"}
            </p>

            <div className={styles.badge}>
              {item.status ||
                "В обработке"}
            </div>

            <div className={styles.steps}>

              <div className={styles.step}>
                <div className={styles.dot}></div>

                <span>
                  Оплата
                </span>
              </div>

              <div className={styles.step}>
                <div className={styles.dot}></div>

                <span>
                  Отправка
                </span>
              </div>

              <div className={styles.step}>
                <div className={styles.dot}></div>

                <span>
                  Доставка
                </span>
              </div>

            </div>

          </Link>
        ))}

      </section>

      {/* PROFILE */}

      <section className={styles.profile}>

        <div className={styles.sectionTop}>

          <h2 className={styles.blockTitle}>
            Профиль
          </h2>

          <Link
            href="/dashboard/profile"
            className={styles.more}
          >
            Открыть
          </Link>

        </div>

        <div className={styles.profileCard}>

          <div className={styles.profileItem}>

            <strong>
              Имя
            </strong>

            <p>
              {profile?.full_name}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Телефон
            </strong>

            <p>
              {profile?.phone}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Адрес доставки
            </strong>

            <p>
              Slovenia, Ljubljana
            </p>

          </div>

        </div>

      </section>

    </main>
  );
}