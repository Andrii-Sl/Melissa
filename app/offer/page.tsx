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

export default function OfferPage({ searchParams }: Props) {
  const vin = searchParams.vin || "";
  const startPhone = searchParams.phone || "";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(startPhone);

  const [items, setItems] = useState<Item[]>([
    { description: "", number: "" },
  ]);

  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function addItem() {
    setItems([...items, { description: "", number: "" }]);
  }

  function updateItem(
    index: number,
    field: "description" | "number",
    value: string
  ) {
    const copy = [...items];
    copy[index][field] = value;
    setItems(copy);
  }

  async function sendRequest() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone: phone.trim(),
    });

    setLoading(false);

    if (error) {
      alert("Ошибка отправки SMS");
      return;
    }

    setShowCode(true);
  }

  async function verifyCode() {
    const { error } = await supabase.auth.verifyOtp({
      phone: phone.trim(),
      token: code,
      type: "sms",
    });

    if (error) {
      alert("Неверный код");
      return;
    }

    await createRequest();
  }

  async function createRequest() {
    const fullName = (name + " " + surname).trim();

    let profileId = null;

    const { data: existing } = await supabase
      .from("profiles")
      .select("id")
      .eq("phone", phone)
      .maybeSingle();

    if (existing) {
      profileId = existing.id;
    } else {
      const { data: user } = await supabase
        .from("profiles")
        .insert([
          {
            full_name: fullName,
            phone: phone,
          },
        ])
        .select("id")
        .single();

      profileId = user?.id;
    }

    const { data: request } = await supabase
      .from("requests")
      .insert([
        {
          profile_id: profileId,
          vin,
          phone,
          status: "new",
        },
      ])
      .select()
      .single();

    if (!request) return;

    const rows = items.filter(
      (item) => item.description || item.number
    );

    if (rows.length) {
      await supabase.from("request_items").insert(
        rows.map((item) => ({
          request_id: request.id,
          description: item.description,
          part_number: item.number,
        }))
      );
    }

    setShowSuccess(true);
  }

  /* SUCCESS */

  if (showSuccess) {
    return (
      <main className={styles.page}>
        <section className={styles.hero}>
          <div className={styles.overlay}>
            <div className={styles.card}>
              <h1 className={styles.title}>
                Заявка принята
              </h1>

              <p>
                Предложение появится
                в личном кабинете после SMS.
              </p>

              <Link href="/login" className={styles.button}>
                Личный кабинет
              </Link>
            </div>
          </div>
        </section>
      </main>
    );
  }

  /* MAIN */

  return (
    <main className={styles.page}>
      
      <header className={styles.header}>
        <div className={styles.headerInner}>

          <img
            src="/logo-final.png"
            className={styles.logo}
            alt="logo"
          />

          <Link href="/" className={styles.homeBtn}>
            На главную
          </Link>

        </div>
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

            {/* ИМЯ */}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                placeholder=" "
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label>Имя</label>
            </div>

            {/* ФАМИЛИЯ */}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                placeholder=" "
                value={surname}
                onChange={(e) => setSurname(e.target.value)}
              />
              <label>Фамилия</label>
            </div>

            {/* VIN */}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                value={vin}
                placeholder=" "
                readOnly
              />
              <label>VIN / номер детали</label>
            </div>

            {/* PHONE */}
            <div className={styles.inputWrap}>
              <input
                className={styles.input}
                placeholder=" "
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
              <label>Телефон / WhatsApp</label>
            </div>

            {items.map((item, index) => (
              <div key={index} className={styles.row}>

                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={item.description}
                    onChange={(e) =>
                      updateItem(index, "description", e.target.value)
                    }
                  />
                  <label>Описание детали</label>
                </div>

                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={item.number}
                    onChange={(e) =>
                      updateItem(index, "number", e.target.value)
                    }
                  />
                  <label>Каталожный номер</label>
                </div>

              </div>
            ))}

            <button className={styles.plus} onClick={addItem}>
              +
            </button>

            <button className={styles.button} onClick={sendRequest}>
              {loading ? "ОТПРАВКА..." : "ВЫСЛАТЬ ЗАПРОС"}
            </button>

            {showCode && (
              <>
                <div className={styles.inputWrap}>
                  <input
                    className={styles.input}
                    placeholder=" "
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                  />
                  <label>Код из SMS</label>
                </div>

                <button
                  className={styles.button}
                  onClick={verifyCode}
                >
                  ПОДТВЕРДИТЬ КОД
                </button>
              </>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}