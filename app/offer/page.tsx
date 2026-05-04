"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./offer.module.css";

type Props = {
  searchParams: {
    vin?: string;
    phone?: string;
  };
};

type Item = {
  description: string;
  number: string;
};

export default function OfferPage({
  searchParams,
}: Props) {

  const vin =
    searchParams.vin || "";

  const phone =
    searchParams.phone || "";

  const [name, setName] =
    useState("");

  const [surname, setSurname] =
    useState("");

  const [items, setItems] =
    useState<Item[]>([
      {
        description: "",
        number: "",
      },
    ]);

  const [done, setDone] =
    useState(false);

  const [requestId, setRequestId] =
    useState("");

  function addItem() {
    setItems([
      ...items,
      {
        description: "",
        number: "",
      },
    ]);
  }

  function updateItem(
    index: number,
    field:
      | "description"
      | "number",
    value: string
  ) {
    const copy = [...items];
    copy[index][field] =
      value;
    setItems(copy);
  }

  async function sendForm() {

    const fullName =
      (
        name +
        " " +
        surname
      ).trim();

    let profileId =
      null;

    const {
      data:
        existing,
    } = await supabase
      .from(
        "profiles"
      )
      .select("id")
      .eq(
        "phone",
        phone
      )
      .maybeSingle();

    if (existing) {
      profileId =
        existing.id;
    } else {
      const {
        data:
          user,
      } =
        await supabase
          .from(
            "profiles"
          )
          .insert([
            {
              full_name:
                fullName,
              phone,
            },
          ])
          .select("id")
          .single();

      profileId =
        user?.id;
    }

    const {
      data:
        request,
    } =
      await supabase
        .from(
          "requests"
        )
        .insert([
          {
            profile_id:
              profileId,
            vin,
            phone,
            status:
              "new",
          },
        ])
        .select()
        .single();

    if (!request)
      return;

    const rows =
      items.filter(
        (x) =>
          x.description ||
          x.number
      );

    if (
      rows.length
    ) {
      await supabase
        .from(
          "request_items"
        )
        .insert(
          rows.map(
            (
              item
            ) => ({
              request_id:
                request.id,
              description:
                item.description,
              part_number:
                item.number,
            })
          )
        );
    }

    setRequestId(
      String(
        request.id
      )
    );

    setDone(true);
  }

  if (done) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.card}>

              <h1 className={styles.title}>
                Благодарим
              </h1>

              <p>
                Ваш запрос №
                {requestId}
                принят.
              </p>

              <p>
                Информацию о
                стоимости и
                наличии мы
                сообщим в
                личном кабинете.
              </p>

              <Link
                href="/login"
                className={
                  styles.button
                }
              >
                Личный кабинет
              </Link>

            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>

      <header className={styles.header}>

        <img
          src="/logo-final.png"
          className={styles.logo}
          alt="logo"
        />

        <Link
          href="/"
          className={styles.homeBtn}
        >
          На главную
        </Link>

      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>

            <div className={styles.label}>
              ЗАПРОС
            </div>

            <h1 className={styles.title}>
              Отправить запрос
            </h1>

            <input
              className={styles.input}
              placeholder="Имя"
              value={name}
              onChange={(e) =>
                setName(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              placeholder="Фамилия"
              value={surname}
              onChange={(e) =>
                setSurname(
                  e.target.value
                )
              }
            />

            <input
              className={styles.input}
              value={vin}
              readOnly
            />

            <input
              className={styles.input}
              value={phone}
              readOnly
            />

            {items.map(
              (
                item,
                index
              ) => (
                <div
                  key={index}
                  className={styles.row}
                >

                  <input
                    className={styles.input}
                    placeholder="Описание детали"
                    value={
                      item.description
                    }
                    onChange={(e) =>
                      updateItem(
                        index,
                        "description",
                        e.target
                          .value
                      )
                    }
                  />

                  <input
                    className={styles.input}
                    placeholder="Каталожный номер"
                    value={
                      item.number
                    }
                    onChange={(e) =>
                      updateItem(
                        index,
                        "number",
                        e.target
                          .value
                      )
                    }
                  />

                </div>
              )
            )}

            <button
              className={styles.plus}
              onClick={
                addItem
              }
            >
              +
            </button>

            <button
              className={styles.button}
              onClick={
                sendForm
              }
            >
              ВЫСЛАТЬ ЗАПРОС
            </button>

          </div>

        </div>
      </section>

    </main>
  );
}