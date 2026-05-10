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

  const [name, setName] =
    useState("");

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

    const {
      data: {
        session,
      },
    } =
      await supabase.auth.getSession();

    let phone =
      session?.user?.phone;

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

    setName(
      data?.full_name || ""
    );

    setCountry(
      data?.country || ""
    );

    setCity(
      data?.city || ""
    );

    setAddress(
      data?.address || ""
    );

    setLoading(false);
  }

  /* SAVE */

  async function saveProfile() {

    if (!profile?.id)
      return;

    await supabase
      .from("profiles")
      .update({
        full_name:name,
        country,
        city,
        address,
      })
      .eq(
        "id",
        profile.id
      );

    alert(
      "Профиль сохранён"
    );
  }

  /* LOGOUT */

  async function logout() {

    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

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

      {/* HEADER */}

      <section className={styles.hero}>

        <h1 className={styles.title}>
          Профиль
        </h1>

      </section>

      {/* PROFILE */}

      <section className={styles.requestBox}>

        <div className={styles.form}>

          <input
            className={styles.input}
            placeholder="Имя"
            value={name}
            onChange={(e) =>
              setName(
                e.target.value
              )
            }
          />

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

          <input
            className={styles.input}
            placeholder="Адрес"
            value={address}
            onChange={(e) =>
              setAddress(
                e.target.value
              )
            }
          />

          <button
            className={styles.createBtn}
            onClick={saveProfile}
          >
            Сохранить
          </button>

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