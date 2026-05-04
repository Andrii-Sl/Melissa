"use client";

import { useState } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "../../offer/offer.module.css";

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

export default function EnOfferPage({
  searchParams,
}: Props) {
  const vin = searchParams.vin || "";
  const startPhone = searchParams.phone || "";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(startPhone);

  const [items, setItems] = useState<Item[]>([
    {
      description: "",
      number: "",
    },
  ]);

  const [code, setCode] = useState("");
  const [showCode, setShowCode] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  function addItem() {
    setItems([
      ...items,
      { description: "", number: "" },
    ]);
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

  /* SEND SMS */

  async function sendRequest() {
    setLoading(true);

    const cleanPhone = phone.trim();

    const { error } =
      await supabase.auth.signInWithOtp({
        phone: cleanPhone,
      });

    setLoading(false);

    if (error) {
      alert("SMS sending error");
      return;
    }

    setShowCode(true);
  }

  /* VERIFY SMS */

  async function verifyCode() {
    const cleanPhone = phone.trim();

    const { error } =
      await supabase.auth.verifyOtp({
        phone: cleanPhone,
        token: code,
        type: "sms",
      });

    if (error) {
      alert("Invalid code");
      return;
    }

    await createRequest();
  }

  /* CREATE REQUEST */

  async function createRequest() {
    const fullName =
      (name + " " + surname).trim();

    let profileId = null;

    const { data: existing } =
      await supabase
        .from("profiles")
        .select("id")
        .eq("phone", phone)
        .maybeSingle();

    if (existing) {
      profileId = existing.id;
    } else {
      const { data: user } =
        await supabase
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

    const { data: request } =
      await supabase
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
      (item) =>
        item.description || item.number
    );

    if (rows.length) {
      await supabase
        .from("request_items")
        .insert(
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
                Request accepted
              </h1>

              <p>
                Your offer will be available in your account
                after SMS confirmation.
              </p>

              <Link
                href="/en/login"
                className={styles.button}
              >
                Account
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
        <img
          src="/logo-final.png"
          className={styles.logo}
          alt="logo"
        />

        <Link
          href="/en"
          className={styles.homeBtn}
        >
          Home
        </Link>
      </header>

      <section className={styles.hero}>
        <div className={styles.overlay}>
          <div className={styles.card}>

            <div className={styles.label}>
              REQUEST
            </div>

            <h1 className={styles.title}>
              Send request
            </h1>

            <input
              className={styles.input}
              placeholder="First name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
            />

            <input
              className={styles.input}
              placeholder="Last name"
              value={surname}
              onChange={(e) =>
                setSurname(e.target.value)
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
              onChange={(e) =>
                setPhone(e.target.value)
              }
            />

            {items.map((item, index) => (
              <div
                key={index}
                className={styles.row}
              >
                <input
                  className={styles.input}
                  placeholder="Part description"
                  value={item.description}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "description",
                      e.target.value
                    )
                  }
                />

                <input
                  className={styles.input}
                  placeholder="Part number"
                  value={item.number}
                  onChange={(e) =>
                    updateItem(
                      index,
                      "number",
                      e.target.value
                    )
                  }
                />
              </div>
            ))}

            <button
              className={styles.plus}
              onClick={addItem}
            >
              +
            </button>

            <button
              className={styles.button}
              onClick={sendRequest}
            >
              {loading
                ? "SENDING..."
                : "SEND REQUEST"}
            </button>

            {showCode && (
              <>
                <input
                  className={styles.input}
                  placeholder="SMS code"
                  value={code}
                  onChange={(e) =>
                    setCode(e.target.value)
                  }
                />

                <button
                  className={styles.button}
                  onClick={verifyCode}
                >
                  CONFIRM
                </button>
              </>
            )}

          </div>
        </div>
      </section>

    </main>
  );
}