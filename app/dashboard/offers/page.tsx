"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function OffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

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

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      let phone =
        session?.user?.phone;

      /* COOKIE AUTOLOGIN */

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

      /* TEST CLIENT */

      if (!phone) {

        const role =
          document.cookie.includes(
            "role=client"
          );

        if (role)
          phone =
            "+48519000000";
      }

      return phone;

    } catch (error) {

      console.error(error);

      return null;
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

        console.error(error);

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

  async function acceptOffer(
    item:any
  ) {

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
              offer_id:item.id,

              part_name:
                item.request_part_name ||
                item.brand,

              status:"NEW",

              client_phone:
                phone,

              track_number:"",

              offer_price:
                item.price,

              delivery_days:
                item.delivery_days,
            },
          ]);

      if (orderError) {

        console.error(orderError);

        alert(
          "Ошибка создания заказа"
        );

        return;
      }

      /* UPDATE OFFER STATUS */

      const {
        error:updateError,
      } =
        await supabase
          .from("offers")
          .update({
            payment_status:"PAID",
          })
          .eq("id", item.id);

      if (updateError) {

        console.error(updateError);
      }

      await loadOffers();

      alert(
        "Оплата прошла успешно"
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

      {/* OFFERS */}

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

            <strong>
              {item.brand || "Предложение"}
            </strong>

            <div className={styles.price}>
              € {item.price || 0}
            </div>

            <p>
              Срок доставки:
              {" "}
              {item.delivery_days || 0}
              {" "}
              дн.
            </p>

            <p>
              Деталь:
              {" "}
              {item.request_part_name || "—"}
            </p>

            <div className={styles.badge}>
              Ожидает оплаты
            </div>

            <button
              className={styles.createBtn}
              onClick={() =>
                acceptOffer(item)
              }
            >
              Оплатить
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