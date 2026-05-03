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

  const [loading, setLoading] =
    useState(false);

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
    if (loading) return;

    setLoading(true);

    try {
      const fullName =
        (
          name +
          " " +
          surname
        ).trim();

      /* 1. Ищем клиента */
      let profileId =
        null;

      const {
        data:
          existingUser,
      } = await supabase
        .from(
          "profiles"
        )
        .select(
          "id"
        )
        .eq(
          "phone",
          phone
        )
        .maybeSingle();

      if (
        existingUser
      ) {
        profileId =
          existingUser.id;
      } else {
        /* 2. Создаём клиента */
        const {
          data:
            newUser,
        } =
          await supabase
            .from(
              "profiles"
            )
            .insert([
              {
                full_name:
                  fullName,
                phone:
                  phone,
              },
            ])
            .select(
              "id"
            )
            .single();

        profileId =
          newUser?.id;
      }

      /* 3. Создаём заявку */
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

      /* 4. Позиции */
      const cleanItems =
        items.filter(
          (item) =>
            item.description ||
            item.number
        );

      if (
        cleanItems.length
      ) {
        await supabase
          .from(
            "request_items"
          )
          .insert(
            cleanItems.map(
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
    } finally {
      setLoading(false);
    }
  }

  /* SUCCESS SCREEN */

  if (done) {
    return (
      <main
        className={
          styles.page
        }
      >
        <div
          className={
            styles.success
          }
        >
          <h1>
            Благодарим!
          </h1>

          <p>
            Ваш запрос №
            {
              requestId
            }{" "}
            принят.
          </p>

          <p>
            Информацию о
            стоимости и
            наличии мы
            сообщим в
            личном кабинете
            нашего сервиса.
          </p>

          <p>
            Вы будете
            уведомлены
            по SMS.
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
      </main>
    );
  }

  /* FORM */

  return (
    <main
      className={
        styles.page
      }
    >
      <header
        className={
          styles.header
        }
      >
        <Link
          href="/"
          className={
            styles.logoWrap
          }
        >
          <img
            src="/logo-final.png"
            className={
              styles.logo
            }
            alt="logo"
          />

          <span>
            AutoParts EU
          </span>
        </Link>

        <Link
          href="/"
          className={
            styles.homeBtn
          }
        >
          На главную
        </Link>
      </header>

      <section
        className={
          styles.hero
        }
      >
        <div
          className={
            styles.card
          }
        >
          <div
            className={
              styles.label
            }
          >
            ЗАПРОС
          </div>

          <h1
            className={
              styles.title
            }
          >
            Отправить запрос
          </h1>

          <input
            className={
              styles.input
            }
            placeholder="Имя"
            value={name}
            onChange={(
              e
            ) =>
              setName(
                e.target
                  .value
              )
            }
          />

          <input
            className={
              styles.input
            }
            placeholder="Фамилия"
            value={
              surname
            }
            onChange={(
              e
            ) =>
              setSurname(
                e.target
                  .value
              )
            }
          />

          <input
            className={
              styles.input
            }
            value={vin}
            readOnly
          />

          <input
            className={
              styles.input
            }
            value={phone}
            readOnly
          />

          {items.map(
            (
              item,
              index
            ) => (
              <div
                key={
                  index
                }
                className={
                  styles.row
                }
              >
                <input
                  className={
                    styles.input
                  }
                  placeholder="Описание детали"
                  value={
                    item.description
                  }
                  onChange={(
                    e
                  ) =>
                    updateItem(
                      index,
                      "description",
                      e.target
                        .value
                    )
                  }
                />

                <input
                  className={
                    styles.input
                  }
                  placeholder="Каталожный номер"
                  value={
                    item.number
                  }
                  onChange={(
                    e
                  ) =>
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
            className={
              styles.plus
            }
            onClick={
              addItem
            }
          >
            +
          </button>

          <button
            className={
              styles.button
            }
            onClick={
              sendForm
            }
          >
            {loading
              ? "ОТПРАВКА..."
              : "ВЫСЛАТЬ ЗАПРОС"}
          </button>
        </div>
      </section>
    </main>
  );
}