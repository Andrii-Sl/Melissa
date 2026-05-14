"use client";

import Link from "next/link";

import {
  Menu,
  X,
  ShoppingBag,
  LogOut,
} from "lucide-react";

import styles from "@/app/dashboard/dashboard.module.css";

type Props = {
  menuOpen:boolean;
  setMenuOpen:(value:boolean)=>void;
  cartCount?:number;
};

export default function DashboardHeader({
  menuOpen,
  setMenuOpen,
  cartCount = 0,
}:Props) {

  function handleLogout() {

    localStorage.removeItem(
      "clientPhone"
    );

    window.location.href = "/";
  }

  return (

    <>
      <header className={styles.header}>

        {/* LEFT */}

        <div className={styles.logoWrap}>

          {/* NEW LOGO */}

          <div className={styles.newLogo}>

            <div
              className={
                styles.logoTriangleOuter
              }
            />

            <div
              className={
                styles.logoTriangleInner
              }
            />

          </div>

          {/* BRAND */}

          <div>

            <div
              className={
                styles.brandRow
              }
            >

              <span
                className={
                  styles.brandBlack
                }
              >
                Auto
              </span>

              <span
                className={
                  styles.brandRed
                }
              >
                Parts
              </span>

              <span
                className={
                  styles.brandBlack
                }
              >
                -EU
              </span>

            </div>

            <div className={styles.subBrand}>
              Клиентская панель
            </div>

          </div>

        </div>

        {/* RIGHT */}

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
                  className={
                    styles.cartBadge
                  }
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
              href="/dashboard"
              className={
                styles.mobileMenuItem
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Главная
            </Link>

            <Link
              href="/dashboard/profile"
              className={
                styles.mobileMenuItem
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Профиль
            </Link>

            <Link
              href="/dashboard/requests"
              className={
                styles.mobileMenuItem
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Запросы
            </Link>

            <Link
              href="/dashboard/offers"
              className={
                styles.mobileMenuItem
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Предложения
            </Link>

            <Link
              href="/dashboard/orders"
              className={
                styles.mobileMenuItem
              }
              onClick={() =>
                setMenuOpen(false)
              }
            >
              Заказы
            </Link>

            <button
              type="button"
              className={
                styles.mobileLogout
              }
              onClick={handleLogout}
            >

              <LogOut
                size={18}
                strokeWidth={2.4}
              />

              Выйти

            </button>

          </div>

        )
      }

    </>
  );
}