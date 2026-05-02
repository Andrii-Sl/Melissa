"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../lib/supabase";
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();

  const [vin, setVin] = useState("");
  const [phone, setPhone] = useState("");

  async function sendRequest() {
    if (!vin || !phone) {
      alert("Заполните данные");
      return;
    }

    const { error } = await supabase
      .from("requests")
      .insert([
        {
          vin_or_part: vin,
          phone: phone,
          status: "pre_auth"
        }
      ]);

    if (error) {
      alert("Ошибка отправки");
      return;
    }

    router.push("/offer");
  }

  return (
    <main className={styles.page}>
      <header className={styles.header}>
        <div className={styles.container}>

          <a href="/" className={styles.logoWrap}>
            <img
              src="/logo-final.png"
              alt="AutoParts EU"
              className={styles.logoImg}
            />
          </a>

          <div className={styles.rightSide}>
            <button className={styles.burger}>☰</button>

            <a href="/login" className={styles.loginBtn}>
              Кабинет
            </a>
          </div>

        </div>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.heroBox}>

            <div className={styles.miniTitle}>
              ПОДБОР ПО VIN И НОМЕРУ ДЕТАЛИ
            </div>

            <h1>
              Автозапчасти
              <br />
              из Европы
            </h1>

            <p>
              Оригинальные детали и качественные аналоги
              для европейских автомобилей.
            </p>

            <div className={styles.trustRow}>
              <span>✔ Подбор по VIN</span>
              <span>✔ Поставщики Европы</span>
              <span>✔ Гарантия качества</span>
            </div>

            <input
              placeholder="VIN или номер детали"
              value={vin}
              onChange={(e) => setVin(e.target.value)}
            />

            <input
              placeholder="Телефон / WhatsApp"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <button
              className={styles.cta}
              onClick={sendRequest}
            >
              ПОЛУЧИТЬ ПРЕДЛОЖЕНИЕ
            </button>

          </div>
        </div>
      </section>
    </main>
  );
}