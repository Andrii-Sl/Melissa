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
  Phone,
  Mail,
  MapPin,
  Receipt,
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import type {
  Profile,
  GarageCar,
} from "@/types/dashboard";

import { handleError }
from "@/lib/handleError";

import { getClientPhone }
from "@/lib/getClientPhone";

import styles from "../dashboard.module.css";

export default function ProfilePage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [loading, setLoading] =
    useState(true);

  const [garage, setGarage] =
    useState<GarageCar[]>([]);

  const [profile, setProfile] =
    useState<Profile | null>(null);

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

  useEffect(() => {

    loadProfile();

  }, []);

  async function loadProfile() {

    try {

      const clientPhone =
        (
          await getClientPhone()
        ).trim();

      if (!clientPhone) {

        setLoading(false);

        return;
      }

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

        handleError(error);

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

      const {
        data:garageData,
        error:garageError,
      } =
        await supabase
          .from("garage")
          .select(`
            id,
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

        handleError(
          garageError
        );

      } else {

        setGarage(
          garageData || []
        );
      }

    } catch (error) {

      handleError(error);

    } finally {

      setLoading(false);
    }
  }

  async function saveProfile() {

    try {

      if (!phone.trim()) {

        alert(
          "Телефон обязателен"
        );

        return;
      }

      setSaving(true);

      const normalizedPhone =
        phone.trim();

      const fullName =
        `${firstName} ${lastName}`.trim();

      const profileData = {
        phone:normalizedPhone,
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
          .upsert(
            profileData,
            {
              onConflict:"phone",
            }
          );

      if (error) {

        handleError(error);

        alert(
          "Ошибка сохранения"
        );

        return;
      }

      localStorage.setItem(
        `profile_${normalizedPhone}`,
        JSON.stringify(profileData)
      );

      setProfile(profileData);

      alert(
        "Профиль сохранен"
      );

      await loadProfile();

    } catch (error) {

      handleError(error);

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

        <h1
          className={styles.name}
          style={{
            fontSize:"32px",
            lineHeight:"36px",
          }}
        >

          {
            firstName
              ? `${firstName} ${lastName}`
              : "Профиль"
          }

        </h1>

      </section>

      {/* PROFILE */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <h2
            className={styles.dashboardSectionTitle}
            style={{
              marginBottom:"18px",
            }}
          >
            Общая информация
          </h2>

          <div className={styles.form}>

            <div className={styles.input}>

              <User
                size={18}
                strokeWidth={2.3}
              />

              <input
                type="text"
                value={firstName}
                placeholder="Введите имя"
                readOnly
              />

            </div>

            <div className={styles.input}>

              <User
                size={18}
                strokeWidth={2.3}
              />

              <input
                type="text"
                value={lastName}
                placeholder="Введите фамилию"
                readOnly
              />

            </div>

            <div className={styles.input}>

              <Phone
                size={18}
                strokeWidth={2.3}
              />

              <input
                type="text"
                value={phone}
                placeholder="+48..."
                readOnly
              />

            </div>

            <div className={styles.input}>

              <Mail
                size={18}
                strokeWidth={2.3}
              />

              <input
                type="email"
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

        </div>

      </section>

      {/* DELIVERY */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <h2
            className={styles.dashboardSectionTitle}
            style={{
              marginBottom:"18px",
            }}
          >
            Адрес доставки
          </h2>

          <div className={styles.input}>

            <MapPin
              size={18}
              strokeWidth={2.3}
            />

            <textarea
              className={styles.dashboardTextarea}
              value={deliveryAddress}
              onChange={(e) =>
                setDeliveryAddress(
                  e.target.value
                )
              }
              placeholder="Введите адрес доставки"
            />

          </div>

        </div>

      </section>

      {/* BILLING */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <h2
            className={styles.dashboardSectionTitle}
            style={{
              marginBottom:"18px",
            }}
          >
            Billing address
          </h2>

          <div className={styles.input}>

            <Receipt
              size={18}
              strokeWidth={2.3}
            />

            <textarea
              className={styles.dashboardTextarea}
              value={billingAddress}
              onChange={(e) =>
                setBillingAddress(
                  e.target.value
                )
              }
              placeholder="Введите billing address"
            />

          </div>

        </div>

      </section>

      {/* GARAGE */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <h2
            className={styles.dashboardSectionTitle}
            style={{
              marginBottom:"18px",
            }}
          >
            Автомобили
          </h2>

          <div className={styles.profileCarsList}>

            {garage.length === 0 && (

              <div className={styles.emptyMiniCard}>

                <div
                  style={{
                    fontWeight:800,
                    fontSize:"16px",
                    marginBottom:"6px",
                  }}
                >
                  Автомобили отсутствуют
                </div>

                <div
                  style={{
                    color:"#7b8194",
                    fontSize:"14px",
                    fontWeight:600,
                    lineHeight:"20px",
                    marginBottom:"16px",
                  }}
                >
                  Управляйте автомобилями
                  в отдельном разделе
                </div>

                <Link
                  href="/dashboard/garage"
                  className={styles.profileManageBtn}
                >
                  УПРАВЛЕНИЕ АВТОМОБИЛЯМИ
                </Link>

              </div>

            )}

            {garage.map((item) => (

              <div
                key={item.id}
                className={styles.profileCarCard}
              >

                <div className={styles.profileCarIcon}>
                  🚘
                </div>

                <div className={styles.profileCarInfo}>

                  <strong>
                    {
                      item.car_name ||
                      "Автомобиль"
                    }
                  </strong>

                  <span>
                    VIN:
                    {" "}
                    {item.vin || "—"}
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SAVE */}

      <section
        className={`${styles.section} ${styles.saveSection}`}
      >

        <button
          type="button"
          className={styles.dashboardSubmit}
          onClick={saveProfile}
          disabled={saving}
        >

          {
            saving
              ? "СОХРАНЕНИЕ..."
              : "СОХРАНИТЬ ИЗМЕНЕНИЯ"
          }

        </button>

      </section>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link href="/dashboard">

          <Home
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/requests">

          <FileText
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/offers">

          <MessageCircle
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link href="/dashboard/orders">

          <ShoppingBag
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link
          href="/dashboard/profile"
          className={styles.activeNav}
        >

          <User
            size={22}
            strokeWidth={2.3}
          />

        </Link>

      </nav>

    </main>
  );
}