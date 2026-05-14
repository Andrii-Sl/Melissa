"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import {
  Menu,
  X,
  FileText,
  MessageCircle,
  ShoppingBag,
  User,
  Car,
  Shield,
  Package,
  Send,
  Home,
  Minus,
  Plus,
  ChevronDown,
  LogOut,
} from "lucide-react";

import { supabase }
from "@/lib/supabase";

import { handleError }
from "@/lib/handleError";

import {
  getClientPhone,
} from "@/lib/getClientPhone";

import type {
  Profile,
  GarageCar,
} from "@/types/dashboard";

import styles from "./dashboard.module.css";

export default function DashboardPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [phone, setPhone] =
    useState("");

  const [profile, setProfile] =
    useState<Profile | null>(null);

  const [requestsCount, setRequestsCount] =
    useState(0);

  const [offersCount, setOffersCount] =
    useState(0);

  const [ordersCount, setOrdersCount] =
    useState(0);

  const [garage, setGarage] =
    useState<GarageCar[]>([]);

  const [selectedCar, setSelectedCar] =
    useState("");

  const [vin, setVin] =
    useState("");

  const [partName, setPartName] =
    useState("");

  const [quantity, setQuantity] =
    useState(1);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    init();

  }, []);

  async function init() {

    try {

      const clientPhone =
        await getClientPhone();

      const normalizedPhone =
        clientPhone.trim();

      setPhone(
        normalizedPhone
      );

      if (!normalizedPhone)
        return;

      const [
        profileRes,
        requestsRes,
        offersRes,
        ordersRes,
        garageRes,
      ] =
        await Promise.all([

          supabase
            .from("profiles")
            .select(`
              full_name
            `)
            .eq(
              "phone",
              normalizedPhone
            )
            .maybeSingle(),

          supabase
            .from("requests")
            .select(
              "id",
              {
                count:"exact",
                head:true,
              }
            )
            .eq(
              "client_phone",
              normalizedPhone
            ),

          supabase
            .from("offers")
            .select(
              "id",
              {
                count:"exact",
                head:true,
              }
            )
            .eq(
              "client_phone",
              normalizedPhone
            ),

          supabase
            .from("orders")
            .select(
              "id",
              {
                count:"exact",
                head:true,
              }
            )
            .eq(
              "client_phone",
              normalizedPhone
            ),

          supabase
            .from("garage")
            .select(`
              id,
              car_name,
              vin,
              client_phone
            `)
            .eq(
              "client_phone",
              normalizedPhone
            )
            .order(
              "id",
              {
                ascending:false,
              }
            ),

        ]);

      if (
        profileRes.data
      ) {

        setProfile(
          profileRes.data
        );
      }

      setRequestsCount(
        requestsRes.count || 0
      );

      setOffersCount(
        offersRes.count || 0
      );

      setOrdersCount(
        ordersRes.count || 0
      );

      if (
        garageRes.error
      ) {

        console.error(
          "garage error:",
          garageRes.error
        );

      } else {

        setGarage(
          garageRes.data || []
        );
      }

    } catch (error) {

      handleError(error);
    }
  }

  function handleCarChange(
    value:string
  ) {

    setSelectedCar(value);

    const selected =
      garage.find(
        (item) =>
          item.car_name === value
      );

    if (selected) {

      setVin(
        selected.vin || ""
      );

    } else {

      setVin("");
    }
  }

  async function handleSubmit() {

    if (
      !selectedCar ||
      !partName
    ) {

      alert(
        "Заполните все поля"
      );

      return;
    }

    try {

      setLoading(true);

      const {
        error,
      } =
        await supabase
          .from("requests")
          .insert({
            car:selectedCar,
            vin,
            part_name:partName,
            quantity,
            status:"NEW",
            client_phone:phone,
          });

      if (error) {

        handleError(error);

        alert(
          "Ошибка создания запроса"
        );

        return;
      }

      setPartName("");

      setQuantity(1);

      setSelectedCar("");

      setVin("");

      const {
        count,
      } =
        await supabase
          .from("requests")
          .select(
            "id",
            {
              count:"exact",
              head:true,
            }
          )
          .eq(
            "client_phone",
            phone
          );

      setRequestsCount(
        count || 0
      );

      alert(
        "Запрос отправлен"
      );

    } catch (error) {

      handleError(error);

      alert(
        "Ошибка соединения"
      );

    } finally {

      setLoading(false);
    }
  }

  function handleLogout() {

    localStorage.removeItem(
      "client_phone"
    );

    localStorage.removeItem(
      "role"
    );

    localStorage.clear();

    document.cookie =
      "client_phone=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    document.cookie =
      "role=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;";

    window.location.href =
      "/login";
  }

  const fullName =

    profile?.full_name?.trim() ||

    "Клиент";

  return (

    <div className={styles.page}>

      <div className={styles.container}>

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
                href="/dashboard/profile"
                className={styles.mobileMenuItem}
                onClick={() =>
                  setMenuOpen(false)
                }
              >
                Профиль
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

              <button
                type="button"
                className={styles.mobileLogout}
                onClick={handleLogout}
              >

                <LogOut
                  size={18}
                  strokeWidth={2.4}
                />

                ВЫХОД

              </button>

            </div>

          )
        }

        {/* HERO */}

        <section className={styles.hero}>

          <div className={styles.welcome}>
            ДОБРО ПОЖАЛОВАТЬ
          </div>

          <h1
            className={styles.name}
            style={{
              fontSize:"32px",
              lineHeight:"36px",
              whiteSpace:"nowrap",
              overflow:"hidden",
              textOverflow:"ellipsis",
            }}
          >
            {fullName}
          </h1>

          <p className={styles.subtitle}>
            Управляйте запросами и следите за заказами
          </p>

        </section>

{/* STATS */}

<section className={styles.statsGrid}>

  <Link
    href="/dashboard/requests"
    className={styles.card}
  >

    <div className={styles.iconBlue}>

      <FileText
        size={22}
        strokeWidth={2.3}
      />

    </div>

    <div>

      <div className={styles.cardTitle}>
        Запросы
      </div>

      <div className={styles.cardValue}>
        {requestsCount}
      </div>

    </div>

  </Link>

  <Link
    href="/dashboard/offers"
    className={styles.card}
  >

    <div className={styles.iconGreen}>

      <MessageCircle
        size={22}
        strokeWidth={2.3}
      />

    </div>

    <div>

      <div className={styles.cardTitle}>
        Предложения
      </div>

      <div className={styles.cardValue}>
        {offersCount}
      </div>

    </div>

  </Link>

  <Link
    href="/dashboard/orders"
    className={styles.card}
  >

    <div className={styles.iconPurple}>

      <ShoppingBag
        size={22}
        strokeWidth={2.3}
      />

    </div>

    <div>

      <div className={styles.cardTitle}>
        Заказы
      </div>

      <div className={styles.cardValue}>
        {ordersCount}
      </div>

    </div>

  </Link>

  <Link
    href="/dashboard/profile"
    className={styles.card}
  >

    <div className={styles.iconOrange}>

      <User
        size={22}
        strokeWidth={2.3}
      />

    </div>

    <div>

      <div className={styles.cardTitle}>
        Профиль
      </div>

      <div className={styles.cardSub}>
        Управление данными
      </div>

    </div>

  </Link>

</section>

{/* REQUEST */}

<section className={styles.requestCard}>

  <div className={styles.requestTitle}>
    Новый запрос
  </div>

  <div className={styles.form}>

    <div className={styles.input}>

      <Car
        size={18}
        strokeWidth={2.3}
      />

      <select
        value={selectedCar}
        onChange={(e) =>
          handleCarChange(
            e.target.value
          )
        }
      >

        <option value="">
          Выберите автомобиль
        </option>

        {garage.map((item) => (

          <option
            key={item.id}
            value={item.car_name}
          >
            {item.car_name}
          </option>

        ))}

      </select>

      <ChevronDown
        size={18}
        strokeWidth={2.3}
      />

    </div>

    <div className={styles.input}>

      <Shield
        size={18}
        strokeWidth={2.3}
      />

      <input
        type="text"
        value={vin}
        readOnly
        placeholder="VIN код"
      />

    </div>

    <div className={styles.input}>

      <Package
        size={18}
        strokeWidth={2.3}
      />

      <input
        type="text"
        placeholder="Наименование запчасти"
        value={partName}
        onChange={(e) =>
          setPartName(
            e.target.value
          )
        }
      />

    </div>

    <div className={styles.bottomRow}>

      <div className={styles.counter}>

        <button
          type="button"
          onClick={() =>
            setQuantity(
              Math.max(
                1,
                quantity - 1
              )
            )
          }
        >

          <Minus
            size={18}
            strokeWidth={2.6}
          />

        </button>

        <span>
          {quantity}
        </span>

        <button
          type="button"
          onClick={() =>
            setQuantity(
              quantity + 1
            )
          }
        >

          <Plus
            size={18}
            strokeWidth={2.6}
          />

        </button>

      </div>

      <button
        className={styles.submit}
        onClick={handleSubmit}
        disabled={loading}
      >

        <Send
          size={18}
          strokeWidth={2.5}
        />

        {
          loading
            ? "ОТПРАВКА..."
            : "ОТПРАВИТЬ"
        }

      </button>

    </div>

  </div>

</section>

      </div>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.activeNav}
        >

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

        <Link href="/dashboard/profile">

          <User
            size={22}
            strokeWidth={2.3}
          />

        </Link>

      </nav>

    </div>
  );
}