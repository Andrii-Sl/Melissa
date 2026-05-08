"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "../../dashboard.module.css";

export default function RequestDetailsPage() {

  const params = useParams();

  const [request, setRequest] =
    useState<any>(null);

  const [offers, setOffers] =
    useState<any[]>([]);

  const [images, setImages] =
    useState<any[]>([]);

  const [comments, setComments] =
    useState<any[]>([]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(true);

  const [uploading, setUploading] =
    useState(false);

  useEffect(() => {

    loadRequest();

    /* REALTIME COMMENTS */

    const channel =
      supabase
        .channel(
          "request-comments"
        )
        .on(
          "postgres_changes",
          {
            event: "*",
            schema: "public",
            table:
              "request_comments",
          },
          () => {
            loadComments();
          }
        )
        .subscribe();

    return () => {
      supabase.removeChannel(
        channel
      );
    };

  }, []);

  /* LOAD */

  async function loadRequest() {

    const {
      data,
    } =
      await supabase
        .from("requests")
        .select("*")
        .eq("id", params.id)
        .single();

    setRequest(data);

    /* OFFERS */

    const {
      data: off,
    } =
      await supabase
        .from("offers")
        .select("*")
        .eq(
          "request_id",
          params.id
        );

    setOffers(off || []);

    /* IMAGES */

    const {
      data: imgs,
    } =
      await supabase
        .from("request_images")
        .select("*")
        .eq(
          "request_id",
          params.id
        );

    setImages(imgs || []);

    /* COMMENTS */

    await loadComments();

    setLoading(false);
  }

  /* COMMENTS */

  async function loadComments() {

    const {
      data,
    } =
      await supabase
        .from(
          "request_comments"
        )
        .select("*")
        .eq(
          "request_id",
          params.id
        )
        .order("id", {
          ascending: true,
        });

    setComments(data || []);
  }

  /* SEND COMMENT */

  async function sendComment() {

    if (!message)
      return;

    await supabase
      .from(
        "request_comments"
      )
      .insert([
        {
          request_id:
            params.id,

          sender:
            "client",

          message,
        },
      ]);

    setMessage("");
  }

  /* UPLOAD IMAGE */

  async function uploadImage(
    e:any
  ) {

    const file =
      e.target.files?.[0];

    if (!file)
      return;

    setUploading(true);

    const fileName =
      `${Date.now()}-${file.name}`;

    const {
      error,
    } =
      await supabase
        .storage
        .from(
          "request-images"
        )
        .upload(
          fileName,
          file
        );

    if (error) {

      alert(
        "Ошибка загрузки"
      );

      setUploading(false);

      return;
    }

    const {
      data,
    } =
      supabase
        .storage
        .from(
          "request-images"
        )
        .getPublicUrl(
          fileName
        );

    await supabase
      .from(
        "request_images"
      )
      .insert([
        {
          request_id:
            params.id,

          image_url:
            data.publicUrl,
        },
      ]);

    setImages([
      ...images,
      {
        image_url:
          data.publicUrl,
      },
    ]);

    setUploading(false);
  }

  /* LOADING */

  if (loading)
    return (
      <div className={styles.loading}>
        Загрузка...
      </div>
    );

  return (
    <main className={styles.page}>

      {/* REQUEST */}

      <section className={styles.section}>

        <div className={styles.card}>

          <strong>
            {request.part_name}
          </strong>

          <p>
            VIN:
            {" "}
            {request.vin}
          </p>

          <div className={styles.badge}>
            {request.timeline ||
              request.status}
          </div>

        </div>

      </section>

      {/* UPLOAD */}

      <section className={styles.requestBox}>

        <h2 className={styles.blockTitle}>
          Фото детали
        </h2>

        <div className={styles.form}>

          <input
            type="file"
            onChange={uploadImage}
          />

          {uploading && (
            <p>
              Загрузка...
            </p>
          )}

        </div>

      </section>

      {/* IMAGES */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>
            Фото
          </h2>
        </div>

        <div className={styles.cars}>

          {images.map((item, index) => (

            <img
              key={index}
              src={item.image_url}
              className={styles.requestImage}
              alt="request"
            />
          ))}

        </div>

      </section>

      {/* COMMENTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>
            Комментарии
          </h2>
        </div>

        {comments.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.sender}
            </strong>

            <p>
              {item.message}
            </p>

          </div>
        ))}

        <div className={styles.form}>

          <textarea
            className={styles.textarea}
            placeholder="Сообщение..."
            value={message}
            onChange={(e) =>
              setMessage(
                e.target.value
              )
            }
          />

          <button
            className={styles.createBtn}
            onClick={sendComment}
          >
            Отправить
          </button>

        </div>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>
            Предложения
          </h2>
        </div>

        {offers.map((item) => (

          <a
            href={`/dashboard/offers/${item.id}`}
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand}
            </strong>

            <div className={styles.price}>
              €{item.price}
            </div>

            <p>
              {item.delivery}
            </p>

            <div className={styles.badge}>
              {item.availability}
            </div>

          </a>
        ))}

      </section>

    </main>
  );
}