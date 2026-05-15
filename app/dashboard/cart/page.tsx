"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import {
  ShoppingBag,
  Trash2,
  ArrowLeft,
} from "lucide-react";

import { useRouter }
from "next/navigation";

import { supabase }
from "@/lib/supabase";

import { getClientPhone }
from "@/lib/getClientPhone";

import { handleError }
from "@/lib/handleError";

import DashboardHeader
from "@/components/DashboardHeader";

import styles
from "../../dashboard/dashboard.module.css";

type CartItem = {
  id:string;
  brand?:string;
  article?:string;
  product_image?:string;
  delivery_days?:number;
  part_name:string;
  price:number;
  quantity:number;
};

export default function CartPage() {

  const router =
    useRouter();

  const [menuOpen, setMenuOpen] =
    useState(false);

  const [cart, setCart] =
    useState<CartItem[]>([]);

  const [loading, setLoading] =
    useState(false);

  useEffect(() => {

    loadCart();

  }, []);

  function loadCart() {

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

    } else {

      setCart([]);
    }
  }

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

  async function checkout() {

    try {

      if (cart.length === 0) {

        alert("Корзина пуста");

        return;
      }

      setLoading(true);

      const phone =
        await getClientPhone();

      const normalizedPhone =
        String(phone || "")
          .replace(/\s/g, "")
          .trim();

      console.log(
        "CHECKOUT PHONE:",
        normalizedPhone
      );

      if (!normalizedPhone) {

        alert(
          "Ошибка авторизации"
        );

        return;
      }

      const orders =
        cart.map((item) => ({

          offer_id:
            item.id || null,

          client_phone:
            normalizedPhone,

          status:"NEW",

          part_name:
            String(
              item.part_name || ""
            ),

          article:
            String(
              item.article || ""
            ),

          quantity:
            Number(
              item.quantity || 1
            ),

          offer_price:
            Number(
              item.price || 0
            ),

          total_price:
            Number(
              item.price || 0
            ) *
            Number(
              item.quantity || 1
            ),

          payment_method:
            "CARD",

          delivery_days:
            Number(
              item.delivery_days || 0
            ),

          product_image:
            String(
              item.product_image || ""
            ),

        }));

      console.log(
        "ORDERS:",
        orders
      );

      const {
        error,
        data,
      } =
        await supabase
          .from("orders")
          .insert(orders)
          .select();

      console.log(
        "ORDER RESPONSE:",
        data
      );

      console.log(
        "ORDER ERROR:",
        error
      );

      if (error) {

        console.error(error);

        alert(
          error.message
        );

        return;
      }

      localStorage.removeItem(
        "cart"
      );

      setCart([]);

      alert(
        "Заказ успешно оформлен"
      );

      router.push(
        "/dashboard/orders"
      );

    } catch (error) {

      console.error(
        "CHECKOUT ERROR:",
        error
      );

      handleError(error);

      alert(
        "Ошибка соединения"
      );

    } finally {

      setLoading(false);
    }
  }

  const total = cart.reduce(

    (sum, item) =>

      sum +
      (
        Number(item.price || 0) *
        Number(item.quantity || 1)
      ),

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

        {/* HERO */}

        <section className={styles.hero}>

          <div className={styles.welcome}>
            КОРЗИНА
          </div>

          <h1 className={styles.name}>
            Ваш заказ
          </h1>

          <p className={styles.subtitle}>
            Товаров:
            {" "}
            {cart.length}
          </p>

        </section>

        {/* EMPTY */}

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
                  lineHeight:"22px",
                }}
              >
                Добавьте товары
                из раздела предложений
              </div>

              <Link
                href="/dashboard/offers"
                className={
                  styles.profileManageBtn
                }
              >
                ПЕРЕЙТИ К ПРЕДЛОЖЕНИЯМ
              </Link>

            </div>

          )
        }

        {/* LIST */}

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
                  style={{
                    flex:1,
                  }}
                >

                  <strong>
                    {
                      item.part_name ||
                      item.brand ||
                      "Товар"
                    }
                  </strong>

                  {
                    item.article && (

                      <span>
                        Артикул:
                        {" "}
                        {item.article}
                      </span>

                    )
                  }

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
                    cursor:"pointer",
                    flexShrink:0,
                  }}
                >

                  <Trash2 size={20} />

                </button>

              </div>

            ))
          }

        </div>

        {/* TOTAL */}

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
                  display:"flex",
                  alignItems:"center",
                  justifyContent:"space-between",
                  marginBottom:"18px",
                }}
              >

                <div
                  style={{
                    fontSize:"18px",
                    fontWeight:700,
                  }}
                >
                  Общая сумма
                </div>

                <div
                  style={{
                    fontSize:"28px",
                    fontWeight:900,
                  }}
                >
                  {total} zł
                </div>

              </div>

              <button
                type="button"
                className={
                  styles.dashboardSubmit
                }
                onClick={checkout}
                disabled={loading}
              >

                {
                  loading
                    ? "ОФОРМЛЕНИЕ..."
                    : "ОФОРМИТЬ ЗАКАЗ"
                }

              </button>

            </div>

          )
        }

        {/* BACK */}

        <Link
          href="/dashboard/offers"
          style={{
            marginTop:"18px",
            display:"flex",
            alignItems:"center",
            gap:"8px",
            justifyContent:"center",
            textDecoration:"none",
            color:"#7b8194",
            fontWeight:700,
            paddingBottom:"100px",
          }}
        >

          <ArrowLeft size={18} />

          Вернуться к предложениям

        </Link>

      </div>

    </main>
  );
}