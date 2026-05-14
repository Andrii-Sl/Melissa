"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  Home,
  FileText,
  MessageCircle,
  ShoppingBag,
  User,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import styles from "../dashboard.module.css";

export default function ProfilePage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [garage, setGarage] =
    useState<any[]>([]);

  const [profile, setProfile] =
    useState<any>(null);

  const [firstName, setFirstName] =
    useState("");

  const [lastName, setLastName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [deliveryAddress, setDeliveryAddress] =
    useState("");

  const [billingAddress, setBillingAddress] =
    useState("");

  const [saving, setSaving] =
    useState(false);

  /* LOAD */

  useEffect(() => {

    loadProfile();

  }, []);

  /* PHONE */

  async function getClientPhone() {

    try {

      /* COOKIE */

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

      /* SUPABASE SESSION */

      const {
        data:{ session },
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

  /* PROFILE */

  async function loadProfile() {

    try {

      const clientPhone =
        await getClientPhone();

      if (!clientPhone) {

        setLoading(false);

        return;
      }

      /* CACHE */

      const cachedProfile =
        localStorage.getItem(
          `profile_${clientPhone}`
        );

      if (cachedProfile) {

        const parsed =
          JSON.parse(cachedProfile);

        setProfile(parsed);

        setFirstName(
          parsed.first_name || ""
        );

        setLastName(
          parsed.last_name || ""
        );

        setPhone(
          parsed.phone || ""
        );

        setEmail(
          parsed.email || ""
        );

        setDeliveryAddress(
          parsed.delivery_address || ""
        );

        setBillingAddress(
          parsed.billing_address || ""
        );
      }

      /* PROFILE */

      const {
        data,
        error,
      } =
        await supabase
          .from("profiles")
          .select(`
            first_name,
            last_name,
            phone,
            email,
            delivery_address,
            billing_address
          `)
          .eq(
            "phone",
            clientPhone
          )
          .maybeSingle();

      if (error) {

        console.error(error);

      } else if (data) {

        setProfile(data);

        localStorage.setItem(
          `profile_${clientPhone}`,
          JSON.stringify(data)
        );

        setFirstName(
          data.first_name || ""
        );

        setLastName(
          data.last_name || ""
        );

        setPhone(
          data.phone || ""
        );

        setEmail(
          data.email || ""
        );

        setDeliveryAddress(
          data.delivery_address || ""
        );

        setBillingAddress(
          data.billing_address || ""
        );
      }

      /* GARAGE */

      const {
        data:garageData,
        error:garageError,
      } =
        await supabase
          .from("garage")
          .select(`
            id,
            car,
            car_name,
            vin
          `)
          .eq(
            "client_phone",
            clientPhone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(10);

      if (garageError) {

        console.error(
          garageError
        );

      } else {

        setGarage(
          garageData || []
        );
      }

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  /* SAVE */

  async function saveProfile() {

    try {

      if (!phone) {

        alert(
          "Телефон обязателен"
        );

        return;
      }

      setSaving(true);

      const fullName =
        `${firstName} ${lastName}`.trim();

      const profileData = {
        phone,
        first_name:firstName,
        last_name:lastName,
        full_name:fullName,
        email,
        delivery_address:
          deliveryAddress,
        billing_address:
          billingAddress,
      };

      const {
        error,
      } =
        await supabase
          .from("profiles")
          .upsert([
            profileData,
          ]);

      if (error) {

        console.error(error);

        alert(
          "Ошибка сохранения"
        );

        return;
      }

      localStorage.setItem(
        `profile_${phone}`,
        JSON.stringify(profileData)
      );

      alert(
        "Профиль сохранен"
      );

      await loadProfile();

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );

    } finally {

      setSaving(false);
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

        <div className={styles.logoWrap}>

          <div className={styles.logo}>
            L
          </div>

          <div>

            <div className={styles.brand}>
              LYNKO
            </div>

            <div className={styles.subBrand}>
              Клиентская панель
            </div>

          </div>

        </div>

        <button
          type="button"
          className={styles.burger}
          onClick={() =>
            setMenuOpen(
              !menuOpen
            )
          }
        >

          {
            menuOpen ? (

              <X
                size={24}
                strokeWidth={2.4}
              />

            ) : (

              <Menu
                size={24}
                strokeWidth={2.4}
              />

            )
          }

        </button>

      </header>

      {/* MOBILE MENU */}

      {
        menuOpen && (

          <div className={styles.mobileMenu}>

            <Link
              href="/dashboard"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Главная
            </Link>

            <Link
              href="/dashboard/requests"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Запросы
            </Link>

            <Link
              href="/dashboard/offers"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Предложения
            </Link>

            <Link
              href="/dashboard/orders"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Заказы
            </Link>

            <Link
              href="/dashboard/profile"
              className={styles.mobileMenuItem}
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Профиль
            </Link>

          </div>

        )
      }

      {/* HERO */}

      <section className={styles.hero}>

        <div className={styles.welcome}>
          ЛИЧНЫЙ КАБИНЕТ
        </div>

        <h1 className={styles.name}>

          {
            firstName
              ? `${firstName} ${lastName}`
              : "Профиль"
          }

        </h1>

        <p className={styles.subtitle}>

          📞
          {" "}

          {
            phone ||
            "Телефон не указан"
          }

        </p>

      </section>

      {/* PROFILE INFO */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <div className={styles.profileSectionTop}>

            <h2 className={styles.dashboardSectionTitle}>
              Общая информация
            </h2>

            <div className={styles.profileBadge}>
              Аккаунт
            </div>

          </div>

          <div className={styles.profileGrid}>

            <div className={styles.inputGroupModern}>

              <label>
                Имя
              </label>

              <input
                className={styles.dashboardInput}
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                placeholder="Введите имя"
              />

            </div>

            <div className={styles.inputGroupModern}>

              <label>
                Фамилия
              </label>

              <input
                className={styles.dashboardInput}
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                placeholder="Введите фамилию"
              />

            </div>

          </div>

          <div className={styles.inputGroupModern}>

            <label>
              Телефон
            </label>

            <input
              className={styles.dashboardInput}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              placeholder="+48..."
            />

          </div>

          <div className={styles.inputGroupModern}>

            <label>
              E-mail
            </label>

            <input
              className={styles.dashboardInput}
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              placeholder="mail@example.com"
            />

          </div>

        </div>

      </section>

    </main>
  );
}