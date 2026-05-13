"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

import styles from "../dashboard.module.css";

export default function OffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  const [selectedOffer, setSelectedOffer] =
    useState<any>(null);

  const [paymentMethod, setPaymentMethod] =
    useState("CARD");

  /* PHONE */

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

  /* LOAD */

  useEffect(() => {

    loadData();

    const channel =
      supabase
        .channel("client-offers")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"offers",
          },
          () => {
            loadData();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
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

      /* PROFILE */

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

      /* OFFERS */

      const {
        data,
        error,
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
          );

      if (error) {

        console.error(error);

        setOffers([]);

      } else {

        setOffers(data || []);
      }

    } catch (error) {

      console.error(error);

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

      if (!phone) {

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
                phone,

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

      {/* HERO */}

      <section className={styles.dashboardHero}>

        <div>

          <p className={styles.dashboardSubtitle}>
            Каталог предложений
          </p>

          <h1 className={styles.dashboardTitle}>
            Предложения
          </h1>

          <p className={styles.dashboardPhone}>
            Активных предложений:
            {" "}
            {offers.length}
          </p>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardProfile}
        >
          👤
        </Link>

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

          {/* TOP */}

          <div className={styles.checkoutTop}>

            <button
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

          {/* PRODUCT */}

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutProduct}>

              <div
                className={
                  styles.checkoutProductImage
                }
              >

                {selectedOffer.product_image ? (

                  <Image
                    src={
                      selectedOffer.product_image
                    }
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
                  {
                    selectedOffer.brand
                  }
                </h3>

                <p>
                  Артикул:
                  {" "}
                  {
                    selectedOffer.article
                  }
                </p>

                <div
                  className={
                    styles.checkoutProductPrice
                  }
                >
                  €
                  {" "}
                  {
                    selectedOffer.price
                  }
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

          {/* ADDRESS */}

          <div className={styles.checkoutCard}>

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
              📍 Адрес доставки
            </div>

            <div className={styles.addressModern}>

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
                  profile?.delivery_address ||
                  "Адрес не указан"
                }
              </p>

              <span>
                {
                  profile?.phone
                }
              </span>

            </div>

          </div>

          {/* PAYMENT */}

          <div className={styles.checkoutCard}>

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
              💳 Способ оплаты
            </div>

            <div className={styles.paymentModern}>

              <button
                className={`${styles.paymentModernCard} ${
                  paymentMethod ===
                  "CARD"
                    ? styles.paymentModernActive
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "CARD"
                  )
                }
              >
                💳 Банковская карта
              </button>

              <button
                className={`${styles.paymentModernCard} ${
                  paymentMethod ===
                  "PAYPAL"
                    ? styles.paymentModernActive
                    : ""
                }`}
                onClick={() =>
                  setPaymentMethod(
                    "PAYPAL"
                  )
                }
              >
                PayPal
              </button>

            </div>

          </div>

          {/* TOTAL */}

          <div className={styles.checkoutCard}>

            <div
              className={
                styles.checkoutSectionTitle
              }
            >
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
                  selectedOffer.price
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
                  (
                    Number(
                      selectedOffer.price
                    ) + 8.9
                  ).toFixed(2)
                }
              </strong>

            </div>

          </div>

          {/* BUTTON */}

          <div className={styles.checkoutFixed}>

            <button
              className={styles.payModernButton}
              onClick={createOrder}
            >
              🔒 Оформить заказ
            </button>

          </div>

        </div>

      )}

      <BottomNav active="offers" />

    </main>
  );
}