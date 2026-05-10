"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminOffersPage() {

  const [offers, setOffers] =
    useState<any[]>([]);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [requestId, setRequestId] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [delivery, setDelivery] =
    useState("");

  useEffect(() => {

    loadData();

    const channel =
      supabase
        .channel("admin-offers")
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

      const {
        data:offersData,
        error:offersError,
      } =
        await supabase
          .from("offers")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      const {
        data:requestsData,
        error:requestsError,
      } =
        await supabase
          .from("requests")
          .select("*")
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if (offersError) {
        console.error(offersError);
      }

      if (requestsError) {
        console.error(requestsError);
      }

      setOffers(
        offersData || []
      );

      setRequests(
        requestsData || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  async function createOffer() {

    if (
      !requestId ||
      !brand ||
      !price
    ) {

      alert(
        "Заполните обязательные поля"
      );

      return;
    }

    try {

      const selectedRequest =
        requests.find(
          (item) =>
            item.id.toString() ===
            requestId
        );

      const {
        error,
      } =
        await supabase
          .from("offers")
          .insert([
            {
              request_id:
                Number(requestId),

              brand,

              price:
                Number(price),

              delivery_days:
                Number(delivery || 0),

              client_phone:
                selectedRequest?.client_phone || "",

              request_part_name:
                selectedRequest?.part_name || "",

              status:"NEW",
            },
          ]);

      if (error) {

        console.error(error);

        alert(
          "Ошибка создания предложения"
        );

        return;
      }

      setBrand("");
      setPrice("");
      setDelivery("");
      setRequestId("");

      await loadData();

      alert(
        "Предложение создано"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  async function deleteOffer(
    id:number
  ) {

    const confirmDelete =
      confirm(
        "Удалить предложение?"
      );

    if (!confirmDelete)
      return;

    try {

      const {
        error,
      } =
        await supabase
          .from("offers")
          .delete()
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка удаления"
        );

        return;
      }

      setOffers(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

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

        <div>

          <h1 className={styles.title}>
            Предложения
          </h1>

          <p className={styles.subtitle}>
            Панель администратора
          </p>

        </div>

        <Link
          href="/admin"
          className={styles.profileBtn}
        >
          ←
        </Link>

      </header>

      {/* CREATE OFFER */}

      <section className={styles.section}>

        <div className={styles.requestCard}>

          <h2>
            Создать предложение
          </h2>

          <select
            value={requestId}
            onChange={(e) =>
              setRequestId(
                e.target.value
              )
            }
            className={styles.input}
          >

            <option value="">
              Выберите заявку
            </option>

            {requests.map((item) => (

              <option
                key={item.id}
                value={item.id}
              >
                #{item.id}
                {" — "}
                {item.part_name}
                {" — "}
                {item.client_phone}
              </option>
            ))}

          </select>

          <input
            className={styles.input}
            placeholder="Бренд"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className={styles.input}
            placeholder="Цена"
            value={price}
            onChange={(e) =>
              setPrice(
                e.target.value
              )
            }
          />

          <input
            type="number"
            className={styles.input}
            placeholder="Доставка (дни)"
            value={delivery}
            onChange={(e) =>
              setDelivery(
                e.target.value
              )
            }
          />

          <button
            className={styles.createBtn}
            onClick={createOffer}
          >
            + Создать предложение
          </button>

        </div>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Все предложения
          </h2>

        </div>

        {offers.length === 0 && (

          <div className={styles.requestCard}>

            <p>
              Предложений пока нет
            </p>

          </div>
        )}

        {offers.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            <div className={styles.requestTop}>

              <strong>
                {item.brand || "Предложение"}
              </strong>

              <span className={styles.badgeBlue}>
                € {item.price || 0}
              </span>

            </div>

            <p>
              Доставка:
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

            <small>
              Request ID:
              {" "}
              {item.request_id}
            </small>

            <br />

            <small>
              Клиент:
              {" "}
              {item.client_phone || "—"}
            </small>

            <div
              style={{
                marginTop:"14px",
              }}
            >

              <button
                onClick={() =>
                  deleteOffer(item.id)
                }
                className={styles.logoutBtn}
              >
                Удалить
              </button>

            </div>

          </div>
        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/admin"
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
          href="/admin/requests"
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
          href="/admin/offers"
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
          href="/admin/orders"
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