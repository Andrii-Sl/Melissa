"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [activeTab, setActiveTab] =
    useState("ACTIVE");

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
            id,
            status,
            offer_price,
            delivery_days,
            delivery_address,
            payment_method,
            track_number,
            created_at,
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

  function getPaymentText(
    method:string
  ) {

    if (method === "CARD")
      return "Банковская карта";

    if (method === "CASH")
      return "Наличные";

    if (method === "TRANSFER")
      return "Банковский перевод";

    return "—";
  }

  const activeOrders =
    useMemo(
      () =>
        orders.filter(
          (item) =>
            item.status !==
            "DELIVERED"
        ),
      [orders]
    );

  const deliveredOrders =
    useMemo(
      () =>
        orders.filter(
          (item) =>
            item.status ===
            "DELIVERED"
        ),
      [orders]
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

      {/* TABS */}

      <section
        className={styles.section}
        style={{
          paddingTop:"0",
        }}
      >

        <div
          style={{
            display:"flex",
            gap:"10px",
          }}
        >

          <button
            className={
              activeTab === "ACTIVE"
                ? styles.createBtn
                : styles.logoutWhiteBtn
            }
            onClick={() =>
              setActiveTab(
                "ACTIVE"
              )
            }
          >
            Активные
          </button>

          <button
            className={
              activeTab === "DELIVERED"
                ? styles.createBtn
                : styles.logoutWhiteBtn
            }
            onClick={() =>
              setActiveTab(
                "DELIVERED"
              )
            }
          >
            Доставленные
          </button>

        </div>

      </section>

      {/* ACTIVE ORDERS */}

      {activeTab === "ACTIVE" && (

        <section className={styles.section}>

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
                    item.offers
                      .product_image
                  }
                  alt=""
                  style={{
                    width:"100%",
                    borderRadius:"20px",
                    marginBottom:"16px",
                    objectFit:"cover",
                  }}
                />

              )}

              <strong
                style={{
                  fontSize:"24px",
                  display:"block",
                  marginBottom:"10px",
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
                  item.offers
                    ?.description ||
                  "Описание отсутствует"
                }
              </p>

              <p>
                Срок доставки:
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
                {
                  item.offer_price || 0
                }
              </div>

              <p>
                Адрес доставки:
                {" "}
                {
                  item.delivery_address ||
                  "—"
                }
              </p>

              <p>
                Способ оплаты:
                {" "}
                {
                  getPaymentText(
                    item.payment_method
                  )
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

              <div
                className={
                  item.status ===
                  "SHIPPED"
                    ? styles.badgeBlue
                    : styles.badge
                }
                style={{
                  marginTop:"14px",
                }}
              >

                {
                  getStatusText(
                    item.status
                  )
                }

              </div>

            </div>

          ))}

        </section>

      )}

      {/* DELIVERED */}

      {activeTab === "DELIVERED" && (

        <section className={styles.section}>

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
                display:"flex",
                alignItems:"center",
                justifyContent:"space-between",
                gap:"14px",
                padding:"14px 18px",
              }}
            >

              <div
                style={{
                  display:"flex",
                  alignItems:"center",
                  gap:"14px",
                }}
              >

                {item.offers?.product_image && (

                  <img
                    src={
                      item.offers
                        .product_image
                    }
                    alt=""
                    style={{
                      width:"70px",
                      height:"70px",
                      borderRadius:"14px",
                      objectFit:"cover",
                    }}
                  />

                )}

                <div>

                  <strong>
                    {
                      item.offers?.brand ||
                      "Товар"
                    }
                  </strong>

                  <p
                    style={{
                      marginTop:"4px",
                    }}
                  >
                    €
                    {" "}
                    {
                      item.offer_price || 0
                    }
                  </p>

                </div>

              </div>

              <div
                className={
                  styles.badgeGreen
                }
              >
                Доставлен
              </div>

            </div>

          ))}

        </section>

      )}

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