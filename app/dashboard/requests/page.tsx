"use client";

import Link from "next/link";

import {
  Menu,
  X,
  FileText,
  MessageCircle,
  ShoppingBag,
  User,
  Home,
} from "lucide-react";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import { getClientPhone }
from "@/lib/getClientPhone";

import styles from "../dashboard.module.css";

export default function RequestsPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [requests, setRequests] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  /* LOAD */

  useEffect(() => {

    loadRequests();

  }, []);

  async function loadRequests() {

    try {

      const phone =
        await getClientPhone();

      const normalizedPhone =
        phone.trim();

      if (!normalizedPhone) {

        setRequests([]);

        setLoading(false);

        return;
      }

      const {
        data,
        error,
      } =
        await supabase
          .from("requests")
          .select(`
            id,
            car,
            vin,
            part_name,
            quantity,
            created_at
          `)
          .eq(
            "client_phone",
            normalizedPhone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          )
          .limit(30);

      if (error) {

        console.error(error);

        setRequests([]);

        return;
      }

      setRequests(data || []);

    } catch (error) {

      console.error(error);

      setRequests([]);

    } finally {

      setLoading(false);
    }
  }

  if (loading) {

    return (

      <div className={styles.page}>

        <div className={styles.container}>

          Загрузка...

        </div>

      </div>
    );
  }

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
            КАТАЛОГ
          </div>

          <h1 className={styles.name}>
            Запросы
          </h1>

          <p className={styles.subtitle}>
            Всего запросов:
            {" "}
            {requests.length}
          </p>

        </section>

        {/* LIST */}

        <section className={styles.form}>

          {requests.length === 0 && (

            <div className={styles.requestCard}>

              <div className={styles.requestTitle}>
                Нет запросов
              </div>

            </div>

          )}

          {requests.map((item) => (

            <div
              key={item.id}
              className={styles.requestCard}
              style={{
                marginBottom:"12px",
              }}
            >

              <div className={styles.cardTitle}>
                {
                  item.car ||
                  "Автомобиль"
                }
              </div>

              <div
                style={{
                  marginTop:"10px",
                  fontWeight:700,
                  color:"#7b8194",
                  fontSize:"14px",
                }}
              >
                VIN:
                {" "}
                {item.vin || "—"}
              </div>

              <div
                style={{
                  marginTop:"6px",
                  fontWeight:700,
                  color:"#7b8194",
                  fontSize:"14px",
                }}
              >
                {
                  item.part_name ||
                  "—"
                }
              </div>

              <div
                style={{
                  marginTop:"10px",
                  fontWeight:900,
                  fontSize:"15px",
                }}
              >
                {
                  item.quantity || 1
                }
                {" "}
                шт.
              </div>

            </div>

          ))}

        </section>

      </div>

      {/* BOTTOM NAV */}

      <nav className={styles.bottomNav}>

        <Link href="/dashboard">

          <Home
            size={22}
            strokeWidth={2.3}
          />

        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.activeNav}
        >

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