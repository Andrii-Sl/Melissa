"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Footer from "../../components/Footer";
import styles from "./offer.module.css";

export default function OfferPage() {
  const router = useRouter();

  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [part, setPart] =
    useState("");

  const [comment, setComment] =
    useState("");

  async function sendRequest() {
    if (!phone) {
      alert("Введите телефон");
      return;
    }

    const { error } =
      await supabase
        .from("requests")
        .insert([
          {
            client_name: name,
            phone,
            vin,
            part_name: part,
            comment,
            status: "Новая"
          }
        ]);

    if (error) {
      alert("Ошибка отправки");
      return;
    }

    alert("Заявка отправлена");

    router.push("/login");
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.box}>

          <div className={styles.label}>
            НОВАЯ ЗАЯВКА
          </div>

          <h1>
            Получить предложение
          </h1>

          <input
            placeholder="Ваше имя"
            value={name}
            onChange={(e) =>
              setName(e.target.value)
            }
          />

          <input
            placeholder="Телефон *"
            value={phone}
            onChange={(e) =>
              setPhone(e.target.value)
            }
          />

          <input
            placeholder="VIN код"
            value={vin}
            onChange={(e) =>
              setVin(e.target.value)
            }
          />

          <input
            placeholder="Название детали"
            value={part}
            onChange={(e) =>
              setPart(e.target.value)
            }
          />

          <textarea
            placeholder="Комментарий"
            value={comment}
            onChange={(e) =>
              setComment(e.target.value)
            }
          />

          <button
            onClick={sendRequest}
          >
            ОТПРАВИТЬ
          </button>

        </div>
      </section>

      <Footer />
    </main>
  );
}