"use client";

import Image from "next/image";
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

      } else {

        setOrders(data || []);
      }

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

      {/* ACTIVE */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Активные
          </h2>

        </div>

        <div className={styles.offerGrid}>

          {activeOrders.length === 0 && (

            <div className={styles.profileCard}>

              <p className={styles.addressText}>
                Нет активных заказов
              </p>

            </div>

          )}

          {activeOrders.map((item) => (

            <div
              key={item.id}
              className={styles.offerCard}
            >

              {/* IMAGE */}

              {item.product_image && (

                <div
                  className={
                    styles.offerImageWrap
                  }
                >

                  <Image
                    src={item.product_image}
                    alt=""
                    fill
                    className={
                      styles.offerImage
                    }
                  />

                </div>

              )}

              {/* CONTENT */}

              <div
                className={
                  styles.offerContent
                }
              >

                <h2
                  className={
                    styles.offerBrand
                  }
                >
                  {
                    item.part_name ||
                    "Товар"
                  }
                </h2>

                <p
                  className={
                    styles.offerArticle
                  }
                >
                  Артикул:
                  {" "}
                  {
                    item.article ||
                    "—"
                  }
                </p>

                <p
                  className={
                    styles.offerDescription
                  }
                >
                  {
                    item.description ||
                    "Описание отсутствует"
                  }
                </p>

                <div
                  className={
                    styles.offerMeta
                  }
                >

                  <div
                    className={
                      styles.deliveryDate
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
                      styles.offerPrice
                    }
                  >
                    €
                    {" "}
                    {
                      item.offer_price || 0
                    }
                  </div>

                </div>

                <div
                  className={
                    styles.profileCard
                  }
                  style={{
                    marginTop:"10px",
                    padding:"16px",
                  }}
                >

                  <div
                    className={
                      styles.profileRow
                    }
                  >

                    <span>
                      Статус
                    </span>

                    <strong>
                      {
                        getStatusText(
                          item.status
                        )
                      }
                    </strong>

                  </div>

                  <div
                    className={
                      styles.profileRow
                    }
                  >

                    <span>
                      Track номер
                    </span>

                    <strong>
                      {
                        item.track_number ||
                        "—"
                      }
                    </strong>

                  </div>

                  <div
                    className={
                      styles.profileRow
                    }
                  >

                    <span>
                      Оплата
                    </span>

                    <strong>
                      {
                        item.payment_method ||
                        "CARD"
                      }
                    </strong>

                  </div>

                </div>

                <div
                  className={
                    styles.checkoutSection
                  }
                  style={{
                    marginBottom:0,
                    marginTop:"18px",
                  }}
                >

                  <label
                    className={
                      styles.checkoutLabel
                    }
                  >
                    Адрес доставки
                  </label>

                  <div
                    className={
                      styles.profileCard
                    }
                    style={{
                      padding:"16px",
                    }}
                  >

                    <p
                      className={
                        styles.addressText
                      }
                    >
                      {
                        item.delivery_address ||
                        "—"
                      }
                    </p>

                  </div>

                </div>

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

        </div>

        {deliveredOrders.length === 0 && (

          <div className={styles.profileCard}>

            <p className={styles.addressText}>
              Пока нет доставленных заказов
            </p>

          </div>

        )}

        {deliveredOrders.map((item) => (

          <div
            key={item.id}
            className={styles.orderCard}
          >

            <div>

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
                styles.statusBadge
              }
            >
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