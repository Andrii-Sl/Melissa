"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  Home,
  FileText,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { getClientPhone }
from "@/lib/getClientPhone";

import styles from "../dashboard.module.css";

export default function OrdersPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [orders, setOrders] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedOrder, setSelectedOrder] =
    useState<any>(null);

  /* LOAD */

  useEffect(() => {

    loadData();

  }, []);

  async function loadData() {

    try {

      const phone =
        await getClientPhone();

      const normalizedPhone =
        phone.trim();

      if (!normalizedPhone) {

        setOrders([]);

        setLoading(false);

        return;
      }

      /* PROFILE */

      const localProfile =
        localStorage.getItem(
          "profile"
        );

      if (localProfile) {

        setProfile(
          JSON.parse(localProfile)
        );
      }

      /* ORDERS */

      const {
        data,
        error,
      } =
        await supabase
          .from("orders")
          .select(`
            id,
            part_name,
            article,
            status,
            created_at,
            product_image,
            offer_price,
            delivery_address,
            payment_method,
            track_number
          `)
          .eq(
            "client_phone",
            normalizedPhone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(20);

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

  /* DATE */

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

  /* STATUS */

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

  /* STATUS STYLE */

  function getStatusClass(
    status:string
  ) {

    if (status === "DELIVERED")
      return styles.orderStatusDelivered;

    if (status === "SHIPPED")
      return styles.orderStatusShipped;

    if (status === "PROCESS")
      return styles.orderStatusProcess;

    return styles.orderStatusNew;
  }

  /* TOTAL */

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

        <div className={styles.logoWrap}>

          <div className={styles.logo}>
            L
          </div>

          <div>

            <div className={styles.brand}>
              LYNKO
            </div>

            <div className={styles.subBrand}>
              Клиентская панель
            </div>

          </div>

        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >

          {
            menuOpen ? (

              <X
                size={24}
                strokeWidth={2.4}
              />

            ) : (

              <Menu
                size={24}
                strokeWidth={2.4}
              />

            )
          }

        </button>

      </header>

      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div className={styles.mobileMenu}>

            <Link
              href="/dashboard"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Главная
            </Link>

            <Link
              href="/dashboard/requests"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Запросы
            </Link>

            <Link
              href="/dashboard/offers"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Предложения
            </Link>

            <Link
              href="/dashboard/orders"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Заказы
            </Link>

            <Link
              href="/dashboard/profile"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Профиль
            </Link>

          </div>

        )
      }

      {/* HERO */}

      <section className={styles.hero}>

        <div className={styles.welcome}>
          ИСТОРИЯ ПОКУПОК
        </div>

        <h1 className={styles.name}>
          Заказы
        </h1>

        <p className={styles.subtitle}>
          Всего заказов:
          {" "}
          {orders.length}
        </p>

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.ordersList}>

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
              type="button"
              className={styles.orderModernCard}
              onClick={() =>
                setSelectedOrder(item)
              }
            >

              <div className={styles.orderModernTop}>

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

                <div className={`${styles.orderStatusBadge} ${getStatusClass(item.status)}`}>
                  {
                    getStatusText(
                      item.status
                    )
                  }
                </div>

              </div>

              <div className={styles.orderModernProduct}>

                <div className={styles.orderModernImage}>

                  {item.product_image ? (

                    <Image
                      src={item.product_image}
                      alt=""
                      fill
                      className={styles.offerImage}
                    />

                  ) : (

                    <div className={styles.imagePlaceholder}>
                      📦
                    </div>

                  )}

                </div>

                <div className={styles.orderModernInfo}>

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

                <div className={styles.orderArrow}>
                  ›
                </div>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* FULLSCREEN */}

      {selectedOrder && (

        <div className={styles.checkoutFullscreen}>

          <div className={styles.checkoutTop}>

            <button
              type="button"
              className={styles.backButton}
              onClick={() =>
                setSelectedOrder(null)
              }
            >
              ←
            </button>

            <h2>
              Информация о заказе
            </h2>

          </div>

          <div className={styles.checkoutCard}>

            <div className={styles.orderModernTop}>

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

              <div className={`${styles.orderStatusBadge} ${getStatusClass(selectedOrder.status)}`}>
                {
                  getStatusText(
                    selectedOrder.status
                  )
                }
              </div>

            </div>

            <div className={styles.orderModernProduct}>

              <div className={styles.orderModernImage}>

                {selectedOrder.product_image ? (

                  <Image
                    src={selectedOrder.product_image}
                    alt=""
                    fill
                    className={styles.offerImage}
                  />

                ) : (

                  <div className={styles.imagePlaceholder}>
                    📦
                  </div>

                )}

              </div>

              <div className={styles.orderModernInfo}>

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

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutSectionTitle}>
              📍 Адрес доставки
            </div>

            <div className={styles.addressModern}>

              <strong>
                {profile?.first_name}
                {" "}
                {profile?.last_name}
              </strong>

              <p>
                {
                  selectedOrder.delivery_address ||
                  "Не указан"
                }
              </p>

              <span>
                {profile?.phone}
              </span>

            </div>

          </div>

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutSectionTitle}>
              📄 Итог заказа
            </div>

            <div className={styles.totalRow}>

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

            <div className={styles.totalRow}>

              <span>
                Доставка
              </span>

              <strong>
                € 8.90
              </strong>

            </div>

            <div className={styles.totalDivider} />

            <div className={styles.totalRowBig}>

              <span>
                Итого
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

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutSectionTitle}>
              📄 Информация
            </div>

            <div className={styles.orderInfoRow}>

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

            <div className={styles.orderInfoRow}>

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

            <div className={styles.orderInfoRow}>

              <span>
                Статус
              </span>

              <div className={`${styles.orderStatusBadge} ${getStatusClass(selectedOrder.status)}`}>
                {
                  getStatusText(
                    selectedOrder.status
                  )
                }
              </div>

            </div>

            <button
              type="button"
              className={styles.repeatOrderButton}
            >
              ↻ Повторить заказ
            </button>

          </div>

        </div>

      )}

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link href="/dashboard">

          <Home
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/requests">

          <FileText
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/offers">

          <MessageCircle
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.activeNav}
        >

          <ShoppingBag
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/profile">

          <User
            size={22}
            strokeWidth={2.3}
          />

        </Link>

      </nav>

    </main>
  );
}