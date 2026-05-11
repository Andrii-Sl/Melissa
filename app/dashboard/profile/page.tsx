"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function ProfilePage() {

  const [profile, setProfile] =
    useState<any>(null);

  const [loading, setLoading] =
    useState(true);

  /* READONLY NAME */

  const [name, setName] =
    useState("");

  /* ADDRESS */

  const [country, setCountry] =
    useState("");

  const [city, setCity] =
    useState("");

  const [address, setAddress] =
    useState("");

  useEffect(() => {
    loadProfile();
  }, []);

  async function loadProfile() {

    try {

      const {
        data: {
          session,
        },
      } =
        await supabase.auth.getSession();

      let phone =
        session?.user?.phone;

      /* COOKIE AUTOLOGIN */

      if (!phone) {

        const phoneCookie =
          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "client_phone="
              )
            )
            ?.split("=")[1];

        if (phoneCookie)
          phone = phoneCookie;
      }

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

      if (!phone) {

        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq("phone", phone)
          .maybeSingle();

      if (error) {

        console.error(error);

        setLoading(false);

        return;
      }

      setProfile(data);

      /* NAME FROM REGISTRATION */

      setName(
        data?.full_name || ""
      );

      /* ADDRESS */

      setCountry(
        data?.country || ""
      );

      setCity(
        data?.city || ""
      );

      setAddress(
        data?.address || ""
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  /* SAVE PROFILE */

  async function saveProfile() {

    try {

      if (!profile?.id) {

        alert(
          "Профиль не найден"
        );

        return;
      }

      const {
        error,
      } =
        await supabase
          .from("profiles")
          .update({
            country,
            city,
            address,
          })
          .eq(
            "id",
            profile.id
          );

      if (error) {

        console.error(error);

        alert(
          "Ошибка сохранения"
        );

        return;
      }

      alert(
        "Профиль сохранён"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
    }
  }

  /* LOGOUT */

  async function logout() {

    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    document.cookie =
      "client_phone=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    await supabase.auth.signOut();

    window.location.href =
      "/";
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
          Профиль
        </h1>

      </section>

      {/* PROFILE FORM */}

      <section className={styles.requestBox}>

        <div className={styles.form}>

          {/* NAME */}

          <input
            className={styles.input}
            value={name}
            readOnly
            style={{
              opacity:0.7,
              cursor:"not-allowed",
            }}
          />

          {/* PHONE */}

          <input
            className={styles.input}
            value={
              profile?.phone || ""
            }
            readOnly
            style={{
              opacity:0.7,
              cursor:"not-allowed",
            }}
          />

          {/* COUNTRY */}

          <input
            className={styles.input}
            placeholder="Страна"
            value={country}
            onChange={(e) =>
              setCountry(
                e.target.value
              )
            }
          />

          {/* CITY */}

          <input
            className={styles.input}
            placeholder="Город"
            value={city}
            onChange={(e) =>
              setCity(
                e.target.value
              )
            }
          />

          {/* ADDRESS */}

          <input
            className={styles.input}
            placeholder="Адрес доставки"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />

          {/* SAVE */}

          <button
            className={styles.createBtn}
            onClick={saveProfile}
          >
            Сохранить
          </button>

          {/* LOGOUT */}

          <button
            className={styles.logoutWhiteBtn}
            onClick={logout}
          >
            Выйти
          </button>

        </div>

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
          className={styles.navItem}
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
          className={`${styles.navItem} ${styles.navItemActive}`}
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