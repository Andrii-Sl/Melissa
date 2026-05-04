"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";
import styles from "./offer.module.css";

export default function OfferPage({ searchParams }: any) {

  const vin = searchParams?.vin || "";
  const startPhone = searchParams?.phone || "";

  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [phone, setPhone] = useState(startPhone);

  const [code, setCode] = useState(["", "", "", ""]);
  const inputsRef = useRef<any[]>([]);

  const [showModal, setShowModal] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [loading, setLoading] = useState(false);

  // 🔥 автофокус на имя
  const nameRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    nameRef.current?.focus();
  }, []);

  // 🔥 ввод кода по ячейкам
  function handleCodeChange(value: string, index: number) {
    if (!/^\d?$/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 3) {
      inputsRef.current[index + 1]?.focus();
    }
  }

  // 🔥 отправка SMS
  async function sendSms() {
    setLoading(true);

    const { error } = await supabase.auth.signInWithOtp({
      phone,
    });

    setLoading(false);

    if (error) {
      alert("Ошибка SMS");
      return;
    }

    setShowModal(true);
  }

  // 🔥 проверка кода
  async function verifyCode() {
    const token = code.join("");

    if (token.length < 4) {
      alert("Введите код");
      return;
    }

    const { error } = await supabase.auth.verifyOtp({
      phone,
      token,
      type: "sms",
    });

    if (error) {
      alert("Неверный код");
      return;
    }

    setShowModal(false);
    setShowSuccess(true);
  }

  // 🔥 SUCCESS
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
                Наше предложение будет доступно
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

  return (
    <main className={styles.page}>

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
              ref={nameRef}
              className={styles.input}
              placeholder="Имя"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />

            <input
              className={styles.input}
              placeholder="Фамилия"
              value={surname}
              onChange={(e) => setSurname(e.target.value)}
            />

            <input
              className={styles.input}
              value={vin}
              readOnly
            />

            <input
              className={styles.input}
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />

            <input
              className={`${styles.input} ${styles.bold}`}
              placeholder="Описание детали"
            />

            <input
              className={styles.input}
              placeholder="Каталожный номер"
            />

            <button
              className={styles.button}
              onClick={sendSms}
            >
              {loading ? "ОТПРАВКА..." : "ВЫСЛАТЬ ЗАПРОС"}
            </button>

          </div>

        </div>
      </section>

      {/* 🔥 SMS MODAL */}
      {showModal && (
        <div className={styles.modalBg}>

          <div className={styles.modal}>

            <h2>Введите код</h2>

            <div className={styles.codeRow}>
              {code.map((digit, i) => (
                <input
                  key={i}
                  ref={(el) => (inputsRef.current[i] = el)}
                  className={styles.codeInput}
                  value={digit}
                  onChange={(e) =>
                    handleCodeChange(e.target.value, i)
                  }
                />
              ))}
            </div>

            <button
              className={styles.button}
              onClick={verifyCode}
            >
              Подтвердить
            </button>

          </div>
        </div>
      )}

    </main>
  );
}