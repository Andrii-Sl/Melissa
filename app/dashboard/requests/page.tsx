"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function RequestsPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    loadRequests();

    const channel =
      supabase
        .channel("client-requests")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"requests",
          },
          () => {
            loadRequests();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };

  }, []);

  async function getClientPhone() {

    try {

      const cookiePhone =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith("client_phone=")
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

  async function loadRequests() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setRequests([]);
        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("requests")
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

        setRequests([]);

        return;
      }

      setRequests(data || []);

    } catch (error) {

      console.error(error);

      setRequests([]);

    } finally {

      setLoading(false);
    }
  }

  async function deleteRequest(
    id:number
  ) {

    const confirmDelete =
      confirm(
        "Удалить запрос?"
      );

    if (!confirmDelete)
      return;

    try {

      const {
        error,
      } =
        await supabase
          .from("requests")
          .delete()
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка удаления"
        );

        return;
      }

      setRequests(
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

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              Мои запросы
            </p>

            <h1 className={styles.mainTitle}>
              Заявки
            </h1>

          </div>

        </div>

      </header>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.requestsList}>

          {requests.length === 0 && (

            <div className={styles.emptyCard}>

              <div className={styles.emptyIcon}>
                📄
              </div>

              <strong>
                Нет запросов
              </strong>

            </div>

          )}

          {requests.map((item) => (

            <div
              key={item.id}
              className={styles.requestCard}
            >

              {/* TOP */}

              <div className={styles.requestTop}>

                <div>

                  <p className={styles.requestLabel}>
                    Автомобиль
                  </p>

                  <h3 className={styles.requestTitle}>
                    {item.car || "—"}
                  </h3>

                </div>

                <button
                  className={
                    styles.requestDelete
                  }
                  onClick={() =>
                    deleteRequest(
                      item.id
                    )
                  }
                >
                  🗑
                </button>

              </div>

              {/* VIN */}

              <div className={styles.requestRow}>

                <div className={styles.requestIcon}>
                  🏷
                </div>

                <div className={styles.requestInfo}>

                  <span>
                    VIN code
                  </span>

                  <strong>
                    {item.vin || "—"}
                  </strong>

                </div>

              </div>

              {/* PRODUCT */}

              <div className={styles.requestRow}>

                <div className={styles.requestIcon}>
                  📦
                </div>

                <div className={styles.requestInfo}>

                  <span>
                    Наименование товара
                  </span>

                  <strong>
                    {
                      item.part_name ||
                      "—"
                    }
                  </strong>

                </div>

              </div>

              {/* QUANTITY */}

              <div className={styles.requestRow}>

                <div className={styles.requestIcon}>
                  🧾
                </div>

                <div className={styles.requestInfo}>

                  <span>
                    Количество
                  </span>

                  <strong>
                    {
                      item.quantity || 1
                    }
                    {" "}
                    шт.
                  </strong>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* BOTTOM NAV */}

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
          className={`${styles.navItem} ${styles.navActive}`}
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