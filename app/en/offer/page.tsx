"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "../../offer/offer.module.css";

export default function EnOfferPage({ searchParams }: any) {

  const vin = searchParams?.vin || "";
  const startPhone = searchParams?.phone || "";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(startPhone);

  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<(HTMLInputElement | null)[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  function handleCodeChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  async function sendSms() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    setLoading(false);

    if (error) {
      alert("SMS error");
      return;
    }

    setShowModal(true);
  }

  async function verifyCode() {
    const token = code.join("");

    if (token.length < 4) {
      alert("Enter code");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) {
      alert("Invalid code");
      return;
    }

    setShowModal(false);
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

              <Link href="/en/login" className={styles.button}>
                Go to account
              </Link>

            </div>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className={styles.page}>

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
              ref={nameRef}
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

            <input
              className={`${styles.input} ${styles.bold}`}
              placeholder="Part description"
            />

            <input
              className={styles.input}
              placeholder="Part number"
            />

            <button
              className={styles.button}
              onClick={sendSms}
            >
              {loading ? "SENDING..." : "SEND REQUEST"}
            </button>

          </div>

        </div>
      </section>

      {/* SMS MODAL */}

      {showModal && (
        <div className={styles.modalBg}>

          <div className={styles.modal}>

            <h2>Enter code</h2>

            <div className={styles.codeRow}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => {
                    inputsRef.current[i] = el;
                  }}
                  className={styles.codeInput}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange(
                      e.target.value,
                      i
                    )
                  }
                />
              ))}
            </div>

            <button
              className={styles.button}
              onClick={verifyCode}
            >
              Confirm
            </button>

          </div>
        </div>
      )}

    </main>
  );
}