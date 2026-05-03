"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Footer from "../../components/Footer";
import styles from "./dashboard.module.css";

export default function DashboardPage() {
  const [orders, setOrders] =
    useState<any[]>([]);

  const [phone, setPhone] =
    useState("");

  const [searchPhone, setSearchPhone] =
    useState("");

  useEffect(() => {
    const saved =
      localStorage.getItem("phone");

    if (saved) {
      setPhone(saved);
      setSearchPhone(saved);
      loadOrders(saved);
    }
  }, []);

  async function loadOrders(
    targetPhone: string
  ) {
    const { data } =
      await supabase
        .from("requests")
        .select("*")
        .eq("phone", targetPhone)
        .order("id", {
          ascending: false
        });

    if (data) {
      setOrders(data);
    }
  }

  function handleSearch() {
    setPhone(searchPhone);

    localStorage.setItem(
      "phone",
      searchPhone
    );

    loadOrders(searchPhone);
  }

  return (
    <main className={styles.page}>
      <section className={styles.content}>
        <div className={styles.container}>

          <div className={styles.label}>
            ЛИЧНЫЙ КАБИНЕТ
          </div>

          <h1>Мои заявки</h1>

          <input
            placeholder="Введите телефон"
            value={searchPhone}
            onChange={(e) =>
              setSearchPhone(
                e.target.value
              )
            }
          />

          <button
            onClick={handleSearch}
          >
            ПОКАЗАТЬ
          </button>

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