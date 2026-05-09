"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    let phone =
      session?.user?.phone;

    /* TEST CLIENT */

    if (!phone) {

      const role =
        document.cookie.includes(
          "role=client"
        );

      if (role)
        phone =
          "+48519000000";
    }

    const {
      data,
    } =
      await supabase
        .from("profiles")
        .select("*")
        .eq("phone", phone)
        .maybeSingle();

    setProfile(data);

    setLoading(false);
  }

  if (loading)
    return (
      <div className={styles.loading}>
        Загрузка...
      </div>
    );

  return (

    <main className={styles.page}>

      {/* HERO */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Здравствуйте,
          <br />
          Клиент
        </h1>

        <p className={styles.phone}>
          {profile?.phone ||
            "+48519000000"}
        </p>

      </section>

      {/* GARAGE */}

      <section className={styles.garage}>

        <div className={styles.sectionTop}>

          <h2 className={styles.blockTitle}>
            Мои автомобили
          </h2>

          <Link
            href="/dashboard/garage"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        <div className={styles.cars}>

          <Link
            href="/dashboard/garage"
            className={styles.car}
          >

            <strong>
              Audi A6 C8
            </strong>

            <span>
              WAUZZZF20...
            </span>

          </Link>

          <Link
            href="/dashboard/garage"
            className={styles.car}
          >

            <strong>
              BMW G30
            </strong>

            <span>
              WBA5R510...
            </span>

          </Link>

        </div>

      </section>

      {/* STATS */}

      <section className={styles.stats}>

        <Link
          href="/dashboard/requests"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.red}`}
            >
              📄
            </div>

          </div>

          <div className={styles.statValue}>
            0
          </div>

          <div className={styles.statLabel}>
            Заявки
          </div>

        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.blue}`}
            >
              💶
            </div>

          </div>

          <div className={styles.statValue}>
            0
          </div>

          <div className={styles.statLabel}>
            Предложения
          </div>

        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.purple}`}
            >
              📦
            </div>

          </div>

          <div className={styles.statValue}>
            0
          </div>

          <div className={styles.statLabel}>
            Заказы
          </div>

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.statCard}
        >

          <div className={styles.statTop}>

            <div
              className={`${styles.statIcon} ${styles.green}`}
            >
              ✅
            </div>

          </div>

          <div className={styles.statValue}>
            12
          </div>

          <div className={styles.statLabel}>
            Выполнено
          </div>

        </Link>

      </section>

      {/* NEW REQUEST */}

      <section className={styles.requestBox}>

        <h2 className={styles.blockTitle}>
          Новая заявка
        </h2>

        <div className={styles.form}>

          <input
            className={styles.input}
            placeholder="VIN"
          />

          <input
            className={styles.input}
            placeholder="Описание детали"
          />

          <input
            className={styles.input}
            placeholder="Каталожный номер"
          />

          <button
            className={styles.createBtn}
          >
            + Создать заявку
          </button>

        </div>

      </section>

      {/* REQUESTS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заявки
          </h2>

          <Link
            href="/dashboard/requests"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        <Link
          href="/dashboard/requests"
          className={styles.card}
        >

          <strong>
            Масляный фильтр
          </strong>

          <p>
            WAUZZZF20...
          </p>

          <div className={styles.badge}>
            🟡 Новая
          </div>

        </Link>

      </section>

      {/* OFFERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Предложения
          </h2>

          <Link
            href="/dashboard/offers"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        <Link
          href="/dashboard/offers"
          className={styles.card}
        >

          <strong>
            BMW Original
          </strong>

          <div className={styles.price}>
            €120
          </div>

          <div className={styles.badge}>
            В наличии
          </div>

        </Link>

      </section>

      {/* ORDERS */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Заказы
          </h2>

          <Link
            href="/dashboard/orders"
            className={styles.more}
          >
            Все
          </Link>

        </div>

        <Link
          href="/dashboard/orders"
          className={styles.card}
        >

          <strong>
            Заказ #1024
          </strong>

          <p>
            Track: EU4839201
          </p>

          <div className={styles.badge}>
            Отправлен
          </div>

        </Link>

      </section>

      {/* PROFILE */}

      <section className={styles.section}>

        <div className={styles.sectionTop}>

          <h2>
            Профиль
          </h2>

          <Link
            href="/dashboard/profile"
            className={styles.more}
          >
            Открыть
          </Link>

        </div>

        <Link
          href="/dashboard/profile"
          className={styles.profileCard}
        >

          <div className={styles.profileItem}>

            <strong>
              Имя
            </strong>

            <p>
              {profile?.full_name || ""}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Телефон
            </strong>

            <p>
              {profile?.phone || ""}
            </p>

          </div>

          <div className={styles.profileItem}>

            <strong>
              Адрес доставки
            </strong>

            <p>
              Slovenia, Ljubljana
            </p>

          </div>

        </Link>

      </section>

      {/* PAYMENT BANNER */}

      <section className={styles.paymentSection}>

        <img
          src="/payments-banner.png"
          alt="Payments"
          className={styles.paymentBanner}
        />

      </section>

    </main>
  );
}