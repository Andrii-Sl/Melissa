"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [garage, setGarage] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  async function getClientPhone() {

    try {

      const cookiePhone =
        document.cookie
          .split("; ")
          .find((row) =>
            row.startsWith(
              "client_phone="
            )
          )
          ?.split("=")[1];

      if (cookiePhone)
        return cookiePhone;

      const {
        data:{
          session,
        },
      } =
        await supabase.auth.getSession();

      return (
        session?.user?.phone || ""
      );

    } catch (error) {

      console.error(error);

      return "";
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      const phone =
        await getClientPhone();

      if (!phone) {

        setLoading(false);

        return;
      }

      /* PROFILE */

      const {
        data:profileData,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            phone
          )
          .maybeSingle();

      setProfile(profileData);

      /* GARAGE */

      const {
        data:garageData,
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

      setGarage(
        garageData || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  async function logout() {

    try {

      await supabase.auth.signOut();

      document.cookie =
        "client_phone=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT";

      window.location.href =
        "/login";

    } catch (error) {

      console.error(error);
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

      <header className={styles.header}>

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              Профиль клиента
            </p>

            <h1 className={styles.mainTitle}>
              {
                profile?.full_name ||
                "Клиент"
              }
            </h1>

          </div>

          <div className={styles.avatar}>
            👤
          </div>

        </div>

      </header>

      {/* GENERAL INFO */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Общая информация
          </h2>

        </div>

        <div className={styles.profileCard}>

          <div className={styles.profileRow}>

            <span>
              Имя
            </span>

            <strong>
              {
                profile?.full_name ||
                "—"
              }
            </strong>

          </div>

          <div className={styles.profileRow}>

            <span>
              Телефон
            </span>

            <strong>
              {
                profile?.phone ||
                "—"
              }
            </strong>

          </div>

          <div className={styles.profileRow}>

            <span>
              E-mail
            </span>

            <strong>
              {
                profile?.email ||
                "—"
              }
            </strong>

          </div>

        </div>

      </section>

      {/* DELIVERY ADDRESS */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Адрес доставки
          </h2>

        </div>

        <div className={styles.profileCard}>

          <p className={styles.addressText}>

            {
              profile?.delivery_address ||
              "Адрес доставки не указан"
            }

          </p>

        </div>

      </section>

      {/* BILLING ADDRESS */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Адрес выставления счёта
          </h2>

        </div>

        <div className={styles.profileCard}>

          <p className={styles.addressText}>

            {
              profile?.billing_address ||
              "Адрес выставления счёта не указан"
            }

          </p>

        </div>

      </section>

      {/* CARS */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Автомобили
          </h2>

          <Link
            href="/dashboard/garage"
            className={styles.linkBtn}
          >
            Все
          </Link>

        </div>

        {garage.length === 0 && (

          <div className={styles.profileCard}>

            <p className={styles.addressText}>
              Автомобили не добавлены
            </p>

          </div>

        )}

        {garage.map((item) => (

          <div
            key={item.id}
            className={styles.orderCard}
          >

            <div>

              <strong>
                {
                  item.car_name ||
                  "Автомобиль"
                }
              </strong>

              <p>
                VIN:
                {" "}
                {item.vin || "—"}
              </p>

            </div>

          </div>

        ))}

      </section>

      {/* LOGOUT */}

      <section className={styles.section}>

        <button
          className={styles.logoutButton}
          onClick={logout}
        >
          Выйти из аккаунта
        </button>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >
          <span>
            🏠
          </span>
          Главная
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <span>
            📄
          </span>
          Заявки
        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >
          <span>
            💶
          </span>
          Предложения
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >
          <span>
            📦
          </span>
          Заказы
        </Link>

        <Link
          href="/dashboard/profile"
          className={`${styles.navItem} ${styles.navActive}`}
        >
          <span>
            👤
          </span>
          Профиль
        </Link>

      </nav>

    </main>
  );
}