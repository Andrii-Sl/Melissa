"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadOrders();

    const channel =
      supabase
        .channel("client-orders")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"orders",
          },
          () => {
            loadOrders();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, []);

  async function getClientPhone() {

    try {

      const {
        data:{
          session,
        },
      } =
        await supabase.auth.getSession();

      let phone =
        session?.user?.phone;

      if (!phone) {

        const phoneCookie =
          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "client_phone="
              )
            )
            ?.split("=")[1];

        if (phoneCookie)
          phone = phoneCookie;
      }

      return phone;

    } catch (error) {

      console.error(error);

      return null;
    }
  }

  async function loadOrders() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setOrders([]);

        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("orders")
          .select(`
            *,
            offers (
              brand,
              article,
              description,
              product_image
            )
          `)
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

      if (error) {

        console.error(error);

        setOrders([]);

      } else {

        setOrders(data || []);
      }

    } catch (error) {

      console.error(error);

      setOrders([]);

    } finally {

      setLoading(false);
    }
  }

  function getStatusText(
    status:string
  ) {

    if (status === "DELIVERED")
      return "Доставлен";

    if (status === "SHIPPED")
      return "Отправлен";

    if (status === "PROCESS")
      return "В обработке";

    return "Новый";
  }

  const activeOrders =
    orders.filter(
      (item) =>
        item.status !==
        "DELIVERED"
    );

  const deliveredOrders =
    orders.filter(
      (item) =>
        item.status ===
        "DELIVERED"
    );

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
          Заказы
        </h1>

        <p className={styles.phone}>
          Активных:
          {" "}
          {activeOrders.length}
        </p>

      </section>

      {/* ACTIVE */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Активные заказы
          </h2>

        </div>

        {activeOrders.length === 0 && (

          <div className={styles.card}>

            <strong>
              Нет активных заказов
            </strong>

          </div>

        )}

        {activeOrders.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            {item.offers?.product_image && (

              <img
                src={
                  item.offers.product_image
                }
                alt=""
                style={{
                  width:"100%",
                  borderRadius:"20px",
                  marginBottom:"16px",
                }}
              />

            )}

            <strong
              style={{
                fontSize:"22px",
              }}
            >
              {
                item.offers?.brand ||
                "Товар"
              }
            </strong>

            <p>
              Артикул:
              {" "}
              {
                item.offers?.article ||
                "—"
              }
            </p>

            <p>
              {
                item.offers?.description ||
                "Описание отсутствует"
              }
            </p>

            <p>
              Цена:
              {" "}
              €
              {" "}
              {
                item.offer_price || 0
              }
            </p>

            <p>
              Доставка:
              {" "}
              {
                item.delivery_days || 0
              }
              {" "}
              дн.
            </p>

            <p>
              Адрес:
              {" "}
              {
                item.delivery_address ||
                "—"
              }
            </p>

            <p>
              Track:
              {" "}
              {
                item.track_number ||
                "—"
              }
            </p>

            <div className={styles.badge}>

              {
                getStatusText(
                  item.status
                )
              }

            </div>

          </div>

        ))}

      </section>

      {/* DELIVERED */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Доставленные
          </h2>

        </div>

        {deliveredOrders.length === 0 && (

          <div className={styles.card}>

            <strong>
              Нет доставленных заказов
            </strong>

          </div>

        )}

        {deliveredOrders.map((item) => (

          <div
            key={item.id}
            className={styles.card}
            style={{
              padding:"16px",
            }}
          >

            <strong>
              {
                item.offers?.brand ||
                "Товар"
              }
            </strong>

            <p>
              €
              {" "}
              {
                item.offer_price || 0
              }
            </p>

            <div className={styles.badgeGreen}>
              Доставлен
            </div>

          </div>

        ))}

      </section>

      {/* NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
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
          className={`${styles.navItem} ${styles.navItemActive}`}
        >

          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>

        </Link>

      </nav>

    </main>
  );
}