"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import BottomNav from "@/components/BottomNav";

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

  const [saving, setSaving] =
    useState(false);

  /* LOAD */

  useEffect(() => {

    loadProfile();

  }, []);

  /* PHONE */

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

  /* PROFILE */

  async function loadProfile() {

    try {

      const clientPhone =
        await getClientPhone();

      if (!clientPhone) {

        setLoading(false);

        return;
      }

      /* PROFILE */

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

      /* GARAGE */

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

  /* SAVE */

  async function saveProfile() {

    try {

      if (!phone) {

        alert(
          "Телефон обязателен"
        );

        return;
      }

      setSaving(true);

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

      loadProfile();

    } catch (error) {

      console.error(error);

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

      {/* HERO */}

      <section className={styles.dashboardHero}>

        <div>

          <p className={styles.dashboardSubtitle}>
            Личный кабинет
          </p>

          <h1 className={styles.dashboardTitle}>
            {
              firstName
                ? `${firstName} ${lastName}`
                : "Профиль"
            }
          </h1>

          <p className={styles.dashboardPhone}>
            📞
            {" "}
            {
              phone ||
              "Телефон не указан"
            }
          </p>

        </div>

        <div className={styles.dashboardProfile}>
          👤
        </div>

      </section>

      {/* PROFILE INFO */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <div className={styles.profileSectionTop}>

            <h2 className={styles.dashboardSectionTitle}>
              Общая информация
            </h2>

            <div className={styles.profileBadge}>
              Аккаунт
            </div>

          </div>

          <div className={styles.profileGrid}>

            <div className={styles.inputGroupModern}>

              <label>
                Имя
              </label>

              <input
                className={styles.dashboardInput}
                value={firstName}
                onChange={(e) =>
                  setFirstName(
                    e.target.value
                  )
                }
                placeholder="Введите имя"
              />

            </div>

            <div className={styles.inputGroupModern}>

              <label>
                Фамилия
              </label>

              <input
                className={styles.dashboardInput}
                value={lastName}
                onChange={(e) =>
                  setLastName(
                    e.target.value
                  )
                }
                placeholder="Введите фамилию"
              />

            </div>

          </div>

          <div className={styles.inputGroupModern}>

            <label>
              Телефон
            </label>

            <input
              className={styles.dashboardInput}
              value={phone}
              onChange={(e) =>
                setPhone(
                  e.target.value
                )
              }
              placeholder="+48..."
            />

          </div>

          <div className={styles.inputGroupModern}>

            <label>
              E-mail
            </label>

            <input
              className={styles.dashboardInput}
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

        <div className={styles.profileModernCard}>

          <div className={styles.profileSectionTop}>

            <h2 className={styles.dashboardSectionTitle}>
              Адрес доставки
            </h2>

            <div className={styles.profileMiniIcon}>
              📍
            </div>

          </div>

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

      </section>

      {/* BILLING */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <div className={styles.profileSectionTop}>

            <h2 className={styles.dashboardSectionTitle}>
              Billing address
            </h2>

            <div className={styles.profileMiniIcon}>
              🧾
            </div>

          </div>

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

      </section>

      {/* GARAGE */}

      <section className={styles.section}>

        <div className={styles.profileModernCard}>

          <div className={styles.profileSectionTop}>

            <h2 className={styles.dashboardSectionTitle}>
              Автомобили
            </h2>

            <Link
              href="/dashboard/garage"
              className={styles.profileManageBtn}
            >
              Управление
            </Link>

          </div>

          <div className={styles.profileCarsList}>

            {garage.length === 0 && (

              <div className={styles.emptyMiniCard}>

                Автомобили отсутствуют

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
                    {
                      item.vin || "—"
                    }
                  </span>

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>

      {/* SAVE */}

      <section className={styles.section}>

        <button
          className={styles.dashboardSubmit}
          onClick={saveProfile}
          disabled={saving}
        >
          {
            saving
              ? "Сохранение..."
              : "Сохранить изменения"
          }
        </button>

      </section>

      <BottomNav active="profile" />

    </main>
  );
}