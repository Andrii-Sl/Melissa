"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import DashboardHeader
from "@/components/DashboardHeader";

import styles
from "../../dashboard/dashboard.module.css";

type CartItem = {
  id:string;
  brand?:string;
  part_name:string;
  price:number;
  quantity:number;
};

export default function CartPage() {

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  useEffect(() => {

    const stored =
      localStorage.getItem(
        "cart"
      );

    if (stored) {

      try {

        setCart(
          JSON.parse(stored)
        );

      } catch {

        setCart([]);
      }
    }

  }, []);

  function removeItem(id:string) {

    const updated =
      cart.filter(
        (item) =>
          item.id !== id
      );

    setCart(updated);

    localStorage.setItem(
      "cart",
      JSON.stringify(updated)
    );
  }

  const total = cart.reduce(
    (sum, item) =>
      sum +
      item.price *
      item.quantity,
    0
  );

  return (

    <main className={styles.page}>

      <div className={styles.container}>

        <DashboardHeader
          menuOpen={menuOpen}
          setMenuOpen={setMenuOpen}
          cartCount={cart.length}
        />

        <section className={styles.hero}>

          <div className={styles.welcome}>
            КОРЗИНА
          </div>

          <h1 className={styles.name}>
            Ваш заказ
          </h1>

        </section>

        {
          cart.length === 0 && (

            <div
              className={
                styles.emptyMiniCard
              }
            >

              <div
                style={{
                  fontSize:"20px",
                  fontWeight:900,
                  marginBottom:"8px",
                }}
              >
                Корзина пуста
              </div>

              <div
                style={{
                  color:"#7b8194",
                  marginBottom:"18px",
                }}
              >
                Добавьте предложения
                в корзину
              </div>

              <Link
                href="/dashboard/offers"
                className={
                  styles.profileManageBtn
                }
              >
                К ПРЕДЛОЖЕНИЯМ
              </Link>

            </div>

          )
        }

        <div
          className={
            styles.profileCarsList
          }
        >

          {
            cart.map((item) => (

              <div
                key={item.id}
                className={
                  styles.profileCarCard
                }
              >

                <div
                  className={
                    styles.profileCarIcon
                  }
                >

                  <ShoppingBag
                    size={24}
                  />

                </div>

                <div
                  className={
                    styles.profileCarInfo
                  }
                >

                  <strong>
                    {item.part_name}
                  </strong>

                  <span>
                    Количество:
                    {" "}
                    {item.quantity}
                  </span>

                  <span>
                    Цена:
                    {" "}
                    {item.price} zł
                  </span>

                </div>

                <button
                  type="button"
                  onClick={() =>
                    removeItem(
                      item.id
                    )
                  }
                  style={{
                    border:"none",
                    background:"transparent",
                    color:"#ff3b30",
                  }}
                >

                  <Trash2 size={20} />

                </button>

              </div>

            ))
          }

        </div>

        {
          cart.length > 0 && (

            <div
              className={
                styles.requestCard
              }
              style={{
                marginTop:"18px",
              }}
            >

              <div
                style={{
                  fontSize:"24px",
                  fontWeight:900,
                  marginBottom:"18px",
                }}
              >
                Итого:
                {" "}
                {total} zł
              </div>

              <button
                className={
                  styles.dashboardSubmit
                }
              >
                ОФОРМИТЬ ЗАКАЗ
              </button>

            </div>

          )
        }

      </div>

    </main>
  );
}