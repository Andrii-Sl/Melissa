"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

import styles from "../dashboard.module.css";

export default function RequestsPage() {

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [selectedRequest, setSelectedRequest] =
    useState<any>(null);

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

  /* DELETE */

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
          .eq(
            "id",
            id
          );

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

      if (
        selectedRequest?.id === id
      ) {

        setSelectedRequest(null);
      }

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  /* STATUS */

  function getStatusText(
    status:string
  ) {

    if (status === "DONE")
      return "Выполнен";

    if (status === "PROCESS")
      return "В обработке";

    return "Новый";
  }

  function getStatusClass(
    status:string
  ) {

    if (status === "DONE")
      return styles.requestStatusDone;

    if (status === "PROCESS")
      return styles.requestStatusProcess;

    return styles.requestStatusNew;
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
          day:"numeric",
          month:"long",
          year:"numeric",
        }
      );
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
            Каталог запросов
          </p>

          <h1 className={styles.dashboardTitle}>
            Запросы
          </h1>

          <p className={styles.dashboardPhone}>
            Всего запросов:
            {" "}
            {requests.length}
          </p>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.dashboardProfile}
        >
          👤
        </Link>

      </section>

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

            <button
              key={item.id}
              className={styles.requestCard}
              onClick={() =>
                setSelectedRequest(item)
              }
            >

              {/* TOP */}

              <div className={styles.requestTop}>

                <div>

                  <p className={styles.requestLabel}>
                    Автомобиль
                  </p>

                  <h3 className={styles.requestTitle}>
                    {
                      item.car ||
                      "—"
                    }
                  </h3>

                </div>

                <div className={styles.requestActions}>

                  <div className={`${styles.requestStatusBadge} ${getStatusClass(item.status)}`}>
                    {
                      getStatusText(
                        item.status
                      )
                    }
                  </div>

                  <button
                    type="button"
                    className={styles.requestDelete}
                    onClick={(event) => {

                      event.stopPropagation();

                      deleteRequest(
                        item.id
                      );
                    }}
                  >
                    🗑
                  </button>

                </div>

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
                    {
                      item.vin ||
                      "—"
                    }
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

            </button>

          ))}

        </div>

      </section>

      {/* FULLSCREEN */}

      {selectedRequest && (

        <div className={styles.checkoutFullscreen}>

          {/* TOP */}

          <div className={styles.checkoutTop}>

            <button
              type="button"
              className={styles.backButton}
              onClick={() =>
                setSelectedRequest(null)
              }
            >
              ←
            </button>

            <h2>
              Информация о запросе
            </h2>

          </div>

          {/* CARD */}

          <div className={styles.checkoutCard}>

            <div className={styles.requestTop}>

              <div>

                <p className={styles.requestLabel}>
                  Автомобиль
                </p>

                <h3 className={styles.requestTitle}>
                  {
                    selectedRequest.car ||
                    "—"
                  }
                </h3>

              </div>

              <div className={`${styles.requestStatusBadge} ${getStatusClass(selectedRequest.status)}`}>
                {
                  getStatusText(
                    selectedRequest.status
                  )
                }
              </div>

            </div>

            <div className={styles.requestRow}>

              <div className={styles.requestIcon}>
                🏷
              </div>

              <div className={styles.requestInfo}>

                <span>
                  VIN code
                </span>

                <strong>
                  {
                    selectedRequest.vin ||
                    "—"
                  }
                </strong>

              </div>

            </div>

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
                    selectedRequest.part_name ||
                    "—"
                  }
                </strong>

              </div>

            </div>

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
                    selectedRequest.quantity || 1
                  }
                  {" "}
                  шт.
                </strong>

              </div>

            </div>

          </div>

          {/* INFO */}

          <div className={styles.checkoutCard}>

            <div className={styles.checkoutSectionTitle}>
              📄 Информация
            </div>

            <div className={styles.orderInfoRow}>

              <span>
                Статус
              </span>

              <div className={`${styles.requestStatusBadge} ${getStatusClass(selectedRequest.status)}`}>
                {
                  getStatusText(
                    selectedRequest.status
                  )
                }
              </div>

            </div>

            <div className={styles.orderInfoRow}>

              <span>
                Дата создания
              </span>

              <strong>
                {
                  formatDate(
                    selectedRequest.created_at
                  )
                }
              </strong>

            </div>

            <div className={styles.orderInfoRow}>

              <span>
                ID запроса
              </span>

              <strong>
                #
                {
                  selectedRequest.id
                }
              </strong>

            </div>

          </div>

          {/* DELETE */}

          <div className={styles.checkoutFixed}>

            <button
              type="button"
              className={styles.deleteRequestButton}
              onClick={() =>
                deleteRequest(
                  selectedRequest.id
                )
              }
            >
              Удалить запрос
            </button>

          </div>

        </div>

      )}

      <BottomNav active="requests" />

    </main>
  );
}