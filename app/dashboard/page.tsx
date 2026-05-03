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

  async function loadOrders() {
    if (!phone) return;

    const { data } =
      await supabase
        .from("requests")
        .select("*")
        .eq("phone", phone)
        .order("id", {
          ascending: false
        });

    if (data) {
      setOrders(data);
    }
  }

  useEffect(() => {
    const saved =
      localStorage.getItem("phone");

    if (saved) {
      setPhone(saved);
      setSearchPhone(saved);
    }
  }, []);

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
            onClick={() => {
              setPhone(
                searchPhone
              );

              localStorage.setItem(
                "phone",
                searchPhone
              );

              loadOrders();
            }}
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
                    item.vin}
                </p>

                <span>
                  {item.status}
                </span>
              </a>
            ))}
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}