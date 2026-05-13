"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { createClient } from "@supabase/supabase-js";

import {
  Menu,
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
} from "lucide-react";

import styles from "./dashboard.module.css";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

interface Profile {
  first_name?: string;
  last_name?: string;
  name?: string;
  surname?: string;
}

interface GarageCar {
  id:number;
  car:string;
  vin:string;
}

export default function DashboardPage() {

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

      let clientPhone = "";

      if (
        typeof window !==
        "undefined"
      ) {

        clientPhone =
          localStorage.getItem(
            "client_phone"
          ) ||

          document.cookie
            .split("; ")
            .find((row) =>
              row.startsWith(
                "client_phone="
              )
            )
            ?.split("=")[1] ||

          "";
      }

      clientPhone =
        clientPhone.trim();

      setPhone(clientPhone);

      if (!clientPhone)
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
            .select("*")
            .eq(
              "phone",
              clientPhone
            )
            .single(),

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
              clientPhone
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
              clientPhone
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
              clientPhone
            ),

          supabase
            .from("garage")
            .select("*")
            .eq(
              "client_phone",
              clientPhone
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
        garageRes.data
      ) {

        setGarage(
          garageRes.data
        );
      }

    } catch (error) {

      console.error(error);
    }
  }

  function handleCarChange(
    value:string
  ) {

    setSelectedCar(value);

    const selected =
      garage.find(
        (item) =>
          item.car === value
      );

    if (selected) {

      setVin(
        selected.vin || ""
      );
    }
  }

  async function handleSubmit() {

    if (
      !selectedCar ||
      !partName
    )
      return;

    try {

      setLoading(true);

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

      setPartName("");

      setQuantity(1);

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

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  const firstName =
    profile?.first_name ||

    profile?.name ||

    "Клиент";

  const lastName =
    profile?.last_name ||

    profile?.surname ||

    "";

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

          <button className={styles.burger}>

            <Menu
              size={24}
              strokeWidth={2.4}
            />

          </button>

        </header>

        {/* HERO */}

        <section className={styles.hero}>

          <div className={styles.welcome}>
            ДОБРО ПОЖАЛОВАТЬ
          </div>

          <h1 className={styles.name}>
            {firstName}
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

            {/* CAR */}

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
                    value={item.car}
                  >
                    {item.car}
                  </option>

                ))}

              </select>

              <ChevronDown
                size={18}
                strokeWidth={2.3}
              />

            </div>

            {/* VIN */}

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

            {/* PART */}

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

            {/* ACTIONS */}

            <div className={styles.bottomRow}>

              <div className={styles.counter}>

                <button
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

                {loading
                  ? "ОТПРАВКА..."
                  : "ОТПРАВИТЬ"}

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