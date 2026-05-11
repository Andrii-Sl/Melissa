"use client";

import Link from "next/link";
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

  useEffect(() => {

    loadCars();

    const channel =
      supabase
        .channel("garage-realtime")
        .on(
          "postgres_changes",
          {
            event:"*",
            schema:"public",
            table:"garage",
          },
          () => {
            loadCars();
          }
        )
        .subscribe();

    return () => {

      supabase.removeChannel(
        channel
      );
    };

  }, []);

  function getClientPhone() {

    const cookiePhone =
      document.cookie
        .split("; ")
        .find((row) =>
          row.startsWith(
            "client_phone="
          )
        )
        ?.split("=")[1];

    return cookiePhone || "";
  }

  async function loadCars() {

    try {

      let phone =
        getClientPhone();

      if (!phone) {

        const {
          data:{
            session,
          },
        } =
          await supabase.auth.getSession();

        phone =
          session?.user?.phone || "";
      }

      if (!phone) {

        setCars([]);

        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("garage")
          .select("*")
          .eq(
            "client_phone",
            phone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      if (error) {

        console.error(
          "LOAD GARAGE ERROR:",
          error
        );

        setCars([]);

        return;
      }

      setCars(data || []);

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  async function addCar() {

    if (
      !brand.trim() ||
      !model.trim() ||
      !vin.trim()
    ) {

      alert(
        "Заполните все поля"
      );

      return;
    }

    try {

      let phone =
        getClientPhone();

      if (!phone) {

        const {
          data:{
            session,
          },
        } =
          await supabase.auth.getSession();

        phone =
          session?.user?.phone || "";
      }

      if (!phone) {

        alert(
          "Требуется авторизация"
        );

        return;
      }

      const insertData = {

        client_phone:
          phone,

        brand:
          brand.trim(),

        model:
          model.trim(),

        vin:
          vin.trim(),

        car_name:
          `${brand.trim()} ${model.trim()}`,
      };

      console.log(
        "INSERT DATA:",
        insertData
      );

      const {
        error,
        data,
      } =
        await supabase
          .from("garage")
          .insert([insertData])
          .select();

      console.log(
        "GARAGE INSERT:",
        data
      );

      console.log(
        "GARAGE ERROR:",
        error
      );

      if (error) {

        console.error(error);

        alert(
          error.message ||
          "Ошибка добавления"
        );

        return;
      }

      setBrand("");
      setModel("");
      setVin("");

      await loadCars();

      alert(
        "Автомобиль добавлен"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  async function deleteCar(
    id:number
  ) {

    const confirmDelete =
      confirm(
        "Удалить автомобиль?"
      );

    if (!confirmDelete)
      return;

    try {

      const {
        error,
      } =
        await supabase
          .from("garage")
          .delete()
          .eq("id", id);

      if (error) {

        console.error(error);

        alert(
          "Ошибка удаления"
        );

        return;
      }

      setCars(
        (prev) =>
          prev.filter(
            (item) =>
              item.id !== id
          )
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
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

      {/* HEADER */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Гараж
        </h1>

        <p className={styles.phone}>
          Мои автомобили
        </p>

      </section>

      {/* ADD CAR */}

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

      {/* CARS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Мои автомобили
          </h2>

        </div>

        {cars.length === 0 && (

          <div className={styles.card}>

            <strong>
              Автомобилей пока нет
            </strong>

          </div>

        )}

        {cars.map((item) => (

          <div
            key={item.id}
            className={styles.card}
          >

            <strong>
              {item.car_name || "Автомобиль"}
            </strong>

            <p>
              VIN:
              {" "}
              {item.vin || "—"}
            </p>

            <button
              className={styles.logoutBtn}
              onClick={() =>
                deleteCar(item.id)
              }
            >
              Удалить
            </button>

          </div>

        ))}

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            🏠
          </div>

          <span>
            Главная
          </span>

        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            📄
          </div>

          <span>
            Заявки
          </span>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            💶
          </div>

          <span>
            Предложения
          </span>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            📦
          </div>

          <span>
            Заказы
          </span>

        </Link>

        <Link
          href="/dashboard/garage"
          className={`${styles.navItem} ${styles.navItemActive}`}
        >

          <div className={styles.navIcon}>
            🚗
          </div>

          <span>
            Гараж
          </span>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.navItem}
        >

          <div className={styles.navIcon}>
            👤
          </div>

          <span>
            Профиль
          </span>

        </Link>

      </nav>

    </main>
  );
}