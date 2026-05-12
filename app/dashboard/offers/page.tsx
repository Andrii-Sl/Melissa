"use client";

import Image from "next/image";
import Link from "next/link";
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

  const [deliveryAddress, setDeliveryAddress] =
    useState("");

  const [paymentMethod, setPaymentMethod] =
    useState("CARD");

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

      if (
        profileData?.delivery_address
      ) {

        setDeliveryAddress(
          profileData.delivery_address
        );
      }

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

  async function createOrder() {

    if (!selectedOffer)
      return;

    if (!deliveryAddress) {

      alert(
        "Укажите адрес доставки"
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

              offer_price:
                selectedOffer.price,

              delivery_days:
                selectedOffer.delivery_days,

              delivery_address:
                deliveryAddress,

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
          orderError.message
        );

        return;
      }

      /* UPDATE OFFER */

      await supabase
        .from("offers")
        .update({
          payment_status:"PAID",
          status:"PAID",
          delivery_address:
            deliveryAddress,
        })
        .eq(
          "id",
          selectedOffer.id
        );

      setSelectedOffer(null);

      await loadData();

      alert(
        "Заказ оформлен"
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

      await supabase
        .from("offers")
        .update({
          payment_status:
            "CANCELLED",

          status:
            "CANCELLED",
        })
        .eq(
          "id",
          id
        );

      await loadData();

    } catch (error) {

      console.error(error);
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

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              Каталог предложений
            </p>

            <h1 className={styles.mainTitle}>
              Предложения
            </h1>

          </div>

        </div>

      </header>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.offerGrid}>

          {offers.length === 0 && (

            <div className={styles.profileCard}>

              <p className={styles.addressText}>
                Пока нет предложений
              </p>

            </div>

          )}

          {offers.map((item) => (

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
                    item.brand ||
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
                    {item.price || 0}
                  </div>

                </div>

                <div
                  className={
                    styles.offerButtons
                  }
                >

                  <button
                    className={
                      styles.buyButton
                    }
                    onClick={() =>
                      setSelectedOffer(
                        item
                      )
                    }
                  >
                    Оформить заказ
                  </button>

                  <button
                    className={
                      styles.cancelButton
                    }
                    onClick={() =>
                      cancelOffer(
                        item.id
                      )
                    }
                  >
                    ✕
                  </button>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* CHECKOUT */}

      {selectedOffer && (

        <>

          <div
            className={
              styles.checkoutOverlay
            }
            onClick={() =>
              setSelectedOffer(null)
            }
          />

          <div
            className={
              styles.checkoutSheet
            }
          >

            <h2
              className={
                styles.checkoutTitle
              }
            >
              Оформление заказа
            </h2>

            {/* IMAGE */}

            {selectedOffer.product_image && (

              <div
                className={
                  styles.checkoutImage
                }
              >

                <Image
                  src={
                    selectedOffer.product_image
                  }
                  alt=""
                  fill
                  className={
                    styles.offerImage
                  }
                />

              </div>

            )}

            {/* PRODUCT */}

            <h3
              className={
                styles.checkoutName
              }
            >
              {
                selectedOffer.brand
              }
            </h3>

            <p
              className={
                styles.offerArticle
              }
            >
              Артикул:
              {" "}
              {
                selectedOffer.article ||
                "—"
              }
            </p>

            <p
              className={
                styles.offerDescription
              }
            >
              {
                selectedOffer.description
              }
            </p>

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
                    selectedOffer.delivery_days
                  )
                }
              </strong>

            </div>

            <div
              className={
                styles.checkoutPrice
              }
            >
              €
              {" "}
              {selectedOffer.price}
            </div>

            {/* ADDRESS */}

            <div
              className={
                styles.checkoutSection
              }
            >

              <label
                className={
                  styles.checkoutLabel
                }
              >
                Адрес доставки
              </label>

              <textarea
                className={
                  styles.textarea
                }
                placeholder="Введите адрес доставки"
                value={deliveryAddress}
                onChange={(e) =>
                  setDeliveryAddress(
                    e.target.value
                  )
                }
              />

            </div>

            {/* PAYMENT */}

            <div
              className={
                styles.checkoutSection
              }
            >

              <label
                className={
                  styles.checkoutLabel
                }
              >
                Способ оплаты
              </label>

              <div
                className={
                  styles.paymentGrid
                }
              >

                <button
                  className={`${styles.paymentCard} ${
                    paymentMethod ===
                    "CARD"
                      ? styles.paymentCardActive
                      : ""
                  }`}
                  onClick={() =>
                    setPaymentMethod(
                      "CARD"
                    )
                  }
                >
                  💳 Карта
                </button>

                <button
                  className={`${styles.paymentCard} ${
                    paymentMethod ===
                    "PAYPAL"
                      ? styles.paymentCardActive
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

          </div>

          {/* BOTTOM BUTTON */}

          <div
            className={
              styles.checkoutBottom
            }
          >

            <button
              className={
                styles.checkoutButton
              }
              onClick={createOrder}
            >
              Оплатить €
              {" "}
              {selectedOffer.price}
            </button>

          </div>

        </>

      )}

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
          className={`${styles.navItem} ${styles.navActive}`}
        >
          <span>
            💶
          </span>
          Предложения
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
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