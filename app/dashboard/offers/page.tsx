"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

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

  async function loadOffers() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setOffers([]);

        setLoading(false);

        return;
      }

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
          Всего:
          {" "}
          {offers.length}
        </p>

      </section>

      {/* ORDER FORM */}

      {selectedOffer && (

        <section className={styles.section}>

          <div className={styles.card}>

            <h2
              style={{
                marginBottom:"20px",
              }}
            >
              Оформление заказа
            </h2>

            {/* PRODUCT IMAGE */}

            {selectedOffer.product_image && (

              <div
                style={{
                  position:"relative",
                  width:"100%",
                  height:"240px",
                  borderRadius:"20px",
                  overflow:"hidden",
                  marginBottom:"18px",
                }}
              >

                <Image
                  src={
                    selectedOffer.product_image
                  }
                  alt=""
                  fill
                  style={{
                    objectFit:"cover",
                  }}
                />

              </div>

            )}

            {/* PRODUCT INFO */}

            <strong
              style={{
                fontSize:"24px",
                display:"block",
                marginBottom:"10px",
              }}
            >
              {
                selectedOffer.brand
              }
            </strong>

            <p>
              <strong>
                Артикул:
              </strong>
              {" "}
              {
                selectedOffer.article ||
                "—"
              }
            </p>

            <p>
              <strong>
                Описание:
              </strong>
              {" "}
              {
                selectedOffer.description ||
                "Описание отсутствует"
              }
            </p>

            <p>
              <strong>
                Срок доставки:
              </strong>
              {" "}
              {
                selectedOffer.delivery_days
              }
              {" "}
              дн.
            </p>

            <div
              className={styles.price}
              style={{
                marginBottom:"20px",
              }}
            >
              €
              {" "}
              {
                selectedOffer.price
              }
            </div>

            {/* DELIVERY FORM */}

            <input
              className={styles.input}
              placeholder="Страна"
              value={country}
              onChange={(e) =>
                setCountry(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              placeholder="Город"
              value={city}
              onChange={(e) =>
                setCity(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              placeholder="Улица и дом"
              value={street}
              onChange={(e) =>
                setStreet(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              placeholder="Почтовый индекс"
              value={zip}
              onChange={(e) =>
                setZip(
                  e.target.value
                )
              }
            />

            {/* PAYMENT */}

            <select
              className={styles.input}
              value={paymentMethod}
              onChange={(e) =>
                setPaymentMethod(
                  e.target.value
                )
              }
            >

              <option value="CARD">
                Банковская карта
              </option>

              <option value="CASH">
                Наличные
              </option>

              <option value="TRANSFER">
                Банковский перевод
              </option>

            </select>

            {/* ACTIONS */}

            <button
              className={styles.createBtn}
              onClick={createOrder}
            >
              Оплатить
            </button>

            <button
              className={styles.logoutBtn}
              style={{
                marginTop:"10px",
              }}
              onClick={() =>
                setSelectedOffer(null)
              }
            >
              Отмена
            </button>

          </div>

        </section>

      )}

      {/* OFFERS LIST */}

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

              {/* PRODUCT IMAGE */}

              {item.product_image && (

                <div
                  style={{
                    position:"relative",
                    width:"100%",
                    height:"220px",
                    borderRadius:"20px",
                    overflow:"hidden",
                    marginBottom:"16px",
                  }}
                >

                  <Image
                    src={item.product_image}
                    alt=""
                    fill
                    style={{
                      objectFit:"cover",
                    }}
                  />

                </div>

              )}

              {/* PRODUCT INFO */}

              <strong
                style={{
                  fontSize:"24px",
                  display:"block",
                  marginBottom:"10px",
                }}
              >
                {
                  item.brand ||
                  "Товар"
                }
              </strong>

              <p>
                <strong>
                  Артикул:
                </strong>
                {" "}
                {
                  item.article ||
                  "—"
                }
              </p>

              <p>
                <strong>
                  Описание:
                </strong>
                {" "}
                {
                  item.description ||
                  "Описание отсутствует"
                }
              </p>

              <p>
                <strong>
                  Срок доставки:
                </strong>
                {" "}
                {
                  item.delivery_days || 0
                }
                {" "}
                дн.
              </p>

              <div
                className={styles.price}
              >
                €
                {" "}
                {item.price || 0}
              </div>

              {/* ACTIONS */}

              <button
                className={styles.createBtn}
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
                className={styles.logoutBtn}
                style={{
                  marginTop:"10px",
                }}
              >
                Отменить
              </button>

            </div>

          ))}

        </section>

      )}

      {/* BOTTOM NAV */}

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