"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
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

  /* DELIVERY */

  const [country, setCountry] =
    useState("");

  const [city, setCity] =
    useState("");

  const [street, setStreet] =
    useState("");

  const [zip, setZip] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("CARD");

  useEffect(() => {

    loadOffers();

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
            loadOffers();
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

  function getDeliveryDate(
    days:number
  ) {

    const date =
      new Date();

    date.setDate(
      date.getDate() + days
    );

    return date.toLocaleDateString(
      "ru-RU",
      {
        day:"2-digit",
        month:"long",
      }
    );
  }

  async function loadOffers() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setOffers([]);

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

        console.error(
          "LOAD OFFERS ERROR:",
          error
        );

        setOffers([]);

        return;
      }

      setOffers(data || []);

    } catch (error) {

      console.error(error);

      setOffers([]);

    } finally {

      setLoading(false);
    }
  }

  function useProfileAddress() {

    if (!profile)
      return;

    setCountry(
      profile.country || ""
    );

    setCity(
      profile.city || ""
    );

    setStreet(
      profile.street || ""
    );

    setZip(
      profile.zip || ""
    );
  }

  async function createOrder() {

    if (!selectedOffer)
      return;

    if (
      !country ||
      !city ||
      !street ||
      !zip
    ) {

      alert(
        "Заполните адрес доставки"
      );

      return;
    }

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        alert(
          "Ошибка авторизации"
        );

        return;
      }

      const fullAddress =
        `${country}, ${city}, ${street}, ${zip}`;

      /* CREATE ORDER */

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

              track_number:"",

              offer_price:
                selectedOffer.price,

              delivery_days:
                selectedOffer.delivery_days,

              delivery_address:
                fullAddress,

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
          "Ошибка создания заказа"
        );

        return;
      }

      /* UPDATE OFFER */

      const {
        error:updateError,
      } =
        await supabase
          .from("offers")
          .update({
            payment_status:"PAID",
            status:"PAID",
            delivery_address:
              fullAddress,
          })
          .eq(
            "id",
            selectedOffer.id
          );

      if (updateError) {

        console.error(updateError);
      }

      setSelectedOffer(null);

      setCountry("");
      setCity("");
      setStreet("");
      setZip("");

      await loadOffers();

      alert(
        "Заказ успешно оформлен"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  async function cancelOffer(
    id:number
  ) {

    const confirmCancel =
      confirm(
        "Отменить предложение?"
      );

    if (!confirmCancel)
      return;

    try {

      const {
        error,
      } =
        await supabase
          .from("offers")
          .update({
            payment_status:
              "CANCELLED",

            status:
              "CANCELLED",
          })
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка отмены"
        );

        return;
      }

      await loadOffers();

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

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Предложения
        </h1>

        <p className={styles.phone}>
          Доступно:
          {" "}
          {offers.length}
        </p>

      </section>

      {/* CHECKOUT */}

      {selectedOffer && (

        <section className={styles.section}>

          <div className={styles.card}>

            {/* IMAGE */}

            {selectedOffer.product_image && (

              <Image
                src={
                  selectedOffer.product_image
                }
                alt=""
                width={800}
                height={500}
                className={
                  styles.productImage
                }
              />

            )}

            {/* PRODUCT */}

            <div
              className={
                styles.productTitle
              }
            >
              {
                selectedOffer.brand
              }
            </div>

            <div
              className={
                styles.productMeta
              }
            >

              <span
                className={
                  styles.productLabel
                }
              >
                Артикул
              </span>

              {
                selectedOffer.article ||
                "—"
              }

            </div>

            <div
              className={
                styles.productMeta
              }
            >

              <span
                className={
                  styles.productLabel
                }
              >
                Описание
              </span>

              {
                selectedOffer.description ||
                "Описание отсутствует"
              }

            </div>

            <div
              className={
                styles.deliveryBox
              }
            >

              <div
                className={
                  styles.deliveryTitle
                }
              >
                Доставка
              </div>

              <div
                className={
                  styles.deliveryDate
                }
              >
                Доставка:
                {" "}
                {
                  getDeliveryDate(
                    selectedOffer.delivery_days || 0
                  )
                }
              </div>

              <div
                className={
                  styles.price
                }
              >
                €
                {" "}
                {
                  selectedOffer.price
                }
              </div>

            </div>

            {/* ADDRESS */}

            <div
              style={{
                marginTop:"20px",
              }}
            >

              <div
                className={
                  styles.deliveryTitle
                }
              >
                Адрес доставки
              </div>

              <div
                className={
                  styles.addressBox
                }
              >

                <button
                  className={
                    styles.logoutWhiteBtn
                  }
                  onClick={
                    useProfileAddress
                  }
                >
                  Использовать адрес из профиля
                </button>

                <input
                  className={
                    styles.input
                  }
                  placeholder="Страна"
                  value={country}
                  onChange={(e) =>
                    setCountry(
                      e.target.value
                    )
                  }
                />

                <input
                  className={
                    styles.input
                  }
                  placeholder="Город"
                  value={city}
                  onChange={(e) =>
                    setCity(
                      e.target.value
                    )
                  }
                />

                <input
                  className={
                    styles.input
                  }
                  placeholder="Улица и дом"
                  value={street}
                  onChange={(e) =>
                    setStreet(
                      e.target.value
                    )
                  }
                />

                <input
                  className={
                    styles.input
                  }
                  placeholder="Почтовый индекс"
                  value={zip}
                  onChange={(e) =>
                    setZip(
                      e.target.value
                    )
                  }
                />

              </div>

            </div>

            {/* PAYMENT */}

            <div
              style={{
                marginTop:"22px",
              }}
            >

              <div
                className={
                  styles.deliveryTitle
                }
              >
                Способ оплаты
              </div>

              <div
                className={
                  styles.paymentBox
                }
              >

                <button
                  className={
                    paymentMethod === "CARD"
                      ? `${styles.paymentCard} ${styles.paymentCardActive}`
                      : styles.paymentCard
                  }
                  onClick={() =>
                    setPaymentMethod(
                      "CARD"
                    )
                  }
                >
                  💳 Карта
                </button>

                <button
                  className={
                    paymentMethod === "PAYPAL"
                      ? `${styles.paymentCard} ${styles.paymentCardActive}`
                      : styles.paymentCard
                  }
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

            {/* BUTTONS */}

            <button
              className={
                styles.createBtn
              }
              onClick={createOrder}
            >
              Оплатить заказ
            </button>

            <button
              className={
                styles.logoutBtn
              }
              onClick={() =>
                setSelectedOffer(null)
              }
            >
              Отмена
            </button>

          </div>

        </section>

      )}

      {/* OFFERS */}

      {!selectedOffer && (

        <section className={styles.section}>

          {offers.length === 0 && (

            <div className={styles.card}>

              <strong>
                Пока нет предложений
              </strong>

            </div>

          )}

          {offers.map((item) => (

            <div
              key={item.id}
              className={styles.card}
            >

              {/* IMAGE */}

              {item.product_image && (

                <Image
                  src={
                    item.product_image
                  }
                  alt=""
                  width={800}
                  height={500}
                  className={
                    styles.productImage
                  }
                />

              )}

              {/* TITLE */}

              <div
                className={
                  styles.productTitle
                }
              >
                {
                  item.brand ||
                  "Товар"
                }
              </div>

              {/* ARTICLE */}

              <div
                className={
                  styles.productMeta
                }
              >

                <span
                  className={
                    styles.productLabel
                  }
                >
                  Артикул
                </span>

                {
                  item.article || "—"
                }

              </div>

              {/* DESCRIPTION */}

              <div
                className={
                  styles.productMeta
                }
              >

                <span
                  className={
                    styles.productLabel
                  }
                >
                  Описание
                </span>

                {
                  item.description ||
                  "Описание отсутствует"
                }

              </div>

              {/* DELIVERY */}

              <div
                className={
                  styles.deliveryBox
                }
              >

                <div
                  className={
                    styles.deliveryTitle
                  }
                >
                  Доставка
                </div>

                <div
                  className={
                    styles.deliveryDate
                  }
                >
                  До
                  {" "}
                  {
                    getDeliveryDate(
                      item.delivery_days || 0
                    )
                  }
                </div>

                <div
                  className={
                    styles.price
                  }
                >
                  €
                  {" "}
                  {
                    item.price || 0
                  }
                </div>

              </div>

              {/* BUTTONS */}

              <button
                className={
                  styles.createBtn
                }
                onClick={() =>
                  setSelectedOffer(item)
                }
              >
                Оформить заказ
              </button>

              <button
                onClick={() =>
                  cancelOffer(item.id)
                }
                className={
                  styles.logoutBtn
                }
              >
                Отменить
              </button>

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
          className={`${styles.navItem} ${styles.navItemActive}`}
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
          className={styles.navItem}
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