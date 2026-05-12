"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
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
          .select(`
            id,
            vin,
            car,
            part_name,
            status,
            created_at
          `)
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

        console.error(
          "REQUESTS ERROR:",
          error
        );

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
        "Удалить заявку?"
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

  function getStatusText(
    status:string
  ) {

    if (status === "NEW")
      return "Новая";

    if (status === "IN_OFFER")
      return "Есть предложение";

    if (status === "DONE")
      return "Завершена";

    if (status === "CANCELLED")
      return "Отменена";

    return status || "NEW";
  }

  function getStatusClass(
    status:string
  ) {

    if (status === "DONE")
      return styles.badgeGreen;

    if (status === "IN_OFFER")
      return styles.badgeBlue;

    return styles.badge;
  }

  function formatDate(
    value:string
  ) {

    if (!value)
      return "—";

    return new Date(value)
      .toLocaleDateString(
        "ru-RU",
        {
          day:"2-digit",
          month:"long",
        }
      );
  }

  const activeRequests =
    useMemo(
      () =>
        requests.filter(
          (item) =>
            item.status !== "DONE"
        ),
      [requests]
    );

  const completedRequests =
    useMemo(
      () =>
        requests.filter(
          (item) =>
            item.status === "DONE"
        ),
      [requests]
    );

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
              Личный кабинет
            </p>

            <h1 className={styles.mainTitle}>
              Заявки
            </h1>

          </div>

          <div className={styles.headerBadge}>

            {activeRequests.length}

          </div>

        </div>

      </header>

      {/* ACTIVE */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Активные заявки
          </h2>

        </div>

        {activeRequests.length === 0 && (

          <div className={styles.emptyCard}>

            <div className={styles.emptyIcon}>
              📄
            </div>

            <strong>
              Нет активных заявок
            </strong>

            <p>
              Создайте новую заявку
              на главной странице
            </p>

          </div>

        )}

        {activeRequests.map((item) => (

          <div
            key={item.id}
            className={styles.requestPremiumCard}
          >

            <div className={styles.requestTop}>

              <div>

                <div className={styles.requestLabel}>
                  Деталь
                </div>

                <h3 className={styles.requestTitle}>
                  {
                    item.part_name ||
                    "Без названия"
                  }
                </h3>

              </div>

              <button
                onClick={() =>
                  deleteRequest(
                    item.id
                  )
                }
                className={styles.deleteCircle}
              >
                ×
              </button>

            </div>

            <div className={styles.requestGrid}>

              <div className={styles.infoBox}>

                <span>
                  Автомобиль
                </span>

                <strong>
                  {item.car || "—"}
                </strong>

              </div>

              <div className={styles.infoBox}>

                <span>
                  Дата
                </span>

                <strong>
                  {
                    formatDate(
                      item.created_at
                    )
                  }
                </strong>

              </div>

            </div>

            <div className={styles.vinBox}>

              <span>
                VIN
              </span>

              <strong>
                {item.vin || "—"}
              </strong>

            </div>

            <div
              className={
                getStatusClass(
                  item.status
                )
              }
            >
              {
                getStatusText(
                  item.status
                )
              }
            </div>

          </div>

        ))}

      </section>

      {/* COMPLETED */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Завершённые
          </h2>

        </div>

        {completedRequests.length === 0 && (

          <div className={styles.emptySmallCard}>

            Нет завершённых заявок

          </div>

        )}

        {completedRequests.map((item) => (

          <div
            key={item.id}
            className={styles.historyCard}
          >

            <div>

              <strong>
                {
                  item.part_name ||
                  "Деталь"
                }
              </strong>

              <p>
                {item.car || "—"}
              </p>

            </div>

            <div className={styles.badgeGreen}>

              Завершена

            </div>

          </div>

        ))}

      </section>

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