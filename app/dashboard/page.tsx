"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
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

  /* LOGOUT */

  async function logout() {

    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    await supabase.auth.signOut();

    window.location.href =
      "/";
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

      {/* TOP */}

      <section className={styles.hero}>

        <div className={styles.topRow}>

          <div>

            <div className={styles.label}>
              ЛИЧНЫЙ КАБИНЕТ
            </div>

            <h1 className={styles.name}>
              {profile?.full_name ||
                "Клиент"}
            </h1>

            <p className={styles.phone}>
              {profile?.phone ||
                user?.phone}
            </p>

          </div>

          <button
            className={styles.logout}
            onClick={logout}
          >
            Выйти
          </button>

        </div>

      </section>

      {/* CREATE REQUEST */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Новая заявка</h2>
        </div>

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
          <h2>Заявки</h2>
        </div>

        <div className={styles.grid}>

          {requests.map((item) => (

            <div
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

              <span>
                {requestStatus(
                  item.status
                )}
              </span>

            </div>
          ))}

        </div>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Предложения</h2>
        </div>

        <div className={styles.grid}>

          {offers.map((item) => (

            <div
              key={item.id}
              className={styles.card}
            >

              <strong>
                {item.brand}
              </strong>

              <p>
                €{item.price}
              </p>

              <span>
                {item.availability}
              </span>

              <button
                className={styles.payBtn}
              >
                Оплатить
              </button>

            </div>
          ))}

        </div>

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Заказы</h2>
        </div>

        <div className={styles.grid}>

          {orders.map((item) => (

            <div
              key={item.id}
              className={styles.card}
            >

              <strong>
                Заказ #{item.id}
              </strong>

              <p>
                {item.tracking ||
                  "Без трека"}
              </p>

              <span>
                {item.status}
              </span>

            </div>
          ))}

        </div>

      </section>

      {/* SETTINGS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>Настройки</h2>
        </div>

        <div className={styles.settings}>

          <div className={styles.settingCard}>
            <strong>
              Имя
            </strong>
            <p>
              {profile?.full_name}
            </p>
          </div>

          <div className={styles.settingCard}>
            <strong>
              Телефон
            </strong>
            <p>
              {profile?.phone}
            </p>
          </div>

        </div>

      </section>

    </main>
  );
}