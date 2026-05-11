"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../admin.module.css";

export default function AdminOrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [trackInputs, setTrackInputs] =
    useState<any>({});

  useEffect(() => {

    loadOrders();

    const channel =
      supabase
        .channel("admin-orders")
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

  async function loadOrders() {

    try {

      const {
        data,
        error,
      } =
        await supabase
          .from("orders")
          .select(`
            *,
            offers (
              brand,
              article,
              description,
              product_image
            )
          `)
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

      setOrders([]);

    } finally {

      setLoading(false);
    }
  }

  async function updateStatus(
    id:number,
    status:string
  ) {

    try {

      const {
        error,
      } =
        await supabase
          .from("orders")
          .update({
            status,
          })
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка обновления"
        );

        return;
      }

      await loadOrders();

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  async function saveTrack(
    id:number
  ) {

    try {

      const track =
        trackInputs[id];

      if (!track) {

        alert(
          "Введите трек номер"
        );

        return;
      }

      const {
        error,
      } =
        await supabase
          .from("orders")
          .update({
            track_number:track,
          })
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка сохранения"
        );

        return;
      }

      await loadOrders();

      alert(
        "Трек номер сохранен"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  function getStatusText(
    status:string
  ) {

    if (status === "NEW")
      return "Новый";

    if (status === "PROCESS")
      return "В обработке";

    if (status === "SHIPPED")
      return "Отправлен";

    if (status === "DELIVERED")
      return "Доставлен";

    return status;
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
            Заказы
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

      {/* ORDERS */}

      <section className={styles.section}>

        {orders.length === 0 && (

          <div className={styles.requestCard}>

            <strong>
              Заказов пока нет
            </strong>

          </div>

        )}

        {orders.map((item) => (

          <div
            key={item.id}
            className={styles.requestCard}
          >

            {item.offers?.product_image && (

              <img
                src={
                  item.offers.product_image
                }
                alt=""
                style={{
                  width:"100%",
                  borderRadius:"20px",
                  marginBottom:"16px",
                }}
              />

            )}

            <strong
              style={{
                fontSize:"24px",
              }}
            >
              {
                item.offers?.brand ||
                "Товар"
              }
            </strong>

            <p>
              Артикул:
              {" "}
              {
                item.offers?.article ||
                "—"
              }
            </p>

            <p>
              {
                item.offers?.description ||
                "Описание отсутствует"
              }
            </p>

            <p>
              Цена:
              {" "}
              €
              {" "}
              {item.offer_price || 0}
            </p>

            <p>
              Доставка:
              {" "}
              {item.delivery_days || 0}
              {" "}
              дн.
            </p>

            <p>
              Клиент:
              {" "}
              {
                item.client_phone ||
                "—"
              }
            </p>

            <p>
              Адрес:
              {" "}
              {
                item.delivery_address ||
                "—"
              }
            </p>

            <div
              className={styles.badgeBlue}
              style={{
                marginTop:"12px",
              }}
            >

              {
                getStatusText(
                  item.status
                )
              }

            </div>

            {/* TRACK */}

            <div
              style={{
                marginTop:"16px",
                display:"flex",
                flexDirection:"column",
                gap:"10px",
              }}
            >

              <input
                className={styles.input}
                placeholder="Track номер"
                value={
                  trackInputs[item.id] ||
                  item.track_number ||
                  ""
                }
                onChange={(e) =>
                  setTrackInputs({
                    ...trackInputs,
                    [item.id]:
                      e.target.value,
                  })
                }
              />

              <button
                className={styles.createBtn}
                onClick={() =>
                  saveTrack(item.id)
                }
              >
                Сохранить track
              </button>

            </div>

            {/* STATUS BUTTONS */}

            <div
              style={{
                display:"flex",
                flexDirection:"column",
                gap:"10px",
                marginTop:"16px",
              }}
            >

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "PROCESS"
                  )
                }
              >
                В обработке
              </button>

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "SHIPPED"
                  )
                }
              >
                Отправлен
              </button>

              <button
                className={styles.createBtn}
                onClick={() =>
                  updateStatus(
                    item.id,
                    "DELIVERED"
                  )
                }
              >
                Доставлен
              </button>

            </div>

          </div>

        ))}

      </section>

      {/* NAV */}

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
          className={styles.navItem}
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
          className={`${styles.navItem} ${styles.navItemActive}`}
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