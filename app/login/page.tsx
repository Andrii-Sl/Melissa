"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Footer from "../../components/Footer";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();

  const [phone, setPhone] =
    useState("");

  const [code, setCode] =
    useState("");

  const [step, setStep] =
    useState(1);

  async function sendCode() {
    const { error } =
      await supabase.auth.signInWithOtp({
        phone
      });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Код отправлен");
    setStep(2);
  }

  async function verifyCode() {
    const { error } =
      await supabase.auth.verifyOtp({
        phone,
        token: code,
        type: "sms"
      });

    if (error) {
      alert(error.message);
      return;
    }

    router.push("/dashboard");
  }

  return (
    <main className={styles.page}>
      <section className={styles.hero}>
        <div className={styles.overlay}>

          <div className={styles.card}>
            <div className={styles.titleMini}>
              PHONE LOGIN
            </div>

            <h1>
              Личный кабинет
            </h1>

            {step === 1 && (
              <>
                <input
                  placeholder="+77771234567"
                  value={phone}
                  onChange={(e) =>
                    setPhone(
                      e.target.value
                    )
                  }
                />

                <button
                  className={styles.loginBtn}
                  onClick={sendCode}
                >
                  Получить код
                </button>
              </>
            )}

            {step === 2 && (
              <>
                <input
                  placeholder="Код из SMS"
                  value={code}
                  onChange={(e) =>
                    setCode(
                      e.target.value
                    )
                  }
                />

                <button
                  className={styles.loginBtn}
                  onClick={verifyCode}
                >
                  Войти
                </button>
              </>
            )}

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}