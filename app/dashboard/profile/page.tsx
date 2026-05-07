"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function ProfilePage() {

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

    if (!phone) {

      const role =
        document.cookie.includes(
          "role=client"
        );

      if (role)
        phone = "+48519000000";
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

  async function logout() {

    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    await supabase.auth.signOut();

    window.location.href = "/";
  }

  if (loading)
    return <div className={styles.loading}>Загрузка...</div>;

  return (
    <main className={styles.page}>

      <section className={styles.profile}>

        <h2 className={styles.blockTitle}>
          Профиль
        </h2>

        <div className={styles.profileCard}>

          <div className={styles.profileItem}>
            <strong>Имя</strong>
            <p>{profile?.full_name}</p>
          </div>

          <div className={styles.profileItem}>
            <strong>Телефон</strong>
            <p>{profile?.phone}</p>
          </div>

          <div className={styles.profileItem}>
            <strong>Адрес доставки</strong>
            <p>Slovenia, Ljubljana</p>
          </div>

          <button
            className={styles.offerBtn}
            onClick={logout}
          >
            Выйти
          </button>

        </div>

      </section>

    </main>
  );
}