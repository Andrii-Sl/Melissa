"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedOrder, setSelectedOrder] =
    useState<any>(null);

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

  useEffect(() => {

    loadData();

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
            loadData();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  async function loadData() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setLoading(false);

        return;
      }

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

      const {
        data,
        error,
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
          );

      if (error) {

        console.error(error);

        setOrders([]);

      } else {

        setOrders(data || []);
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  function formatDate(
    value:string
  ) {

    if (!value)
      return "—";

    return new Date(value)
      .toLocaleDateString(
        "ru-RU",
        {
          day:"numeric",
          month:"long",
          year:"numeric",
        }
      );
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

  function getTotalPrice(
    price:number
  ) {

    return (
      Number(price || 0) + 8.9
    ).toFixed(2);
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
              История покупок
            </p>

            <h1 className={styles.mainTitle}>
              Мои заказы
            </h1>

          </div>

        </div>

      </header>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.offerListModern}>

          {orders.length === 0 && (

            <div className={styles.emptyCard}>

              <div className={styles.emptyIcon}>
                📦
              </div>

              <strong>
                Пока нет заказов
              </strong>

            </div>

          )}

          {orders.map((item) => (

            <button
              key={item.id}
              className={styles.orderModernCard}
              onClick={() =>
                setSelectedOrder(item)
              }
            >

              {/* TOP */}

              <div
                className={
                  styles.orderModernTop
                }
              >

                <div>

                  <h2>
                    Заказ #
                    {item.id}
                  </h2>

                  <p>
                    {
                      formatDate(
                        item.created_at
                      )
                    }
                  </p>

                </div>

                <div
                  className={
                    styles.orderStatusGreen
                  }
                >
                  {
                    getStatusText(
                      item.status
                    )
                  }
                </div>

              </div>

              {/* PRODUCT */}

              <div
                className={
                  styles.orderModernProduct
                }
              >

                <div
                  className={
                    styles.orderModernImage
                  }
                >

                  {item.product_image && (

                    <Image
                      src={
                        item.product_image
                      }
                      alt=""
                      fill
                      className={
                        styles.offerImage
                      }
                    />

                  )}

                </div>

                <div
                  className={
                    styles.orderModernInfo
                  }
                >

                  <strong>
                    {
                      item.part_name ||
                      "Товар"
                    }
                  </strong>

                  <span>
                    Артикул:
                    {" "}
                    {
                      item.article ||
                      "—"
                    }
                  </span>

                </div>

                <div
                  className={
                    styles.orderArrow
                  }
                >
                  ›
                </div>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* FULLSCREEN */}

      {selectedOrder && (

        <div
          className={styles.checkoutFullscreen}
        >

          {/* TOP */}

          <div
            className={styles.checkoutTop}
          >

            <button
              className={styles.backButton}
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              ←
            </button>

            <h2>
              Мои заказы
            </h2>

          </div>

          {/* ORDER */}

          <div
            className={styles.checkoutCard}
          >

            <div
              className={
                styles.orderModernTop
              }
            >

              <div>

                <h2>
                  Заказ #
                  {selectedOrder.id}
                </h2>

                <p>
                  {
                    formatDate(
                      selectedOrder.created_at
                    )
                  }
                </p>

              </div>

              <div
                className={
                  styles.orderStatusGreen
                }
              >
                {
                  getStatusText(
                    selectedOrder.status
                  )
                }
              </div>

            </div>

            <div
              className={
                styles.orderModernProduct
              }
            >

              <div
                className={
                  styles.orderModernImage
                }
              >

                {selectedOrder.product_image && (

                  <Image
                    src={
                      selectedOrder.product_image
                    }
                    alt=""
                    fill
                    className={
                      styles.offerImage
                    }
                  />

                )}

              </div>

              <div
                className={
                  styles.orderModernInfo
                }
              >

                <strong>
                  {
                    selectedOrder.part_name
                  }
                </strong>

                <span>
                  Артикул:
                  {" "}
                  {
                    selectedOrder.article
                  }
                </span>

              </div>

            </div>

          </div>

          {/* ADDRESS */}

          <div
            className={styles.checkoutCard}
          >

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
              📍 Адрес доставки
            </div>

            <div
              className={
                styles.addressModern
              }
            >

              <strong>
                {
                  profile?.first_name
                }
                {" "}
                {
                  profile?.last_name
                }
              </strong>

              <p>
                {
                  selectedOrder.delivery_address ||
                  "Не указан"
                }
              </p>

              <span>
                {
                  profile?.phone
                }
              </span>

            </div>

          </div>

          {/* TOTAL */}

          <div
            className={styles.checkoutCard}
          >

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
              📄 Итог заказа
            </div>

            <div
              className={
                styles.totalRow
              }
            >

              <span>
                Товар
              </span>

              <strong>
                €
                {" "}
                {
                  selectedOrder.offer_price
                }
              </strong>

            </div>

            <div
              className={
                styles.totalRow
              }
            >

              <span>
                Доставка
              </span>

              <strong>
                € 8.90
              </strong>

            </div>

            <div
              className={
                styles.totalDivider
              }
            />

            <div
              className={
                styles.totalRowBig
              }
            >

              <span>
                Итого к оплате
              </span>

              <strong>
                €
                {" "}
                {
                  getTotalPrice(
                    selectedOrder.offer_price
                  )
                }
              </strong>

            </div>

          </div>

          {/* INFO */}

          <div
            className={styles.checkoutCard}
          >

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
              📄 Информация о заказе
            </div>

            <div
              className={
                styles.orderInfoRow
              }
            >

              <span>
                Track номер
              </span>

              <strong>
                {
                  selectedOrder.track_number ||
                  "—"
                }
              </strong>

            </div>

            <div
              className={
                styles.orderInfoRow
              }
            >

              <span>
                Оплата
              </span>

              <strong>
                {
                  selectedOrder.payment_method ||
                  "CARD"
                }
              </strong>

            </div>

            <div
              className={
                styles.orderInfoRow
              }
            >

              <span>
                Статус
              </span>

              <div
                className={
                  styles.orderStatusGreen
                }
              >
                {
                  getStatusText(
                    selectedOrder.status
                  )
                }
              </div>

            </div>

            <button
              className={
                styles.repeatOrderButton
              }
            >
              ↻ Повторить заказ
            </button>

          </div>

        </div>

      )}

      {/* NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >
          <span>🏠</span>
          Главная
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <span>📄</span>
          Заявки
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
          className={`${styles.navItem} ${styles.navActive}`}
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