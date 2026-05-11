"use client";

import Link from "next/link";
import Image from "next/image";
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

  const [uploading, setUploading] =
    useState(false);

  const [requestId, setRequestId] =
    useState("");

  const [brand, setBrand] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [delivery, setDelivery] =
    useState("");

  const [article, setArticle] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [productImage, setProductImage] =
    useState("");

  useEffect(() => {

    loadData();

    const offersChannel =
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

    const requestsChannel =
      supabase
        .channel("admin-requests")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"requests",
          },
          () => {
            loadData();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        offersChannel
      );

      supabase.removeChannel(
        requestsChannel
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
          .eq(
            "status",
            "NEW"
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if (offersError) {

        console.error(
          "OFFERS ERROR:",
          offersError
        );
      }

      if (requestsError) {

        console.error(
          "REQUESTS ERROR:",
          requestsError
        );
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

  async function uploadImage(
    file:any
  ) {

    try {

      setUploading(true);

      const fileExt =
        file.name
          .split(".")
          .pop();

      const fileName =
        `${Date.now()}.${fileExt}`;

      const {
        error,
      } =
        await supabase.storage
          .from("products")
          .upload(
            fileName,
            file,
            {
              cacheControl:"3600",
              upsert:false,
            }
          );

      if (error) {

        console.error(error);

        alert(
          "Ошибка загрузки фото"
        );

        return "";
      }

      const {
        data,
      } =
        supabase.storage
          .from("products")
          .getPublicUrl(
            fileName
          );

      return data.publicUrl;

    } catch (error) {

      console.error(error);

      return "";

    } finally {

      setUploading(false);
    }
  }

  async function createOffer() {

    try {

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

      const selectedRequest =
        requests.find(
          (item) =>
            item.id.toString() ===
            requestId
        );

      if (!selectedRequest) {

        alert(
          "Заявка не найдена"
        );

        return;
      }

      const {
        error,
      } =
        await supabase
          .from("offers")
          .insert([
            {
              request_id:
                Number(requestId),

              brand:
                brand.trim(),

              article:
                article.trim(),

              description:
                description.trim(),

              product_image:
                productImage,

              price:
                Number(price),

              delivery_days:
                Number(delivery || 0),

              client_phone:
                selectedRequest.client_phone,

              request_part_name:
                selectedRequest.part_name,

              payment_status:
                "PENDING",

              status:
                "ACTIVE",

              created_at:
                new Date()
                  .toISOString(),
            },
          ]);

      if (error) {

        console.error(error);

        alert(
          error.message
        );

        return;
      }

      const {
        error:updateError,
      } =
        await supabase
          .from("requests")
          .update({
            status:"IN_OFFER",
          })
          .eq(
            "id",
            Number(requestId)
          );

      if (updateError) {

        console.error(updateError);
      }

      setBrand("");
      setPrice("");
      setDelivery("");
      setRequestId("");
      setArticle("");
      setDescription("");
      setProductImage("");

      await loadData();

      alert(
        "Предложение создано"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка создания предложения"
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

      const currentOffer =
        offers.find(
          (item) =>
            item.id === id
        );

      const {
        error,
      } =
        await supabase
          .from("offers")
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

      if (
        currentOffer?.request_id
      ) {

        await supabase
          .from("requests")
          .update({
            status:"NEW",
          })
          .eq(
            "id",
            currentOffer.request_id
          );
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
            placeholder="Название товара"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Артикул"
            value={article}
            onChange={(e) =>
              setArticle(
                e.target.value
              )
            }
          />

          <textarea
            className={styles.textarea}
            placeholder="Описание товара"
            value={description}
            onChange={(e) =>
              setDescription(
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
            type="date"
            className={styles.input}
            value={delivery}
            onChange={(e) =>
              setDelivery(
                e.target.value
              )
            }
          />

          <input
            type="file"
            accept="image/*"
            className={styles.input}
            onChange={async (e) => {

              const file =
                e.target.files?.[0];

              if (!file)
                return;

              const imageUrl =
                await uploadImage(
                  file
                );

              setProductImage(
                imageUrl
              );
            }}
          />

          {productImage && (

            <div
              style={{
                position:"relative",
                width:"100%",
                height:"240px",
                marginTop:"14px",
                borderRadius:"20px",
                overflow:"hidden",
              }}
            >

              <Image
                src={productImage}
                alt=""
                fill
                style={{
                  objectFit:"cover",
                }}
                unoptimized
              />

            </div>

          )}

          <button
            className={styles.createBtn}
            onClick={createOffer}
            disabled={uploading}
            style={{
              opacity:
                uploading
                  ? 0.6
                  : 1,
            }}
          >
            {
              uploading
                ? "Загрузка..."
                : "+ Создать предложение"
            }
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

            {item.product_image && (

              <div
                style={{
                  position:"relative",
                  width:"100%",
                  height:"240px",
                  borderRadius:"20px",
                  overflow:"hidden",
                  marginBottom:"14px",
                }}
              >

                <Image
                  src={item.product_image}
                  alt=""
                  fill
                  style={{
                    objectFit:"cover",
                  }}
                  unoptimized
                />

              </div>

            )}

            <div className={styles.requestTop}>

              <strong>
                {item.brand || "Товар"}
              </strong>

              <span className={styles.badgeBlue}>
                €
                {" "}
                {item.price || 0}
              </span>

            </div>

            <p>
              Артикул:
              {" "}
              {item.article || "—"}
            </p>

            <p>
              {item.description || "—"}
            </p>

            <p>
              Доставка:
              {" "}
              {item.delivery_days || "—"}
            </p>

            <p>
              Статус:
              {" "}
              {item.status || "ACTIVE"}
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