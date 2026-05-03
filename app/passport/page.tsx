"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { supabase } from "@/lib/supabase";
import styles from "./passport.module.css";

export default function PassportPage() {
  const params = useSearchParams();

  const vin =
    params.get("vin") || "";

  const phone =
    params.get("phone") || "";

  const [search, setSearch] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const [result, setResult] =
    useState(false);

  const [requestId, setRequestId] =
    useState<number | null>(null);

  async function handleSearch() {
    if (!search) return;

    setLoading(true);

    const { data } =
      await supabase
        .from("requests")
        .insert([
          {
            vin,
            phone,
            part_query: search,
            product_name:
              "Brembo Brake Pads",
            part_number:
              "P85120",
            status: "new",
          },
        ])
        .select()
        .single();

    if (data) {
      setRequestId(data.id);
    }

    setResult(true);
    setLoading(false);
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <Link
          href="/"
          className={styles.logoWrap}
        >
          <img
            src="/logo-final.png"
            className={styles.logo}
            alt="logo"
          />
          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/"
          className={styles.homeBtn}
        >
          На главную
        </Link>

      </header>

      <section className={styles.hero}>

        <div className={styles.grid}>

          <div className={styles.card}>
            <div className={styles.label}>
              ПАСПОРТ АВТО
            </div>

            <h1 className={styles.title}>
              Проверка VIN
            </h1>

            <div className={styles.info}>
              <p>
                <strong>VIN:</strong> {vin}
              </p>

              <p>
                <strong>Телефон:</strong> {phone}
              </p>
            </div>
          </div>

          <div className={styles.card}>
            <div className={styles.label}>
              ПОИСК ДЕТАЛИ
            </div>

            <h2 className={styles.sub}>
              TecDoc Search
            </h2>

            <input
              className={styles.input}
              placeholder="Введите название детали"
              value={search}
              onChange={(e) =>
                setSearch(
                  e.target.value
                )
              }
            />

            <button
              className={styles.button}
              onClick={
                handleSearch
              }
            >
              {loading
                ? "ПОИСК..."
                : "ИСКАТЬ"}
            </button>
          </div>

        </div>

        {result && (
          <div className={styles.result}>

            <img
              src="/product.jpg"
              className={styles.photo}
              alt="product"
            />

            <div>

              <div className={styles.label}>
                НАЙДЕНО
              </div>

              <h3 className={styles.product}>
                Brembo Brake Pads
              </h3>

              <p>Артикул: P85120</p>

              <p>
                Подходит:
                Audi A4 / A5 / Q5
              </p>

              <p>Цена: —</p>

              <p>Наличие: —</p>

              <Link
                href={`/login?request=${requestId}`}
                className={styles.authBtn}
              >
                Пройти авторизацию
              </Link>

            </div>

          </div>
        )}

      </section>

    </main>
  );
}