"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function GaragePage() {

  const [cars, setCars] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  const [brand, setBrand] =
    useState("");

  const [model, setModel] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [phone, setPhone] =
    useState("");

  useEffect(() => {
    loadGarage();
  }, []);

  async function loadGarage() {

    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    let currentPhone =
      session?.user?.phone;

    if (!currentPhone) {

      const role =
        document.cookie.includes(
          "role=client"
        );

      if (role)
        currentPhone =
          "+48519000000";
    }

    setPhone(currentPhone || "");

    const {
      data,
    } =
      await supabase
        .from("garage")
        .select("*")
        .eq(
          "phone",
          currentPhone
        )
        .order("id", {
          ascending: false,
        });

    setCars(data || []);

    setLoading(false);
  }

  async function addCar() {

    if (!brand || !model)
      return;

    const {
      data,
    } =
      await supabase
        .from("garage")
        .insert([
          {
            phone,
            brand,
            model,
            vin,
          },
        ])
        .select()
        .single();

    if (data) {

      setCars([
        data,
        ...cars,
      ]);

      setBrand("");
      setModel("");
      setVin("");
    }
  }

  if (loading)
    return (
      <div className={styles.loading}>
        Загрузка...
      </div>
    );

  return (
    <main className={styles.page}>

      <section className={styles.requestBox}>

        <h2 className={styles.blockTitle}>
          Добавить автомобиль
        </h2>

        <div className={styles.form}>

          <input
            className={styles.input}
            placeholder="Марка"
            value={brand}
            onChange={(e) =>
              setBrand(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="Модель"
            value={model}
            onChange={(e) =>
              setModel(
                e.target.value
              )
            }
          />

          <input
            className={styles.input}
            placeholder="VIN"
            value={vin}
            onChange={(e) =>
              setVin(
                e.target.value
              )
            }
          />

          <button
            className={styles.createBtn}
            onClick={addCar}
          >
            + Добавить
          </button>

        </div>

      </section>

      <section className={styles.section}>

        <div className={styles.sectionTop}>
          <h2>
            Мои автомобили
          </h2>
        </div>

        {cars.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.brand}
              {" "}
              {item.model}
            </strong>

            <p>
              VIN:
              {" "}
              {item.vin ||
                "не указан"}
            </p>

          </div>
        ))}

      </section>

    </main>
  );
}