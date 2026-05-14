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

  const [cartCount, setCartCount] =
    useState(0);

  useEffect(() => {

    init();

    const cart =
      localStorage.getItem(
        "cart"
      );

    if (cart) {

      try {

        const parsed =
          JSON.parse(cart);

        setCartCount(
          parsed.length || 0
        );

      } catch {

        setCartCount(0);
      }
    }

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
      "clientPhone"
    );

    window.location.href =
      "/";
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

          <div className={styles.headerActions}>

            <Link
              href="/dashboard/cart"
              className={styles.cartButton}
            >

              <ShoppingBag
                size={20}
                strokeWidth={2.4}
              />

              {
                cartCount > 0 && (

                  <span
                    className={styles.cartBadge}
                  >
                    {cartCount}
                  </span>

                )
              }

            </Link>

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

          </div>

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
                  strokeWidth={2.5}
                />

                Выйти

              </button>

            </div>

          )
        }

      </div>

    </div>
  );
}