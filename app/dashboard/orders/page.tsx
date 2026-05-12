"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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

  async function loadOrders() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setLoading(false);

        return;
      }

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

        return;
      }

      setOrders(data || []);

    } catch (error) {

      console.error(error);

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

  function getStatusClass(
    status:string
  ) {

    if (status === "DELIVERED")
      return styles.statusGreen;

    if (status === "SHIPPED")
      return styles.statusBlue;

    if (status === "PROCESS")
      return styles.statusOrange;

    return styles.statusGray;
  }

  function getDeliveryDate(
    days:number
  ) {

    const date =
      new Date();

    date.setDate(
      date.getDate() +
      Number(days || 0)
    );

    return date.toLocaleDateString(
      "ru-RU",
      {
        day:"numeric",
        month:"long",
      }
    );
  }

  function formatPayment(
    method:string
  ) {

    if (method === "PAYPAL")
      return "PayPal";

    return "Банковская карта";
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

      {/* HEADER */}

      <header className={styles.header}>

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              История заказов
            </p>

            <h1 className={styles.mainTitle}>
              Заказы
            </h1>

          </div>

        </div>

      </header>

      {/* ACTIVE ORDERS */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Активные
          </h2>

          <span className={styles.counterBadge}>
            {activeOrders.length}
          </span>

        </div>

        <div className={styles.offerGrid}>

          {activeOrders.length === 0 && (

            <div className={styles.emptyCard}>

              <div className={styles.emptyIcon}>
                📦
              </div>

              <strong>
                Нет активных заказов
              </strong>

              <p>
                Здесь появятся ваши заказы
              </p>

            </div>

          )}

          {activeOrders.map((item) => (

            <div
              key={item.id}
              className={styles.orderPremiumCard}
            >

              {/* IMAGE */}

              {item.product_image && (

                <div
                  className={
                    styles.orderImageWrap
                  }
                >

                  <Image
                    src={item.product_image}
                    alt=""
                    fill
                    className={
                      styles.orderImage
                    }
                  />

                </div>

              )}

              {/* TOP */}

              <div
                className={
                  styles.orderTop
                }
              >

                <div>

                  <h2
                    className={
                      styles.orderTitle
                    }
                  >
                    {
                      item.part_name ||
                      "Товар"
                    }
                  </h2>

                  <p
                    className={
                      styles.orderArticle
                    }
                  >
                    Артикул:
                    {" "}
                    {
                      item.article ||
                      "—"
                    }
                  </p>

                </div>

                <div
                  className={
                    getStatusClass(
                      item.status
                    )
                  }
                >
                  {
                    getStatusText(
                      item.status
                    )
                  }
                </div>

              </div>

              {/* DESCRIPTION */}

              <p
                className={
                  styles.orderDescription
                }
              >
                {
                  item.description ||
                  "Описание отсутствует"
                }
              </p>

              {/* META */}

              <div
                className={
                  styles.orderMetaGrid
                }
              >

                <div
                  className={
                    styles.metaCard
                  }
                >

                  <span>
                    Доставка
                  </span>

                  <strong>
                    {
                      getDeliveryDate(
                        item.delivery_days
                      )
                    }
                  </strong>

                </div>

                <div
                  className={
                    styles.metaCard
                  }
                >

                  <span>
                    Оплата
                  </span>

                  <strong>
                    {
                      formatPayment(
                        item.payment_method
                      )
                    }
                  </strong>

                </div>

              </div>

              {/* PRICE */}

              <div
                className={
                  styles.orderPriceRow
                }
              >

                <div>

                  <span
                    className={
                      styles.priceLabel
                    }
                  >
                    Сумма заказа
                  </span>

                  <div
                    className={
                      styles.orderPrice
                    }
                  >
                    €
                    {" "}
                    {
                      item.offer_price || 0
                    }
                  </div>

                </div>

              </div>

              {/* TRACK */}

              <div
                className={
                  styles.trackCard
                }
              >

                <div
                  className={
                    styles.trackTop
                  }
                >

                  <span>
                    Track номер
                  </span>

                  <strong>
                    {
                      item.track_number ||
                      "Не присвоен"
                    }
                  </strong>

                </div>

              </div>

              {/* ADDRESS */}

              <div
                className={
                  styles.addressCard
                }
              >

                <span>
                  Адрес доставки
                </span>

                <p>
                  {
                    item.delivery_address ||
                    "—"
                  }
                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* DELIVERED */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Доставленные
          </h2>

          <span className={styles.counterBadge}>
            {deliveredOrders.length}
          </span>

        </div>

        {deliveredOrders.length === 0 && (

          <div className={styles.emptyCard}>

            <div className={styles.emptyIcon}>
              🚚
            </div>

            <strong>
              Пока нет доставленных заказов
            </strong>

          </div>

        )}

        {deliveredOrders.map((item) => (

          <div
            key={item.id}
            className={styles.deliveredCard}
          >

            <div
              className={
                styles.deliveredLeft
              }
            >

              <strong>
                {
                  item.part_name ||
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

            </div>

            <div
              className={
                styles.statusGreen
              }
            >
              Доставлен
            </div>

          </div>

        ))}

      </section>

      {/* NAVIGATION */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
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
          className={`${styles.navItem} ${styles.navActive}`}
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