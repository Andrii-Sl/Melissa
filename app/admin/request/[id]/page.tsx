"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "../../../../lib/supabase";
import Footer from "../../../../components/Footer";
import styles from "./request.module.css";

export default function AdminRequestPage() {
  const params = useParams();
  const id = params.id;

  const [item, setItem] = useState<any>(null);

  const [status, setStatus] =
    useState("Новая");

  const [price, setPrice] =
    useState("");

  const [comment, setComment] =
    useState("");

  useEffect(() => {
    loadRequest();
  }, []);

  async function loadRequest() {
    const { data } =
      await supabase
        .from("requests")
        .select("*")
        .eq("id", id)
        .single();

    if (data) {
      setItem(data);
      setStatus(data.status || "Новая");
      setPrice(data.price || "");
      setComment(
        data.manager_comment || ""
      );
    }
  }

  async function saveRequest() {
    await supabase
      .from("requests")
      .update({
        status,
        price,
        manager_comment: comment
      })
      .eq("id", id);

    alert("Сохранено");
  }

  if (!item) {
    return <div>Загрузка...</div>;
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a
            href="/admin/orders"
            className={styles.backBtn}
          >
            ← Все заявки
          </a>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

        </div>
      </header>

      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ЗАЯВКА #{item.id}
          </div>

          <h1>Карточка клиента</h1>

          <div className={styles.grid}>

            <div className={styles.card}>
              <h3>Клиент</h3>
              <p>
                {item.client_name ||
                  "Без имени"}
              </p>

              <h3>Телефон</h3>
              <p>
                {item.phone || "-"}
              </p>

              <h3>Email</h3>
              <p>
                {item.email || "-"}
              </p>
            </div>

            <div className={styles.card}>
              <h3>VIN</h3>
              <p>{item.vin || "-"}</p>

              <h3>Деталь</h3>
              <p>
                {item.part_name || "-"}
              </p>

              <h3>Комментарий</h3>
              <p>
                {item.comment || "-"}
              </p>
            </div>

            <div className={styles.card}>
              <h3>CRM</h3>

              <label>Статус</label>

              <select
                value={status}
                onChange={(e) =>
                  setStatus(
                    e.target.value
                  )
                }
              >
                <option>
                  Новая
                </option>
                <option>
                  В работе
                </option>
                <option>
                  Цена готова
                </option>
                <option>
                  Оплачено
                </option>
                <option>
                  Отправлено
                </option>
              </select>

              <label>
                Цена €
              </label>

              <input
                value={price}
                onChange={(e) =>
                  setPrice(
                    e.target.value
                  )
                }
              />

              <label>
                Комментарий
              </label>

              <textarea
                value={comment}
                onChange={(e) =>
                  setComment(
                    e.target.value
                  )
                }
              />

              <button
                onClick={
                  saveRequest
                }
              >
                СОХРАНИТЬ
              </button>

            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}