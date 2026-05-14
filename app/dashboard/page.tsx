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
} from "lucide-react";

import { supabase } from "@/lib/supabase";

import { getClientPhone }
from "@/lib/getClientPhone";

import styles from "./dashboard.module.css";

interface Profile {
  full_name?: string;
}

interface GarageCar {
  id:number;
  car:string;
  vin:string;
}

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
              car,
              vin
            `)
            .eq(
              "client_phone",
              normalizedPhone
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

            </div>

          )
        }

        {/* HERO */}

        <section className={styles.hero}>

          <div className={styles.welcome}>
            ДОБРО ПОЖАЛОВАТЬ
          </div>

          <h1 className={styles.name}>
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

      </div>

    </div>
  );
}