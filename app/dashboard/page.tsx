"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "../../lib/supabase";
import Footer from "../../components/Footer";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const router = useRouter();

  const [orders, setOrders] =
    useState<any[]>([]);

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    checkUser();
  }, []);

  async function checkUser() {
    const {
      data: { session }
    } =
      await supabase.auth.getSession();

    if (!session) {
      router.push("/login");
      return;
    }

    const userPhone =
      session.user.phone || "";

    setPhone(userPhone);

    loadOrders(userPhone);
  }

  async function loadOrders(
    userPhone: string
  ) {
    const { data } =
      await supabase
        .from("requests")
        .select("*")
        .eq("phone", userPhone)
        .order("id", {
          ascending: false
        });

    if (data) {
      setOrders(data);
    }
  }

  async function logout() {
    await supabase.auth.signOut();
    router.push("/");
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.topBar}>
            <div>
              <div className={styles.label}>
                ЛИЧНЫЙ КАБИНЕТ
              </div>

              <h1>Мои заявки</h1>

              <p>
                {phone}
              </p>
            </div>

            <button
              onClick={logout}
            >
              Выйти
            </button>
          </div>

          <div className={styles.list}>
            {orders.map((item) => (
              <a
                key={item.id}
                href={`/dashboard/request/${item.id}`}
                className={styles.card}
              >
                <strong>
                  #{item.id}
                </strong>

                <p>
                  {item.part_name ||
                    item.vin ||
                    "Запрос"}
                </p>

                <span>
                  {item.status}
                </span>
              </a>
            ))}

            {orders.length === 0 && (
              <div className={styles.card}>
                Пока заявок нет
              </div>
            )}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}