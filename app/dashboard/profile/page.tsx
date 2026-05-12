"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import styles from "../dashboard.module.css";

export default function ProfilePage() {

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

  useEffect(() => {

    loadProfile();

  }, []);

  async function getClientPhone() {

    try {

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

      const {
        data:{
          session,
        },
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

  async function loadProfile() {

    try {

      const clientPhone =
        await getClientPhone();

      if (!clientPhone) {

        setLoading(false);

        return;
      }

      const {
        data,
      } =
        await supabase
          .from("profiles")
          .select("*")
          .eq(
            "phone",
            clientPhone
          )
          .maybeSingle();

      if (data) {

        setProfile(data);

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
      } =
        await supabase
          .from("garage")
          .select("*")
          .eq(
            "client_phone",
            clientPhone
          )
          .order(
            "created_at",
            {
              ascending:false,
            }
          );

      setGarage(
        garageData || []
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);
    }
  }

  async function saveProfile() {

    try {

      if (!phone) {

        alert(
          "Телефон обязателен"
        );

        return;
      }

      const fullName =
        `${firstName} ${lastName}`;

      const {
        error,
      } =
        await supabase
          .from("profiles")
          .upsert([
            {
              phone,
              first_name:firstName,
              last_name:lastName,
              full_name:fullName,
              email,
              delivery_address:
                deliveryAddress,
              billing_address:
                billingAddress,
            },
          ]);

      if (error) {

        console.error(error);

        alert(
          "Ошибка сохранения"
        );

        return;
      }

      alert(
        "Профиль сохранен"
      );

    } catch (error) {

      console.error(error);

      alert(
        "Ошибка соединения"
      );
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

        <div className={styles.headerContent}>

          <div>

            <p className={styles.hello}>
              Личный кабинет
            </p>

            <h1 className={styles.mainTitle}>
              Профиль
            </h1>

          </div>

        </div>

      </header>

      {/* GENERAL */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Общая информация
          </h2>

        </div>

        <div className={styles.profileCard}>

          <div className={styles.inputGroup}>

            <label>
              Имя
            </label>

            <input
              className={styles.input}
              value={firstName}
              onChange={(e) =>
                setFirstName(
                  e.target.value
                )
              }
              placeholder="Имя"
            />

          </div>

          <div className={styles.inputGroup}>

            <label>
              Фамилия
            </label>

            <input
              className={styles.input}
              value={lastName}
              onChange={(e) =>
                setLastName(
                  e.target.value
                )
              }
              placeholder="Фамилия"
            />

          </div>

          <div className={styles.inputGroup}>

            <label>
              Телефон
            </label>

            <input
              className={styles.input}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              placeholder="+48..."
            />

          </div>

          <div className={styles.inputGroup}>

            <label>
              E-mail
            </label>

            <input
              className={styles.input}
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

      {/* DELIVERY */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Адрес доставки
          </h2>

        </div>

        <div className={styles.profileCard}>

          <textarea
            className={styles.textarea}
            value={deliveryAddress}
            onChange={(e) =>
              setDeliveryAddress(
                e.target.value
              )
            }
            placeholder="Введите адрес доставки"
          />

        </div>

      </section>

      {/* BILLING */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Адрес выставления счёта
          </h2>

        </div>

        <div className={styles.profileCard}>

          <textarea
            className={styles.textarea}
            value={billingAddress}
            onChange={(e) =>
              setBillingAddress(
                e.target.value
              )
            }
            placeholder="Введите billing address"
          />

        </div>

      </section>

      {/* GARAGE */}

      <section className={styles.section}>

        <div className={styles.sectionHead}>

          <h2>
            Автомобили
          </h2>

          <Link
            href="/dashboard/garage"
            className={styles.linkBtn}
          >
            Управление
          </Link>

        </div>

        <div className={styles.carsGrid}>

          {garage.length === 0 && (

            <div className={styles.profileCard}>

              <p className={styles.addressText}>
                Автомобили отсутствуют
              </p>

            </div>

          )}

          {garage.map((item) => (

            <div
              key={item.id}
              className={styles.carCard}
            >

              <div
                className={styles.carTop}
              >

                <div
                  className={styles.carLogo}
                >
                  🚘
                </div>

                <div>

                  <strong>
                    {
                      item.car_name ||
                      "Автомобиль"
                    }
                  </strong>

                  <p>
                    {item.vin || "—"}
                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </section>

      {/* SAVE */}

      <section className={styles.section}>

        <button
          className={styles.primaryButton}
          onClick={saveProfile}
        >
          Сохранить изменения
        </button>

      </section>

      {/* NAV */}

      <nav className={styles.bottomNav}>

        <Link
          href="/dashboard"
          className={styles.navItem}
        >
          <span>
            🏠
          </span>
          Главная
        </Link>

        <Link
          href="/dashboard/requests"
          className={styles.navItem}
        >
          <span>
            📄
          </span>
          Заявки
        </Link>

        <Link
          href="/dashboard/offers"
          className={styles.navItem}
        >
          <span>
            💶
          </span>
          Предложения
        </Link>

        <Link
          href="/dashboard/orders"
          className={styles.navItem}
        >
          <span>
            📦
          </span>
          Заказы
        </Link>

        <Link
          href="/dashboard/profile"
          className={`${styles.navItem} ${styles.navActive}`}
        >
          <span>
            👤
          </span>
          Профиль
        </Link>

      </nav>

    </main>
  );
}