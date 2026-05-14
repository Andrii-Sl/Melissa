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

import type {
  OfferItem,
  Profile,
} from "@/types/dashboard";

import { handleError }
from "@/lib/handleError";

import { getClientPhone }
from "@/lib/getClientPhone";

import styles from "../dashboard.module.css";

export default function OffersPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [offers, setOffers] =
    useState<OfferItem[]>([])

  const [profile, setProfile] =
    useState<Profile | null>(null)

  const [loading, setLoading] =
    useState(true);

  const [selectedOffer, setSelectedOffer] =
    useState<any>(null);

  const [paymentMethod, setPaymentMethod] =
    useState("CARD");

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

        setOffers([]);

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

      /* OFFERS */

      const {
        data,
        error,
      } =
        await supabase
          .from("offers")
          .select(`
            id,
            brand,
            article,
            price,
            delivery_days,
            product_image,
            description
          `)
          .eq(
            "client_phone",
            normalizedPhone
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
          .limit(20);

      if (error) {

        handleError(error);

        setOffers([]);

      } else {

        setOffers(data || []);
      }

    } catch (error) {

      console.error(error);

      setOffers([]);

    } finally {

      setLoading(false);
    }
  }

  /* DELIVERY DATE */

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
        year:"numeric",
      }
    );
  }

  /* CREATE ORDER */

  async function createOrder() {

    if (!selectedOffer)
      return;

    try {

      const phone =
        await getClientPhone();

      const normalizedPhone =
        phone.trim();

      if (!normalizedPhone) {

        alert(
          "Ошибка авторизации"
        );

        return;
      }

      const {
        error:orderError,
      } =
        await supabase
          .from("orders")
          .insert([
            {
              offer_id:
                selectedOffer.id,

              part_name:
                selectedOffer.brand,

              status:"NEW",

              client_phone:
                normalizedPhone,

              offer_price:
                selectedOffer.price,

              delivery_days:
                selectedOffer.delivery_days,

              delivery_address:
                profile?.delivery_address,

              payment_method:
                paymentMethod,

              article:
                selectedOffer.article,

              description:
                selectedOffer.description,

              product_image:
                selectedOffer.product_image,
            },
          ]);

      if (orderError) {

        console.error(orderError);

        alert(
          "Ошибка оформления"
        );

        return;
      }

      await supabase
        .from("offers")
        .update({
          payment_status:"PAID",
          status:"PAID",
        })
        .eq(
          "id",
          selectedOffer.id
        );

      alert(
        "Заказ оформлен"
      );

      setSelectedOffer(null);

      loadData();

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
          КАТАЛОГ
        </div>

        <h1 className={styles.name}>
          Предложения
        </h1>

        <p className={styles.subtitle}>
          Активных предложений:
          {" "}
          {offers.length}
        </p>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.offerListModern}>

          {offers.length === 0 && (

            <div className={styles.emptyCard}>

              <div className={styles.emptyIcon}>
                💶
              </div>

              <strong>
                Пока нет предложений
              </strong>

            </div>

          )}

          {offers.map((item) => (

            <button
              key={item.id}
              type="button"
              className={styles.offerModernCard}
              onClick={() =>
                setSelectedOffer(item)
              }
            >

              <div className={styles.offerModernImage}>

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

              <div className={styles.offerModernContent}>

                <h2>
                  {
                    item.brand ||
                    "Товар"
                  }
                </h2>

                <p>
                  Артикул:
                  {" "}
                  {
                    item.article ||
                    "—"
                  }
                </p>

                <div className={styles.offerModernPrice}>
                  €
                  {" "}
                  {item.price || 0}
                </div>

                <div className={styles.offerModernDelivery}>
                  🚚
                  {" "}
                  Доставка до
                  {" "}
                  {
                    getDeliveryDate(
                      item.delivery_days
                    )
                  }
                </div>

              </div>

            </button>

          ))}

        </div>

      </section>

      {/* FULLSCREEN */}

      {selectedOffer && (

        <div className={styles.checkoutFullscreen}>

          <div className={styles.checkoutTop}>

            <button
              type="button"
              className={styles.backButton}
              onClick={() =>
                setSelectedOffer(null)
              }
            >
              ←
            </button>

            <h2>
              Оформление заказа
            </h2>

          </div>

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutProduct}>

              <div className={styles.checkoutProductImage}>

                {selectedOffer.product_image ? (

                  <Image
                    src={selectedOffer.product_image}
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

              <div className={styles.checkoutProductInfo}>

                <h3>
                  {selectedOffer.brand}
                </h3>

                <p>
                  Артикул:
                  {" "}
                  {selectedOffer.article}
                </p>

                <div className={styles.checkoutProductPrice}>
                  €
                  {" "}
                  {selectedOffer.price}
                </div>

                <span>
                  🚚 Доставка:
                  {" "}
                  {
                    getDeliveryDate(
                      selectedOffer.delivery_days
                    )
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
                  profile?.delivery_address ||
                  "Адрес не указан"
                }
              </p>

              <span>
                {profile?.phone}
              </span>

            </div>

          </div>

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutSectionTitle}>
              💳 Способ оплаты
            </div>

            <div className={styles.paymentModern}>

              <button
                type="button"
                className={`${styles.paymentModernCard} ${
                  paymentMethod === "CARD"
                    ? styles.paymentModernActive
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("CARD")
                }
              >
                💳 Банковская карта
              </button>

              <button
                type="button"
                className={`${styles.paymentModernCard} ${
                  paymentMethod === "PAYPAL"
                    ? styles.paymentModernActive
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod("PAYPAL")
                }
              >
                PayPal
              </button>

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
                {selectedOffer.price}
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
                  (
                    Number(
                      selectedOffer.price
                    ) + 8.9
                  ).toFixed(2)
                }
              </strong>

            </div>

          </div>

          <div className={styles.checkoutFixed}>

            <button
              type="button"
              className={styles.payModernButton}
              onClick={createOrder}
            >
              🔒 Оформить заказ
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

        <Link
          href="/dashboard/offers"
          className={styles.activeNav}
        >

          <MessageCircle
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/orders">

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